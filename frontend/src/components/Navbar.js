// src/components/Navbar.js
import React, { useContext } from "react";
import { FaShoppingCart, FaUser, FaLeaf, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine user role based on current path
  const getRoleFromPath = () => {
    if (location.pathname.startsWith("/customer")) return "customer";
    if (location.pathname.startsWith("/seller")) return "seller";
    if (location.pathname.startsWith("/admin")) return "admin";
    return "customer"; // default
  };

  const role = getRoleFromPath();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-300">
      <div className="container mx-auto flex items-center justify-between h-16 gap-4 px-4">
        {/* Logo & Brand */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center">
            <FaLeaf className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-green-800 font-bold text-lg">EcoBazaar</h1>
            <span className="text-green-600 text-xs">Carbon Aware Shopping</span>
          </div>
        </a>

        {/* Search Bar */}
        <form className="flex-1 max-w-md mx-4">
          <div className="relative flex items-center border border-green-700 rounded-lg bg-white/95 h-10">
            <FaSearch className="absolute left-3 w-4 h-4 text-green-700" />
            <input
              type="search"
              placeholder="Search eco-friendly products..."
              aria-label="Search eco-friendly products"
              className="w-full pl-10 pr-3 bg-transparent outline-none text-sm"
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          {role === "customer" && (
            <button
              onClick={() => navigate("/customer/cart")}
              className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-green-700 transition"
            >
              <FaShoppingCart className="w-5 h-5 text-gray-800 hover:text-white transition" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          )}

          {/* Profile Button */}
          <button
            onClick={() => navigate(`/${role}/profile`)}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-green-700 transition"
          >
            <FaUser className="w-5 h-5 text-gray-800 hover:text-white transition" />
          </button>
        </div>
      </div>
    </header>
  );
}
