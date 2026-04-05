import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProducts(parsed);
      setFilteredProducts(parsed);
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <style>
        {`
          .srch-page { background: #000; color: #fff; min-height: 100vh; padding: 30px 15px; font-family: 'Segoe UI', sans-serif; }
          .srch-container { max-width: 1100px; margin: 0 auto; text-align: center; }
          .srch-header { font-size: 2rem; color: #10b981; margin-bottom: 20px; }
          .srch-input { width: 100%; max-width: 500px; padding: 14px 20px; font-size: 1rem; background: #1a1a1a; border: 2px solid #333; border-radius: 50px; color: white; outline: none; transition: 0.3s; margin-bottom: 30px; }
          .srch-input:focus { border-color: #10b981; box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
          .srch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left; }
          .srch-card { background: #1a1a1a; padding: 15px; border-radius: 12px; border: 1px solid #333; transition: 0.3s; }
          .srch-card:hover { border-color: #10b981; transform: translateY(-3px); }
          .srch-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 12px; }
          .srch-title { font-size: 1rem; font-weight: bold; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .srch-price { color: #10b981; font-weight: bold; font-size: 1rem; margin-bottom: 4px; }
          .srch-cat { color: #666; margin-bottom: 12px; font-size: 0.8rem; }
          .srch-add-btn { width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; }
          .srch-add-btn:hover { background: #4338ca; }
          .srch-no { font-size: 1.2rem; color: #666; margin-top: 40px; }

          @media (max-width: 700px) {
            .srch-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .srch-card img { height: 130px; }
            .srch-title { font-size: 0.85rem; }
            .srch-price { font-size: 0.85rem; }
            .srch-header { font-size: 1.5rem; }
            .srch-input { font-size: 0.9rem; padding: 12px 16px; }
          }
        `}
      </style>
      
      <div className="srch-page">
        <div className="srch-container">
          <h1 className="srch-header">Search Products</h1>
          <input 
            type="text" 
            className="srch-input" 
            placeholder="Search by name or category..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          
          {filteredProducts.length === 0 ? (
            <div className="srch-no">No products found matching "{searchTerm}"</div>
          ) : (
            <div className="srch-grid">
              {filteredProducts.map(product => (
                <div className="srch-card" key={product.id}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <img src={product.image} alt={product.name} />
                    <div className="srch-title">{product.name}</div>
                  </Link>
                  <div className="srch-price">${product.price}</div>
                  <div className="srch-cat">{product.category.replace("&", " & ")}</div>
                  <button className="srch-add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
