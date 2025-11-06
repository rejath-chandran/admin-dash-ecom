import { createBrowserRouter } from "react-router";
import {DashboardLogin,DashboardRegister} from "./pages"
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashLayout";

import GuestRoute from "./components/GuestRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <GuestRoute>
      <DashboardLogin/>
    </GuestRoute>
  },
  {
    path: "/register",
    element: <GuestRoute>
      <DashboardRegister/>
    </GuestRoute>
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
  },
]);

export default router