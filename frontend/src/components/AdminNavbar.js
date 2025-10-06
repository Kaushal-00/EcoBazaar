// src/components/AdminNavbar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLeaf, FaChartLine, FaUsers, FaShieldAlt, FaUser, FaExclamationTriangle } from "react-icons/fa";

export default function AdminNavbar({ onScrollTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleScroll = (id) => {
    if (typeof onScrollTo === "function") {
      onScrollTo(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow">
            <FaShieldAlt className="text-white text-lg" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-slate-900">EcoBazaar Admin</span>
            <span className="block text-[11px] text-emerald-700/90">Platform Management</span>
          </div>
        </Link>

        {/* Section Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleScroll("admin-overview")}
            className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 inline-flex items-center gap-2"
          >
            <FaChartLine /> Overview
          </button>
          <button
            type="button"
            onClick={() => handleScroll("admin-users")}
            className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 inline-flex items-center gap-2"
          >
            <FaUsers /> Users
          </button>
          <button
            type="button"
            onClick={() => handleScroll("admin-reports")}
            className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 inline-flex items-center gap-2"
          >
            <FaExclamationTriangle /> Reports
          </button>
        </nav>

        {/* Profile Action */}
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/profile")}
            className="h-10 px-3 inline-flex items-center justify-center gap-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            aria-label="Open admin profile"
          >
            <FaUser className="text-lg" />
            <span className="hidden sm:inline text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
