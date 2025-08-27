import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Filters from "./components/Filter/Filter";


function App() {
  return (
    <>
      {/* Navbar on top */}
      <Navbar />

      {/* Main Layout */}
      <div className="container mt-4">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-md-3">
            <Filters />
          </div>

          {/* Product Section */}
          <div className="col-md-9">
            <h1>Eco-Friendly Products</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
