// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   getAdminDeposits, 
//   approveDeposit, 
//   rejectDeposit 
// } from '../api/adminApi'; // ← make sure path is correct

// const statusColors = {
//   pending: 'bg-yellow-100 text-yellow-800',
//   approved: 'bg-green-100 text-green-800',
//   rejected: 'bg-red-100 text-red-800',
//   processing: 'bg-blue-100 text-blue-800',
//   completed: 'bg-emerald-100 text-emerald-800',
// };

// const AdminDeposits = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState({});

//   // Optional filters (you can expand later)
//   const [filters, setFilters] = useState({
//     status: '',
//     // userEmail: '',
//     // minAmount: '',
//     // startDate: '',
//     // endDate: '',
//   });

//   const fetchDeposits = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await getAdminDeposits();

//       // ────────────────────────────────────────────────
//       // Handle different possible API response shapes
//       // ────────────────────────────────────────────────
//       let depositList = [];

//       if (response && Array.isArray(response)) {
//         depositList = response;
//       } else if (response?.data && Array.isArray(response.data)) {
//         depositList = response.data;
//       } else if (response?.data?.deposits && Array.isArray(response.data.deposits)) {
//         depositList = response.data.deposits;
//       } else if (response?.data?.results && Array.isArray(response.data.results)) {
//         depositList = response.data.results;
//       } else if (response?.data?.content && Array.isArray(response.data.content)) {
//         depositList = response.data.content; // common in paginated Spring Boot
//       } else {
//         console.warn("Unexpected deposits response format:", response);
//         setError("Received invalid data format from server");
//       }

//       setDeposits(depositList);
//     } catch (err) {
//       console.error("Failed to fetch deposits:", err);
//       setError(err.response?.data?.message || "Failed to load deposits. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDeposits();
//   }, [fetchDeposits]);

//   const handleApprove = async (id) => {
//     if (!window.confirm("Are you sure you want to APPROVE this deposit?")) return;

//     setActionLoading((prev) => ({ ...prev, [id]: true }));

//     try {
//       await approveDeposit(id);
//       setDeposits((prev) =>
//         prev.map((dep) =>
//           dep.id === id ? { ...dep, status: 'approved' } : dep
//         )
//       );
//       alert("Deposit approved successfully");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to approve deposit");
//     } finally {
//       setActionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = window.prompt("Reason for rejection (optional):") || "";
//     if (reason === null) return; // user clicked cancel

//     setActionLoading((prev) => ({ ...prev, [id]: true }));

//     try {
//       // If your backend expects { reason } in body, change to:
//       // await rejectDeposit(id, { reason });
//       await rejectDeposit(id);

//       setDeposits((prev) =>
//         prev.map((dep) =>
//           dep.id === id ? { ...dep, status: 'rejected', rejectionReason: reason || undefined } : dep
//         )
//       );
//       alert("Deposit rejected");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to reject deposit");
//     } finally {
//       setActionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Manage Deposits
//           </h1>
//           <button
//             onClick={fetchDeposits}
//             disabled={loading}
//             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-60"
//           >
//             {loading ? 'Refreshing...' : 'Refresh List'}
//           </button>
//         </div>

//         {/* Simple filter row (expandable) */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={filters.status}
//                 onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
//               >
//                 <option value="">All statuses</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//                 <option value="processing">Processing</option>
//               </select>
//             </div>

//             {/* Add more filter inputs here when backend supports them */}
//           </div>

//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={fetchDeposits}
//               className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition"
//             >
//               Apply
//             </button>
//           </div>
//         </div>

//         {/* Main Table */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Method
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
//                       Loading deposits...
//                     </td>
//                   </tr>
//                 ) : !Array.isArray(deposits) || deposits.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
//                       {Array.isArray(deposits)
//                         ? "No deposits found"
//                         : "Error: Invalid data received from server"}
//                     </td>
//                   </tr>
//                 ) : (
//                   deposits.map((deposit) => (
//                     <tr key={deposit.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {deposit.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {deposit.user?.email || deposit.user?.username || '—'}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           ID: {deposit.userId || deposit.user?.id || '—'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {deposit.amount} {deposit.currency || 'USD'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {deposit.method || deposit.paymentMethod || deposit.type || 'Manual'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             statusColors[deposit.status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
//                           }`}
//                         >
//                           {(deposit.status || 'unknown').toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {deposit.createdAt
//                           ? new Date(deposit.createdAt).toLocaleString()
//                           : '—'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         {deposit.status?.toLowerCase() === 'pending' && (
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               onClick={() => handleApprove(deposit.id)}
//                               disabled={actionLoading[deposit.id]}
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition"
//                             >
//                               {actionLoading[deposit.id] ? '...' : 'Approve'}
//                             </button>

//                             <button
//                               onClick={() => handleReject(deposit.id)}
//                               disabled={actionLoading[deposit.id]}
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition"
//                             >
//                               {actionLoading[deposit.id] ? '...' : 'Reject'}
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {error && (
//           <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDeposits;







import React, { useState, useEffect, useCallback } from 'react';
import {
  getAdminDepositsWithParams,
  approveDeposit,
  approveDepositReceipt,
  rejectDeposit,
} from '../api/adminApi'; // make sure this path is correct

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  receipt_submitted: 'bg-purple-100 text-purple-800',
  completed: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

const getStatusDisplay = (status) => {
  if (!status) return 'UNKNOWN';
  return status.replace('_', ' ').toUpperCase();
};

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const [filters, setFilters] = useState({
    status: '',
  });

  const [pagination, setPagination] = useState({
    limit: 20,
    skip: 0,
  });

  const fetchDeposits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        limit: pagination.limit,
        skip: pagination.skip,
      };

      if (filters.status) {
        params.status = filters.status;
      }

      const response = await getAdminDepositsWithParams(params);

      let depositList = [];

      if (Array.isArray(response?.data)) {
        depositList = response.data;
      } else if (response?.data?.deposits) {
        depositList = response.data.deposits;
      } else if (Array.isArray(response)) {
        depositList = response;
      } else {
        console.warn('Unexpected deposits response format:', response);
        setError('Invalid data format received from server');
      }

      setDeposits(depositList);
    } catch (err) {
      console.error('Failed to fetch deposits:', err);
      setError(err?.response?.data?.message || 'Could not load deposits');
    } finally {
      setLoading(false);
    }
  }, [filters.status, pagination.limit, pagination.skip]);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  const performAction = async (id, apiCall, newStatus, successMessage) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await apiCall(id);
      setDeposits((prev) =>
        prev.map((dep) =>
          dep.id === id ? { ...dep, status: newStatus } : dep
        )
      );
      alert(successMessage);
    } catch (err) {
      alert(err?.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleApproveRegular = (id) =>
    performAction(
      id,
      approveDeposit,
      'completed', // most likely — adjust if backend uses different status
      'Deposit approved and balance credited'
    );

  const handleApproveReceipt = (id) =>
    performAction(
      id,
      () => approveDepositReceipt(id, { depositType: 'regular' }),
      'completed',
      'Receipt approved successfully'
    );

  const handleReject = async (id) => {
    const reason = window.prompt('Rejection reason (required):')?.trim();
    if (!reason) {
      alert('Rejection reason is required');
      return;
    }

    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await rejectDeposit(id, { reason });
      setDeposits((prev) =>
        prev.map((dep) =>
          dep.id === id ? { ...dep, status: 'rejected', rejectionReason: reason } : dep
        )
      );
      alert('Deposit rejected');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to reject deposit');
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const resetFilters = () => {
    setFilters({ status: '' });
    setPagination({ limit: 20, skip: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Deposit Management</h1>
          <button
            onClick={fetchDeposits}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="block w-full border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="receipt_submitted">Receipt Submitted</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
            >
              Reset
            </button>
            <button
              onClick={fetchDeposits}
              className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      Loading deposits...
                    </td>
                  </tr>
                ) : deposits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      No deposits found
                    </td>
                  </tr>
                ) : (
                  deposits.map((deposit) => (
                    <tr key={deposit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deposit.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{deposit.user?.email || '—'}</div>
                        <div className="text-xs text-gray-500">ID: {deposit.userId || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deposit.amount} {deposit.currency || 'USD'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deposit.type || deposit.method || deposit.depositType || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${
                            statusColors[deposit.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {getStatusDisplay(deposit.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deposit.createdAt ? new Date(deposit.createdAt).toLocaleString() : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {deposit.status?.toLowerCase() === 'pending' && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApproveRegular(deposit.id)}
                              disabled={actionLoading[deposit.id]}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded disabled:opacity-50 transition"
                            >
                              {actionLoading[deposit.id] ? '...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleReject(deposit.id)}
                              disabled={actionLoading[deposit.id]}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded disabled:opacity-50 transition"
                            >
                              {actionLoading[deposit.id] ? '...' : 'Reject'}
                            </button>
                          </div>
                        )}

                        {deposit.status?.toLowerCase() === 'receipt_submitted' && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApproveReceipt(deposit.id)}
                              disabled={actionLoading[deposit.id]}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded disabled:opacity-50 transition"
                            >
                              {actionLoading[deposit.id] ? '...' : 'Approve Receipt'}
                            </button>
                            <button
                              onClick={() => handleReject(deposit.id)}
                              disabled={actionLoading[deposit.id]}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded disabled:opacity-50 transition"
                            >
                              {actionLoading[deposit.id] ? '...' : 'Reject'}
                            </button>
                          </div>
                        )}

                        {['completed', 'rejected'].includes(deposit.status?.toLowerCase()) && (
                          <span className="text-gray-400 text-xs">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Basic pagination */}
        {!loading && deposits.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm">
            <button
              onClick={() => setPagination((p) => ({ ...p, skip: Math.max(0, p.skip - p.limit) }))}
              disabled={pagination.skip === 0}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>

            <span className="text-gray-600">
              Showing {pagination.skip + 1} – {pagination.skip + deposits.length}
            </span>

            <button
              onClick={() => setPagination((p) => ({ ...p, skip: p.skip + p.limit }))}
              disabled={deposits.length < pagination.limit}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeposits;