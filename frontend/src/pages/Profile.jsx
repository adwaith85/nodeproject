import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';
import Navbar from '../components/Navbar';
import AuthStore from '../AuthStore';

function Profile() {
    const [user, setUser] = useState({});
    const [orderCount, setOrderCount] = useState(0);
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        number: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // const getToken = () => {
    const { token } = AuthStore()

    const getData = async () => {
        // const token = getToken();
        // if (!token) return;

        try {
            const userRes = await fetch("http://localhost:8000/getUser", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Content-Type not required for GET
                },
            });
            // console.log(userRes)
            const userData = await userRes.json();
            setUser(userData);
            setFormData({
                name: userData.name || '',
                number: userData.number || ''
            });

            const orderRes = await fetch("http://localhost:8000/order/count", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const orderData = await orderRes.json();
            console.log(orderData)
            setOrderCount(orderData.count || 0);

        } catch (err) {
            console.error(err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveImage = async () => {
        if (!selectedImage) return;

        // const token = AuthStore();
        const data = new FormData();
        data.append('profileImage', selectedImage);
        if (user.name) data.append('name', user.name);
        if (user.number) data.append('number', user.number);

        try {
            const res = await fetch("http://localhost:8000/updateUser", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: data
            });

            const contentType = res.headers.get("content-type");
            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
                setSelectedImage(null);
                setImagePreview(null);
                alert("Profile image updated!");
            } else {
                let errorMessage = res.statusText;
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await res.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                    console.error("Update image failed:", errorData);
                } else {
                    const errorText = await res.text();
                    console.error("Update image failed (non-JSON):", errorText);
                }
                alert(`Failed to update image: ${errorMessage}`);
            }
        } catch (err) {
            console.error("Update image error:", err);
            alert("Error updating image. Check console for details.");
        }
    };

    const handleSaveDetails = async () => {
        // const token = AuthStore();
        if (!token) return;

        const data = new FormData();
        data.append('name', formData.name);
        data.append('number', formData.number);

        try {
            const res = await fetch("http://localhost:8000/updateUser", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: data
            });

            const contentType = res.headers.get("content-type");
            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
                setIsEditingDetails(false);
                alert("Profile details updated!");
            } else {
                let errorMessage = res.statusText;
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await res.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                    console.error("Update details failed:", errorData);
                } else {
                    const errorText = await res.text();
                    console.error("Update details failed (non-JSON):", errorText);
                }
                alert(`Failed to update details: ${errorMessage}`);
            }
        } catch (err) {
            console.error("Update details error:", err);
            alert("Error updating details.");
        }
    };
    console.log(user.profileImage)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">

                    {/* Image Section */}
                    <div className="profile-header">
                        <div className="image-wrapper">
                            <img
                                src={imagePreview || user?.profileImage || "https://placehold.co/150"}
                                alt="Profile"
                                className="profile-image"
                            />
                            <div className="image-overlay" onClick={() => fileInputRef.current.click()}>
                                <span>Change</span>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>
                        {selectedImage && (
                            <div className="image-actions">
                                <button className="btn-confirm-img" onClick={handleSaveImage}>Upload New Photo</button>
                                <button className="btn-cancel-img" onClick={() => {
                                    setSelectedImage(null);
                                    setImagePreview(null);
                                }}>Cancel</button>
                            </div>
                        )}
                        <h2>{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>

                    <div className="profile-main-content">
                        {/* Details Section */}
                        <div className="details-header">
                            <h3>Personal Details</h3>
                            {!isEditingDetails && (
                                <button className="btn-edit-details" onClick={() => setIsEditingDetails(true)}>
                                    Edit Details
                                </button>
                            )}
                        </div>

                        <div className="profile-details">
                            <div className="detail-item">
                                <label>Full Name</label>
                                {isEditingDetails ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="detail-value">{user.name}</span>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>Phone Number</label>
                                {isEditingDetails ? (
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="detail-value">{user.number}</span>
                                )}
                            </div>

                            <div className="detail-item non-editable">
                                <label>Email</label>
                                <span className="detail-value locked">{user.email}</span>
                            </div>
                        </div>

                        {isEditingDetails && (
                            <div className="edit-actions">
                                <button className="btn-save" onClick={handleSaveDetails}>Save Changes</button>
                                <button className="btn-cancel" onClick={() => setIsEditingDetails(false)}>Cancel</button>
                            </div>
                        )}

                        <div className="stats-section">
                            <div className="stat-card">
                                <h4>Total Orders</h4>
                                <span className="stat-value">{orderCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;