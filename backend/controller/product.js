
import Product from "../model/productmodel.js"


export const item = async (req, res) => {

    const item = req.query.search;

    if (item != "") {
        const pro = await Product.findOne({ name: item })
        if (pro) {
            return res.json(new Array(pro))
        } else {
            return res.json([])
        }

    }

    console.log("get request", item)

    const items = await Product.find({}).populate("category").exec()

    res.json(items)

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
