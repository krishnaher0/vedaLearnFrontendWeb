import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="relative flex justify-between items-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl rounded-xl mb-0 border border-slate-700 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-2 left-20 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

      {/* Search Bar */}
      <div className="relative z-10 flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-3 px-4 hover:bg-white/15 transition-all duration-300 shadow-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FaSearch className="text-white text-sm" />
        </div>
        <input
          type="text"
          placeholder="Search courses, students, teachers..."
          className="focus:outline-none w-80 text-white placeholder-slate-300 bg-transparent font-medium"
        />
      </div>

      {/* Right Section */}
      <div className="relative z-10 flex items-center">
        {/* Logout Button */}
        <div className="relative mr-6">
          <div 
            className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 group"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative mr-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 group">
            <FaBell className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>

        {/* User Info Display */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
            <FaUserCircle className="text-white text-xl" />
          </div>
          <div className="text-center">
            <span className="block font-bold text-white text-sm">
              {user?.name || "Admin"}
            </span>
            <span className="block text-xs text-slate-300">
              {user?.email || "admin@vedlingo.com"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;