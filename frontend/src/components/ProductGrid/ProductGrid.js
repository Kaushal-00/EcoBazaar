import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { mockProducts } from "../../data/mockProducts";
import "./ProductGrid.css";

function ProductGrid() {
  return (
    <div className="product-grid">
      <div className="row g-4">
        {mockProducts.map((product) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={product.id}>
            <ProductCard 
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              carbonFootprint={product.carbonFootprint}
              category={product.category}
              stock={product.stock}
              seller={product.seller}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;