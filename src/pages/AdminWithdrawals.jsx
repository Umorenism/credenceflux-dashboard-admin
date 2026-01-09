// src/components/AdminWithdrawals.jsx
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiServices";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      const res = await apiClient.get("/api/admin/withdrawals");
      setWithdrawals(res.data);
    } catch (err) {
      toast.error("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await apiClient.put(`/api/admin/withdrawals/${id}/${action}`);
      toast.success(`Withdrawal ${action}d successfully`);
      fetchWithdrawals(); // refresh
    } catch (err) {
      toast.error(`Failed to ${action} withdrawal`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="mt-10">
      <Toaster position="top-right w-full" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Withdrawal Requests</h2>

      {withdrawals.length === 0 ? (
        <p className="text-gray-500">No pending withdrawals.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {withdrawals.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="font-medium">{w.user?.email || w.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-xl font-bold text-green-600">${w.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wallet</p>
                  <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {w.walletAddress?.slice(0, 10)}...{w.walletAddress?.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      w.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : w.status === "approved"
                        ? "bg-blue-100 text-blue-800"
                        : w.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {w.status}
                  </span>
                </div>

                {w.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleAction(w.id, "approve")}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(w.id, "reject")}
                      className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {w.status === "approved" && (
                  <button
                    onClick={() => handleAction(w.id, "complete")}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}