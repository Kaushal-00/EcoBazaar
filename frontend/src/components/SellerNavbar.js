// src/components/SellerNavbar.jsx
import React from "react";
import { FaLeaf, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SellerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: Clear auth state here
    navigate("/login");
  };

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
              placeholder="Search your products..."
              aria-label="Search products"
              className="w-full pl-10 pr-3 bg-transparent outline-none text-sm"
            />
          </div>
        </form>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}