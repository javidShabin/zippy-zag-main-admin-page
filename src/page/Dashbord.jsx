import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import Chat from '../components/AuthAdmin/Chat';

const Dashbord = () => {
  const [userCount, setUserCount] = useState(0); 
  const [restaurantCount, setRestaurantCount] = useState(0)

  const getRestaurantCount = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/all-restaurants")
      setRestaurantCount(response.data.restaurants.length)
    } catch (error) {
      
    }
  }

  const getUserCount = async () => {
    try {
      const response = await axiosInstance.get('/user/users-list');
      setUserCount(response.data.length); // Assuming `response.data` is an array of users.
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  useEffect(() => {
    getUserCount();
    getRestaurantCount()
  }, []);

  return (
    <>
    <div className='mt-3 flex justify-center gap-10'>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-orange-400 shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Restaurant</h3>
      <h1 className='text-[100px] font-extrabold'>{restaurantCount}</h1>
      </div>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-orange-400 shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Total Users</h3>
      <h1 className='text-[100px] font-extrabold'>{userCount}</h1>
      </div>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-orange-400 shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Total Users</h3>
      <h1 className='text-[100px] font-extrabold'>{userCount}</h1>
      </div>
    </div>
    <Chat />
    </>
  );
};

export default Dashbord;
