import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/vedlogo.png";
import { AuthContext } from "../../auth/AuthProvider";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
         <img
      src={logo}
      alt="VedLingua"
      className="fixed top-1 left-4 w-[60px] h-auto z-[100]"
    />
   
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Courses
          </Link>
          <a
            href="#"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Stories
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Leaderboard
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Shop
          </a>
            {!user ? (
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Sign in
            </Link>
          ) : (
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 transition duration-300"
            >
              Logout
            </button>
          )}
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow hover:from-green-500 hover:to-blue-600 transition-all duration-300">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
