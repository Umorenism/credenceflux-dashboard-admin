import { apiClient } from "./apiServices";

export const loginAdmin = (data) => {
  return apiClient.post("/api/admin/login", data);
};

export const setupAdmin2FA = () => {
  return apiClient.post("/api/admin/2fa/setup");
};

export const verifyAdmin2FA = (data) => {
  return apiClient.post("/api/admin/2fa/verify", data);
};

export const disableAdmin2FA = (data) => {
  return apiClient.post("/api/admin/2fa/disable", data);
};
