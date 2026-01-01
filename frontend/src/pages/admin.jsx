import { useState } from "react"
import './Admin.css'
import Navbar from "../components/Navbar"
import { useRef, useEffect } from "react"
import AuthStore from "../AuthStore"
import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom";
import { CateOption } from "./home"


function Admin() {

  const nameref = useRef()
  const imageref = useRef()
  const priceref = useRef()

  const { token } = AuthStore()
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

  const [products, setProduct] = useState([]);

  const getProduct = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await res.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setProduct(data);
      } else if (Array.isArray(data.products)) {
        setProduct(data.products);
      } else {
        console.error("Unexpected response:", data);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);


  const [categorylist, setCategorylist] = useState([]);

  const getCategory = async () => {
    let res = await fetch("http://localhost:8000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    setCategorylist(data);
  };

  useEffect(() => {
    getCategory();
  }, []);


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

    <h2><Link to={'/Order'} className="btn">view orders</Link></h2>
    {
      token ? <div className="admin">

        <h1>ADD NEW PROUDUCT</h1>


        <input ref={nameref} type="text" placeholder="name of the product" onChange={e => Setname(e.target.value)} /><br />
        <input ref={imageref} type="text" placeholder="image of the product" onChange={e => SetImage(e.target.value)} /><br />
        <input ref={priceref} type="number" placeholder="price of the product" onChange={e => SetPrice(e.target.value)} /><br />
        <select value={selectCategory} onChange={e => SetSelectedCategory(e.target.value)}>

          {
            categories.map(item => <option value={item._id}>{item.name}</option>)
          }
        </select><br />

        {
          loading ? <h4>Loading...</h4> : <button onClick={Uplodad}>SUBMIT</button>
        }

        {/* </div> */}
      </div> : <Navigate to={"/login"} />
    }

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {products.map(item => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>
              <img src={item.image} alt={item.name} width="60" height="60" />
            </td>
            <td>{item.name}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>


    <table className="category-table">
      <tbody>
        <tr>
          {categorylist.map(item => (
            <><tr>
              <td>{item.name}</td>

              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td></td>
            </tr>
            </>
          ))}</tr>
      </tbody>
    </table>



  </>
}

export default Admin