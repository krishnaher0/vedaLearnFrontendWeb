import React,{ useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate=useNavigate();
  const { user, logout } = useContext(AuthContext);
  const handleLogout=()=>{
    logout();
    navigate("/login")
  }

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg mb-6">
      <div className="flex items-center border border-gray-300 rounded-md py-2 px-3">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search courses, students, teachers..."
          className="focus:outline-none w-80 text-gray-700"
        />
      </div>
      <div className="flex items-center">
        <FaBell className="text-gray-500 text-xl mr-5 cursor-pointer hover:text-gray-700" />
        <div className="text-right mr-3">
          <span className="block font-semibold text-gray-800">{user?.name || "Admin"}</span>
          <span className="block text-sm text-gray-600">{user?.email || ""}</span>
        </div>
        <FaUserCircle className="text-blue-500 text-3xl cursor-pointer mr-3" />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
