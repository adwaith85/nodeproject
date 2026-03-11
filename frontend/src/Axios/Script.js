import axios from "axios";

const api = axios.create({
    baseURL: "https://shop-cart-api.adwaithh.online",
    // baseURL: "http://localhost:8000",
    withCredentials: true,
});

export default api;
