import React from "react";
import Navbar from "../../components/Navbar";
import Filters from "../../components/Filter/Filter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";

export default function Customer_Dashboard() {
  return (
    <div className="app-wrapper bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 col-span-1">
            <Filters />
          </aside>
          <section className="lg:col-span-9 col-span-1">
            <ProductGrid />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
