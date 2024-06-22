import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-yellow bg-opacity-25 p-4 w-[500px] h-[80px] flex justify-center items-center rounded-[200px] mt-8 mb-[-125px] mx-auto shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-[85px] mx-auto">
          <Link 
            to="/user-input" 
            className="relative font-satoshi text-blue text-3xl hover:text-red"
            style={{position:'relative'}}
          >
            build
          </Link>
          <Link to="/user-home" className="w-[60px]">
            <img src={'./src/pics/icon.png'} alt="Icon"/>
          </Link>
          <Link to="/" class="nav" className="font-satoshi text-blue text-3xl hover:text-red">
            translate
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
