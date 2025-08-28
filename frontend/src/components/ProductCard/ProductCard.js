import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaLeaf } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({
  name,
  price,
  image,
  rating,
  reviews,
  carbonFootprint,
  category,
  stock,
  seller,
  description // Add description prop
}) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={"f" + i} />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
    for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={"e" + i} />);

    return stars;
  };

  const getCarbonBadgeClass = () => {
    return carbonFootprint <= 1 ? "low-carbon" : carbonFootprint <= 3 ? "medium-carbon" : "high-carbon";
  };

  return (
    <div className="eco-product-card">
      <div className="card-image-container">
        <img src={image} alt={name} className="product-image" />
        
        <div className={`carbon-badge ${getCarbonBadgeClass()}`}>
          <FaLeaf className="leaf-icon" />
          {carbonFootprint} kg CO₂
        </div>

        <div className={`carbon-level ${getCarbonBadgeClass()}`}>
          {carbonFootprint <= 1 ? "Low Carbon" : carbonFootprint <= 3 ? "Medium Carbon" : "High Carbon"}
        </div>
      </div>

      <div className="card-content">
        <h3 className="product-name">{name}</h3>
        
        <div className="rating-container">
          <div className="stars">{renderStars()}</div>
          <span className="review-count">({reviews})</span>
        </div>

        {/* Add description here */}
        <p className="product-description">{description}</p>

        <div className="price-category">
          <span className="price">${price.toFixed(2)}</span>
          <span className="category">{category}</span>
        </div>

        <div className="stock-seller">
          <span>Stock: {stock}</span>
          <span>by {seller}</span>
        </div>

        <button className="add-to-cart">
          <FaShoppingCart className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
