// FormContainer.jsx
import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-md iphone-se:mt-12 md:mt-24 md:mb-20">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
