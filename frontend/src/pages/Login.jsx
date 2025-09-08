import { useState } from "react"
import Navbar from "../components/Navbar"

import { useNavigate } from "react-router-dom"

import AuthStore from "../AuthStore"

function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {addToken}=AuthStore()


    const onClick = async () => {
        let res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: name,
                password: password
            })
        });

        // Parse the response JSON
        let data = await res.json();

        // Log the whole response object
        console.log("Response Data:", data);

        // Access the token if it's returned like { token: "..." }
        let token = data.token;

        if (token) {
           addToken(token)
            navigate("/")
        } else {
            console.error("Token not found in response.");
        }

    }

    return <><Navbar />
        <div className="reg-card">
            <h2>LOGIN</h2><br />
            <input type="text" placeholder="email" onChange={e => setName(e.target.value)}></input>
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={onClick}>SUBMIT</button>
            <p><a href="/register">Register</a> before login</p>
            {/* <Link to={'/register'} className="">REGISTER</Link> */}
        </div>
    </>
}

export default Login