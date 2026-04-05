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
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", sans-serif' }}>
      <style>
        {`
          .wishlist-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          .wishlist-header { font-size: 2.5rem; color: #ec4899; margin-bottom: 30px; text-align: center; }
          .wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 30px; }
          .wishlist-card { background: #111; border: 1px solid #333; border-radius: 15px; padding: 20px; text-align: center; transition: 0.3s; }
          .wishlist-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(236, 72, 153, 0.2); border-color: #ec4899; }
          .wishlist-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; }
          .wishlist-title { font-size: 1.2rem; font-weight: bold; margin-bottom: 5px; }
          .wishlist-price { color: #aaa; margin-bottom: 15px; }
          .btn-group { display: flex; flex-direction: column; gap: 10px; }
          .move-btn { background: #4f46e5; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
          .move-btn:hover { background: #4338ca; }
          .remove-btn { background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
          .remove-btn:hover { background: #ef4444; color: white; }
          .empty-msg { text-align: center; font-size: 1.5rem; color: #888; padding: 50px; }
          .shop-link { color: #ec4899; text-decoration: none; font-weight: bold; }
          .shop-link:hover { text-decoration: underline; }
        `}
      </style>
      
      <div className="wishlist-container">
        <h1 className="wishlist-header">Your Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-msg">
            Your wishlist is empty. <br/><br/>
            <Link to="/products" className="shop-link">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div className="wishlist-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="wishlist-title">{item.name}</div>
                <div className="wishlist-price">${item.price}</div>
                <div className="btn-group">
                  <button className="move-btn" onClick={() => moveToCart(item)}>Move to Cart</button>
                  <button className="remove-btn" onClick={() => removeWishlist(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
