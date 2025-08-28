import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Filters from "./components/Filter/Filter";
import ProductCard from "./components/ProductCard/ProductCard";
import { mockProducts } from "./data/mockProducts";


function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="container mt-4">
        <div className="row position-relative g-4">
          {/* Filter Column */}
          <div className="col-lg-3 col-md-4">
            <Filters />
          </div>

          {/* Products Column */}
          <div className="col-lg-9 col-md-8">
            <div className="row g-4">
              {mockProducts.map((product) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={product.id}>
                  <ProductCard
                    {...product}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
