// src/pages/SellerDashboard.jsx
import React, { useState } from "react";
import SellerNavbar from "../../components/SellerNavbar";
import { FaTrash, FaPlus, FaStar, FaStarHalfAlt, FaRegStar, FaLeaf } from "react-icons/fa";
import { mockProducts } from "../../data/sellerProducts";

export default function SellerDashboard() {
  const [products, setProducts] = useState(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    carbonFootprint: "",
    category: "",
    seller: "",
    stock: "",
    description: ""
  });

  const totalIncome = products.reduce((acc, prod) => acc + prod.revenue, 0).toFixed(2);

  const handleRemove = (id) => setProducts(products.filter(prod => prod.id !== id));
  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: (products.length + 1).toString(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      rating: 0,
      reviews: 0,
      unitsSold: 0,
      revenue: 0,
      carbonFootprint: parseFloat(newProduct.carbonFootprint)
    };
    setProducts([...products, productToAdd]);
    setShowForm(false);
    setNewProduct({
      name: "",
      price: "",
      image: "",
      carbonFootprint: "",
      category: "",
      seller: "",
      stock: "",
      description: ""
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={"f" + i} />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
    for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={"e" + i} />);
    return stars;
  };

  const getCarbonBadgeClass = (carbon) => {
    if (carbon <= 1) return "low-carbon";
    if (carbon <= 3) return "medium-carbon";
    return "high-carbon";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SellerNavbar />

      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Seller Dashboard</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Total Income */}
        <div className="mb-6 p-4 bg-white rounded shadow flex justify-between items-center">
          <span className="text-gray-700 font-semibold">Total Income:</span>
          <span className="text-green-700 font-bold text-xl">${totalIncome}</span>
        </div>

        {/* Product Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="eco-product-card flex flex-col bg-white rounded-lg shadow overflow-hidden transition hover:shadow-lg"
              style={{ minHeight: "470px" }} // uniform card height
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div
                  className={`carbon-badge absolute top-2 left-2 px-3 py-1 rounded-full text-white font-semibold ${getCarbonBadgeClass(
                    prod.carbonFootprint
                  )}`}
                >
                  <FaLeaf className="inline-block mr-1" /> {prod.carbonFootprint} kg CO₂
                </div>
              </div>

              {/* Content */}
              <div className="card-content flex flex-col flex-1 p-4">
                <h3 className="product-name text-gray-800 font-semibold mb-1">{prod.name}</h3>
                <div className="rating-container flex items-center gap-1 mb-2 text-yellow-400">
                  {renderStars(prod.rating)}{" "}
                  <span className="text-gray-500 text-sm">({prod.reviews})</span>
                </div>
                <p className="product-description text-gray-600 text-sm mb-2 line-clamp-2">{prod.description}</p>
                <div className="price-category flex justify-between items-center mb-2">
                  <span className="price text-green-700 font-bold">${prod.price.toFixed(2)}</span>
                  <span className="category text-gray-500 text-sm">{prod.category}</span>
                </div>
                <div className="stock-seller flex justify-between text-gray-500 text-sm mb-4">
                  <span>Stock: {prod.stock}</span>
                  <span>Sold: {prod.unitsSold} | Revenue: ${prod.revenue.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleRemove(prod.id)}
                  className="add-to-cart bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleAddProduct}
              className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-700">Add New Product</h3>
              <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="text" name="image" value={newProduct.image} onChange={handleChange} placeholder="Image URL" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="number" name="carbonFootprint" value={newProduct.carbonFootprint} onChange={handleChange} placeholder="Carbon Footprint" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="text" name="category" value={newProduct.category} onChange={handleChange} placeholder="Category" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="text" name="seller" value={newProduct.seller} onChange={handleChange} placeholder="Seller Name" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} placeholder="Stock" required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-600"/>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Add Product</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
