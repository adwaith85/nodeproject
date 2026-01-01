import { useState, useRef, useEffect } from "react"
import './Admin.css'
import AuthStore from "../AuthStore"
import { Link, Navigate } from "react-router-dom"
import React from 'react';

function Admin() {
  const { token } = AuthStore()
  const [activeTab, setActiveTab] = useState('orders') // 'orders', 'categories', 'products'
  const [loading, setLoading] = useState(false)
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  // Global Data
  const [orders, setOrders] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null) // Only for products tab filtering if needed later, but removed from Cat tab

  // Form Inputs
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [catId, setCatId] = useState("")

  // Editing State
  const [editingId, setEditingId] = useState(null)

  const nameRef = useRef()
  const imageRef = useRef()
  const priceRef = useRef()

  // API Callers
  const fetchAllOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/orders")
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/category")
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
  }

  const fetchProducts = async (filteredCatId = null) => {
    try {
      let url = "http://localhost:8000/products"
      if (filteredCatId) url += `?category=${filteredCatId}`
      const res = await fetch(url)
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => {
    if (token) {
      if (activeTab === 'orders') fetchAllOrders()
      if (activeTab === 'categories') fetchCategories()
      if (activeTab === 'products') {
        fetchProducts(selectedCategory)
        fetchCategories()
      }
    }
  }, [activeTab, selectedCategory, token])

  // Submissions
  const handleProductSubmit = async () => {
    if (!name || !price || !catId) return alert("Fill all product fields")
    setLoading(true)
    try {
      await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name, price, image, category: catId })
      })
      alert("Product Created!")
      resetForm()
      fetchProducts(selectedCategory)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleCategorySubmit = async () => {
    if (!name) return alert("Category name required")
    setLoading(true)
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `http://localhost:8000/category/${editingId}` : "http://localhost:8000/category"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name, image })
      })

      if (res.ok) {
        alert(editingId ? "Category Updated!" : "Category Created!")
        resetForm()
        setEditingId(null)
        fetchCategories()
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return
    try {
      await fetch(`http://localhost:8000/category/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      fetchCategories()
    } catch (e) { console.error(e) }
  }

  const startEditCategory = (cat) => {
    setEditingId(cat._id)
    setName(cat.name)
    setImage(cat.image)
    if (nameRef.current) nameRef.current.value = cat.name
    if (imageRef.current) imageRef.current.value = cat.image
  }

  const resetForm = () => {
    setName(""); setImage(""); setPrice(""); setCatId("")
    setEditingId(null)
    if (nameRef.current) nameRef.current.value = ""
    if (imageRef.current) imageRef.current.value = ""
    if (priceRef.current) priceRef.current.value = ""
  }

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id)
  }

  if (!token) return <Navigate to="/login" />

  return (
    <div className="admin-layout-wrapper">
      <header className="admin-header">
        <div className="admin-nav-top">
          <Link to="/" className="back-link">← Home</Link>
          <div className="admin-tabs">
            <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
            <button className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => { setActiveTab('categories'); setEditingId(null); resetForm(); }}>Categories</button>
            <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
          </div>
          <div className="admin-user-marker">ADMIN ROLE</div>
        </div>
      </header>

      <main className="admin-content-body">

        {activeTab === 'orders' && (
          <section className="dashboard-section">
            <h1 className="section-title">Master Order Log</h1>
            <div className="table-container">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>ID / Name</th>
                    <th>Email</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Order Total</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <React.Fragment key={order._id}>
                      <tr className={expandedOrderId === order._id ? 'expanded-parent' : ''}>
                        <td>
                          <div className="id-block">
                            <small>#{order._id.slice(-6).toUpperCase()}</small>
                            <strong>{order.name}</strong>
                          </div>
                        </td>
                        <td className="email-cell">{order.userId?.email || 'Guest'}</td>
                        <td>
                          <span className={`mini-badge ${order.paymentStatus === 'Paid' ? 'paid-bg' : 'unpaid-bg'}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span className={`status-dot status-${order.status?.toLowerCase().replace(/\s/g, '-')}`}></span>
                          <span className="status-label">{order.status}</span>
                        </td>
                        <td><strong>₹{order.TotalPrice}</strong></td>
                        <td>
                          <button
                            className={`icon-toggle ${expandedOrderId === order._id ? 'open' : ''}`}
                            onClick={() => toggleExpand(order._id)}
                            title="Toggle Details"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {expandedOrderId === order._id && (
                        <tr className="details-dropdown-row">
                          <td colSpan="6">
                            <div className="compact-details-box">
                              <div className="details-mini-grid">
                                <div className="mini-card">
                                  <h6>Shipment</h6>
                                  <p>{order.address}, {order.district} - {order.pincode}</p>
                                  <p>{order.number}</p>
                                </div>
                                <div className="mini-card">
                                  <h6>Logistics</h6>
                                  <p>Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                                  <p>Method: {order.paymentMethod}</p>
                                </div>
                                <div className="mini-card itemized">
                                  <h6>Items({order.orderItems?.length})</h6>
                                  <div className="mini-scroll">
                                    {order.orderItems?.map((item, idx) => (
                                      <div key={idx} className="small-product-row">
                                        <img src={item.pid?.image} alt="" />
                                        <span>{item.qty}x {item.pid?.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* CATEGORY SECTION */}
        {activeTab === 'categories' && (
          <section className="dashboard-section cat-section-compact">
            <h1 className="section-title">Category Intelligence</h1>

            <div className="cat-form-container">
              <div className="cat-form-header">
                <h3>{editingId ? 'Modify Category' : 'New Classification'}</h3>
                {editingId && <button className="cancel-edit-btn" onClick={resetForm}>Cancel Edit</button>}
              </div>
              <div className="cat-standard-form">
                <div className="form-item">
                  <label>Classification Name</label>
                  <input ref={nameRef} className="cat-input-box" placeholder="e.g. Premium Watches" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Iconography URL</label>
                  <input ref={imageRef} className="cat-input-box" placeholder="https://source.unsplash.com/..." value={image} onChange={e => setImage(e.target.value)} />
                </div>
                <button className="cat-submit-btn" onClick={handleCategorySubmit} disabled={loading}>
                  {loading ? 'Working...' : editingId ? 'Update Record' : 'Register Category'}
                </button>
              </div>
            </div>

            <div className="cat-table-wrapper">
              <table className="cat-premium-table">
                <thead>
                  <tr>
                    <th>Created Time</th>
                    <th>Created Date</th>
                    <th>Category ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat._id}>
                      <td className="cat-time-cell">{cat.createdAt ? new Date(cat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</td>
                      <td className="cat-date-cell">{cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className="cat-id-cell">#{cat._id.slice(-6).toUpperCase()}</td>
                      <td><img src={cat.image} className="cat-list-img" alt="" /></td>
                      <td className="cat-name-cell"><strong>{cat.name}</strong></td>
                      <td>
                        <div className="cat-action-group">
                          <button className="cat-edit-btn" onClick={() => startEditCategory(cat)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button className="cat-del-btn" onClick={() => handleDeleteCategory(cat._id)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* PRODUCT SECTION */}
        {activeTab === 'products' && (
          <section className="dashboard-section">
            <h1 className="section-title">Product Inventory</h1>
            <div className="creation-card">
              <h3>Upload New Product</h3>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input ref={nameRef} className="form-input" placeholder="e.g. iPhone 15" onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Market Price (₹)</label>
                  <input ref={priceRef} type="number" className="form-input" placeholder="79999" onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input ref={imageRef} className="form-input" placeholder="https://..." onChange={e => setImage(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Assign Category</label>
                  <select className="form-input" value={catId} onChange={e => setCatId(e.target.value)}>
                    <option value="">Select Category...</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <button className="submit-btn" onClick={handleProductSubmit} disabled={loading}>
                {loading ? 'Processing...' : 'Submit to Catalog'}
              </button>
            </div>

            <div className="category-view">
              <div className="category-sorter">
                <button className={`sort-pill ${!selectedCategory ? 'active' : ''}`} onClick={() => setSelectedCategory(null)}>All Catalog</button>
                {categories.map(cat => (
                  <button key={cat._id} className={`sort-pill ${selectedCategory === cat._id ? 'active' : ''}`} onClick={() => setSelectedCategory(cat._id)}>
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td><img src={p.image} className="admin-p-img" alt="" /></td>
                        <td><strong>{p.name}</strong><br /><small style={{ color: '#888' }}>ID: {p._id.slice(-6)}</small></td>
                        <td>₹{p.price}</td>
                        <td style={{ color: '#2563eb', fontWeight: 600 }}>{p.category?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

// import React from 'react';

export default Admin