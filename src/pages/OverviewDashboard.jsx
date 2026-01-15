






// src/components/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminDashboard } from "../api/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StatCard = ({ label, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
  >
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className={`text-3xl font-bold mt-1 ${color}`}>
      {value}
    </h3>
  </motion.div>
);

export default function OverviewDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      console.log("→ Starting dashboard fetch...");
      const res = await getAdminDashboard();
      console.log("API Response:", res);           // ← most important log!
      
      if (isMounted) {
        setStats(res.data?.data || res.data || null);
      }
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      if (isMounted) {
        setStats({ 
          error: true, 
          message: err.response?.data?.message || err.message || "Unknown error"
        });
      }
    } finally {
      console.log("→ Fetch completed");
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);

 if (!stats) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin h-14 w-14 rounded-full border-t-4 border-orange-500"></div>
      <span className="ml-4 text-lg text-gray-600">Loading dashboard...</span>
    </div>
  );
}

if (stats.error) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-lg">
        <h3 className="text-lg font-medium text-red-800">Failed to load dashboard</h3>
        <p className="mt-2 text-red-700">{stats.message || "Please check your connection and try again"}</p>
      </div>
    </div>
  );
}

// rest of your normal dashboard...

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Active Users", value: stats.activeUsers },
    { name: "Deposits", value: stats.totalDeposits },
    { name: "Withdrawals", value: stats.totalWithdrawals },
    { name: "Investments", value: stats.activeInvestments },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Platform performance overview
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="👥"
          label="Total Users"
          value={stats.totalUsers}
          color="text-blue-600"
        />
        <StatCard
          icon="🟢"
          label="Active Users"
          value={stats.activeUsers}
          color="text-green-600"
        />
        <StatCard
          icon="💰"
          label="Total Deposits"
          value={stats.totalDeposits}
          color="text-orange-600"
        />
        <StatCard
          icon="⏳"
          label="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          color="text-red-600"
        />
      </div>

      {/* GRAPH SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-bold mb-4">
          📊 Platform Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ALERT PANEL */}
      <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-1">⚠️ Admin Alerts</h3>

        {stats.pendingWithdrawals > 0 ? (
          <p>
            You have{" "}
            <strong>{stats.pendingWithdrawals}</strong>{" "}
            withdrawal request(s) awaiting approval.
          </p>
        ) : (
          <p>No pending withdrawals. System stable.</p>
        )}
      </div>
    </div>
  );
}
