import { useState } from "react"
import Navbar from "../components/Navbar"


function Login(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")

    const onClick=async()=>{
            await fetch("http://localhost:8000/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    name: name,
                    password:password
                })
            })
    }

    return <><Navbar/>
    <div className="reg-card">
    <h2>LOGIN</h2><br/>
    <input type="text" placeholder="name" onChange={e=>setName(e.target.value)}></input>
    <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
    <button onSubmit={onClick}>SUBMIT</button>
    <p><a href="/register">Register</a> before login</p>
    {/* <Link to={'/register'} className="">REGISTER</Link> */}
    </div>
    </>
}

export default Login