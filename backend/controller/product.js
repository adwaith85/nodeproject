
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
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "Product deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to delete" })
    }
}

export const updateitem = async (req, res) => {
    try {
        const { id } = req.params
        const { name, image, price, category } = req.body
        const updated = await Product.findByIdAndUpdate(id, { name, image, price, category }, { new: true })
        res.status(200).json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Update failed" })
    }
}
