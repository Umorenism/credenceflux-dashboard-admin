// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { loginAdmin, registerAdmin } from "../../api/apiServices";
// import { useAuth } from "../../context/AuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import loginBg from "../../assets/ngo.jpg"; // Add your bg image here

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await loginAdmin({ email, password });
//       login(res);
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       const msg = err.response?.data?.msg || err.response?.data?.message || "Login failed.";
//       console.error("Login error:", msg);
//       setError(msg);

//       // Auto-register if admin doesn't exist
//       if (msg.toLowerCase().includes("invalid credentials")) {
//         const confirmRegister = window.confirm(
//           "No account found for this email. Would you like to create an admin account?"
//         );
//         if (confirmRegister) {
//           try {
//             await registerAdmin({
//               name: email.split("@")[0],
//               email,
//               password,
//               role: "admin",
//             });
//             toast.success("Admin account created! Logging you in...");
//             const loginRes = await loginAdmin({ email, password });
//             login(loginRes);
//             navigate("/dashboard");
//           } catch (regErr) {
//             console.error("❌ Registration failed:", regErr);
//             toast.error("Registration failed. Please try again.");
//           }
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
//       style={{ backgroundImage: `url(${loginBg})` }}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 0.6, ease: "easeInOut" }}
//     >
//       <Toaster position="top-center" />

//       {/* Error Alert */}
//       {error && (
//         <motion.div
//           className="absolute top-10 bg-red-100 border border-red-500 text-red-700 px-6 py-3 rounded-md shadow-md z-50"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {error}
//         </motion.div>
//       )}

//       <motion.div
//         className="w-full max-w-md p-8 bg-gray/40 backdrop-blur-xl rounded-2xl shadow-xl space-y-8"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-orange-500 font-[900] text-[30px]">CREDENCEFLUX</h1>
//           <motion.h2
//             className="text-2xl font-bold text-white mt-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             Login to Your Account
//           </motion.h2>
//           <p className="text-sm text-white mt-1">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-orange-500 font-semibold">
//               Register
//             </Link>
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <label className="block text-sm font-medium text-white">Email Address</label>
//             <input
//               type="email"
//               placeholder="victoredem24@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full px-3 py-2 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
//               required
//             />
//           </motion.div>

//           {/* Password */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <label className="block text-sm font-medium text-white">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full px-3 py-2 pr-10 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 bottom-0 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
//             >
//               {showPassword ? <FaEyeSlash size={20} className="text-white"/> : <FaEye size={20} className="text-white"/>}
//             </button>
//           </motion.div>

//           {/* Submit */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8H4z"
//                   ></path>
//                 </svg>
//                 Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginAdmin } from "../../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import loginBg from "../../assets/ngo.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();

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
        twoFactorCode: requires2FA ? twoFactorCode : undefined,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.admin));

      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed";

      // Backend signals 2FA required
      if (msg.toLowerCase().includes("2fa")) {
        setRequires2FA(true);
        toast("Enter your 2FA code", { icon: "🔐" });
      } else {
        setError(msg);
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
          {/* Username */}
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-black"
            required
          />

          {/* Password */}
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
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* 2FA */}
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
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>


          {/* TEMPORARY TEST LOGIN BUTTON - REMOVE IN PRODUCTION!!! */}
{/* <button
  type="button"
  onClick={() => {
    const testUser = {
      id: 1,
      email: "admin@credenceflux.com",
      name: "Super Admin",
      role: "admin",
      // add any other fields your app expects
    };

    localStorage.setItem("user", JSON.stringify(testUser));
    localStorage.setItem("token", "test-token-1234567890");

    // Force context update (since we're bypassing the login function)
    window.location.href = "/dashboard"; // or use navigate if you have it
  }}
  className="w-full bg-purple-600 text-white py-3 rounded-lg mt-4 hover:bg-purple-700"
>
  ⚠️ TEST LOGIN (Bypass for Development)
</button> */}
        </form>
      </motion.div>
    </motion.div>
  );
}
