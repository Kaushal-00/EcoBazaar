import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-4">
        <div className="footer-content">
          <nav className="footer-links">
            <a href="/about" className="footer-link">About</a>
            <span className="separator">|</span>
            <a href="/contact" className="footer-link">Contact</a>
            <span className="separator">|</span>
            <a href="/terms" className="footer-link">Terms</a>
            <span className="separator">|</span>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </nav>
          <div className="copyright">
            Copyright © {year} EcoBazaar
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;