import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";

import Admin from "./pages/admin";

function CustomRoute() {


    return <>

        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>


        </BrowserRouter>
    </>
}

export default CustomRoute