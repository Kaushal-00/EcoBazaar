// src/components/Footer/Footer.js
import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-emerald-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col items-center gap-4">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a 
              href="/about" 
              className="text-sm font-medium text-emerald-100 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <span className="text-emerald-300 text-sm hidden sm:inline">|</span>
            <a 
              href="/contact" 
              className="text-sm font-medium text-emerald-100 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <span className="text-emerald-300 text-sm hidden sm:inline">|</span>
            <a 
              href="/terms" 
              className="text-sm font-medium text-emerald-100 hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
            <span className="text-emerald-300 text-sm hidden sm:inline">|</span>
            <a 
              href="/privacy" 
              className="text-sm font-medium text-emerald-100 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-emerald-200 text-center">
            © {year} EcoBazaar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
