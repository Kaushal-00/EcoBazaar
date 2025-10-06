import React, { useContext, useMemo, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import { CartContext } from "../../context/CartContext";
import {
  FaLeaf,
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShieldAlt,
  FaTruck,
  FaLock,
} from "react-icons/fa";
import { Badge } from "../../components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, loading, error, loadCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Load cart on page mount
  useEffect(() => {
    loadCart();
  }, []);

  // Totals and derived data
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
    const carbon = cartItems.reduce((acc, item) => acc + (item.carbonFootprint || 0) * (item.quantity || 0), 0);
    const shipping = cartItems.length > 0 ? 4.99 : 0;
    const tax = +(subtotal * 0.07).toFixed(2);
    const grand = +(subtotal + shipping + tax).toFixed(2);
    const itemsCount = cartItems.reduce((acc, i) => acc + (i.quantity || 0), 0);
    return {
      subtotal: +subtotal.toFixed(2),
      shipping,
      tax,
      grand,
      carbon: +carbon.toFixed(2),
      itemsCount,
    };
  }, [cartItems]);

  const carbonVariant = (c) => (c <= 5 ? "success" : c <= 15 ? "warning" : "danger");

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating || 0);
    const half = (rating || 0) % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < full; i++) stars.push(<FaStar key={"f" + i} className="text-amber-400 w-4 h-4" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-amber-400 w-4 h-4" />);
    for (let i = 0; i < empty; i++) stars.push(<FaRegStar key={"e" + i} className="text-slate-300 w-4 h-4" />);
    return stars;
  };

  const stepQuantity = async (id, current, delta) => {
    const next = Math.max(1, (current || 1) + delta);
    await updateQuantity(id, next);
  };

  const handleRemoveItem = async (id) => {
    await removeFromCart(id);
  };

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Your Cart</h1>
            {cartItems.length > 0 && (
              <span className="text-sm text-slate-600">
                {totals.itemsCount} item{totals.itemsCount !== 1 ? "s" : ""} in cart
              </span>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading cart...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
              <button 
                onClick={loadCart}
                className="ml-2 text-red-800 underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && cartItems.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-slate-600 mb-6">The cart is empty. Discover eco-friendly products to get started.</p>
              <Link
                to="/customer/dashboard"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cart items */}
              <section className="lg:col-span-8">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-44 sm:h-auto bg-slate-100 flex-shrink-0">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant={item.carbonFootprint <= 1 ? "success" : item.carbonFootprint <= 3 ? "warning" : "danger"}>
                            <span className="inline-flex items-center gap-1">
                              <FaLeaf className="text-xs" />
                              {item.carbonFootprint} kg CO₂
                            </span>
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base md:text-lg font-semibold text-slate-900">{item.name}</h3>
                            <p className="text-sm text-slate-600 line-clamp-2 mt-1">{item.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">${(item.price || 0).toFixed(2)}</div>
                            <div className="text-xs text-slate-500">per item</div>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1">{renderStars(item.rating)}</div>
                          <span className="text-xs text-slate-500">({item.reviews})</span>
                          <span className="text-xs text-slate-500">
                            Category: <span className="capitalize">{item.category}</span>
                          </span>
                          <span className="text-xs text-slate-500">Seller: {item.seller}</span>
                          <span
                            className={`text-xs font-medium ${
                              item.stock > 10 ? "text-emerald-600" : item.stock > 0 ? "text-amber-600" : "text-rose-600"
                            }`}
                          >
                            {item.stock > 10 ? "In stock" : item.stock > 0 ? `Only ${item.stock} left` : "Out of stock"}
                          </span>
                        </div>

                        {/* Quantity + line total */}
                        <div className="mt-4 flex items-center justify-between">
                          {/* Stepper */}
                          <div className="inline-flex items-center rounded-lg border border-slate-300 overflow-hidden">
                            <button
                              onClick={() => stepQuantity(item.id, item.quantity, -1)}
                              disabled={loading}
                              className="h-9 w-9 inline-flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => {
                                const v = parseInt(e.target.value || "1", 10);
                                if (Number.isNaN(v) || v < 1) return;
                                updateQuantity(item.id, v);
                              }}
                              className="h-9 w-14 text-center text-sm border-x border-slate-300 outline-none"
                              aria-label="Quantity"
                            />
                            <button
                              onClick={() => stepQuantity(item.id, item.quantity, +1)}
                              disabled={loading}
                              className="h-9 w-9 inline-flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          {/* Line total + remove */}
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-semibold text-slate-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={loading}
                              className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium disabled:opacity-50"
                            >
                              <FaTrashAlt /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Order summary */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-semibold text-slate-900">${totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 inline-flex items-center gap-2">
                          <FaTruck className="text-slate-400" />
                          Shipping
                        </span>
                        <span className="font-semibold text-slate-900">${totals.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Tax</span>
                        <span className="font-semibold text-slate-900">${totals.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 inline-flex items-center gap-2">
                          <FaLeaf className="text-emerald-500" />
                          Carbon impact
                        </span>
                        <Badge variant={carbonVariant(totals.carbon)} className="rounded-md">
                          {totals.carbon} kg CO₂
                        </Badge>
                      </div>
                      <div className="border-t border-slate-200 my-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-slate-900">Total</span>
                        <span className="text-xl font-extrabold text-emerald-700">${totals.grand.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Trust signals */}
                    <ul className="mt-5 grid grid-cols-1 gap-2 text-xs text-slate-600">
                      <li className="inline-flex items-center gap-2">
                        <FaShieldAlt className="text-emerald-600" /> Buyer protection
                      </li>
                      <li className="inline-flex items-center gap-2">
                        <FaLock className="text-emerald-600" /> Secure payments
                      </li>
                      <li className="inline-flex items-center gap-2">
                        <FaTruck className="text-emerald-600" /> Fast eco shipping
                      </li>
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => navigate("/customer/checkout")}
                      disabled={loading || cartItems.length === 0}
                      className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-700 hover:to-emerald-600 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Checkout
                    </button>

                    <Link
                      to="/customer/dashboard"
                      className="mt-3 w-full inline-flex justify-center py-2 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 transition"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
