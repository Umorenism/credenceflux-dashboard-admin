import { useEffect, useState } from "react";
import {
  getAdminUsers,
  updateUserStatus,
} from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getAdminUsers();
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeStatus = async (id, status) => {
    await updateUserStatus(id, { status });
    toast.success("User status updated");
    fetchUsers();
  };

  return (
    <div className="card mt-5 overflow-x-auto">
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="text-gray-400">
            <th>Email</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t border-gray-700">
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>${u.balance}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => changeStatus(u.id, "active")}
                  className="btn-success"
                >
                  Activate
                </button>
                <button
                  onClick={() => changeStatus(u.id, "suspended")}
                  className="btn-danger"
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
