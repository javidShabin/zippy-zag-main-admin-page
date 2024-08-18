import React, { useEffect } from "react";
import UnAuthSidebar from "../components/UnAuthSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";
import AuthSidebar from "../components/AuthAdmin/AuthSidebar";

const AdminLayout = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();
  const checkAdmin = async () => {
    try {
      await axiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });
      dispatch(saveAdmin());
    } catch (error) {
      dispatch(clearAdmin());
      console.log(error);
    }
  };
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);
  return (
    <div className="flex h-screen">
      <div className="sticky top-0 w-64 bg-white shadow-lg">
        {isAdminExist ? <AuthSidebar /> : <UnAuthSidebar />}
      </div>
      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
