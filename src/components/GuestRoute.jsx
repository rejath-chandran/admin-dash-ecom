import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function GuestRoute({ children }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  // ✅ If user is logged in → redirect to dashboard
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  // ✅ Just show login/register immediately (no loading)
  return children;
}
