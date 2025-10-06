import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Filter from "../../components/Filter/Filter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import { productService, categoryService } from "../../services/authService";
import { FaLeaf } from "react-icons/fa";

export default function CustomerDashboard() {
  // State management
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    price: 100,
    carbon: "",
    sort: "default",
  });

  // Fetch all products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Starting product fetch...");
      
      const data = await productService.getAllProducts({
        page: 0,
        size: 100,
        sortBy: "createdAt",
        sortDir: "desc"
      });
      
      console.log("Products fetched successfully:", data);
      console.log("Number of products:", data.products?.length || 0);
      
      setAllProducts(data.products || []);
      setProducts(data.products || []);
      
      if (!data.products || data.products.length === 0) {
        setError("No products found in database.");
      }
    } catch (err) {
      console.error("Error in fetchProducts:", err);
      setError(err.error || "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const cats = await categoryService.getAllCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    console.log("Component mounted, fetching data...");
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Search handler
  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery.trim());
  }, []);

  // Filter change handler
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({ 
      category: "all", 
      price: 100, 
      carbon: "", 
      sort: "default" 
    });
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply search query
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.seller?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.price < 200) {
      filtered = filtered.filter(product =>
        Number(product.price || 0) <= Number(filters.price)
      );
    }

    // Apply carbon filter
    if (filters.carbon) {
      filtered = filtered.filter(product => {
        const carbon = Number(product.carbonFootprint || 0);
        switch (filters.carbon) {
          case "low": return carbon <= 1;
          case "medium": return carbon > 1 && carbon <= 3;
          case "high": return carbon > 3;
          default: return true;
        }
      });
    }

    // Apply sorting
    switch (filters.sort) {
      case "price-low-high":
        filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case "price-high-low":
        filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case "carbon-low-high":
        filtered.sort((a, b) => Number(a.carbonFootprint || 0) - Number(b.carbonFootprint || 0));
        break;
      case "carbon-high-low":
        filtered.sort((a, b) => Number(b.carbonFootprint || 0) - Number(a.carbonFootprint || 0));
        break;
      case "rating":
        filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [allProducts, query, filters]);

  // Update products when filters change
  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className="app-wrapper bg-slate-50 min-h-screen">
      <Navbar onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              EcoBazaar Marketplace
            </h1>
            <p className="text-lg text-slate-600 flex items-center justify-center gap-2">
              <FaLeaf className="text-emerald-500" />
              Discover sustainable products for conscious living
            </p>
            {query && (
              <p className="mt-2 text-sm text-slate-600">
                Showing results for: <span className="font-semibold">"{query}"</span>
              </p>
            )}
            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Loading..." : `${products.length} products found`}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            <div className="font-semibold mb-2">⚠️ {error}</div>
            <button 
              onClick={fetchProducts}
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              🔄 Try Again
            </button>
            <div className="mt-2 text-sm">
              <p>Debug: Check browser console (F12) for detailed error information</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 col-span-1">
            <Filter
              value={filters}
              onChange={handleFilterChange}
              onClear={clearFilters}
              categories={categories}
            />
          </aside>

          {/* Product Grid */}
          <section className="lg:col-span-9 col-span-1">
            <ProductGrid 
              products={products} 
              loading={loading}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
