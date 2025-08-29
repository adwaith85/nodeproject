import { useState } from "react"

function Register(){
        const [name,setName]=useState("")
        const [email,setEmail]=useState("")
        const [number,setNumber]=useState("")
        const [password,setPassword]=useState("")

        const onSubmit=async()=>{
            await fetch(" ", {
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
        }



    return<div className="reg-card">
        
    <input type="text" placeholder="name" onChange={e=>setName(e.target.value)}></input><br/>
    <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/><br/>
    <input type="number" placeholder="number" onChange={e=>setNumber(e.target.value)}/><br/>
    <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/><br/>
    <input type="button" onClick={onSubmit} value="submit" />
    
    </div>

}


export default Register