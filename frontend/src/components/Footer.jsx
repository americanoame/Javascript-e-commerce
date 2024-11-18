import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-[2230px]  mx-auto  shadow-2xl h-[70px]"
    style={{
      background: "linear-gradient(to right, #feb47b, #ff7e5f)",
    }}
    >
      <div className="w-full text-center max-w-[1200px] mx-auto md:px-8 md:pt-5 px-4 pt-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          
          <p className="pb-1 font-bold">HeadPopp &copy; {currentYear}</p>
          
          <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-bold  sm:mb-0 dark:text-gray-950">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>

            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Contact
              </a>
            </li>

            <li>
              <a href="#" className="hover:underline ">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
