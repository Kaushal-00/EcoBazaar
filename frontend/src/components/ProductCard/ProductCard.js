import React, { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaLeaf,
  FaHeart,
  FaRegEye,
} from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  carbonFootprint,
  category,
  stock,
  seller,
  description,
  onQuickView,
  onToggleWishlist
}) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (stock <= 0) return;
    addToCart({
      id, 
      name, 
      price: Number(price), 
      image, 
      rating: Number(rating), 
      reviews: Number(reviews), 
      carbonFootprint: Number(carbonFootprint), 
      category, 
      stock: Number(stock), 
      seller, 
      description, 
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const next = !isWishlisted;
    setIsWishlisted(next);
    onToggleWishlist && onToggleWishlist(id, next);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView && onQuickView(id);
  };

  const renderStars = () => {
    const stars = [];
    const ratingNum = Number(rating) || 0;
    const full = Math.floor(ratingNum);
    const half = ratingNum % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    
    for (let i = 0; i < full; i++) {
      stars.push(<FaStar key={"f"+i} className="text-amber-400" aria-hidden="true" />);
    }
    if (half) {
      stars.push(<FaStarHalfAlt key="half" className="text-amber-400" aria-hidden="true" />);
    }
    for (let i = 0; i < empty; i++) {
      stars.push(<FaRegStar key={"e"+i} className="text-slate-300" aria-hidden="true" />);
    }
    return stars;
  };

  const carbonNum = Number(carbonFootprint) || 0;
  const carbonBadgeTone = carbonNum <= 1
    ? "bg-emerald-500 text-white"
    : carbonNum <= 3
    ? "bg-amber-500 text-white"
    : "bg-rose-500 text-white";

  const stockNum = Number(stock) || 0;
  const stockTone = stockNum > 10
    ? "text-emerald-600"
    : stockNum > 0
    ? "text-amber-600"
    : "text-rose-600";

  return (
    <article
      className="
        group relative flex flex-col h-full
        rounded-xl border border-slate-200/70 bg-white/70
        shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
        backdrop-blur-sm overflow-hidden max-w-sm mx-auto
        focus-within:ring-2 focus-within:ring-emerald-500/30
      "
      tabIndex={-1}
      aria-label={name}
    >
      {/* Media */}
      <div className="relative h-52 bg-gradient-to-b from-slate-50 to-white flex-shrink-0">
        {/* Image skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-100" />
        )}
        <img
          src={image || "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
          "
          draggable="false"
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${carbonBadgeTone}`}
          >
            <FaLeaf className="text-[10px]" aria-hidden="true" />
            {carbonNum.toFixed(1)} kg CO₂
          </span>
          {category && (
            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-white/80 text-slate-700 backdrop-blur capitalize">
              {category}
            </span>
          )}
        </div>

        {/* Top-right actions */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`
              inline-flex items-center justify-center h-9 w-9 rounded-full
              bg-white/90 text-slate-700 shadow-sm hover:shadow
              hover:text-rose-500 transition-all
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40
            `}
          >
            <FaHeart className={`${isWishlisted ? "text-rose-500" : ""}`} />
          </button>
          {onQuickView && (
            <button
              onClick={handleQuickView}
              aria-label="Quick view"
              className="
                inline-flex items-center justify-center h-9 w-9 rounded-full
                bg-white/90 text-slate-700 shadow-sm hover:shadow
                hover:text-emerald-600 transition-all
                focus:outline-none focus:ring-2 focus:ring-emerald-500/40
              "
            >
              <FaRegEye />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2 mb-1">
          {name}
        </h3>

        {/* Rating + reviews */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-sm" aria-label={`Rating ${Number(rating)} out of 5`}>
            {renderStars()}
          </div>
          <span className="text-xs text-slate-500">({Number(reviews) || 0})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
          {description || "No description available"}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-emerald-600">
            ${Number(price || 0).toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${stockTone}`}>
            {stockNum > 0 ? (stockNum > 10 ? "In stock" : `Only ${stockNum} left`) : "Out of stock"}
          </span>
        </div>

        {/* Seller */}
        <div className="text-xs text-slate-500 mb-4">
          by <span className="font-medium text-slate-700">{seller || "Unknown Seller"}</span>
        </div>

        {/* Footer actions */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={stockNum <= 0}
            className={`
              w-full py-2.5 px-4 rounded-lg text-sm font-medium
              inline-flex items-center justify-center gap-2
              transition-all
              ${added
                ? "bg-emerald-600 text-white scale-[1.01]"
                : stockNum <= 0
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
              }
              focus:outline-none focus:ring-2 focus:ring-emerald-500/40
            `}
            aria-live="polite"
          >
            <FaShoppingCart className="text-sm" aria-hidden="true" />
            {added ? "Added!" : stockNum <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
