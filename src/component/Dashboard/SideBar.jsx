



// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  MdDashboard,
  MdPeople,
  MdAccountBalanceWallet,
  
  MdArrowUpward,
  MdSettings,
  MdArrowDownward,
} from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../../assets/fy.png"; // Adjust the path as needed

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
      isActive
        ? "bg-orange-100 text-orange-600 shadow-sm font-semibold"
        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-white shadow-xl border-r border-gray-200 flex flex-col justify-between z-50">
      {/* Top Section */}
      <div className="p-8">
        {/* Logo / Brand */}
        <div className="mb-10 flex flex-col items-start">
  <img 
    src={logo}                  // or /images/credenceflux-logo.svg, etc.
    alt="CredenceFlux"
    className="h-10 w-full object-cover"
  />
  <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
    Admin Panel
  </p>
</div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="/dashboard" className={navLinkClasses} end>
            <MdDashboard size={22} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/details" className={navLinkClasses}>
            <MdPeople size={22} />
            Users Management
          </NavLink>

           <NavLink to="/dashboard/deposite" className={navLinkClasses}>
            <MdArrowDownward size={22} className="text-green-600" />
            Admin Deposits
          </NavLink> 

          <NavLink to="/dashboard/withdrawals" className={navLinkClasses}>
            <MdArrowUpward size={22} className="text-red-600" />
            Admin Withdrawals
          </NavLink>

           <NavLink to="/dashboard/wallet" className={navLinkClasses}>
            <MdAccountBalanceWallet size={22} />
            Admin Wallets
          </NavLink> 
          <NavLink to="/dashboard/investment" className={navLinkClasses}>
            <MdAccountBalanceWallet size={22} />
            Platform investment
          </NavLink>

          <NavLink to="/dashboard/settings" className={navLinkClasses}>
            <MdSettings size={22} />
            Admin Management
          </NavLink>
        </nav>
      </div>

      {/* Bottom: Admin Profile */}
      <div className="p-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {/* Avatar */}
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
  {user?.username ? user.username.charAt(0).toUpperCase() : <FaCircleUser size={28} />}
</div>

{/* Admin Info */}
<div className="flex-1 min-w-0">
  <h3 className="text-sm font-semibold text-gray-800 truncate">
    {user?.username}
  </h3>
  <p className="text-xs text-gray-500 truncate">
    {user?.email}
  </p>
</div>


          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
            title="Logout"
          >
            <CiLogout size={22} className="text-gray-500 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}