// src/pages/Customer/CartPage.js
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { FaLeaf, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Badge } from "../../components/ui/badge";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCarbon = cartItems.reduce((acc, item) => acc + item.carbonFootprint * item.quantity, 0);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={"f" + i} className="text-yellow-400 w-4 h-4" />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 w-4 h-4" />);
    for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={"e" + i} className="text-yellow-400 w-4 h-4" />);
    return stars;
  };

  const getCarbonBadgeVariant = (carbon) => {
    if (carbon <= 1) return "success";
    if (carbon <= 3) return "warning";
    return "danger";
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 pb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                {/* Image */}
                <div className="relative w-full md:w-48 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge variant={getCarbonBadgeVariant(item.carbonFootprint)}>
                      <FaLeaf className="inline mr-1" /> {item.carbonFootprint} kg CO₂
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="flex items-center gap-2">
                    {renderStars(item.rating)}
                    <span className="text-gray-500">({item.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-green-700 font-bold text-lg">${item.price.toFixed(2)}</span>
                    <span className="text-gray-700">Category: {item.category}</span>
                    <span className="text-gray-700">Stock: {item.stock}</span>
                    <span className="text-gray-700">Seller: {item.seller}</span>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4 mt-3">
                    <label className="text-gray-700">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 font-semibold hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-green-50 p-4 rounded-xl shadow-md mt-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">
                Total: <span className="text-green-700">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-0">
                Total Carbon Footprint:{" "}
                <Badge variant={totalCarbon <= 5 ? "success" : totalCarbon <= 15 ? "warning" : "danger"}>
                  <FaLeaf className="inline mr-1" /> {totalCarbon.toFixed(2)} kg CO₂
                </Badge>
              </div>
              <button className="mt-2 md:mt-0 bg-green-700 text-white px-6 py-2 rounded-xl hover:bg-green-800 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
