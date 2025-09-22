import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CartStore from "../store";
import { useForm } from "react-hook-form";

function Checkout() {
    const { cart, getTotal } = CartStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    console.log(cart)



    useEffect(() => {
        if (cart.length === 0) {
            console.log("Your cart is empty!");
            // optional: alert("Your cart is empty!");
        }
    }, [cart]);


    const Upload=async(data)=>{
        let res =await fetch("http://localhost:8000/order",{
            
        })

        console.log(data)
    }


    return <>
    <div className="checkout-container">
        <div className="checkout-left">
        {
            cart.map(item => <>
                <div className="checkout1">
                    <img src={item.image} alt="" />
                    <h2>{item.name}-{item.quantity}</h2>

                </div>


            </>)

        }
        </div>
        <div className="checkout-right">
            <div className="checkout2">
                <h2>Total Amount = ₹{getTotal()}</h2>
            </div>
            <div className="checkout3">
                <form action="" onSubmit={handleSubmit(Upload)}>
                    Name
                    <input type="text" placeholder="name"   {...register("name", { required: "Name is required" })} /><br />
                    Address <input type="text" placeholder="address"   {...register("address", { required: "Address is required" })} /><br />
                    District <input type="text" placeholder="district"  {...register("district", { required: "District is required" })} /><br />
                    Pincode <input type="number" placeholder="pincode"   {...register("pincode", { required: "Pincode is required" })} /><br />
                    Phone Number <input type="number" placeholder="number"  {...register("number", { required: "Number is required" })} /><br/>
                    <button>SUBMIT</button>
                </form>
            </div>
        </div>
        </div>
    </>
}

export default Checkout