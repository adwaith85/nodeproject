import { useState, useRef, useEffect } from "react"
import './Admin.css'
import Navbar from "../components/Navbar"
import AuthStore from "../AuthStore"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom";

function Admin() {
  const nameref = useRef()
  const imageref = useRef()
  const priceref = useRef()

  const { token } = AuthStore()
  const [name, Setname] = useState("")
  const [image, SetImage] = useState("")
  const [price, SetPrice] = useState("")
  const [loading, Setloading] = useState(false)
  const [categories, SetCategory] = useState([])
  const [selectCategory, SetSelectedCategory] = useState("")
  const [products, setProduct] = useState([]);

  const Uplodad = async () => {
    Setloading(true)
    try {
      await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
      getProduct();
    } catch (err) {
      console.error(err);
    } finally {
      Setloading(false)
    }
  }

  const getProduct = async () => {
    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProduct(data);
      } else if (Array.isArray(data.products)) {
        setProduct(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategory = async () => {
    try {
      let res = await fetch('http://localhost:8000/category', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      let data = await res.json()
      SetCategory(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (token) {
      getProduct();
      getCategory();
    }
  }, [token])

  if (!token) return <Navigate to={"/login"} />

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-actions">
          <Link to={'/Order'} className="admin-btn">View Orders</Link>
          <Link to={'/Categories'} className="admin-btn">Manage Categories</Link>
        </div>

        <div className="admin-form-section">
          <h1>Add New Product</h1>
          <div className="admin-form">
            <input ref={nameref} type="text" placeholder="Product Name" onChange={e => Setname(e.target.value)} />
            <input ref={imageref} type="text" placeholder="Image URL" onChange={e => SetImage(e.target.value)} />
            <input ref={priceref} type="number" placeholder="Price" onChange={e => SetPrice(e.target.value)} />
            <select value={selectCategory} onChange={e => SetSelectedCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            {loading ? <h4>Uploading...</h4> : <button onClick={Uplodad}>Submit Product</button>}
          </div>
        </div>

        <div className="admin-list-section">
          <h2>Current Products</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item._id}>
                  <td><img src={item.image} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item?.category?.name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admin