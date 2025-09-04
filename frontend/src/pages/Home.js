// src/Pages/Home.jsx
import React from "react";
import HomeNavbar from "../components/homepages/HomeNavbar";
import InfoCard from "../components/homepages/InfoCard";
import FeatureCard from "../components/homepages/FeatureCard";
import StatsCounter from "../components/homepages/StatsCounter";

// Icons
import { FaRecycle, FaChartBar, FaShieldAlt, FaLock } from "react-icons/fa";
import { GiEarthAmerica, GiPlantWatering } from "react-icons/gi";
import { RiCommunityFill } from "react-icons/ri";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white scroll-smooth">
      {/* NAVBAR */}
      <HomeNavbar />

      {/* HERO */}
      <section
        id="home"
        className="pt-28 pb-24 text-center bg-gradient-to-b from-emerald-50 to-white"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Shop Sustainably. <br />
          <span className="text-emerald-600">
            Track Your Carbon Footprint.
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          An eco-friendly marketplace where every product shows its carbon
          impact. Make informed choices for a better planet.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium shadow-md hover:bg-emerald-700 transition"
          >
            Explore Products
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-lg border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 transition"
          >
            Become a Seller
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <StatsCounter value="10K+" label="Eco Products" />
          <StatsCounter value="5K+" label="Happy Customers" />
          <StatsCounter value="500+" label="Trusted Sellers" />
          <StatsCounter value="1M+" label="CO₂ Saved (kg)" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Why Choose EcoBazaar?
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Discover the features that make us the leading sustainable
            marketplace.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard title="Eco-Friendly Shopping" icon={<FaRecycle />}>
              Curated selection of sustainable products that help reduce
              environmental impact.
            </InfoCard>
            <InfoCard title="Carbon Impact Transparency" icon={<FaChartBar />}>
              See the carbon footprint of every product and make informed
              choices.
            </InfoCard>
            <InfoCard title="Trusted Sellers & Products" icon={<FaShieldAlt />}>
              Verified eco-friendly sellers and authenticated sustainable
              products.
            </InfoCard>
            <InfoCard title="Secure Payments" icon={<FaLock />}>
              Safe and secure payment processing with buyer protection
              guarantee.
            </InfoCard>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Our Mission for a Sustainable Future
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            EcoBazaar was born from a simple belief: every purchase should
            contribute to a healthier planet. We're creating a transparent
            marketplace where sustainability meets convenience, empowering
            consumers to make environmentally conscious choices without
            compromise.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Transparency"
              icon={<GiEarthAmerica />}
            >
              Complete visibility into product origins and environmental impact.
            </FeatureCard>
            <FeatureCard
              title="Sustainability"
              icon={<GiPlantWatering />}
            >
              Committed to reducing carbon footprint with every transaction.
            </FeatureCard>
            <FeatureCard
              title="Community"
              icon={<RiCommunityFill />}
            >
              Building a community of eco-conscious consumers and sellers.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-emerald-700 text-white py-10 text-center mt-10"
      >
        <p className="text-sm">
          © 2024 EcoBazaar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}