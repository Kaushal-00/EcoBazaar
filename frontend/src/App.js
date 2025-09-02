// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CustomerDashboard from "./pages/Customer/Customer_Dashboard";
import CartPage from "./pages/Customer/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
