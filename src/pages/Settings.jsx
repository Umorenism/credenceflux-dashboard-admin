import { useEffect, useState } from "react";
import { getAdmins, createAdmin } from "../api/adminApi";
import toast, { Toaster } from "react-hot-toast";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [submitting, setSubmitting] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await getAdmins();
      setAdmins(res.data.data || []);
    } catch {
      toast.error("Failed to load admin accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setSubmitting(true);
      await createAdmin({ username, email, password, role });
      toast.success("Admin account created successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("admin");
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Manage Admin Accounts</h1>
        <p className="text-gray-500">View and create administrator accounts</p>
      </div>

      {/* Create Admin Form */}
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black">Create New Admin</h2>
        <form className="space-y-3" onSubmit={handleCreateAdmin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {submitting ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No admins found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {a.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {a.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {a.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        a.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {a.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(a.lastLogin).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
