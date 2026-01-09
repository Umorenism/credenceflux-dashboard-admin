

import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/SideBar";
import Header from "./Header";

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // hide header if route starts with /dashboard/settings
  const hideHeader = location.pathname.startsWith("/dashboard/settings");

  return (
    <div className="min-h-screen bg-white flex relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          {/* Drawer */}
          <div className="relative w-72 h-full bg-white shadow-lg p-8">
            <Sidebar />
            {/* Close button inside drawer */}
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Right Side */}
      <div className="flex-1 lg:ml-[297px]">
        {/* Conditionally render header */}
        {!hideHeader && <Header setIsOpen={setIsSidebarOpen} />}

        {/* Scrollable Main Content */}
        <div
          className={`${
            hideHeader ? "pt-0" : "pt-[72px]"
          } bg-white min-h-screen px-6 py-4`}
        >
          {/* Nested routes will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
