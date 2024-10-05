import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import MainComponent from "./Pages/MainComponent";

import Dashboard from "./Pages/Dashboard";

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
    ],
  },
  {
    path: "/dashboard",
    element: <MainComponent />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);
