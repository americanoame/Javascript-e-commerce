import React, { useState } from "react";

import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingForm = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress = {} } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  const isButtonDisabled =
    !address || !city || !postalCode || !country;

  return (
    <FormContainer>
      <div className="flex flex-col items-center mb-6">
        <CheckOutSteps step1 step2 />
        <h1 className="mt-4 text-xl font-semibold">Shipping Information</h1>
      </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r text-white rounded-md from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition-all duration-300"
            disabled={isButtonDisabled}
          >
            Submit
          </button>
        </form>
      </FormContainer>
    
  );
};

export default ShippingForm;
