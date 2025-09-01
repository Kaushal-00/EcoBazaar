import React from "react";
import { FaLeaf } from "react-icons/fa";

export default function HomeNavbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow">
            <FaLeaf className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              EcoBazaar
            </h1>
            <span className="text-xs text-emerald-600">
              Carbon Aware Shopping
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: "home", label: "Home" },
            { id: "why", label: "Why Choose Us" },
            { id: "mission", label: "Mission" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium px-4 py-2 rounded-md text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="px-4 py-2 rounded-full text-sm font-semibold border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
          >
            Register Now
          </a>
        </div>
      </div>
    </header>
  );
}
