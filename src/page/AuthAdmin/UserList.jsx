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
    <div className="p-4 bg-orange-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Users List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.image}
                alt={user.name || "User Image"}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-700">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {user.phone}
            </p>
            <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
