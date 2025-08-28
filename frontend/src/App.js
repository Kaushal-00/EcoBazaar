import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Filters from "./components/Filter/Filter";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="container mt-4">
        <div className="row position-relative g-4">
          <div className="col-lg-3 col-md-4">
            <Filters />
          </div>
          <div className="col-lg-9 col-md-8">
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
