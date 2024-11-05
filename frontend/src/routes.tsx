import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import MainComponent from "./Pages/MainComponent";

import Dashboard from "./Pages/Dashboard";
import SendResetCode from "./Pages/Auth/SendResetCode";
import CheckResetCode from "./Pages/Auth/CHeckResetCode";
import ResetPassword from "./Pages/Auth/ResetPassword";
import SignUp from "./Pages/Auth/SignUP";
// import CreateEvaluation from "./Pages/Evaluation/CreateEvaluation";
import CreateEvaluation from "./Pages/Evaluation/CreateEvaluation";
import ListEvaluation from "./Pages/Evaluation/ListEvaluation";
import UpdateEvaluation from "./Pages/Evaluation/UpdateEvaluation";
import CreateTeacher from "./Pages/Teacher/CreateTeacher";
import UpdateTeacher from "./Pages/Teacher/UpdateTeacher";
import ListTeacher from "./Pages/Teacher/ListTeacher";
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoutes";
import UserList from "./Pages/userList/UserList";
import EvalutionReport from "./Report/EvalutionReport";
import TeacherReport from "./Report/ReportTeacher";

export const router = createBrowserRouter([
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
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
        path: "signUp",
        element: <SignUp />,
      },
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
    element: <ProtectedRoutes element={<MainComponent />} />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "create-evaluation",
        element: <ProtectedRoutes element={<CreateEvaluation />} />,
      },
      {
        path: "edit-evaluations",
        element: <ProtectedRoutes element={<UpdateEvaluation />} />,
      },

      {
        path: "fetch-evaluations",
        element: <ProtectedRoutes element={<ListEvaluation />} />,
      },
      {
        path: "create-teacher",
        element: <ProtectedRoutes element={<CreateTeacher />} />,
      },
      {
        path: "update-teacher",
        element: <ProtectedRoutes element={<UpdateTeacher />} />,
      },
      {
        path: "list-teacher",
        element: <ProtectedRoutes element={<ListTeacher />} />,
      },
      {
        path: "fetch-users",
        element: <ProtectedRoutes element={<UserList />} />,
      },
      {
        path: "evaluation-report",
        element: <ProtectedRoutes element={<EvalutionReport />} />,
      },
      {
        path: "teacher-report",
        element: <ProtectedRoutes element={<TeacherReport />} />,
      },
    ],
  },
]);
