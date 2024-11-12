import React, { useState, useEffect, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import { FaShoppingBag } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const response = await logoutApiCall();

      // Handle non-JSON response by checking if the response is a plain string
      if (response && response.data === "Logged out successfully") {
        console.log("Logged out successfully");
      }

      // Proceed with clearing the user information and navigation
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="relative">
        <nav className="max-w-[2230px] mx-auto navbar bg-orange-200 text-gray-950 h-[70px] flex justify-between items-center w-full shadow-2xl px-4 lg:px-8">
          <div className="text-2xl   p-2 md:text-white rounded-full">
            <Link to="/">
              <h2 style={{ fontWeight: "bold" }}>
                <span
                  style={{
                    background: "linear-gradient(to right, #b9bb48, #38a169)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Head
                </span>
                <span
                  style={{
                    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Popp
                </span>
              </h2>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center">
            <li className="text-[30px] font-bold text-red-400 pt-2">
              <Link to="/cart" className="relative flex items-center">
                <FaShoppingBag />
                <span
                  className={`cart-quantity py-0 text-[12px] rounded-full ${
                    totalQuantity > 0 ? "" : "pink-gradient"
                  } text-white`}
                >
                  {totalQuantity}
                </span>
              </Link>
            </li>

            {/* User Menu */}
            <div
              ref={dropdownRef}
              className="relative text-sm text-black m-1 flex items-center"
            >
              {userInfo ? (
                <div
                  onClick={toggleDropdown}
                  className="flex items-center cursor-pointer"
                >
                  {/* User initials with heartbeat effect */}
                  <span
                    className={`p-3 w-8 h-8 flex items-center justify-center z-10 shadow-md text-[20px] text-white rounded-full transition-transform ${
                      dropdownOpen ? "heartbeat" : ""
                    }`}
                    style={{
                      background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                    }}
                  >
                    {userInfo.name.slice(0, 2)}
                  </span>

                  {/* Arrow with rotation effect */}
                  <span
                    className={`ml-2 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ⌃
                  </span>

                  {/* Dropdown content */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-32 w-40 rounded-lg shadow-lg z-50"
                      style={{
                        background:
                          "linear-gradient(to right, #b9bb48, #38a169)",
                      }}
                    >
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
                <Link to="/login" className="flex items-center text-[20px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    className="mr-2"
                  >
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#ff7e5f", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#feb47b", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#gradient1)"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center ">
            <button onClick={toggleMenu} className="text-black text-3xl z-10">
              {menuOpen ? <LiaTimesSolid /> : <CiMenuBurger />}
            </button>
          </div>

          {/* Mobile Menu with smooth dropdown */}
          <div
            ref={menuRef}
            className={`absolute top-0 left-0 w-full bg-gray-100 text-black lg:hidden flex flex-col items-center space-y-6 p-10 transform transition-transform duration-500 ease-in-out mobile-menu-gradient ${
              menuOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-full opacity-0 invisible"
            }`}
            style={{
              height: menuOpen ? "40vh" : "0",
              overflow: menuOpen ? "auto" : "hidden",
            }}
          >
            <div className="text-[30px] font-bold text-red-400 pt-2">
              <Link to="/cart" className="relative flex items-center">
                <FaShoppingBag />
                <span
                  className={`cart-quantity py-0 text-[12px] rounded-full ${
                    totalQuantity > 0 ? "" : "pink-gradient"
                  } text-white`}
                >
                  {totalQuantity}
                </span>
              </Link>
            </div>
            {userInfo ? (
              <div
                onClick={toggleDropdown}
                className="flex relative top-0  items-center cursor-pointer"
              >
                {/* User initials with heartbeat effect */}
                <span
                  className={`p-3 relative  w-8 h-8 flex items-center justify-center z-10 shadow-md text-[20px] text-white rounded-full transition-transform ${
                    dropdownOpen ? "heartbeat" : ""
                  }`}
                  style={{
                    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                  }}
                >
                  {userInfo.name.slice(0, 2)}
                </span>

                {/* Arrow with rotation effect */}
                <span
                  className={`ml-2 transform transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ⌃
                </span>

                {/* Dropdown content */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-32 w-40 rounded-lg shadow-lg z-50"
                    style={{
                      background: "linear-gradient(to right, #b9bb48, #38a169)",
                    }}
                  >
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
