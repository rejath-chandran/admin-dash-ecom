import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth(); // ✅ Runs only on protected pages
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
