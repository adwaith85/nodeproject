import Product from "../model/productmodel.js";
import Order from "../model/order.js";
import Usermodel from "../model/userModel.js";

export const ordered = async (req, res) => {
    const ordered  = await Order.find({})
    console.log("done")
    res.status(200).json(ordered)
}


export const CreateOrder=async(req,res)=>{
    try{
        const{
            name,
            address,
            district,
            pincode,
            number,
            orderItems,

        }=req.body;


        const user_details=await Usermodel.findOne({email:req.user.email})
        let totalprice=0;

        for (const item of orderItems){
            const product=await Product.findOne({_id:item.pid});
            totalprice+=item.qty*product.price;

        }

        const newOrder=await Order.create({
             userId:user_details._id,
            name,
            address,
            district,
            pincode,
            number,
            orderItems:orderItems,
            TotalPrice:totalprice,

        });
        res.status(201).json(newOrder);
    }catch(err){
        console.error("error created:",err);
        res.status(500).json({error:"failed to order"});

    }
};