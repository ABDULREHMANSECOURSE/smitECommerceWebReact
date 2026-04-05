import React, { useState, useEffect } from "react";

import electronics from "./assets/category/electronics.webp";
import clothing from "./assets/category/clothing&Apparel.jpg";
import homeAppliances from "./assets/category/homeAppliances.jpg";
import grocery from "./assets/category/grocery.webp";
import toys from "./assets/category/toys&Games.jpg";
import furniture from "./assets/category/furniture.webp";
import mobilePhones from "./assets/category/mobilePhones.jpg";
import books from "./assets/category/books&Media.png";
import sports from "./assets/category/sports&Outdoors.jpeg";
import beauty from "./assets/category/beauty&PersonalCare.jpg";
import accessories from "./assets/category/accessories.webp";

const defaultProducts = [
  { id: 1, name: "iPhone 15 Pro", price: 1199, category: "mobilePhones", image: mobilePhones },
  { id: 2, name: "Nike Air Max", price: 180, category: "clothing&Apparel", image: "https://www.bfgcdn.com/1500_1500_90/024-1543/nike-air-max-alpha-trainer-6-sneakers.jpg" },
  { id: 3, name: "Smart LED TV", price: 799, category: "electronics", image: "https://oktra.pk/wp-content/uploads/2019/04/2-12.png" },
  { id: 4, name: "PlayStation 5", price: 499, category: "toys&Games", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrOcjFU_oubOokcaWfMUoOA5vWekRYfEIpgA&s" },
  { id: 5, name: "Wooden Dining Table", price: 399, category: "furniture", image: "https://homedesign.pk/2299-large_default/paramo-4-person-wooden-dining-table-hd-dtbl-022.jpg" },
  { id: 6, name: "Lipstick Set", price: 45, category: "beauty&PersonalCare", image: "https://img.drz.lazcdn.com/static/pk/p/c796a7800cc202b0477a40706295212f.jpg_720x720q80.jpg" },
];

const categories = [
  { id: "electronics", label: "Electronics", img: electronics },
  { id: "clothing&Apparel", label: "Clothing & Apparel", img: clothing },
  { id: "homeAppliances", label: "Home Appliances", img: homeAppliances },
  { id: "grocery", label: "Grocery", img: grocery },
  { id: "toys&Games", label: "Toys & Games", img: toys },
  { id: "furniture", label: "Furniture", img: furniture },
  { id: "mobilePhones", label: "Mobile Phones", img: mobilePhones },
  { id: "books&Media", label: "Books & Media", img: books },
  { id: "sports&Outdoors", label: "Sports & Outdoors", img: sports },
  { id: "beauty&PersonalCare", label: "Beauty & Personal Care", img: beauty },
  { id: "accessories", label: "Accessories", img: accessories },
];
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    setProducts(saved ? JSON.parse(saved) : defaultProducts);
    
    // Ensure defaultProducts are seeded if empty
    if (!saved) {
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

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

  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingIndex = wishlist.findIndex(item => item.id === product.id);
    if (existingIndex < 0) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <main style={{width:"100%"}}>
      <h2 className="categoryH2">Browse By Category</h2>

      {selectedCategory && (
        <div className="showAll" onClick={() => setSelectedCategory(null)}>
          <h1>Show All</h1>
        </div>
      )}

      <div className="category">
        {categories.map(cat => (
          <span
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              border: selectedCategory === cat.id ? "3px solid #007bff" : "none",
              transform: selectedCategory === cat.id ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s"
            }}
          >
            <img src={cat.img} alt={cat.label} />
            <h2>{cat.label}</h2>
          </span>
        ))}
      </div>

      <div className="products">
        {filteredProducts.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center", width: "100%", fontSize: "1.5rem" }}>
            No products in this category yet!
          </p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="productOverView product" style={{ paddingBottom: '15px' }}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p style={{ marginBottom: '15px' }}>{product.category.replace("&", " & ")}</p>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '8px 15px', background: '#4f46e5', color: '#fff', 
                    border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => addToWishlist(product)}
                  style={{
                    padding: '8px 15px', background: '#ec4899', color: '#fff', 
                    border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  ♥ Wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Shop;