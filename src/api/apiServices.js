// apiServices.js
import axios from "axios";

const base_url = "https://cryptoinvestment-y1aa.onrender.com";

export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Attach token automatically to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);


