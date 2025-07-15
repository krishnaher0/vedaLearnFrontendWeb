import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaSearch, FaBell, FaUserCircle,FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg mb-6">
      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-md py-2 px-3">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search courses, students, teachers..."
          className="focus:outline-none w-80 text-gray-700"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center relative" ref={dropdownRef}>
        <FaBell className="text-gray-500 text-xl mr-5 cursor-pointer hover:text-gray-700" />

        {/* User Info */}
        <div className="text-right mr-3">
          <span className="block font-semibold text-gray-800">{user?.name || "Admin"}</span>
          <span className="block text-sm text-gray-600">{user?.email || ""}</span>
        </div>

       <div className="relative" ref={dropdownRef}>
  <div className="flex items-center cursor-pointer mr-3" onClick={() => setShowDropdown((prev) => !prev)}>
    <FaUserCircle className="text-blue-500 text-3xl" />
    <FaChevronDown className="text-gray-600 ml-1 mt-1" />
  </div>
  {showDropdown && (
    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b"
      >
        Logout
      </button>
    </div>
  )}
</div>
      </div>
    </header>
  );
}

export default Navbar;
