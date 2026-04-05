import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ background: '#111', color: '#ccc', padding: '50px 20px', fontFamily: '"Inter", sans-serif', borderTop: '1px solid #333' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>SMIT E-Commerce</h3>
                    <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
                        Providing the best tech, fashion, and lifestyle products at unbeatable prices. Experience seamless shopping with our modern platform.
                    </p>
                </div>
                
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li><Link to="/products" style={{ color: '#aaa', textDecoration: 'none' }}>Shop</Link></li>
                        <li><Link to="/about" style={{ color: '#aaa', textDecoration: 'none' }}>About Us</Link></li>
                        <li><Link to="/contact" style={{ color: '#aaa', textDecoration: 'none' }}>Contact Us</Link></li>
                        <li><Link to="/account" style={{ color: '#aaa', textDecoration: 'none' }}>My Account</Link></li>
                    </ul>
                </div>

                <div style={{ flex: '1', minWidth: '250px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Stay Connected</h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Subscribe to our newsletter for the latest updates.</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="email" placeholder="Enter your email" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff', flex: 1 }} />
                        <button style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#4f46e5', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Subscribe</button>
                    </div>
                </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #333', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Abdul Rehman. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;