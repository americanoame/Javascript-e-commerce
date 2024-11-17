// MobileMenuIcon.js
import React from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { CiMenuBurger } from 'react-icons/ci';

const MobileMenuIcon = ({ menuOpen, toggleMenu }) => {
  return (
    <div className="lg:hidden flex items-center justify-start">
      <button
        onClick={toggleMenu}
        className="text-black text-3xl z-10"
      >
        {menuOpen ? <LiaTimesSolid /> : <CiMenuBurger />}
      </button>
    </div>
  );
};

export default MobileMenuIcon;
