import React, { useEffect, useState } from "react";
import {
  getAdminWalletAddresses,
  createAdminWalletAddress,
  updateTradingWallet,
} from "../api/adminApi";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function AdminWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTradingModal, setShowTradingModal] = useState(false);

  const [form, setForm] = useState({
    cryptocurrency: "USDT",
    address: "",
    network: "BSC",
  });

  const [tradingForm, setTradingForm] = useState({
    cryptocurrency: "USDT",
    address: "",
    network: "BSC",
    isActive: true,
  });

  /* LOAD WALLETS */

  const loadWallets = async () => {
    try {
      setLoading(true);
      const res = await getAdminWalletAddresses();

      if (res.data.success) {
        setWallets(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load wallets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallets();
  }, []);

  /* CREATE WALLET */

  const handleCreateWallet = async () => {
    try {
      if (!form.address) {
        toast.error("Wallet address required");
        return;
      }

      const res = await createAdminWalletAddress(form);

      if (res.data.success) {
        toast.success("Wallet created successfully");

        setShowCreateModal(false);

        setForm({
          cryptocurrency: "USDT",
          address: "",
          network: "BSC",
        });

        loadWallets();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create wallet");
    }
  };

  /* UPDATE TRADING WALLET */

  const handleUpdateTradingWallet = async () => {
    try {
      if (!tradingForm.address) {
        toast.error("Address required");
        return;
      }

      const res = await updateTradingWallet(tradingForm);

      if (res.data.success) {
        toast.success("Trading wallet updated");
        setShowTradingModal(false);
        loadWallets();
      }
    } catch (err) {
      toast.error("Failed to update trading wallet");
    }
  };

  /* INPUT CHANGE */

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTradingChange = (e) =>
    setTradingForm({ ...tradingForm, [e.target.name]: e.target.value });

  /* UI */

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Wallet Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage platform deposit wallets
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add Wallet
          </button>

          <button
            onClick={() => setShowTradingModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Update Trading Wallet
          </button>

        </div>
      </div>


      {/* WALLET LIST */}

      {loading ? (
        <div className="text-center py-10 text-gray-700 dark:text-gray-300">
          Loading wallets...
        </div>
      ) : wallets.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No wallet addresses found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {wallets.map((wallet) => (
            <motion.div
              key={wallet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >

              <div className="flex justify-between mb-2">

                <h3 className="font-bold text-gray-900 dark:text-white">
                  {wallet.cryptocurrency}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    wallet.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {wallet.isActive ? "Active" : "Inactive"}
                </span>

              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Network: {wallet.network}
              </div>

              <div className="mt-2 text-xs break-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded">
                {wallet.address}
              </div>

              {wallet.qrCode && (
                <img
                  src={wallet.qrCode}
                  alt="QR"
                  className="w-24 h-24 mt-3"
                />
              )}

              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Created: {new Date(wallet.createdAt).toLocaleString()}
              </div>

            </motion.div>
          ))}

        </div>
      )}



      {/* CREATE MODAL */}

      <AnimatePresence>
        {showCreateModal && (
          <Modal
            title="Create Wallet"
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateWallet}
          >
            <Input
              label="Cryptocurrency"
              name="cryptocurrency"
              value={form.cryptocurrency}
              onChange={handleChange}
            />

            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <Input
              label="Network"
              name="network"
              value={form.network}
              onChange={handleChange}
            />

          </Modal>
        )}
      </AnimatePresence>



      {/* TRADING WALLET MODAL */}

      <AnimatePresence>
        {showTradingModal && (
          <Modal
            title="Update Trading Wallet"
            onClose={() => setShowTradingModal(false)}
            onSubmit={handleUpdateTradingWallet}
          >
            <Input
              label="Cryptocurrency"
              name="cryptocurrency"
              value={tradingForm.cryptocurrency}
              onChange={handleTradingChange}
            />

            <Input
              label="Address"
              name="address"
              value={tradingForm.address}
              onChange={handleTradingChange}
            />

            <Input
              label="Network"
              name="network"
              value={tradingForm.network}
              onChange={handleTradingChange}
            />

          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}



/* MODAL COMPONENT */

function Modal({ title, children, onClose, onSubmit }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <motion.div
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl w-full max-w-md shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >

        <h2 className="text-lg font-bold mb-4">
          {title}
        </h2>

        <div className="space-y-3">
          {children}
        </div>

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </motion.div>

    </motion.div>
  );
}



/* INPUT COMPONENT */

function Input({ label, ...props }) {
  return (
    <div>

      <label className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </label>

      <input
        {...props}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mt-1
        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}
