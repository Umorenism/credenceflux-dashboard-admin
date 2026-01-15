import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminInvestments } from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminInvestments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const res = await getAdminInvestments({ page, limit });
      const payload = res.data.data;

      setInvestments(payload.investments);
      setTotalPages(payload.pagination.pages);
    } catch (err) {
      toast.error("Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [page]);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500">
        Loading investments...
      </div>
    );

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Investments
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cryptocurrency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initial Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Daily ROI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {investments.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inv.user?.username || inv.userId}
                  <div className="text-xs text-gray-500">
                    {inv.user?.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {inv.cryptocurrency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inv.initialCryptoAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  {inv.currentCryptoAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inv.dailyROI}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      inv.status === "active"
                        ? "bg-green-100 text-green-800"
                        : inv.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(inv.startDate).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
