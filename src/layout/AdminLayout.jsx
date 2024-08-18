import React from "react";
import UnAuthSidebar from "../components/UnAuthSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="sticky top-0 w-64 bg-white shadow-lg">
        <UnAuthSidebar />
      </div>
      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
