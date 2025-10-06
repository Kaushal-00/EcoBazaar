import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaLeaf, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaBell, FaShieldAlt, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profileService, authService } from "../../services/authService";

export default function CustomerProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Editable form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ecoCommit, setEcoCommit] = useState(false);

  // Preferences
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyPromos, setNotifyPromos] = useState(false);
  const [notifySustain, setNotifySustain] = useState(true);

  // Security form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Messages
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Get current user ID
  const getCurrentUserId = () => {
    const userData = authService.getCurrentUser();
    return userData?.id;
  };

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      const userId = getCurrentUserId();
      if (!userId) {
        setMsg({ type: "error", text: "Please login to view profile" });
        setLoading(false);
        return;
      }

      try {
        const profileData = await profileService.getUserProfile(userId);
        
        setProfile(profileData);
        setFullName(profileData.fullName || "");
        setPhone(profileData.phone || "");
        setAddress(profileData.address || "");
        setEcoCommit(!!profileData.ecoCommitment);
        setNotifyOrders(!!profileData.notificationOrders);
        setNotifyPromos(!!profileData.notificationPromotions);
        setNotifySustain(!!profileData.notificationSustainability);
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading profile:", error);
        setMsg({ type: "error", text: error.error || "Failed to load profile" });
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      const profileData = {
        fullName,
        phone,
        address,
        ecoCommitment: ecoCommit,
        notificationOrders: notifyOrders,
        notificationPromotions: notifyPromos,
        notificationSustainability: notifySustain
      };

      const updatedProfile = await profileService.updateProfile(userId, profileData);
      setProfile(updatedProfile);
      setMsg({ type: "success", text: "Profile updated successfully." });
      setTimeout(() => setMsg({ type: "", text: "" }), 2500);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMsg({ type: "error", text: error.error || "Failed to update profile" });
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    const userId = getCurrentUserId();
    if (!userId) return;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMsg({ type: "error", text: "Please fill in all password fields." });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    try {
      await profileService.updatePassword(userId, currentPassword, newPassword);
      setMsg({ type: "success", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => setMsg({ type: "", text: "" }), 2500);
    } catch (error) {
      console.error("Error updating password:", error);
      setMsg({ type: "error", text: error.error || "Failed to update password" });
    }
  };

  const handlePreferencesSave = async (e) => {
    e.preventDefault();
    // Preferences are saved with profile update
    handleProfileSave(e);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading profile…</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-slate-600">Profile not found. Please login again.</p>
              <Link to="/login" className="mt-4 inline-flex items-center px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
                Go to Login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Mock stats for display (you can implement these later)
  const mockStats = {
    orders: 12,
    savedCO2: ecoCommit ? 126.4 : 0,
    wishlist: 7,
  };

  const mockRecentOrders = [
    { id: "ORD-1029", date: "2025-09-12", total: 89.99, items: 3, status: "Delivered" },
    { id: "ORD-1028", date: "2025-08-27", total: 49.99, items: 1, status: "Shipped" },
    { id: "ORD-1027", date: "2025-08-05", total: 129.49, items: 4, status: "Delivered" },
  ];

  const ecoBadge = mockStats.savedCO2 >= 100 ? "bg-emerald-600 text-white" : 
                   mockStats.savedCO2 >= 50 ? "bg-emerald-500 text-white" : 
                   "bg-emerald-100 text-emerald-700";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Your Profile</h1>
            <p className="text-sm text-slate-600 mt-1">Manage account information, security, and preferences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column: Profile card + quick stats */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Profile Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow">
                        <FaUser className="text-white text-2xl" />
                      </div>
                      <span className={`absolute -bottom-2 left-0 px-2 py-0.5 text-[11px] rounded-full ${ecoBadge} inline-flex items-center gap-1`}>
                        <FaLeaf className="text-[10px]" />
                        {mockStats.savedCO2} kg CO₂ saved
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{profile.fullName}</h2>
                      <p className="text-sm text-slate-600">{profile.email}</p>
                      <p className="text-xs mt-1 text-emerald-700 inline-flex items-center gap-1">
                        <FaLeaf /> {ecoCommit ? "Eco Commitment: Active" : "Eco Commitment: Inactive"}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-emerald-700">{mockStats.orders}</div>
                      <div className="text-xs text-slate-600">Orders</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-emerald-700">{mockStats.wishlist}</div>
                      <div className="text-xs text-slate-600">Wishlist</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-emerald-700">{mockStats.savedCO2}</div>
                      <div className="text-xs text-slate-600">CO₂ Saved</div>
                    </div>
                  </div>

                  {/* Shortcuts */}
                  <div className="mt-6 grid gap-2">
                    <Link to="/customer/orders" className="w-full text-center py-2 rounded-lg border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 transition">
                      View Orders
                    </Link>
                    <Link to="/customer/dashboard" className="w-full text-center py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 inline-flex items-center gap-2">
                      <FaHistory className="text-slate-400" />
                      Recent Orders
                    </h3>
                    <Link to="/customer/orders" className="text-xs text-emerald-700 hover:underline">
                      See all
                    </Link>
                  </div>
                  <ul className="space-y-3">
                    {mockRecentOrders.map((o) => (
                      <li key={o.id} className="flex items-center justify-between text-sm">
                        <div className="text-slate-700">
                          <span className="font-semibold">{o.id}</span>
                          <span className="text-slate-500"> • {o.date}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">${o.total.toFixed(2)}</div>
                          <div className="text-xs text-slate-500">{o.items} items • {o.status}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Right column: Forms */}
            <section className="lg:col-span-8">
              {/* Global message */}
              {msg.text && (
                <div
                  className={`mb-4 p-3 rounded-lg border text-sm ${
                    msg.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {/* Profile details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Profile Details</h2>
                <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full pl-10 pr-3 py-2 border rounded-lg bg-slate-100 text-slate-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Email changes are managed via security.</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>

                  {/* Eco Commitment */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" checked={ecoCommit} onChange={(e) => setEcoCommit(e.target.checked)} />
                      I commit to making eco-conscious choices and reducing my carbon footprint
                    </label>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFullName(profile.fullName || "");
                        setPhone(profile.phone || "");
                        setAddress(profile.address || "");
                        setEcoCommit(!!profile.ecoCommitment);
                      }}
                      className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Security */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-600" />
                  Security
                </h2>
                <form onSubmit={handlePasswordSave} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                        placeholder="Create new password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 flex items-center justify-end gap-3">
                    <button
                      type="reset"
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmNewPassword("");
                      }}
                      className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Preferences */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                  <FaBell className="text-emerald-600" />
                  Preferences
                </h2>
                <form onSubmit={handlePreferencesSave} className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="text-sm">
                      <div className="font-medium text-slate-900">Order Updates</div>
                      <div className="text-xs text-slate-600">Get notifications about your orders and delivery status.</div>
                    </div>
                    <input type="checkbox" checked={notifyOrders} onChange={(e) => setNotifyOrders(e.target.checked)} />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="text-sm">
                      <div className="font-medium text-slate-900">Promotions</div>
                      <div className="text-xs text-slate-600">Receive limited-time deals and eco-friendly offers.</div>
                    </div>
                    <input type="checkbox" checked={notifyPromos} onChange={(e) => setNotifyPromos(e.target.checked)} />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="text-sm">
                      <div className="font-medium text-slate-900">Sustainability News</div>
                      <div className="text-xs text-slate-600">Get updates on carbon impact and sustainability initiatives.</div>
                    </div>
                    <input type="checkbox" checked={notifySustain} onChange={(e) => setNotifySustain(e.target.checked)} />
                  </label>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button type="reset" onClick={() => {
                      setNotifyOrders(!!profile.notificationOrders);
                      setNotifyPromos(!!profile.notificationPromotions);
                      setNotifySustain(!!profile.notificationSustainability);
                    }} className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50">
                      Reset
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                      Save Preferences
                    </button>
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
