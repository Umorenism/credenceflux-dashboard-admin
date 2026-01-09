import { useEffect, useState } from "react";
import {
  getAdminDeposits,
  approveDeposit,
  rejectDeposit,
} from "../api/adminApi";
import toast from "react-hot-toast";

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);

  const fetchDeposits = async () => {
    const res = await getAdminDeposits();
    setDeposits(res.data.deposits);
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const approve = async (id) => {
    await approveDeposit(id);
    toast.success("Deposit approved");
    fetchDeposits();
  };

  const reject = async (id) => {
    await rejectDeposit(id);
    toast.error("Deposit rejected");
    fetchDeposits();
  };

  return (
    <div className="card mt-10 overflow-x-auto">
      <table className="w-full text-white text-sm">
        <thead>
          <tr className="text-gray-400">
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map(d => (
            <tr key={d.id} className="border-t border-gray-700">
              <td>{d.userEmail}</td>
              <td>${d.amount}</td>
              <td>{d.status}</td>
              <td className="flex gap-2">
                {d.status === "pending" && (
                  <>
                    <button
                      onClick={() => approve(d.id)}
                      className="btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(d.id)}
                      className="btn-danger"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
