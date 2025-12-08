
import Product from "../model/productmodel.js"


export const item = async (req, res) => {

    const searchItem = req.query.search;
    console.log("Search term:", searchItem);

    try {
        let products;
        if (searchItem && searchItem.trim() !== "") {
            // Use regex for partial match and case-insensitive search
            const regex = new RegExp(searchItem, 'i');
            products = await Product.find({ name: regex }).populate("category").exec();
        } else {
            products = await Product.find({}).populate("category").exec();
        }
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server Error" });
    }

}

export const itemadd = (req, res) => {
    const { name, image, price, category } = req.body
    // console.log(name, image, price)

    Product.create({ name, image, price, category })

    res.send("ok created")

}

export const deleteitem = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        await Product.findByIdAndDelete(id)

    } catch (err) {
        console.log(err)
    }

    res.send("deleted")

}
