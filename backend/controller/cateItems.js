import Category from "../model/cateModel.js"

import ProductModel from "../model/model.js"

export const cateItem = async (req, res) => {
    try {
        const { name } = req.params
        console.log(name)
        const category = await Category.findOne({ name });

        const products = await ProductModel.find({ category: category._id }).populate("category").exec()
        res.json(products)

    } catch (err) {
        console.log(err)
    }
}
