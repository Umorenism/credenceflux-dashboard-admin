// src/components/AdminWallets.jsx
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiServices";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function AdminWallets() {
  const [wallets, setWallets] = useState([]);
  const [coin, setCoin] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWallets = async () => {
    try {
      const res = await apiClient.get("/api/admin/wallet-addresses");
      setWallets(res.data);
    } catch (err) {
      toast.error("Failed to load wallet addresses");
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!coin || !address) return toast.error("Fill all fields");

    setLoading(true);
    try {
      await apiClient.post("/api/admin/wallet-addresses", { coin, address });
      toast.success("Wallet address added!");
      setCoin("");
      setAddress("");
      fetchWallets();
    } catch (err) {
      toast.error("Failed to create wallet address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <Toaster position="top-right w-full" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Platform Deposit Wallets</h2>

      {/* Create New (Superadmin only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h3 className="text-lg text-black font-medium mb-4">Add New Deposit Address</h3>
        <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Coin (e.g. BTC, USDT)"
            value={coin}
            onChange={(e) => setCoin(e.target.value.toUpperCase())}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? "Adding..." : "Add Address"}
          </button>
        </form>
      </motion.div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h4 className="text-xl font-bold text-indigo-600">{w.coin}</h4>
            <p className="text-sm text-gray-500 mt-2">Deposit Address</p>
            <p className="text-xs font-mono bg-gray-100 p-3 rounded mt-1 break-all">
              {w.address}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(w.address);
                toast.success("Copied to clipboard!");
              }}
              className="mt-4 text-sm text-indigo-600 hover:underline"
            >
              Copy Address
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}