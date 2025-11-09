import axios from "axios";
import { useAuthStore } from "../store/authStore";

const apiUrl = import.meta.env.VITE_API_URL || "https://mernspace-auth-service.onrender.com";


const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Attach Access Token from Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${apiUrl}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.accessToken;

        useAuthStore.getState().setAuth({
          token: newToken,
          user: useAuthStore.getState().user,
        });

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error("Refresh token error:", error);
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;
