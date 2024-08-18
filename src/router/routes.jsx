import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import SignupPage from "../page/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      {
        path: "sign-up",
        element: <SignupPage />,
      },
    ],
  },
]);
