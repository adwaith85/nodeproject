import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";

import Admin from "./pages/admin";
import Register from "./pages/register";
import Login from "./pages/Login";
import Cart from "./pages/cart";

function CustomRoute() {


    return <>

        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/Login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>


        </BrowserRouter>
    </>
}

export default CustomRoute