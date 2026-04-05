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
    <>
      <style>
        {`
          .cart-page { background: #000; color: #fff; min-height: 100vh; padding: 30px 15px; font-family: 'Segoe UI', sans-serif; }
          .cart-container { max-width: 900px; margin: 0 auto; }
          .cart-header { font-size: 2rem; color: #4f46e5; margin-bottom: 25px; text-align: center; }
          .cart-list { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
          .cart-item { display: flex; align-items: center; background: #1a1a1a; padding: 15px; border-radius: 12px; border: 1px solid #333; gap: 15px; }
          .cart-item img { width: 70px; height: 70px; object-fit: cover; border-radius: 10px; flex-shrink: 0; }
          .cart-item-info { flex: 1; min-width: 0; }
          .cart-item-title { font-size: 1rem; font-weight: bold; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .cart-item-price { color: #aaa; font-size: 0.85rem; }
          .cart-controls { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
          .qty-btn { background: #333; color: white; border: none; width: 28px; height: 28px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
          .qty-btn:hover { background: #555; }
          .cart-remove-btn { background: #ef4444; color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; flex-shrink: 0; }
          .cart-remove-btn:hover { background: #dc2626; }
          .cart-summary { background: #1a1a1a; padding: 25px; border-radius: 12px; border: 1px solid #333; }
          .summary-line { font-size: 1rem; margin-bottom: 12px; display: flex; justify-content: space-between; }
          .summary-total { font-size: 1.4rem; font-weight: bold; color: #4f46e5; margin-bottom: 20px; display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #333; }
          .checkout-btn { background: #4f46e5; color: white; border: none; padding: 14px; border-radius: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer; width: 100%; transition: 0.3s; }
          .checkout-btn:hover { background: #4338ca; }
          .empty-cart { text-align: center; padding: 60px 20px; color: #666; font-size: 1.2rem; }

          @media (max-width: 600px) {
            .cart-item { flex-wrap: wrap; padding: 12px; gap: 10px; }
            .cart-item img { width: 55px; height: 55px; }
            .cart-item-title { font-size: 0.85rem; }
            .cart-item-price { font-size: 0.75rem; }
            .cart-controls { gap: 8px; }
            .qty-btn { width: 24px; height: 24px; font-size: 14px; }
            .cart-remove-btn { padding: 5px 10px; font-size: 11px; }
            .cart-header { font-size: 1.5rem; }
            .summary-line { font-size: 0.9rem; }
            .summary-total { font-size: 1.1rem; }
            .checkout-btn { font-size: 1rem; padding: 12px; }
          }
        `}
      </style>
      
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-header">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              Your cart is empty. Start shopping!
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="cart-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span style={{ fontSize: '1rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="summary-line"><span>Tax (10%)</span><span>${(subtotal * 0.1).toFixed(2)}</span></div>
                <div className="summary-total"><span>Total</span><span>${(subtotal * 1.1).toFixed(2)}</span></div>
                <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
