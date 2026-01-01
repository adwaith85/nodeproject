import Product from "../model/productmodel.js";
import Order from "../model/order.js";
import Usermodel from "../model/userModel.js";

export const ordered = async (req, res) => {
    try {
        const user = await Usermodel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userOrders = await Order.find({ userId: user._id }).populate("orderItems.pid");
        res.status(200).json(userOrders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
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

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
            .populate("userId", "name email")
            .populate("orderItems.pid")
            .sort({ createdAt: -1 });
        res.status(200).json(allOrders);
    } catch (err) {
        console.error("Error fetching all orders:", err);
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
};