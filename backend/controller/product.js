
import Product from "../model/productmodel.js"


export const item = async (req, res) => {
    const { search, category } = req.query;
    console.log("Search term:", search);
    console.log("Category ID:", category);

    try {
        let query = {};

        if (search && search.trim() !== "") {
            query.name = new RegExp(search, 'i');
        }

        if (category && category !== "null" && category !== "") {
            query.category = category;
        }

        let products = await Product.find(query).populate("category").exec();
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
