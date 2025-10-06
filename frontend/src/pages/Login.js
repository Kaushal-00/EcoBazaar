import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa6";
import { authService } from "../services/authService";

export default function Login() {
  const [role, setRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Updated login handler that sends selected role
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Send role with login request
      const response = await authService.login({ 
        email, 
        password, 
        role: role.toUpperCase() 
      });

      // Redirect based on the selected role (not backend role)
      const userRole = role.toLowerCase();
      navigate(`/${userRole}/dashboard`);
    } catch (err) {
      setError(err.error || "Login failed. Please check your credentials and role.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleInfo = {
    Customer: {
      title: "Customer Login",
      subtitle: "Shop eco-friendly products and track your carbon footprint",
    },
    Seller: {
      title: "Seller Login",
      subtitle: "Manage your products and view sales analytics",
    },
    Admin: {
      title: "Admin Login",
      subtitle: "Manage the platform and monitor sustainability metrics",
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
        <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md border border-emerald-100">
          {/* Dynamic Title + Subtitle */}
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-2xl font-bold text-emerald-700">
              {roleInfo[role].title}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {roleInfo[role].subtitle}
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            {["Customer", "Seller", "Admin"].map((item) => (
              <button
                key={item}
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
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button with Loading Spinner */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-lg font-medium shadow flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Signing In...
                </>
              ) : (
                `Sign In as ${role}`
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-slate-200"></div>

          {/* Create Account */}
          <p className="text-center text-sm text-slate-600 mb-3">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="block w-full text-center py-3 border rounded-lg font-medium bg-slate-50 hover:bg-slate-100 text-slate-700"
          >
            Create New Account
          </Link>

          {/* Footer Note */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <FaLeaf className="text-emerald-500 text-lg" />
            <span className="px-4 py-1 text-sm bg-slate-100 rounded-full text-slate-600 flex items-center gap-1">
              Join 10,000+ eco-conscious users
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
