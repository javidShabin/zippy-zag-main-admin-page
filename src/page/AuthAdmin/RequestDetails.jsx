import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form
import { Send } from 'lucide-react'; // Import the send icon from Lucide

const RequestDetails = () => {
  const { requestId } = useParams(); // Extract 'requestId' from URL
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm(); // useForm hooks

  useEffect(() => {
    const getDetailsRequest = async () => {
      try {
        const response = await axiosInstance.get(`/request/getRequestById/${requestId}`);
        console.log(response, "==response");
        setRequestDetails(response.data.request); // Save the response data in state
      } catch (error) {
        setError('Failed to fetch request details');
        console.error(error);
      }
    };

    if (requestId) {
      getDetailsRequest();
    }
  }, [requestId]);

  const handleApprove = async () => {
    try {
      const response = await axiosInstance.post(`/request/approveRequest/${requestId}`);
      console.log(response, "==approve response");
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.post(`/request/rejectRequest/${requestId}`);
      console.log(response, "==reject response");
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/request/sendRestaurantId', data); // Assuming this is the endpoint for your form submission
      console.log(response, '== Form Data Submitted');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!requestDetails) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Request Details</h2>
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium text-gray-600">Restaurant Name:</p>
            <p className="text-gray-800">{requestDetails.restaurantName}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Owner Name:</p>
            <p className="text-gray-800">{requestDetails.ownerName}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Cuisine:</p>
            <p className="text-gray-800">{requestDetails.cuisine}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Email:</p>
            <p className="text-gray-800">{requestDetails.email}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Location:</p>
            <p className="text-gray-800">{requestDetails.location}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Phone:</p>
            <p className="text-gray-800">{requestDetails.phone}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Status:</p>
            <p className="text-gray-800">{requestDetails.status}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Created At:</p>
            <p className="text-gray-800">{new Date(requestDetails.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Updated At:</p>
            <p className="text-gray-800">{new Date(requestDetails.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={handleApprove}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105 text-sm"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 transform hover:scale-105 text-sm"
          >
            Reject
          </button>
        </div>

        {/* Form to send restaurantId */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Send Restaurant ID</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex space-x-4 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex-1">
              <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-600">Restaurant ID</label>
              <input
                id="restaurantId"
                type="text"
                {...register('restaurantId', { required: 'Restaurant ID is required' })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.restaurantId && <p className="text-red-500 text-sm">{errors.restaurantId.message}</p>}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white font-medium text-sm rounded-lg hover:bg-orange-600 focus:outline-none transition duration-200 transform hover:scale-105"
            >
              <Send size={18} className="mr-2" /> {/* Lucide send icon */}
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
