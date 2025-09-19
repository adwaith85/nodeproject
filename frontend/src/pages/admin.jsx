import { useState } from "react"
import Navbar from "../components/Navbar"
import { useRef, useEffect } from "react"
import AuthStore from "../AuthStore"
import { Navigate, useNavigate } from "react-router-dom";


function Admin() {

    const nameref = useRef()
    const imageref = useRef()
    const priceref = useRef()
     
    const {token}=AuthStore()
  console.log(token)

    const [name, Setname] = useState("")
    const [image, SetImage] = useState("")
    const [price, SetPrice] = useState("")
    const [loading, Setloading] = useState(false)
    const [categories, SetCategory] = useState([])

    const [selectCategory, SetSelectedCategory] = useState("")

    const Uplodad = async () => {
        Setloading(true)
        setTimeout(async () => {
            await fetch("http://localhost:8000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    image: image,
                    category: selectCategory
                })
            })
            nameref.current.value = ""
            imageref.current.value = ""
            priceref.current.value = ""

            Setloading(false)

        }, 1000);

    }

    const category = async () => {
        let res = await fetch('http://localhost:8000/category', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        let data = await res.json()
        SetCategory(data)

    }
    useEffect(() => {
        category()
    }, [])
    return <><Navbar />
        { 
        token ?<div className="admin">

            <h1>ADD NEW PROUDUCT</h1>


            <input ref={nameref} type="text" placeholder="name of the product" onChange={e => Setname(e.target.value)} /><br />
            <input ref={imageref} type="text" placeholder="image of the product" onChange={e => SetImage(e.target.value)} /><br />
            <input ref={priceref} type="text" placeholder="price of the product" onChange={e => SetPrice(e.target.value)} /><br />
            <select value={selectCategory} onChange={e => SetSelectedCategory(e.target.value)}>

                {
                    categories.map(item => <option value={item._id}>{item.name}</option>)
                }
            </select><br />

            {
                loading ? <h4>Loading...</h4> : <button onClick={Uplodad}>SUBMIT</button>
            }

            {/* </div> */}
        </div>  : <Navigate to={"/login"} />
        }            

    </>
}

export default Admin