import React, { useState, useEffect } from 'react';

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
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", sans-serif' }}>
      <style>
        {`
          .search-container { max-width: 1200px; margin: 0 auto; text-align: center; }
          .search-header { font-size: 2.5rem; color: #10b981; margin-bottom: 20px; }
          .search-input { width: 100%; max-width: 600px; padding: 15px 20px; font-size: 1.2rem; background: #111; border: 2px solid #333; border-radius: 50px; color: white; outline: none; transition: 0.3s; margin-bottom: 40px; }
          .search-input:focus { border-color: #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); }
          .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
          .result-card { background: #111; padding: 20px; border-radius: 15px; border: 1px solid #333; transition: 0.3s; }
          .result-card:hover { transform: scale(1.02); border-color: #10b981; }
          .result-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; }
          .result-title { font-size: 1.3rem; font-weight: bold; margin-bottom: 10px; }
          .result-price { color: #10b981; font-weight: bold; font-size: 1.2rem; margin-bottom: 5px; }
          .result-cat { color: #888; margin-bottom: 15px; font-size: 0.9rem; }
          .add-btn { width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
          .add-btn:hover { background: #4338ca; }
          .no-results { font-size: 1.5rem; color: #888; margin-top: 50px; }
        `}
      </style>
      
      <div className="search-container">
        <h1 className="search-header">Search Products</h1>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by name or category..." 
          value={searchTerm}
          onChange={handleSearch}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="no-results">No products found matching "{searchTerm}"</div>
        ) : (
          <div className="results-grid">
            {filteredProducts.map(product => (
              <div className="result-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="result-title">{product.name}</div>
                <div className="result-price">${product.price}</div>
                <div className="result-cat">{product.category.replace("&", " & ")}</div>
                <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
