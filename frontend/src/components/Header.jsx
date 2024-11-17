import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import DesktopMenu from "../components/DesktopMenu";
import MobileMenuIcon from "../components/MobileMenuIcon";
import MobileMenu from "../components/MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    // console.log("Logging out...");
    try {
      await logoutApiCall();
      dispatch(logout());

      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="relative">
        <nav
          className="max-w-[2230px] mx-auto navbar  h-[70px] flex justify-between items-center w-full shadow-sm px-4 lg:px-8"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          }}
        >
          <div className="text-2xl   p-2 text-gray-950 rounded-full">
            <Link to="/">
              <h2 style={{ fontWeight: "bold" }}>HeadPopp</h2>
            </Link>
          </div>

          <DesktopMenu
            userInfo={userInfo}
            totalQuantity={totalQuantity}
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
            logoutHandler={logoutHandler}
          />

          <MobileMenuIcon menuOpen={menuOpen} toggleMenu={toggleMenu} />

          <MobileMenu
            menuOpen={menuOpen}
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
            userInfo={userInfo}
            logoutHandler={logoutHandler}
            totalQuantity={totalQuantity}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;

