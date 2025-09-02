// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Customer
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CartPage from "./pages/Customer/CartPage";
import CustomerProfile from "./pages/Customer/CustomerProfile";

// Seller
import SellerDashboard from "./pages/Seller/SellerDashboard";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />

          {/* Seller */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch All */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
