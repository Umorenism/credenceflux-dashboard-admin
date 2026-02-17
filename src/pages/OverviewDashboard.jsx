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


/* ================= STAT CARD ================= */

const StatCard = ({ label, value, icon, color, bg }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <h3 className={`text-2xl font-bold mt-1 ${color}`}>
          {value ?? 0}
        </h3>
      </div>

      <div className={`text-3xl p-3 rounded-lg ${bg}`}>
        {icon}
      </div>

    </div>
  </motion.div>
);



/* ================= MAIN DASHBOARD ================= */

export default function OverviewDashboard() {

  const [stats, setStats] = useState(null);


  useEffect(() => {

    let mounted = true;

    const fetchDashboard = async () => {

      try {

        const res = await getAdminDashboard();

        const data = res.data?.data || {};

        if (mounted) {
          setStats(data);
        }

      } catch (error) {

        console.error(error);

        if (mounted) {
          setStats({
            error: true,
            message:
              error?.response?.data?.message ||
              error.message ||
              "Failed to load dashboard",
          });
        }

      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };

  }, []);



  /* ================= LOADING ================= */

  if (!stats) {

    return (

      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="animate-spin h-14 w-14 rounded-full border-t-4 border-orange-500"></div>

        <span className="ml-4 text-lg text-gray-600 dark:text-gray-300">
          Loading dashboard...
        </span>

      </div>

    );

  }



  /* ================= ERROR ================= */

  if (stats.error) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-6 rounded-lg">

          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Failed to load dashboard
          </h3>

          <p className="text-red-600 dark:text-red-400 mt-2">
            {stats.message}
          </p>

        </div>

      </div>

    );

  }



  /* ================= CHART DATA ================= */

  const chartData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Active Users", value: stats.activeUsers || 0 },
    { name: "Deposits", value: stats.totalDeposits || 0 },
    { name: "Pending Deposits", value: stats.pendingDeposits || 0 },
    { name: "Withdrawals", value: stats.totalWithdrawals || 0 },
    { name: "Investments", value: stats.activeInvestments || 0 },
  ];



  /* ================= UI ================= */

  return (

    <div className="p-6 space-y-8">


      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Complete overview of your platform performance
        </p>

      </div>



      {/* ================= STAT GRID ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="text-blue-600"
          bg="bg-blue-100 dark:bg-blue-900"
        />

        <StatCard
          label="Active Users"
          value={stats.activeUsers}
          icon="🟢"
          color="text-green-600"
          bg="bg-green-100 dark:bg-green-900"
        />

        <StatCard
          label="Total Deposits"
          value={stats.totalDeposits}
          icon="💰"
          color="text-orange-600"
          bg="bg-orange-100 dark:bg-orange-900"
        />

        <StatCard
          label="Pending Deposits"
          value={stats.pendingDeposits}
          icon="⏳"
          color="text-yellow-600"
          bg="bg-yellow-100 dark:bg-yellow-900"
        />

        <StatCard
          label="Total Withdrawals"
          value={stats.totalWithdrawals}
          icon="💸"
          color="text-red-600"
          bg="bg-red-100 dark:bg-red-900"
        />

        <StatCard
          label="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          icon="⚠️"
          color="text-pink-600"
          bg="bg-pink-100 dark:bg-pink-900"
        />

        <StatCard
          label="Active Investments"
          value={stats.activeInvestments}
          icon="📈"
          color="text-indigo-600"
          bg="bg-indigo-100 dark:bg-indigo-900"
        />

        <StatCard
          label="Total Invested"
          value={`$${stats.totalInvested || 0}`}
          icon="🏦"
          color="text-purple-600"
          bg="bg-purple-100 dark:bg-purple-900"
        />

      </div>



      {/* ================= ANALYTICS ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700"
      >

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Platform Analytics
        </h2>


        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#f97316"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </motion.div>



      {/* ================= ALERT PANEL ================= */}

      <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">

        <h3 className="font-semibold text-lg mb-2">
          Admin Alerts
        </h3>


        {stats.pendingWithdrawals > 0 && (
          <p>
            ⚠️ You have{" "}
            <strong>{stats.pendingWithdrawals}</strong>{" "}
            pending withdrawals.
          </p>
        )}

        {stats.pendingDeposits > 0 && (
          <p>
            ⚠️ You have{" "}
            <strong>{stats.pendingDeposits}</strong>{" "}
            pending deposits.
          </p>
        )}

        {stats.pendingWithdrawals === 0 &&
          stats.pendingDeposits === 0 && (
            <p>✅ All systems operating normally</p>
          )}

      </div>


    </div>

  );

}
