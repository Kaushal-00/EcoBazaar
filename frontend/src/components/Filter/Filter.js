import React from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import { Badge } from "../ui/badge";

export default function Filter({ value, onChange, onClear, categories = [] }) {
  const category = value?.category ?? "all";
  const price = value?.price ?? 100;
  const carbon = value?.carbon ?? "";
  const sort = value?.sort ?? "default";

  const isFilterChanged =
    category !== "all" || price !== 100 || carbon !== "" || sort !== "default";

  const setCategory = (opt) => onChange?.({ category: opt?.value || "all" });
  const setPrice = (v) => onChange?.({ price: Number(v) });
  const setCarbon = (v) => onChange?.({ carbon: v });
  const setSort = (opt) => onChange?.({ sort: opt?.value || "default" });

  const clearFilters = () => onClear?.();

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb",
      borderColor: state.isFocused ? "#10b981" : "#d1d5db",
      borderRadius: "0.5rem",
      borderWidth: "1px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(16, 185, 129, 0.2)" : "none",
      minHeight: "2.5rem",
      fontSize: "0.875rem",
      ":hover": { borderColor: "#10b981" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#ecfdf5"
        : state.isSelected
        ? "#10b981"
        : "transparent",
      color: state.isSelected ? "#ffffff" : "#374151",
      fontSize: "0.875rem",
      fontWeight: 500,
      cursor: "pointer",
      ":hover": { backgroundColor: "#ecfdf5" },
    }),
    singleValue: (base) => ({ ...base, color: "#374151", fontWeight: 500 }),
    placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  };

  const fillPercentage = Math.max(0, Math.min(100, price));

  // Generate category options from dynamic categories
  const categoryOptions = [
    { value: "all", label: "All categories" },
    ...categories.map(cat => ({
      value: cat.toLowerCase(),
      label: cat
    }))
  ];

  return (
    <div className="sticky top-20 h-fit">
      <div className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h5 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <FaFilter className="text-emerald-600" />
            Filters
          </h5>
          {isFilterChanged && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition"
            >
              <IoMdClose size={16} />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <Select
              value={categoryOptions.find(opt => opt.value === category) || categoryOptions[0]}
              onChange={setCategory}
              styles={customSelectStyles}
              options={categoryOptions}
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price up to: ${price}
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(90deg, #10b981 ${fillPercentage/2}%, #e2e8f0 ${fillPercentage/2}%)`,
                }}
              />
            </div>
          </div>

          {/* Carbon Footprint */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Carbon Footprint
            </label>
            <div className="space-y-2">
              {[
                { value: "low", label: "Low (0–1kg CO₂)", badge: "success" },
                { value: "medium", label: "Medium (1–3kg CO₂)", badge: "warning" },
                { value: "high", label: "High (3kg+ CO₂)", badge: "danger" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  className={`w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg border transition ${
                    carbon === opt.value
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-700 hover:border-emerald-500 hover:ring-1 hover:ring-emerald-400"
                  }`}
                  onClick={() => setCarbon(carbon === opt.value ? "" : opt.value)}
                >
                  <Badge variant={opt.badge}>CO₂</Badge>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sort by
            </label>
            <Select
              value={{
                value: sort,
                label:
                  sort === "default"
                    ? "Default sorting"
                    : sort === "price-low-high"
                    ? "Price: Low → High"
                    : sort === "price-high-low"
                    ? "Price: High → Low"
                    : sort === "carbon-low-high"
                    ? "Carbon: Low → High"
                    : sort === "carbon-high-low"
                    ? "Carbon: High → Low"
                    : "Highest Rated",
              }}
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
    </div>
  );
}
