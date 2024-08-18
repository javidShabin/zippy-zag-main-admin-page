import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import SignupPage from "../page/SignupPage";
import LoginPage from "../page/LoginPage";
import Dashbord from "../page/Dashbord";
import AuthAdmin from "./protectedRoutes/AuthAdmin";
import Restaurants from "../page/AuthAdmin/Restaurants";
import UsersList from "../page/AuthAdmin/UserList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      {
        path: "/",
        element: <Dashbord />
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "log-in",
        element: <LoginPage />
      },

      {
        path: "admin",
        element: <AuthAdmin />,

        children: [
          {
            path: "restaurant-list",
            element: <Restaurants />
          },
          {
            path: "user-list",
            element: <UsersList />
          }
        ]
      }
    ],
  },
]);
