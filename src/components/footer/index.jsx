import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ 
            background: '#111', 
            color: '#999', 
            padding: '40px 20px 20px', 
            fontFamily: '"Segoe UI", sans-serif', 
            borderTop: '1px solid #333',
            marginTop: '0'
        }}>
            <div style={{ 
                maxWidth: '1100px', 
                margin: '0 auto', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '30px', 
                justifyContent: 'space-between' 
            }}>
                <div style={{ flex: '1', minWidth: '220px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '15px' }}>SMIT E-Commerce</h3>
                    <p style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>
                        Providing the best tech, fashion, and lifestyle products at unbeatable prices.
                    </p>
                </div>
                
                <div style={{ flex: '1', minWidth: '150px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '1rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><Link to="/products" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Shop</Link></li>
                        <li><Link to="/about" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>About Us</Link></li>
                        <li><Link to="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Contact Us</Link></li>
                        <li><Link to="/account" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>My Account</Link></li>
                    </ul>
                </div>

                <div style={{ flex: '1', minWidth: '220px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '1rem' }}>Stay Connected</h4>
                    <p style={{ fontSize: '0.85rem', marginBottom: '12px' }}>Subscribe to our newsletter for updates.</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="email" 
                            placeholder="Enter email" 
                            style={{ 
                                padding: '10px', 
                                borderRadius: '6px', 
                                border: '1px solid #444', 
                                background: '#222', 
                                color: '#fff', 
                                flex: 1,
                                fontSize: '0.85rem',
                                outline: 'none',
                                minWidth: '0'
                            }} 
                        />
                        <button style={{ 
                            padding: '10px 16px', 
                            borderRadius: '6px', 
                            border: 'none', 
                            background: '#4f46e5', 
                            color: '#fff', 
                            cursor: 'pointer', 
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap'
                        }}>Subscribe</button>
                    </div>
                </div>
            </div>
            
            <div style={{ 
                textAlign: 'center', 
                marginTop: '35px', 
                paddingTop: '15px', 
                borderTop: '1px solid #333', 
                fontSize: '0.8rem',
                color: '#666'
            }}>
                &copy; {new Date().getFullYear()} Abdul Rehman. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;