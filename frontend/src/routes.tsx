import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import MainComponent from "./Pages/MainComponent";

import Dashboard from "./Pages/Dashboard";
import SendResetCode from "./Pages/Auth/SendResetCode";
import CheckResetCode from "./Pages/Auth/CHeckResetCode";
import ResetPassword from "./Pages/Auth/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "send-reset-code",
        element: <SendResetCode />,
      },
      {
        path: "check-reset-code",
        element: <CheckResetCode />,
      },
      {
        path: "reset-password/update",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainComponent />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);
