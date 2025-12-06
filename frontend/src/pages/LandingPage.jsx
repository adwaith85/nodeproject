import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Shop Smarter, Live Better</h1>
                <p className="hero-subtitle">
                    Discover a world of premium products at your fingertips.
                    Experience seamless shopping with unbeatable deals and lightning-fast delivery.
                </p>
                <Link to="/login" className="cta-button">Start Shopping Now</Link>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="21" r="1" fill="currentColor" />
                        <circle cx="20" cy="21" r="1" fill="currentColor" />
                    </svg>
                    <h3 className="feature-title">Wide Selection</h3>
                    <p className="feature-desc">Browse through thousands of items across multiple categories. From electronics to fashion, we have it all.</p>
                </div>

                <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="feature-title">Premium Quality</h3>
                    <p className="feature-desc">We partner with top brands to ensure you get only the best quality products that last.</p>
                </div>

                <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="3" width="22" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <h3 className="feature-title">Secure Payments</h3>
                    <p className="feature-desc">Shop with confidence using our encrypted payment gateways. Your security is our top priority.</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="content-section">
                <div className="content-text">
                    <h2>Why Choose Us?</h2>
                    <p>
                        We believe that shopping should be an enjoyable experience, not a chore.
                        That's why we've built a platform that is intuitive, fast, and reliable.
                    </p>
                    <p>
                        Our dedicated support team is available 24/7 to assist you with any queries.
                        Join our community of happy shoppers today and experience the difference!
                    </p>
                </div>
                <div className="content-image">
                    {/* Placeholder for an image or illustration */}
                    <div className="placeholder-image">
                        <span>Shopping Experience Illustration</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
