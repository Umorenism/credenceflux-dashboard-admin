import { apiClient } from "./apiServices";

/* ---------------- DASHBOARD ---------------- */
export const getAdminDashboard = () =>
  apiClient.get("/api/admin/dashboard");

/* ---------------- USERS ---------------- */
export const getAdminUsers = (params) =>
  apiClient.get("/api/admin/users", { params });


/* ---------------- WITHDRAWALS ---------------- */

export const getAdminWithdrawals = (params) =>
  apiClient.get("/api/admin/withdrawals", { params });

export const approveWithdrawal = (id) =>
  apiClient.put(`/api/admin/withdrawals/${id}/approve`);

export const completeWithdrawal = (id, data) =>
  apiClient.put(`/api/admin/withdrawals/${id}/complete`, data);

export const rejectWithdrawal = (id, data) =>
  apiClient.put(`/api/admin/withdrawals/${id}/reject`, data);

export const getAdminInvestments = (params) =>
  apiClient.get("/api/admin/investments", { params });


export const getAdmins = () => apiClient.get("/api/admin/admins");

export const createAdmin = (data) =>
  apiClient.post("/api/admin/admins", data);

export const getAdminUserById = (id) =>
  apiClient.get(`/api/admin/users/${id}`);

export const updateUserStatus = (id, data) =>
  apiClient.put(`/api/admin/users/${id}/status`, data);

export const updateUserBalance = (id, data) =>
  apiClient.put(`/api/admin/users/${id}/balance`, data);

/* ---------------- DEPOSITS ---------------- */
export const getAdminDeposits = () =>
  apiClient.get("/api/admin/deposits");

export const approveDeposit = (id) =>
  apiClient.put(`/api/admin/deposits/${id}/approve`);

export const rejectDeposit = (id) =>
  apiClient.put(`/api/admin/deposits/${id}/reject`);
