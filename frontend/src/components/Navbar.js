// src/components/Navbar.js
import React, { useContext, useMemo, useState } from "react";
import { FaShoppingCart, FaUser, FaLeaf, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const role = useMemo(() => {
    if (location.pathname.startsWith("/seller")) return "seller";
    if (location.pathname.startsWith("/admin")) return "admin";
    return "customer";
  }, [location.pathname]);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [cartItems]
  );

  const isActive = (path) => location.pathname.startsWith(path);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) onSearch(trimmed);
    else if (trimmed) navigate(`/customer/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow-sm ring-1 ring-emerald-600/20">
            <FaLeaf className="text-white text-lg" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-slate-900">EcoBazaar</span>
            <span className="block text-[11px] text-emerald-700/90">Carbon Aware Shopping</span>
          </div>
        </Link>

        {/* Primary nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          <Link
            to={`/${role}`}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive(`/${role}`) ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
            } focus:outline-none focus:ring-2 focus:ring-emerald-500/30`}
          >
            Dashboard
          </Link>
          {role === "seller" && (
            <Link
              to="/seller/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/seller/products") ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/30`}
            >
              Products
            </Link>
          )}
          {role === "admin" && (
            <Link
              to="/admin/users"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/admin/users") ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/30`}
            >
              Users
            </Link>
          )}
        </nav>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search eco-friendly products..."
              aria-label="Search eco-friendly products"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white/90 text-sm text-slate-700 placeholder-slate-500 transition focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400 hover:border-emerald-500 hover:ring-1 hover:ring-emerald-300"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {role === "customer" && (
            <button
              onClick={() => navigate("/customer/cart")}
              className="relative h-10 w-10 inline-flex items-center justify-center rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              aria-label="Open cart"
            >
              <FaShoppingCart className="text-lg" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] leading-5 flex items-center justify-center font-semibold shadow-sm" aria-label={`${cartCount} items in cart`}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => navigate(`/${role}/profile`)}
            className="h-10 px-3 inline-flex items-center justify-center gap-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            aria-label="Open profile"
          >
            <FaUser className="text-lg" aria-hidden="true" />
            <span className="hidden sm:inline text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
