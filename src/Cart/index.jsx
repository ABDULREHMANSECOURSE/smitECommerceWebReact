import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const saveCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    saveCart(updatedCart);
  };

  const checkout = () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    alert("Checkout successful! Thank you for your purchase.");
    saveCart([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", sans-serif' }}>
      <style>
        {`
          .cart-container { max-width: 1000px; margin: 0 auto; background: #111; padding: 40px; border-radius: 20px; border: 1px solid #333; }
          .cart-header { font-size: 2.5rem; color: #4338ca; margin-bottom: 30px; text-align: center; }
          .cart-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
          .cart-item { display: flex; align-items: center; justify-content: space-between; background: #000; padding: 20px; border-radius: 10px; border: 1px solid #333; flex-wrap: wrap; gap: 20px; }
          .cart-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 10px; }
          .cart-item-info { flex: 1; min-width: 200px; }
          .cart-item-title { font-size: 1.2rem; font-weight: bold; margin-bottom: 5px; }
          .cart-item-price { color: #aaa; }
          .cart-controls { display: flex; align-items: center; gap: 15px; }
          .qty-btn { background: #333; color: white; border: none; width: 30px; height: 30px; border-radius: 5px; font-weight: bold; cursor: pointer; }
          .qty-btn:hover { background: #555; }
          .remove-btn { background: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; }
          .remove-btn:hover { background: #dc2626; }
          .cart-summary { background: #000; padding: 30px; border-radius: 10px; border: 1px solid #333; text-align: right; }
          .summary-line { font-size: 1.2rem; margin-bottom: 15px; }
          .summary-total { font-size: 1.8rem; font-weight: bold; color: #4338ca; margin-bottom: 20px; }
          .checkout-btn { background: #4f46e5; color: white; border: none; padding: 15px 40px; border-radius: 10px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: 0.3s; }
          .checkout-btn:hover { background: #4338ca; transform: translateY(-2px); }
          .empty-cart { text-align: center; padding: 50px; color: #888; font-size: 1.5rem; }
        `}
      </style>
      
      <div className="cart-container">
        <h1 className="cart-header">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            Your cart is currently empty.
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-line">Subtotal: ${subtotal.toFixed(2)}</div>
              <div className="summary-line">Tax (10%): ${(subtotal * 0.1).toFixed(2)}</div>
              <div className="summary-total">Total: ${(subtotal * 1.1).toFixed(2)}</div>
              <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
