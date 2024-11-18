import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  
  // Determine if the button should be disabled
  const isButtonDisabled = isLoading || email.trim() === '' || password.trim() === '';


  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    // handle submit handle this is how we login and we are login calling both login from user apiSlice and set credentials from our authSlice
    e.preventDefault("submit");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Toaster />

      <h1>Login</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r text-white rounded-md from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition-all duration-300"
          disabled={isButtonDisabled}
        >
          Sign In
        </button>


        {/* Loader Overlay */}
        {isLoading && <Loader />} 


      </form>

      <div className="text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          className="text-blue-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
