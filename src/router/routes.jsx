import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import SignupPage from "../page/SignupPage";
import LoginPage from "../page/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "log-in",
        element: <LoginPage />
      }
    ],
  },
]);
