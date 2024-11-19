import React from "react";
const OrderSummary = ({ totalQuantity, itemsTotal, estimatedTax, shippingCost, orderTotal, checkOutHandler, cartItems }) => {
    return (
      <div className="bg-gray-100 p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Items: {totalQuantity}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping & handling:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total before tax:</span>
          <span>${itemsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Estimated tax (10%):</span>
          <span>${estimatedTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Order total:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
        <button
          className={`px-4 py-2 rounded-md mt-4 w-full ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r  from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition duration-300"
          } text-white text-sm md:text-xs lg:text-lg xl:text-xl px-4 py-2 md:px-3 lg:px-12 xl:px-16 transition duration-300`}
          disabled={cartItems.length === 0}
          onClick={checkOutHandler}
        >
          Proceed to checkout
        </button>
      </div>
    );
  };
  
  export default OrderSummary;
  