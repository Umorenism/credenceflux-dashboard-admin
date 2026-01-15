// src/api/authApi.js
import { apiClient } from "./apiServices";

export const loginAdmin = (data) => {
  return apiClient.post("/api/admin/login", data);
};
