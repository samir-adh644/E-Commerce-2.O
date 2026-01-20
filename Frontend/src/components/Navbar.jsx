import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo / Brand */}
        <h1 className="text-xl font-bold tracking-wide">
          MyApp
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm md:text-base">
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-200"
          >
            Home
          </Link>

          <Link
           
            to="/register-user"
            className="hover:text-blue-400 transition duration-200"
          >
             Register
          </Link>

          <Link
            to="/login-user"
            className="hover:text-blue-400 transition duration-200"
          >
            Login
          </Link>

          <Link
             to="/order_list"
            className="bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Your Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
