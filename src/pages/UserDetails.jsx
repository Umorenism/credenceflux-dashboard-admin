import { useEffect, useState } from "react";
import {
  getAdminUsers,
  updateUserStatus,
} from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminUsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAdminUsers({
        page,
        limit,
        search,
      });

      const payload = res.data.data;

      setUsers(payload.users);
      setTotalPages(payload.pagination.pages);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const changeStatus = async (id, status) => {
    try {
      await updateUserStatus(id, { status });
      toast.success("User status updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mt-5 font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500">
          Manage platform users, status & activity
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by email or username..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring focus:ring-orange-200"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th>Status</th>
                <th>Country</th>
                <th>Deposited</th>
                <th>Earnings</th>
                <th>Last Login</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {u.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      {u.email}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          u.status === "active"
                            ? "bg-green-100 text-green-700"
                            : u.status === "suspended"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>{u.country || "—"}</td>
                  <td>${u.totalDeposited ?? 0}</td>
                  <td>${u.totalEarnings ?? 0}</td>
                  <td className="text-xs">
                    {u.lastLogin
                      ? new Date(u.lastLogin).toLocaleString()
                      : "Never"}
                  </td>

                  <td className="px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          changeStatus(u.id, "active")
                        }
                        className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                      >
                        Activate
                      </button>
                      <button
                        onClick={() =>
                          changeStatus(u.id, "suspended")
                        }
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs"
                      >
                        Suspend
                      </button>
                    </div>
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
