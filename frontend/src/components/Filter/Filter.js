import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import "./Filter.css";

function Filter() {
  const [category, setCategory] = useState({ value: "all", label: "All categories" });
  const [price, setPrice] = useState(100);
  const [carbon, setCarbon] = useState("");
  const [sort, setSort] = useState({ value: "default", label: "Default sorting" });

  const defaultState = {
    category: { value: "all", label: "All categories" },
    price: 100,
    carbon: "",
    sort: { value: "default", label: "Default sorting" },
  };

  const isFilterChanged =
    category.value !== defaultState.category.value ||
    price !== defaultState.price ||
    carbon !== defaultState.carbon ||
    sort.value !== defaultState.sort.value;

  const clearFilters = () => {
    setCategory(defaultState.category);
    setPrice(defaultState.price);
    setCarbon(defaultState.carbon);
    setSort(defaultState.sort);
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "10px",
      borderColor: "#10b981",
      backgroundColor: "#ecfdf5",
      minHeight: "40px",
      fontSize: "15px",
      color: "#064e3b",
      boxShadow: "none",
      ":hover": { borderColor: "#047857" },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      backgroundColor: "#f0fdf4",
      boxShadow: "0 6px 18px rgba(16,185,129,0.15)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#dbeafe" : "#f0fdf4",
      color: "#064e3b",
      fontSize: "15px",
      fontWeight: 500,
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#064e3b",
      fontWeight: 500,
    }),
  };

  // compute percent (0-100). input range is 0..100 so price === percent
  const percent = Math.max(0, Math.min(100, Math.round(price)));

  return (
    <div className="card shadow-sm filter-card">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0 pb-2">
        <h5 className="d-flex align-items-center gap-2 mb-0">
          <FaFilter size={20} /> Filters
        </h5>
        {isFilterChanged && (
          <button onClick={clearFilters} className="btn btn-sm btn-light d-flex align-items-center gap-1 clear-btn">
            <IoMdClose size={16} /> Clear
          </button>
        )}
      </div>

      <div className="card-body pt-0">
        <div className="mb-4">
          <label className="form-label fw-medium text-muted">Category</label>
          <Select
            value={category}
            onChange={setCategory}
            styles={customSelectStyles}
            options={[
              { value: "all", label: "All categories" },
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
              { value: "personal-care", label: "Personal Care" },
              { value: "lifestyle", label: "Lifestyle" },
              { value: "fitness", label: "Fitness" },
              { value: "home-garden", label: "Home & Garden" },
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-medium text-muted">Price Range: $0 – ${price}</label>

          {/* key change: set dynamic background so left = green (filled) and right = grey */}
          <input
            type="range"
            min="0"
            max="100"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="form-range custom-range"
            style={{
              background: `linear-gradient(90deg, #10b981 ${percent}%, #e5e7eb ${percent}%)`
            }}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-medium text-muted">Carbon Footprint</label>
          <div className="d-grid gap-2">
            {[
              { value: "low", label: "Low (0–1kg CO₂)", badge: "success" },
              { value: "medium", label: "Medium (1–3kg CO₂)", badge: "warning" },
              { value: "high", label: "High (3kg+ CO₂)", badge: "danger" },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`btn btn-outline-secondary d-flex align-items-center carbon-btn ${carbon === opt.value ? "active-carbon" : ""}`}
                onClick={() => setCarbon(opt.value)}
              >
                <span className={`badge bg-${opt.badge} me-2 co2-badge`}>CO₂</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="form-label fw-medium text-muted">Sort by</label>
          <Select
            value={sort}
            onChange={setSort}
            styles={customSelectStyles}
            options={[
              { value: "default", label: "Default sorting" },
              { value: "price-low-high", label: "Price: Low → High" },
              { value: "price-high-low", label: "Price: High → Low" },
              { value: "carbon-low-high", label: "Carbon: Low → High" },
              { value: "carbon-high-low", label: "Carbon: High → Low" },
              { value: "rating", label: "Highest Rated" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
