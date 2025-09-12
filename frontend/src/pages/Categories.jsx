import { useRef, useState } from "react"
import Navbar from "../components/Navbar"
function Categories() {

    const nameref = useRef()
    const imageref = useRef()

    const [name, Setname] = useState("")
    const [image, SetImage] = useState("")
    const [loading, Setloading] = useState(false)
    

    const Uplodad = async () => {
        Setloading(true)
        setTimeout(async () => {
            await fetch("http://localhost:8000/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    image: image
                })
            })
            nameref.current.value = ""
            imageref.current.value = ""
           
            Setloading(false)

        }, 1000);

    }
    return <><Navbar/>
    <div className="admin">
    
    <h2>ADD CATEGORY</h2>
    <input ref={nameref} type="text" placeholder="name of the product" onChange={e => Setname(e.target.value)} /><br />
    <input ref={imageref} type="text" placeholder="image of the product" onChange={e => SetImage(e.target.value)} /><br />
    {
                loading ? <h4>Working on it..</h4> : <button onClick={Uplodad}>SUBMIT</button>
            }
    
    </div>
    </>
}

export default Categories