import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const products = JSON.parse(saved);
      const found = products.find(p => String(p.id) === String(id));
      setProduct(found || null);
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} (x${quantity}) added to cart!`);
  };

  const addToWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.findIndex(item => item.id === product.id);
    if (exists < 0) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (!product) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <h2 style={{ color: '#888' }}>Product not found</h2>
        <Link to="/products" style={{ color: '#4f46e5', fontSize: '1.1rem' }}>← Back to Products</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .pd-page { background: #000; color: #fff; min-height: 100vh; padding: 30px 15px; font-family: 'Segoe UI', sans-serif; }
        .pd-container { max-width: 1000px; margin: 0 auto; }
        .pd-back { color: #888; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 25px; transition: color 0.2s; }
        .pd-back:hover { color: #4f46e5; }
        .pd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .pd-img-wrap { background: #1a1a1a; border-radius: 16px; border: 1px solid #333; overflow: hidden; }
        .pd-img { width: 100%; height: 400px; object-fit: cover; display: block; }
        .pd-info { display: flex; flex-direction: column; gap: 15px; }
        .pd-cat { color: #4f46e5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
        .pd-name { font-size: 2rem; font-weight: 800; line-height: 1.2; color: #fff; }
        .pd-price { font-size: 1.8rem; font-weight: 700; color: #10b981; }
        .pd-desc { color: #999; line-height: 1.7; font-size: 0.95rem; }
        .pd-divider { border: none; border-top: 1px solid #333; margin: 5px 0; }
        .pd-qty-wrap { display: flex; align-items: center; gap: 15px; }
        .pd-qty-label { color: #aaa; font-size: 0.9rem; }
        .pd-qty-controls { display: flex; align-items: center; gap: 0; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
        .pd-qty-btn { background: #1a1a1a; color: #fff; border: none; width: 36px; height: 36px; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .pd-qty-btn:hover { background: #333; }
        .pd-qty-val { width: 50px; text-align: center; font-size: 1rem; font-weight: bold; background: #111; color: #fff; border: none; border-left: 1px solid #333; border-right: 1px solid #333; height: 36px; }
        .pd-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 5px; }
        .pd-btn { padding: 14px 28px; border: none; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; flex: 1; min-width: 140px; text-align: center; }
        .pd-btn-cart { background: #4f46e5; color: #fff; }
        .pd-btn-cart:hover { background: #4338ca; transform: translateY(-2px); }
        .pd-btn-buy { background: #10b981; color: #fff; }
        .pd-btn-buy:hover { background: #059669; transform: translateY(-2px); }
        .pd-btn-wish { background: transparent; color: #ec4899; border: 1px solid #ec4899; }
        .pd-btn-wish:hover { background: #ec4899; color: #fff; }
        .pd-features { margin-top: 15px; }
        .pd-features h3 { font-size: 1.1rem; margin-bottom: 12px; color: #fff; }
        .pd-features ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .pd-features li { color: #aaa; font-size: 0.9rem; padding-left: 20px; position: relative; }
        .pd-features li::before { content: '✓'; position: absolute; left: 0; color: #10b981; font-weight: bold; }

        @media (max-width: 700px) {
          .pd-grid { grid-template-columns: 1fr; gap: 20px; }
          .pd-img { height: 280px; }
          .pd-name { font-size: 1.5rem; }
          .pd-price { font-size: 1.4rem; }
          .pd-btn { padding: 12px 20px; font-size: 0.9rem; min-width: 100px; }
        }
      `}</style>

      <div className="pd-page">
        <div className="pd-container">
          <Link to="/products" className="pd-back">← Back to Products</Link>

          <div className="pd-grid">
            <div className="pd-img-wrap">
              <img src={product.image} alt={product.name} className="pd-img" />
            </div>

            <div className="pd-info">
              <span className="pd-cat">{product.category.replace("&", " & ")}</span>
              <h1 className="pd-name">{product.name}</h1>
              <div className="pd-price">${product.price}</div>
              <p className="pd-desc">
                Experience premium quality with our {product.name}. Built with the finest materials and designed for modern lifestyles. This product from our {product.category.replace("&", " & ")} collection offers exceptional value and performance.
              </p>

              <hr className="pd-divider" />

              <div className="pd-qty-wrap">
                <span className="pd-qty-label">Quantity:</span>
                <div className="pd-qty-controls">
                  <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <input className="pd-qty-val" type="text" value={quantity} readOnly />
                  <button className="pd-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>

              <div className="pd-actions">
                <button className="pd-btn pd-btn-cart" onClick={addToCart}>Add to Cart</button>
                <button className="pd-btn pd-btn-buy" onClick={buyNow}>Buy Now</button>
              </div>
              <button className="pd-btn pd-btn-wish" onClick={addToWishlist} style={{ width: '100%' }}>♥ Add to Wishlist</button>

              <div className="pd-features">
                <h3>Product Highlights</h3>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Free shipping on orders over $50</li>
                  <li>30-day return policy</li>
                  <li>1 year warranty included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
