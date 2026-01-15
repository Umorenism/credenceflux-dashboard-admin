import { useEffect, useState } from "react";
import {
  getAdminWithdrawals,
  approveWithdrawal,
  completeWithdrawal,
  rejectWithdrawal,
} from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [txHash, setTxHash] = useState("");
  const [activeId, setActiveId] = useState(null);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);

      const res = await getAdminWithdrawals({ page, limit });
      const payload = res.data.data;

      setWithdrawals(payload.withdrawals);
      setTotalPages(payload.pagination.pages);
    } catch {
      toast.error("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [page]);

  const handleApprove = async (id) => {
    try {
      await approveWithdrawal(id);
      toast.success("Withdrawal approved");
      fetchWithdrawals();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleComplete = async (id) => {
    if (!txHash) {
      toast.error("Transaction hash is required");
      return;
    }

    try {
      await completeWithdrawal(id, { txHash });
      toast.success("Withdrawal completed");
      setTxHash("");
      setActiveId(null);
      fetchWithdrawals();
    } catch {
      toast.error("Completion failed");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Reason for rejection?");
    if (!reason) return;

    try {
      await rejectWithdrawal(id, { reason });
      toast.success("Withdrawal rejected");
      fetchWithdrawals();
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl mt-5 font-bold text-gray-900">
          Withdrawal Management
        </h1>
        <p className="text-gray-500">
          Review, approve and complete withdrawal requests
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading withdrawals...
          </div>
        ) : withdrawals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No withdrawals found
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th>Crypto</th>
                <th>Amount</th>
                <th>Wallet</th>
                <th>Status</th>
                <th>Date</th>
                <th className="px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {withdrawals.map((w) => (
                <tr
                  key={w._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {w.user?.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      {w.user?.email}
                    </div>
                  </td>

                  <td>{w.cryptocurrency}</td>
                  <td>
                    {w.cryptoAmount} ({w.amount}$)
                  </td>

                  <td className="font-mono text-xs">
                    {w.walletAddress.slice(0, 8)}...
                    {w.walletAddress.slice(-6)}
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          w.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : w.status === "approved"
                            ? "bg-blue-100 text-blue-700"
                            : w.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {w.status}
                    </span>
                  </td>

                  <td className="text-xs">
                    {new Date(w.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 text-right">
                    {w.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleApprove(w._id)}
                          className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(w._id)}
                          className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {w.status === "approved" && (
                      <>
                        {activeId === w._id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Tx hash"
                              value={txHash}
                              onChange={(e) =>
                                setTxHash(e.target.value)
                              }
                              className="px-2 py-1 border rounded text-xs"
                            />
                            <button
                              onClick={() =>
                                handleComplete(w._id)
                              }
                              className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                            >
                              Confirm
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setActiveId(w._id)
                            }
                            className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                          >
                            Complete
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
