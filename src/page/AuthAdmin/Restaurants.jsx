import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurant/all-restaurants",
      });
      const restaurants = Array.isArray(response.data.restaurants)
        ? response.data.restaurants
        : [];
      setRestData(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeRestaurant = async ({ restaurantId }) => {
    if (window.confirm("Are you sure you want to remove this restaurant?")) {
      try {
        await axiosInstance({
          method: "DELETE",
          url: `/restaurant/delete-restaurant/${restaurantId}`,
        });
        toast.success("Restaurant removed successfully");
        setRestData((prev) =>
          prev.filter((restaurant) => restaurant._id !== restaurantId)
        );
      } catch (error) {
        console.error("Error removing restaurant:", error);
        toast.error("Failed to remove restaurant");
      }
    } else {
      toast("Action canceled");
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-orange-50 items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <main className="bg-white p-4 min-h-[100vh]">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-5">
        Restaurants <span className="text-orange-500">List</span>
      </h1>

      <Link to={"/admin/create-restaurant"}>
        <button className="bg-green-500 py-2 px-4 rounded-lg text-white font-bold shadow-xl mb-3 ">
          Create Restaurant
        </button>
      </Link>

      {restData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restData.map((restaurant) => (
            <div
              className="relative w-full h-[200px] rounded-lg shadow-lg overflow-hidden bg-gray-200"
              style={{
                backgroundImage: `url(${
                  restaurant.image || "/fallback-image.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={restaurant._id}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0000004f] bg-opacity-40 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <p className="text-sm">{restaurant.location}</p>
                <p className="text-xs mt-2">{restaurant.description}</p>
              </div>

              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md z-20"
                onClick={() =>
                  removeRestaurant({ restaurantId: restaurant._id })
                }
                title="Remove Restaurant"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No restaurants found.</div>
      )}
    </main>
  );
};

export default Restaurants;
