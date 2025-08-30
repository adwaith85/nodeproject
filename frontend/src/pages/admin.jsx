import { useState } from "react"
import Navbar from "../components/Navbar"
import { useRef } from "react"


function Admin(){

    const nameref=useRef()
    const imageref=useRef()
    const priceref=useRef()


    const [name,Setname]=useState("")
    const [image,SetImage]=useState("")
    const [price,SetPrice]=useState("")
    const [loading,Setloading]=useState(false)

    const Uplodad=async()=>{
        Setloading(true)
        setTimeout(async() => {
                await fetch("http://localhost:8000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    image: image
                })
            })
            nameref.current.value=""
            imageref.current.value=""
            priceref.current.value=""
            
        Setloading(false)
            
        }, 1000);

    

    }

    return <><Navbar/>
   <div className="adminpage">
     <div className="admin">
    
    <h1>ADD NEW PROUDUCT</h1>


    <input ref={nameref} type="text" placeholder="name of the product"  onChange={e=>Setname(e.target.value)}/><br/>
    <input ref={imageref} type="text" placeholder="image of the product" onChange={e=>SetImage(e.target.value)} /><br/>
    <input ref={priceref} type="text" placeholder="price of the product" onChange={e=>SetPrice(e.target.value)}/><br/>

   
    {
        loading?<h4>Loading...</h4>: <button onClick={Uplodad}>SUBMIT</button>
    }
    
    {/* </div> */}
    </div>
    </div>
    </>
}

export default Admin