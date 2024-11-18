import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

   useEffect(() => {
    if (!shippingAddress) {
        navigate("/shipping")
    }
   }, [shippingAddress, navigate])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder")
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />

      <h1 className="text-xl font-bold mb-4">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="PayPal" className="ml-2">
            PayPal
          </label>
        </div>

        <div className="mb-3">
          <input
            type="radio"
            id="CreditCard"
            name="paymentMethod"
            value="CreditCard"
            checked={paymentMethod === "CreditCard"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="CreditCard" className="ml-2">
            Credit Card
          </label>
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r text-white rounded-md from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition-all duration-300">

          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
