import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa6";

export default function Register() {
  const [role, setRole] = useState("Customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [ecoCommit, setEcoCommit] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Here you would normally call your API to register the user
    console.log("Registering:", role, fullName, email, phone, address, password);

    // Redirect all users to login page after registration
    navigate("/login");
  };

  const roleInfo = {
    Customer: {
      title: "Customer Registration",
      subtitle: "Start your eco-friendly shopping journey",
    },
    Seller: {
      title: "Seller Registration",
      subtitle: "Sell your eco-friendly products",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col relative">
      {/* Branding */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center shadow-lg">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-emerald-700 tracking-wide">
            EcoBazaar
          </h1>
          <span className="text-sm text-emerald-600 font-medium">
            Carbon Aware Shopping
          </span>
        </div>
      </div>

      {/* Centered Card */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg border border-emerald-100">
          {/* Dynamic Title + Subtitle */}
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-2xl font-bold text-emerald-700">
              {roleInfo[role].title}
            </h2>
            <p className="text-gray-600 text-sm mt-2">{roleInfo[role].subtitle}</p>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            {["Customer", "Seller"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                  role === item
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Eco Commitment */}
            <div className="flex flex-col gap-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                I agree to the{" "}
                <Link className="text-emerald-600 hover:underline" to="/terms">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="text-emerald-600 hover:underline" to="/privacy">
                  Privacy Policy
                </Link>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ecoCommit}
                  onChange={(e) => setEcoCommit(e.target.checked)}
                  required
                />
                I commit to making eco-conscious choices and reducing my carbon
                footprint
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!(agreeTerms && ecoCommit)}
              className={`w-full py-3 text-white rounded-lg font-medium shadow 
                ${agreeTerms && ecoCommit 
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600" 
                  : "bg-slate-300 cursor-not-allowed"}`}
            >
              Create {role} Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className="my-6 border-t border-slate-200"></div>
          <p className="text-center text-sm text-slate-600 mb-3">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="block w-full text-center py-3 border rounded-lg font-medium bg-slate-50 hover:bg-slate-100 text-slate-700"
          >
            Sign In Instead
          </Link>

          {/* Footer Note */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <FaLeaf className="text-emerald-500 text-lg" />
            <span className="px-4 py-1 text-sm bg-slate-100 rounded-full text-slate-600 flex items-center gap-1">
              Trusted by eco-conscious businesses worldwide
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
