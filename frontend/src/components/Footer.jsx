import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>ShopCart</h3>
                    <p>Your one-stop destination for all your shopping needs. Quality products, best prices, and fast delivery.</p>
                    <div className="social-links">
                        <a href="#" className="social-icon">f</a>
                        <a href="#" className="social-icon">t</a>
                        <a href="#" className="social-icon">in</a>
                        <a href="#" className="social-icon">ig</a>
                    </div>
                </div>

                {/* <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/cart">My Cart</Link></li>
                        <li><Link to="/order">Orders</Link></li>
                    </ul>
                </div> */}

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul className="footer-links">
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <ul className="footer-links">
                        <li>📍 123 Shopping Street, NY</li>
                        <li>📞 +1 234 567 8900</li>
                        <li>✉️ support@shopcart.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ShopCart. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
