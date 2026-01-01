import Product from "../model/productmodel.js";
import Order from "../model/order.js";
import Usermodel from "../model/userModel.js";

export const ordered = async (req, res) => {
    const ordered = await Order.find({})
    console.log("done")
    res.status(200).json(ordered)
}

export const getUserOrderCount = async (req, res) => {
    try {
        const user = await Usermodel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const count = await Order.countDocuments({ userId: user._id });
        res.status(200).json({ count });
    } catch (err) {
        console.error("error fetching order count:", err);
        res.status(500).json({ error: "failed to fetch order count" });
    }
}



export const CreateOrder = async (req, res) => {
    try {
        const {
            name,
            address,
            district,
            pincode,
            number,
            orderItems,

        } = req.body;


        const user_details = await Usermodel.findOne({ email: req.user.email })
        let totalprice = 0;

        for (const item of orderItems) {
            const product = await Product.findOne({ _id: item.pid });
            totalprice += item.qty * product.price;

        }

        const newOrder = await Order.create({
            userId: user_details._id,
            name,
            address,
            district,
            pincode,
            number,
            orderItems: orderItems,
            TotalPrice: totalprice,

        });
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("error created:", err);
        res.status(500).json({ error: "failed to order" });

    }
};