import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { mockProducts } from "../../data/mockProducts";

export default function ProductGrid() {
  // Remove duplicates just in case
  const uniqueProducts = Array.from(new Map(mockProducts.map(p => [p.id, p])).values());

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {uniqueProducts.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
