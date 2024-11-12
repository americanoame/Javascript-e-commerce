import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-[2230px]  mx-auto  shadow-2xl  bg-orange-200  h-[70px] ">
      <div className="w-full h-full flex items-center justify-center">
        <div className="">
          <span className="text-white  font-bold">
            <p>HeadPopp &copy; {currentYear}</p>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
