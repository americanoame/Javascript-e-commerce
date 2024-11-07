import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute inset-0 bg-white bg-opacity-75">
      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
