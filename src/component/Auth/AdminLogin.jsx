





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginAdmin } from "../../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import loginBg from "../../assets/flux.svg";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
const { setUser } = useAuth(); // make sure you export setUser in context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin({
        username,
        password,
        ...(requires2FA && { twoFactorCode }),
      });

      const { token, refreshToken, admin } = res.data.data;

      // ✅ Store tokens properly
      setUser(admin); 
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(admin));

      toast.success("Admin login successful");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed";

      if (msg.toLowerCase().includes("2fa")) {
        setRequires2FA(true);
        toast("Enter your 2FA code", { icon: "🔐" });
      } else {
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster position="top-center" />

      <motion.div
        className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-orange-500/30"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h1 className="text-center text-orange-500 text-3xl font-black">
          CREDENCEFLUX
        </h1>
        <p className="text-center text-white/80 mt-1 mb-6">
          Admin Authentication
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-black"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-100 text-black"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {requires2FA && (
            <input
              type="text"
              placeholder="2FA Code"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-black"
              required
            />
          )}

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
