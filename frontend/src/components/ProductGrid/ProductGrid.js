import React from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="w-full py-20 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Product grid" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.imageUrl || product.image}
            rating={product.rating}
            reviews={product.reviewsCount || product.reviews}
            carbonFootprint={product.carbonFootprint}
            category={product.category}
            stock={product.stockQuantity || product.stock}
            seller={product.seller}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
}
