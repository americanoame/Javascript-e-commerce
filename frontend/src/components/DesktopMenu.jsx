// DesktopMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';

const DesktopMenu = ({ userInfo, totalQuantity, toggleDropdown, dropdownOpen, logoutHandler }) => {

  
  return (
    <div  className="hidden lg:flex space-x-3 items-center">
      <div className="text-[38px] font-bold text-gray-900">
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingBag />
          <span className={`cart-quantity ${totalQuantity > 0 ? '' : 'pink-gradient'} text-white`}>
            {totalQuantity}
          </span>
        </Link>
      </div>
      <div className="relative text-sm text-black m-1 flex items-center">
        {userInfo ? (
          <div onClick={toggleDropdown} className="flex items-center cursor-pointer">
            <span
              className={`p-5 w-8 h-8 flex items-center justify-center z-10 shadow-md text-[20px] text-white rounded-full transition-transform ${
                dropdownOpen ? 'heartbeat' : ''
              } bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]`}
            >
              {userInfo.name.slice(0, 2)}
            </span>
            <span className={`ml-2 transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
              ⌃
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-32 w-40 rounded-lg shadow-lg z-50 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Profile</Link>
                <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center text-[40px]">
            <RiUserFill className="text-red-950" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
