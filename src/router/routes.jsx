import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />
    }
])