import { createBrowserRouter } from "react-router";
import {DashboardLogin} from "./pages"
import DashboardLayout from "./layout/DashLayout";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <DashboardLogin/>
  },
  {
    path:'/',
    element:<DashboardLayout/>
  }
]);

export default router