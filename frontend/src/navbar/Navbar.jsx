import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-yellow bg-opacity-25 mt-[-200px] mb-[120px] p-4 w-[500px] h-[80px] flex justify-center items-center rounded-[200px] mx-auto shadow-lg">
      <div className="container mx-auto flex items-center">
        <div className="flex space-x-[85px] mx-auto">
          <Link to="/user-input" className="relative font-satoshi text-blue text-3xl hover:text-red">
            build
          </Link>
          <Link to="/" className="relative w-[60px]">
            <img src={'./src/pics/icon.png'} alt="Icon"/>
          </Link>
          <Link to="/" className="relative font-satoshi text-blue text-3xl hover:text-red">
            translate
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
