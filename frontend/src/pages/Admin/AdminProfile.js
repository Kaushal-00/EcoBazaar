// src/pages/Admin/AdminProfile.jsx
import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer/Footer"; 
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaLock } from "react-icons/fa";

export default function AdminProfile() {
  const [form, setForm] = useState({
    fullName: "Administrator",
    email: "admin@ecobazaar.com",
    phone: "+1 555-0123",
    address: "EcoBazaar HQ, Green Valley, CA",
    role: "Super Admin",
    department: "Platform Management",
    permissions: ["user_management", "content_moderation", "analytics", "system_settings"]
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSecurityChange = (k, v) => setSecurity((s) => ({ ...s, [k]: v }));

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Admin Profile</h1>
            <p className="text-sm text-slate-600 mt-1">Manage administrator account and security settings.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Admin Card */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{form.fullName}</h2>
                    <p className="text-xs text-slate-600">{form.role}</p>
                    <p className="text-xs text-emerald-600">{form.department}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-slate-700 mb-6">
                  <li className="inline-flex items-center gap-2">
                    <FaEnvelope className="text-slate-400" /> {form.email}
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <FaPhone className="text-slate-400" /> {form.phone}
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <FaMapMarkerAlt className="text-slate-400" /> {form.address}
                  </li>
                </ul>

                <div className="mb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Permissions</h3>
                  <div className="space-y-1">
                    {form.permissions.map((permission) => (
                      <div key={permission} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="capitalize">{permission.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 inline-flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-600" /> Super Administrator
                </div>
              </div>
            </aside>

            {/* Forms */}
            <section className="lg:col-span-2 space-y-6">
              {/* Profile Details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Profile Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={form.fullName} 
                      onChange={(e) => handleChange("fullName", e.target.value)} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="email" 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.email} 
                        onChange={(e) => handleChange("email", e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.phone} 
                        onChange={(e) => handleChange("phone", e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={form.address} 
                        onChange={(e) => handleChange("address", e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <input 
                      className="w-full px-3 py-2 border rounded-lg bg-slate-100 text-slate-500"
                      value={form.role} 
                      disabled 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <input 
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      value={form.department} 
                      onChange={(e) => handleChange("department", e.target.value)} 
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex items-center justify-end gap-3">
                    <button type="button" className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50">
                      Reset
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Settings */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                  <FaLock className="text-emerald-600" />
                  Security Settings
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="password" 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={security.currentPassword} 
                        onChange={(e) => handleSecurityChange("currentPassword", e.target.value)} 
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="password" 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={security.newPassword} 
                        onChange={(e) => handleSecurityChange("newPassword", e.target.value)} 
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="password" 
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        value={security.confirmPassword} 
                        onChange={(e) => handleSecurityChange("confirmPassword", e.target.value)} 
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="button" className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Activity Log */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    { action: "Approved user registration", time: "2 hours ago", type: "user" },
                    { action: "Resolved technical report", time: "5 hours ago", type: "report" },
                    { action: "Updated platform settings", time: "1 day ago", type: "system" },
                    { action: "Suspended suspicious account", time: "2 days ago", type: "security" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{activity.action}</div>
                        <div className="text-xs text-slate-500">{activity.time}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        activity.type === 'user' ? 'bg-blue-100 text-blue-700' :
                        activity.type === 'report' ? 'bg-amber-100 text-amber-700' :
                        activity.type === 'system' ? 'bg-purple-100 text-purple-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
