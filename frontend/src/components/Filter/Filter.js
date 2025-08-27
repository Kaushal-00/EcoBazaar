import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./Filter.css"; 

function Filter() {
  // States for each filter option
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);
  const [carbon, setCarbon] = useState("");
  const [sort, setSort] = useState("default");

  // Default values for reset
  const defaultState = {
    category: "all",
    price: 100,
    carbon: "",
    sort: "default",
  };

  // Check if any filter is changed from default
  const isFilterChanged =
    category !== defaultState.category ||
    price !== defaultState.price ||
    carbon !== defaultState.carbon ||
    sort !== defaultState.sort;

  // Clear all filters
  const clearFilters = () => {
    setCategory(defaultState.category);
    setPrice(defaultState.price);
    setCarbon(defaultState.carbon);
    setSort(defaultState.sort);
  };

  return (
    <div className="card shadow-sm filter-card">
      {/* Header */}
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0 pb-2">
        <h5 className="d-flex align-items-center gap-2 mb-0">
          <FaFilter size={20} /> Filters
        </h5>
        {isFilterChanged && (
          <button
            onClick={clearFilters}
            className="btn btn-sm btn-light d-flex align-items-center gap-1 clear-btn"
          >
            <IoMdClose size={16} /> Clear
          </button>
        )}
      </div>

      {/* Body */}
      <div className="card-body pt-0">
        {/* Category */}
        <div className="mb-4">
          <label className="form-label fw-medium text-muted">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="personal-care">Personal Care</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="fitness">Fitness</option>
            <option value="home-garden">Home & Garden</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <label className="form-label fw-medium text-muted">
            Price Range: $0 – ${price}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="form-range custom-range"
          />
        </div>

        {/* Carbon Footprint */}
        <div className="mb-4">
          <label className="form-label fw-medium text-muted">
            Carbon Footprint
          </label>
          <div className="d-grid gap-2">
            <button
              className={`btn btn-outline-secondary d-flex align-items-center ${
                carbon === "low" ? "active-carbon" : ""
              }`}
              onClick={() => setCarbon("low")}
            >
              <span className="badge bg-success me-2">CO₂</span>
              Low (0–1kg CO₂)
            </button>
            <button
              className={`btn btn-outline-secondary d-flex align-items-center ${
                carbon === "medium" ? "active-carbon" : ""
              }`}
              onClick={() => setCarbon("medium")}
            >
              <span className="badge bg-warning text-white me-2">CO₂</span>
              Medium (1–3kg CO₂)
            </button>
            <button
              className={`btn btn-outline-secondary d-flex align-items-center ${
                carbon === "high" ? "active-carbon" : ""
              }`}
              onClick={() => setCarbon("high")}
            >
              <span className="badge bg-danger me-2">CO₂</span>
              High (3kg+ CO₂)
            </button>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="form-label fw-medium text-muted">Sort by</label>
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default sorting</option>
            <option value="price-low-high">Price: Low → High</option>
            <option value="price-high-low">Price: High → Low</option>
            <option value="carbon-low-high">Carbon: Low → High</option>
            <option value="carbon-high-low">Carbon: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
