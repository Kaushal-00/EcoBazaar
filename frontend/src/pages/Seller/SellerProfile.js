// src/pages/Seller/SellerProfile.js
import React, { useState } from "react";
import SellerNavbar from "../../components/SellerNavbar";
import Footer from "../../components/Footer/Footer";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStore, FaShieldAlt } from "react-icons/fa";

export default function SellerProfile() {
  const [form, setForm] = useState({
    storeName: "Solar Tech Solutions",
    ownerName: "Alex Green",
    email: "seller@solartech.io",
    phone: "+1 202-555-0139",
    address: "220 Sun Blvd, Phoenix, AZ",
    bio: "Providing clean energy accessories for conscious consumers.",
  });

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <SellerNavbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Seller Profile</h1>
            <p className="text-sm text-slate-600 mt-1">Manage store identity and contact details.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card Left */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow">
                    <FaStore className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{form.storeName}</h2>
                    <p className="text-xs text-slate-600">{form.ownerName}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  <li className="inline-flex items-center gap-2"><FaEnvelope className="text-slate-400" /> {form.email}</li>
                  <li className="inline-flex items-center gap-2"><FaPhone className="text-slate-400" /> {form.phone}</li>
                  <li className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-slate-400" /> {form.address}</li>
                </ul>
                <div className="mt-6 text-xs text-slate-500 inline-flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-600" /> Verified Seller
                </div>
              </div>
            </aside>

            {/* Form Right */}
            <section className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Store Details</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                    <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={form.storeName} onChange={(e) => handleChange("storeName", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-slate-400" />
                      <input className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.ownerName} onChange={(e) => handleChange("ownerName", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
                      <input type="email" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-slate-400" />
                      <input className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" />
                      <input className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">About / Bio</label>
                    <textarea rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} />
                  </div>
                  <div className="md:col-span-2 flex items-center justify-end gap-3">
                    <button type="button" className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50">Reset</button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save Changes</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
