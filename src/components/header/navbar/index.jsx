import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "../../style.css";
import Logo from "../../assets/arp.png";
import searchIcon from "../../assets/icons/magnifying-glass-solid.svg";
import heartIcon from "../../assets/icons/heart-regular.svg";
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import userIcon from "../../assets/icons/user-regular.svg";
import menuBars from "../../assets/icons/bars-solid.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);
    return () => {
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
    };
  }, []);

  useEffect(() => {
    const loggedEmail = localStorage.getItem('logedAccount');
    if (loggedEmail) {
      setIsLoggedIn(true);
      const initial = loggedEmail.trim().charAt(1).toUpperCase();
      setUserInitial(initial);
    } else {
      setIsLoggedIn(false);
      setUserInitial(null);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen ? true : false);
  };

  const mobileMenu = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      mobileMenu.current.style.display = "flex";
    } else {
      mobileMenu.current.style.display = "none";
    }
  }, [isMenuOpen])
  
  return (
    <nav>
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
      </Link>
      <span className="navPages">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <span className="navIcons" >
        <style>
          {`
            .icon-wrapper { position: relative; display: inline-block; }
            .badge { 
              position: absolute; top: -8px; right: -8px; 
              background: #ec4899; color: white; border-radius: 50%; 
              padding: 2px 6px; font-size: 0.75rem; font-weight: bold; 
            }
          `}
        </style>
        <>
          <Link to="/search"><img src={searchIcon} alt="Search" /></Link>
          <Link to="/wishlist" className="icon-wrapper">
            <img src={heartIcon} alt="Wishlist" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-wrapper">
            <img src={cartIcon} alt="Cart" />
            {cartCount > 0 && <span className="badge" style={{background: '#4f46e5'}}>{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <Link to="/account">
              {userInitial ? (
                <div className="profile-initial-style">
                  {userInitial}
                </div>
              ) : (
                <img src={userIcon} alt="Account Icon" />
              )}
            </Link>
          ) : (
            <Link to="/account" className="signinBtn" style={{ marginLeft: '10px' }}>Sign In</Link>
          )}
        </>
      </span>

      <span className="mobileMenu" ref={mobileMenu}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <img className="menuIcon" src={menuBars} alt="Menu Icon" onClick={toggleMenu} />
    </nav>
  );
}