import React from 'react';
import { Link } from 'react-router-dom';

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-between mb-6">
      <div className="text-center mx-4"> 
        {step1 ? (
          <Link to="/login" className="step active text-green-500 font-semibold text-xs sm:text-sm md:text-base">Sign In</Link>
        ) : (
          <span className="step disabled text-gray-400 cursor-not-allowed text-xs sm:text-sm md:text-base">Sign In</span>
        )}
      </div>

      <div className="text-center mx-4"> 
        {step2 ? (
          <Link to="/shipping" className="step active text-green-500 font-semibold text-xs sm:text-sm md:text-base">Shipping</Link>
        ) : (
          <span className="step disabled text-gray-400 cursor-not-allowed text-xs sm:text-sm md:text-base">Shipping</span>
        )}
      </div>

      <div className="text-center mx-4"> 
        {step3 ? (
          <Link to="/payment" className="step active text-green-500 font-semibold text-xs sm:text-sm md:text-base">Payment</Link>
        ) : (
          <span className="step disabled text-gray-400 cursor-not-allowed text-xs sm:text-sm md:text-base">Payment</span>
        )}
      </div>

      <div className="text-center mx-4"> 
        {step4 ? (
          <Link to="/placeorder" className="step active text-green-500 font-semibold text-xs sm:text-sm md:text-base">Place Order</Link>
        ) : (
          <span className="step disabled text-gray-400 cursor-not-allowed text-xs sm:text-sm md:text-base">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckOutSteps;
