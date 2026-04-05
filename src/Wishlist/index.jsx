import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(storedWishlist);
  }, []);

  const saveWishlist = (newWishlist) => {
    setWishlistItems(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    saveWishlist(updated);
  };

  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    removeWishlist(product.id);
    alert(`${product.name} moved to cart!`);
  };

  return (
    <>
      <style>
        {`
          .wl-page { background: #000; color: #fff; min-height: 100vh; padding: 30px 15px; font-family: 'Segoe UI', sans-serif; }
          .wl-container { max-width: 1100px; margin: 0 auto; }
          .wl-header { font-size: 2rem; color: #ec4899; margin-bottom: 25px; text-align: center; }
          .wl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .wl-card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 15px; text-align: center; transition: 0.3s; }
          .wl-card:hover { border-color: #ec4899; transform: translateY(-3px); }
          .wl-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 12px; }
          .wl-title { font-size: 1rem; font-weight: bold; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .wl-price { color: #aaa; margin-bottom: 12px; font-size: 0.9rem; }
          .wl-btn-group { display: flex; flex-direction: column; gap: 8px; }
          .wl-move-btn { background: #4f46e5; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; }
          .wl-move-btn:hover { background: #4338ca; }
          .wl-rm-btn { background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; }
          .wl-rm-btn:hover { background: #ef4444; color: white; }
          .wl-empty { text-align: center; font-size: 1.2rem; color: #666; padding: 60px 20px; }
          .wl-shop-link { color: #ec4899; text-decoration: none; font-weight: bold; }
          .wl-shop-link:hover { text-decoration: underline; }

          @media (max-width: 700px) {
            .wl-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .wl-card img { height: 130px; }
            .wl-title { font-size: 0.85rem; }
            .wl-price { font-size: 0.8rem; }
            .wl-move-btn, .wl-rm-btn { font-size: 11px; padding: 7px; }
            .wl-header { font-size: 1.5rem; }
          }
        `}
      </style>
      
      <div className="wl-page">
        <div className="wl-container">
          <h1 className="wl-header">Your Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="wl-empty">
              Your wishlist is empty.<br/><br/>
              <Link to="/products" className="wl-shop-link">Browse Products</Link>
            </div>
          ) : (
            <div className="wl-grid">
              {wishlistItems.map(item => (
                <div className="wl-card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="wl-title">{item.name}</div>
                  <div className="wl-price">${item.price}</div>
                  <div className="wl-btn-group">
                    <button className="wl-move-btn" onClick={() => moveToCart(item)}>Move to Cart</button>
                    <button className="wl-rm-btn" onClick={() => removeWishlist(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
