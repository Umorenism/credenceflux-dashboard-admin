// src/components/Header.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSearch, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Header({ setIsOpen }) {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic search placeholder based on current page
  const getPlaceholder = () => {
    const path = location.pathname;
    if (path.includes("dashboard") && path === "/dashboard") return "Search dashboard...";
    if (path.includes("details")) return "Search users by name or email";
    if (path.includes("deposite")) return "Search deposits by user or txID";
    if (path.includes("withdrawals")) return "Search withdrawals by user";
    if (path.includes("wallet")) return "Search wallet addresses";
    if (path.includes("settings")) return "Search settings...";
    return "Search anything...";
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      toast.success(`Searching for: "${searchQuery}"`);
      console.log("Search query:", searchQuery);
      // You can later integrate actual search API here
      setSearchQuery("");
    }
  };

  // Fallback if user not loaded yet
  if (!user) {
    return (
      <div className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-white border-b border-gray-200 flex items-center justify-center text-gray-500 z-40">
        Loading admin profile...
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 lg:left-72 right-0 z-40 bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 lg:px-10 shadow-sm">
      <Toaster position="top-right" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden text-2xl text-gray-700 hover:text-orange-600 transition"
      >
        <FiMenu />
      </button>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-full max-w-md focus-within:ring-2 focus-within:ring-orange-500 transition">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder={getPlaceholder()}
          className="bg-transparent outline-none text-sm text-gray-800 w-full placeholder-gray-500"
        />
      </div>

      {/* Right Side: Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-orange-50 transition group">
          <FaBell className="text-xl text-gray-600 group-hover:text-orange-600" />
          {/* Example badge - replace with real count later */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span> */}
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle size={28} />}
          </div>

          {/* Admin Info */}
          <div className="hidden sm:block text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              {user.name || "Super Admin"}
            </h3>
            <p className="text-xs text-gray-500">{user.email || "admin@credenceflux.com"}</p>
            <p className="text-xs text-orange-600 font-medium">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}