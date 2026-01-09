import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerAdmin } from "../../api/apiServices"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Call API service
      const res = await registerAdmin({ name, email, password, role: "admin" });
      console.log("Registration successful:", res);

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center text-black px-4 py-10 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* ✅ Success Message */}
      {success && (
        <motion.div
          className="absolute top-10 bg-green-100 border border-green-500 text-green-700 px-6 py-3 rounded-md shadow-md z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Registration successful! Redirecting...
        </motion.div>
      )}

      {/* ✅ Error Message */}
      {error && (
        <motion.div
          className="absolute top-10 bg-red-100 border border-red-500 text-red-700 px-6 py-3 rounded-md shadow-md z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        className="w-full max-w-[500px] p-6 sm:p-8 space-y-8 bg-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center">
          <h1 className="text-orange-500 font-[900] text-[30px]">GIVE A MEAL</h1>
          <motion.h1
            className="text-2xl font-bold text-[#1F2336]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Create Admin Account
          </motion.h1>
           <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold">
              Login
            </Link>
          </p> 
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="victoredem24@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </motion.div>

          {/* Profile Picture URL */}
          {/* <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700">Profile Picture (URL)</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-[15px] bg-[#D1D1D1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </motion.div> */}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded-[15px] font-semibold hover:bg-[#2c324d] transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
