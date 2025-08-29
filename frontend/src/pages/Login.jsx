import { useState } from "react"


function Login(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")

    return<div className="reg-card">
    <h2>LOGIN</h2><br/>
    <input type="text" placeholder="name" onChange={e=>setName(e.target.value)}></input>
    <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
    <input type="button" value="submit" />
    <p><a href="/register">Register</a> before login</p>
    {/* <Link to={'/register'} className="">REGISTER</Link> */}
    </div>
}

export default Login