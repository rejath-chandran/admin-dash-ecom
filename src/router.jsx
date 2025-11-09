import { createBrowserRouter } from "react-router";
import {DashboardLogin,DashboardRegister} from "./pages"
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashLayout";

import GuestRoute from "./components/GuestRoute";
import Home from "./pages/Home";
import Category from "./pages/Category";

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
    children: [
      { index: true, element: <Home /> },  
      { path:'/settings', element: <div>Category Page</div> },  
      { path:'/category', element: <Category /> },  
    ],
  },
]);

export default router