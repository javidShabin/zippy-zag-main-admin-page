import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const UsersList = () => {
  const [userList, setUserList] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/users-list",
      });
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 min-h-screen">
  <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
    Users List
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {userList.map((user) => (
      <div
        key={user._id}
        className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.image}
            alt={user.name || "User Image"}
            className="w-20 h-20 rounded-full border-4 border-indigo-500"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          <span className="font-medium text-gray-800">Phone:</span>{" "}
          {user.phone}
        </p>
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg shadow hover:from-indigo-500 hover:to-indigo-600 transition"
          onClick={() => handleEdit(user)}
        >
          Edit
        </button>
        {/* Tooltip */}
        <div className="absolute top-2 right-2 text-sm text-gray-500 hover:text-indigo-600 cursor-pointer">
          <span className="tooltip-text hidden absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded shadow-lg">
            Click to edit user
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default UsersList;
