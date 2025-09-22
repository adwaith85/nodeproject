import mongoose from "mongoose";

const OrderItemSchema= new mongoose.Schema({
    pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true
    },
    qty:{
        type:Number,
        required:true
    }
})
const orderSchema = new mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Users",
         required:true
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    
    district:{
        type:String
    },
    pincode:{
        type:String
    },
    number:{
        type:String
    },
    OrderItem:{
        type:[OrderItemSchema],
        required:true
    },
    TotalPrice:{
        type:Number
    }

}, {timestamps:true});

const Order = mongoose.model("order", orderSchema);
export default Order
