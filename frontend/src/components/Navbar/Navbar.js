import React from "react";
import "./Navbar.css";
import { FaLeaf } from "react-icons/fa";
import { RiShoppingBag3Line, RiUserLine, RiSearchLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <header className="custom-header sticky-top">
      <div className="container d-flex align-items-center justify-content-between h-100">
        
        {/* Logo & Brand */}
        <a className="logo-section" href="/">
          <div className="logo-container">
            <FaLeaf className="logo-icon" />
          </div>
          <div>
            <h1 className="brand-title">EcoBazaar</h1>
            <span className="brand-subtitle">Carbon Aware Shopping</span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="d-none d-md-flex nav-links">
          <a className="custom-link" href="/">Home</a>
          <a className="custom-link" href="/products">Products</a>
          <a className="custom-link" href="/cart">Cart</a>
          <a className="custom-link" href="/profile">Profile</a>
        </nav>

        {/* Search Bar */}
        <form className="search-wrapper">
          <div className="search-box">
            <RiSearchLine className="search-icon" />
            <input 
              type="search" 
              placeholder="Search products..." 
              aria-label="Search products"
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="user-actions">
          <a href="/cart" className="position-relative">
            <RiShoppingBag3Line className="action-icon" />
            <span className="cart-badge">3</span>
          </a>
          <a href="/profile">
            <RiUserLine className="action-icon" />
          </a>
        </div>
      </div>
    </header>
  );
}
