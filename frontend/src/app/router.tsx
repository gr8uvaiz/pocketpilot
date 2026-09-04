import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import TransactionPage from "@/pages/TransactionPage";
import AppLayout from "@/layouts/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <App />,
          },
          {
            path: "/transactions",
            element: <TransactionPage/>
          }
        ],
      },
    ],
  },
]);
