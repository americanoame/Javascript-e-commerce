// MobileMenu.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUser } from "react-icons/fa";

const MobileMenu = ({menuOpen, toggleDropdown, dropdownOpen,userInfo, logoutHandler, totalQuantity }) => {

  return (
    <div
      className={`absolute top-0 left-0 w-full bg-gray-100 text-black lg:hidden flex flex-col items-center space-y-6 p-10 transform transition-transform duration-500 ease-in-out mobile-menu-gradient ${
        menuOpen
          ? "translate-y-0 opacity-100 visible"
          : "-translate-y-full opacity-0 invisible"
      }`}
      style={{
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        height: menuOpen ? "40vh" : "0",
        overflow: menuOpen ? "auto" : "hidden",
      }}
    >
      <div className="text-[35px] font-bold text-gray-900 pt-2">
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingBag />
          <span className="cart-quantity">{totalQuantity}</span>
        </Link>
      </div>

      <div>
        {userInfo ? (
          <div
            onClick={toggleDropdown}
            className="flex relative top-0 items-center cursor-pointer"
          >
            <span
              className={`p-5 w-8 h-8 flex items-center justify-center z-10 shadow-md text-[20px] text-white rounded-full transition-transform ${
                dropdownOpen ? "heartbeat" : ""
              }`}
              style={{
                background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              }}
            >
              {userInfo.name.slice(0, 2)}
            </span>
            <span
              className={`ml-2 transform transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ⌃
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-32 w-40 rounded-lg shadow-lg z-50 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center">
            <FaUser className="mr-2" />
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
