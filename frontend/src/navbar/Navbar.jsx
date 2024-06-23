import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white text-xl hover:text-gray-400">
            Home
          </Link>
          <Link to="/user-input" className="text-white text-xl hover:text-gray-400">
            Input
          </Link>
          <Link to="/translate" className="text-white text-xl hover:text-gray-400">
            Translate
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
