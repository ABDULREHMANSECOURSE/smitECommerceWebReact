import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../style.css";
import Logo from "../../assets/arp.png";
import searchIcon from "../../assets/icons/magnifying-glass-solid.svg";
import heartIcon from "../../assets/icons/heart-regular.svg";
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import userIcon from "../../assets/icons/user-regular.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navRef = useRef(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  // Close menu when clicking outside nav
  const handleClickOutside = useCallback((e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav ref={navRef}>
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={Logo} alt="logo" />
      </Link>

      <span className="navPages">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <span className="navIcons">
        <Link to="/search" onClick={closeMenu}><img src={searchIcon} alt="Search" /></Link>
        <Link to="/wishlist" className="icon-wrapper" onClick={closeMenu}>
          <img src={heartIcon} alt="Wishlist" />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>
        <Link to="/cart" className="icon-wrapper" onClick={closeMenu}>
          <img src={cartIcon} alt="Cart" />
          {cartCount > 0 && <span className="badge" style={{background: '#4f46e5'}}>{cartCount}</span>}
        </Link>

        {isLoggedIn ? (
          <Link to="/account" onClick={closeMenu}>
            {userInitial ? (
              <div className="profile-initial-style">
                {userInitial}
              </div>
            ) : (
              <img src={userIcon} alt="Account Icon" />
            )}
          </Link>
        ) : (
          <Link to="/account" className="signinBtn" onClick={closeMenu}>Sign In</Link>
        )}
      </span>

      {/* Hamburger / Close icon */}
      <div className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && <div className="menuOverlay" onClick={closeMenu}></div>}

      {/* Mobile menu */}
      <div className={`mobileMenu ${isMenuOpen ? 'mobileMenuOpen' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/products" onClick={closeMenu}>Products</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/cart" onClick={closeMenu}>Cart</Link>
        <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
      </div>
    </nav>
  );
}