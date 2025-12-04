import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Aapke saare imports (assets aur styles)
import "../../style.css";
import Logo from "../../assets/arp.png";
import searchIcon from "../../assets/icons/magnifying-glass-solid.svg";
import heartIcon from "../../assets/icons/heart-regular.svg";
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import userIcon from "../../assets/icons/user-regular.svg";
import menuBars from "../../assets/icons/bars-solid.svg";

export default function Navbar() {
  // 1. useState: Mobile Menu ki state (visibility)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. useState: Login ki state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect ka kaam sirf ek baar data load karna hai.
  // Iska matlab yeh hai ki jab component pehli baar dikhega, tab yeh chalega.
  useEffect(() => {
    // try-catch block zaroori hai "storage access blocked" error se bachne ke liye
    try {
      // localStorage se data nikalna
      const logedAccount = localStorage.getItem('logedAccount'); 
      // Agar logedAccount mein koi data hai, to state ko TRUE kar do.
      if (logedAccount) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      // Agar storage block hai, to default: logged out hi rakhenge.
      console.warn("Storage access failed, defaulting to logged out.");
      setIsLoggedIn(false);
    }
    // [] ka matlab: yeh code sirf component load hone par chalega
  }, []); 

  // Toggle function sirf state ko badlega
  const toggleMenu = () => {
    // useState ki value ko ulta kar do
    setIsMenuOpen(!isMenuOpen);
  };
  
  // State ke base par dynamic class banana
  const mobileMenuClasses = `mobileMenu ${isMenuOpen ? 'open' : ''}`;

  return (
    <nav>
      {/* Logo aur Navigation Links */}
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
      </Link>
      <span className="navPages">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      {/* Conditional Rendering: useState ka istemal */}
      <span className="navIcons" >
        {/* Agar isLoggedIn TRUE hai, toh Icons dikhao */}
        {isLoggedIn ? (
          <> {/* <></> ko Fragment kehte hain, yeh multiple elements ko group karta hai */}
            <Link to="/search"><img src={searchIcon} alt="Search" /></Link>
            <Link to="/wishlist"><img src={heartIcon} alt="Wishlist" /></Link>
            <Link to="/cart"><img src={cartIcon} alt="Cart" /></Link>
            <Link to="/account"><img src={userIcon} alt="Account" /></Link>
          </>
        ) : (
          // Varna (Else), Sign In ka button dikhao
          <Link to="/account" className="signinBtn">Sign In</Link>
        )}
      </span>

      {/* Mobile Menu */}
      <span className={mobileMenuClasses}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <img
        className="menuIcon"
        src={menuBars}
        alt="Menu Icon"
        // Button click hone par state badal rahi hai
        onClick={toggleMenu}
      />
    </nav>
  );
}