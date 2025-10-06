// src/pages/Seller/SellerDashboard.jsx
import React, { useMemo, useState } from "react";
import SellerNavbar from "../../components/SellerNavbar";
import Footer from "../../components/Footer/Footer";
import { mockProducts as seed } from "../../data/sellerProducts";
import {
  FaChartLine,
  FaLeaf,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaBoxOpen,
  FaDollarSign,
  FaStar,
  FaEye,
  FaTimes,
} from "react-icons/fa";

// number helpers
const n = (v) => (Number.isFinite(+v) ? +v : 0);
const money = (v) => `$${n(v).toFixed(2)}`;

export default function SellerDashboard() {
  const [products, setProducts] = useState(seed || []);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totals = useMemo(() => {
    const totalRevenue = products.reduce((a, p) => a + n(p.revenue), 0);
    const totalUnits = products.reduce((a, p) => a + n(p.unitsSold), 0);
    const totalSKUs = products.length;
    const avgRating = products.length > 0 ? products.reduce((a, p) => a + n(p.rating), 0) / products.length : 0;
    return {
      totalRevenue: n(totalRevenue),
      totalUnits: n(totalUnits),
      totalSKUs,
      avgRating: n(avgRating),
    };
  }, [products]);

  // Dynamic pie chart data based on products
  const pieChartData = useMemo(() => {
    const categoryMap = new Map();
    let total = 0;
    
    products.forEach(product => {
      const category = product.category || 'other';
      const revenue = n(product.revenue);
      categoryMap.set(category, (categoryMap.get(category) || 0) + revenue);
      total += revenue;
    });

    return Array.from(categoryMap.entries()).map(([category, revenue]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      revenue,
      percentage: total > 0 ? (revenue / total * 100) : 0
    })).sort((a, b) => b.revenue - a.revenue);
  }, [products]);

  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const handleEdit = (item) => { setEditing(item); setFormOpen(true); };
  const handleCreate = () => { setEditing(null); setFormOpen(true); };
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const upsertProduct = (payload) => {
    const cleaned = {
      ...payload,
      price: n(payload.price),
      rating: n(payload.rating),
      reviews: n(payload.reviews),
      carbonFootprint: n(payload.carbonFootprint),
      stock: n(payload.stock),
      unitsSold: n(payload.unitsSold ?? editing?.unitsSold ?? 0),
      revenue: n(payload.revenue ?? editing?.revenue ?? 0),
      seller: payload.seller || "Solar Tech Solutions",
    };

    if (payload.id) {
      setProducts((prev) => prev.map((p) => (p.id === payload.id ? cleaned : p)));
    } else {
      const nextId = (Math.max(0, ...products.map((p) => +p.id || 0)) + 1).toString();
      setProducts((prev) => [...prev, { ...cleaned, id: nextId }]);
    }
    setFormOpen(false);
  };

  return (
    <>
      <SellerNavbar onScrollTo={handleScrollTo} />

      <main className="min-h-screen bg-slate-50 pt-20 pb-16 scroll-smooth">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Seller Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">
                Track sales performance, manage products, and monitor carbon impact.
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              <FaPlus />
              Add Product
            </button>
          </div>

          {/* Overview / KPIs */}
          <div id="seller-kpis" className="scroll-mt-24">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <KPI icon={<FaDollarSign />} label="Total Revenue" value={money(totals.totalRevenue)} />
              <KPI icon={<FaChartLine />} label="Units Sold" value={totals.totalUnits.toLocaleString()} />
              <KPI icon={<FaBoxOpen />} label="Active SKUs" value={String(totals.totalSKUs)} />
              <KPI icon={<FaStar />} label="Avg. Rating" value={totals.avgRating.toFixed(2)} />
            </section>
          </div>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue by Product Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Distribution</h3>
              <ProductRevenueChart products={products} />
            </div>

            {/* Category Breakdown */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Category Performance</h3>
              <PieChart data={pieChartData} />
            </div>
          </section>

          {/* Products Table */}
          <section id="seller-products" className="scroll-mt-24">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Products</h2>
                <div className="text-sm text-slate-500">
                  Showing {products.length} item{products.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <Th>Name</Th>
                      <Th>Category</Th>
                      <Th className="text-right">Price</Th>
                      <Th className="text-right">Stock</Th>
                      <Th className="text-right">Units Sold</Th>
                      <Th className="text-right">Revenue</Th>
                      <Th className="text-center">CO₂</Th>
                      <Th className="text-right pr-6">Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-semibold text-slate-900">{p.name}</div>
                              <div className="text-xs text-slate-500">
                                Rating {n(p.rating)} • {n(p.reviews)} reviews
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize text-slate-700">{p.category}</td>
                        <td className="px-6 py-4 text-right font-semibold text-emerald-700">
                          {money(p.price)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-700">{n(p.stock)}</td>
                        <td className="px-6 py-4 text-right text-slate-700">{n(p.unitsSold)}</td>
                        <td className="px-6 py-4 text-right font-semibold text-slate-900">
                          {money(p.revenue)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                              n(p.carbonFootprint) <= 1
                                ? "bg-emerald-100 text-emerald-700"
                                : n(p.carbonFootprint) <= 3
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            <FaLeaf className="text-[10px]" /> {n(p.carbonFootprint)} kg
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setSelectedProduct(p)}
                              className="px-2.5 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEdit(p)}
                              className="px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="px-2.5 py-1.5 rounded-md border border-rose-300 text-rose-700 hover:bg-rose-50"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-10 text-center text-slate-600">
                          No products available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Insights */}
          <section id="seller-insights" className="scroll-mt-24 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InsightCard
                title="Top Performer"
                body={() => {
                  if (products.length === 0) return "—";
                  const top = [...products].sort((a, b) => n(b.revenue) - n(a.revenue))[0];
                  return top ? `${top.name} • ${money(top.revenue)}` : "—";
                }}
              />
              <InsightCard
                title="Lowest Stock"
                body={() => {
                  if (products.length === 0) return "—";
                  const low = [...products].sort((a, b) => n(a.stock) - n(b.stock))[0];
                  return low ? `${low.name} • ${n(low.stock)} left` : "—";
                }}
              />
              <InsightCard
                title="Best Rating"
                body={() => {
                  if (products.length === 0) return "—";
                  const best = [...products].sort((a, b) => n(b.rating) - n(a.rating))[0];
                  return best ? `${best.name} • ${n(best.rating).toFixed(1)}★` : "—";
                }}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      {formOpen && (
        <ProductForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSave={(payload) => upsertProduct(payload)}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  );
}

/* Enhanced UI Components */
function KPI({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-extrabold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

function InsightCard({ title, body }) {
  const content = typeof body === "function" ? body() : body;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="text-xs font-semibold text-slate-500 uppercase">{title}</div>
      <div className="mt-2 text-sm font-medium text-slate-900">{content}</div>
    </div>
  );
}

// Dynamic Product Revenue Chart - Bar chart showing each product's revenue
function ProductRevenueChart({ products }) {
  const maxRevenue = Math.max(...products.map(p => n(p.revenue)));
  const topProducts = [...products].sort((a, b) => n(b.revenue) - n(a.revenue)).slice(0, 5);
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {topProducts.map((product, idx) => {
          const percentage = maxRevenue > 0 ? (n(product.revenue) / maxRevenue) * 100 : 0;
          const colors = ['bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200', 'bg-emerald-100'];
          
          return (
            <div key={product.id} className="flex items-center gap-3">
              <div className="w-3 text-xs text-slate-600 font-mono">#{idx + 1}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900 truncate" title={product.name}>
                    {product.name}
                  </span>
                  <span className="text-sm font-bold text-emerald-600">{money(product.revenue)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors[idx]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Dynamic Pie Chart Component
function PieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500">
        No data available
      </div>
    );
  }

  const colors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];
  let currentAngle = 0;
  const radius = 60;
  const centerX = 80;
  const centerY = 80;
  
  return (
    <div className="flex items-center gap-6">
      <svg width="160" height="160" className="transform -rotate-90">
        {data.map((item, idx) => {
          const angle = (item.percentage / 100) * 360;
          const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          
          const color = colors[idx % colors.length];
          currentAngle += angle;
          
          return (
            <path
              key={idx}
              d={path}
              fill={color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              title={`${item.category}: ${item.percentage.toFixed(1)}%`}
            />
          );
        })}
      </svg>
      
      <div className="space-y-2">
        {data.map((item, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <div className="text-sm">
                <div className="font-medium text-slate-900">{item.category}</div>
                <div className="text-xs text-slate-500">{item.percentage.toFixed(1)}% • {money(item.revenue)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Product Detail Modal
function ProductDetailModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Product Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition"
          >
            <FaTimes className="text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-xl border border-slate-200" 
              />
              
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-bold text-xl text-slate-900">{product.name}</h4>
                  <p className="text-sm text-slate-600 mt-2">{product.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 ${
                      n(product.carbonFootprint) <= 1
                        ? "bg-emerald-100 text-emerald-700"
                        : n(product.carbonFootprint) <= 3
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    <FaLeaf /> {product.carbonFootprint} kg CO₂
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-700">{money(product.price)}</div>
                <div className="text-sm text-emerald-600">Unit Price</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard label="Total Revenue" value={money(product.revenue)} />
                <MetricCard label="Units Sold" value={product.unitsSold?.toString() || "0"} />
                <MetricCard label="Current Stock" value={product.stock?.toString() || "0"} />
                <MetricCard label="Seller" value={product.seller} />
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-3">Performance Summary</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Revenue per unit:</span>
                    <span className="font-medium">{money(product.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total earnings:</span>
                    <span className="font-medium text-emerald-600">{money(product.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stock status:</span>
                    <span className={`font-medium ${
                      product.stock > 50 ? 'text-emerald-600' : 
                      product.stock > 20 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {product.stock > 50 ? 'Well Stocked' : 
                       product.stock > 20 ? 'Low Stock' : 'Critical Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-sm font-bold text-slate-900">{value}</div>
    </div>
  );
}

/* Professional Product Form - Properly Centered */
function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    id: initial?.id || "",
    name: initial?.name || "",
    price: (initial?.price ?? "").toString(),
    image: initial?.image || "",
    rating: (initial?.rating ?? "").toString(),
    reviews: (initial?.reviews ?? "").toString(),
    carbonFootprint: (initial?.carbonFootprint ?? "").toString(),
    category: initial?.category || "home",
    stock: (initial?.stock ?? "").toString(),
    description: initial?.description || "",
  }));

  const isEditing = !!initial;
  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: form.id || undefined,
      price: +form.price || 0,
      rating: +form.rating || 0,
      reviews: +form.reviews || 0,
      carbonFootprint: +form.carbonFootprint || 0,
      stock: +form.stock || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition"
          >
            <FaTimes className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="Enter product name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="home">Home & Garden</option>
                  <option value="electronics">Electronics</option>
                  <option value="personal care">Personal Care</option>
                  <option value="clothing">Clothing</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
              <input
                type="url"
                required
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Carbon Footprint (kg CO₂)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.carbonFootprint}
                  onChange={(e) => handleChange("carbonFootprint", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) => handleChange("rating", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Reviews</label>
                <input
                  type="number"
                  value={form.reviews}
                  onChange={(e) => handleChange("reviews", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                placeholder="Write a detailed product description..."
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              {isEditing ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
