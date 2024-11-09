import React, { useState, useEffect, useRef } from "react";

import { LuSearch } from "react-icons/lu";
import { CiMenuBurger } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);


  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
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
        <nav className="max-w-[2230px] mx-auto navbar bg-gray-100 text-gray-950 h-[70px] flex justify-between items-center w-full shadow-2xl px-4 lg:px-8">
          <div className="text-2xl md:bg-pink-950  p-2 md:text-white rounded-full">
            <Link to="/">
              <h2>HeadPopp</h2>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center">
            <li className="text-sm text-black">
            <Link to="/cart" className="relative flex items-center">
                CART{" "}
                <span
                  className={`cart-quantity py-0 text-[12px] rounded-full ${
                    totalQuantity > 0 ? "bg-green-500" : "bg-pink-800"
                  } text-white`}
                >
                  {totalQuantity}
                </span>
              </Link>
            </li>

            <li className="text-sm text-black m-1 flex items-center">
              <FaUser className="mr-2" />
              <a href="/">Sign in</a>
            </li>

            <LuSearch className="text-[20px]" />
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
            className={`absolute top-0 left-0 w-full bg-gray-100 text-black lg:hidden flex flex-col items-center space-y-6 p-10 transform transition-transform duration-500 ease-in-out ${
              menuOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-full opacity-0 invisible"
            }`}
            style={{
              height: menuOpen ? "40vh" : "0",
              overflow: menuOpen ? "auto" : "hidden",
            }}
          >
            <div className="text-sm text-black m-1 flex items-center">
              <FaUser className="mr-2" />
              <a href="/">Sign in</a>
            </div>
            <a
              href="/cart"
              className="text-sm flex items-center relative"
              onClick={toggleMenu}
            >
              CART
              <span
                className={`menu-cart-quantity px-1 py-0 text-[16px] rounded-sm ml-1 ${
                  totalQuantity > 0 ? "bg-green-500" : "bg-pink-800"
                } text-white`}
              >
                {totalQuantity}
              </span>
            </a>
            <LuSearch className="text-[20px]" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
