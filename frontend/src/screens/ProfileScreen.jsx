import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const isButtonDisabled =
    isLoading || name.trim() === "" || email.trim() === "";

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const updatedUser = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(updatedUser));
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        
      }
    }
  };


  return (
    <div className="max-w-[1300px] mt-24 h-screen mx-auto flex flex-col md:flex-row  items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:mb-0 md:w-1/2">
        <h3 className="text-center text-xl font-semibold mb-6">
          Profile
        </h3>
        {isLoading && <Loader />}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100 sm:text-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100 sm:text-sm"
              placeholder="Enter new password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            className="w-full  text-white py-2 px-4 rounded-md bg-gradient-to-r from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition-all duration-300"
            disabled={isButtonDisabled}
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="w-full ml-4 md:w-1/2">
        <h3 className="text-center text-xl font-semibold mb-6 mt-4">
          Order History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Order ID</th>
                <th className="px-4 py-2 border-b text-left">Date</th>
                <th className="px-4 py-2 border-b text-left">Total</th>
                <th className="px-4 py-2 border-b text-left">Paid</th>
                <th className="px-4 py-2 border-b text-left">Delivered</th>
                <th className="px-4 py-2 border-b text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  #67890
                </td>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  02/01/2024
                </td>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  $75.00
                </td>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  No
                </td>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  No
                </td>
                <td className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg border-b">
                  <button className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm md:text-base">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
