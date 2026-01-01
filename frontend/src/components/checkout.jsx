import { useEffect, useState } from "react"
import './Checkout.css'
import { useParams } from "react-router-dom"
import CartStore from "../store";
import { useForm } from "react-hook-form";
import AuthStore from "../AuthStore";

function Checkout() {
    const { token } = AuthStore()
    console.log(token)


    const { cart, clear } = CartStore();
    const totalAmount = cart.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

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


    const Upload = async (data) => {
        try {
            let res = await fetch("http://localhost:8000/order", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({
                    name: data.name,
                    address: data.address,
                    district: data.district,
                    pincode: data.pincode,
                    number: data.number,
                    orderItems: cart.map(item => ({
                        pid: item.id,
                        qty: item.quantity
                    })),

                }),

            });
            if (res.ok) {
                reset;
                clear()
                alert("order placed successfully!");

            } else {
                alert("failed to order");

            }
        } catch (err) {
            console.error(err)
            alert("an error occurred");
        }
    };


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
                    <h2>Total Amount = ₹{totalAmount}</h2>
                </div>
                <div className="checkout3">
                    <form action="" onSubmit={handleSubmit(Upload)}>
                        Name
                        <input type="text" placeholder="name"   {...register("name", { required: "Name is required" })} /><br />
                        Address <input type="text" placeholder="address"   {...register("address", { required: "Address is required" })} /><br />
                        District <input type="text" placeholder="district"  {...register("district", { required: "District is required" })} /><br />
                        Pincode <input type="number" placeholder="pincode"   {...register("pincode", { required: "Pincode is required" })} /><br />
                        Phone Number <input type="number" placeholder="number"  {...register("number", { required: "Number is required" })} /><br />
                        <button>SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Checkout