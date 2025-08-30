import { useState } from "react"
import { useRef } from "react"

function Register(){
const nameref=useRef()
    const emailref=useRef()
    const numberref=useRef()
        const passwordref=useRef()
    

        const [name,setName]=useState("")
        const [email,setEmail]=useState("")
        const [number,setNumber]=useState("")
        const [password,setPassword]=useState("")
        const [loading,Setloading]=useState(false)

        const Uplodad=async()=>{
        Setloading(true)
        setTimeout(async() => {
            await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email:email,
                    number: number,
                    password: password
                })
            })
            nameref.current.value=""
            emailref.current.value=""
            numberref.current.value=""
            passwordref.current.value=""

             Setloading(false)
            
        }, 1000);
        }



    return<div className="reg-card">
        
    <input ref={nameref} type="text" placeholder="name" onChange={e=>setName(e.target.value)}></input><br/>
    <input ref={emailref} type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/><br/>
    <input ref={numberref} type="number" placeholder="number" onChange={e=>setNumber(e.target.value)}/><br/>
    <input ref={passwordref} type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/><br/>
    
    {
    loading?<h4>registered</h4>: <button onClick={Uplodad}>SUBMIT</button>
}
    </div>

}


export default Register