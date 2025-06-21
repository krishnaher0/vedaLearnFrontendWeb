// Header.js
import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useState,useEffect } from 'react';

function Navbar() {
   const [admin, setAdmin] = useState({ name: "", email: "" });

 useEffect(() => {
    try {
      const storedAdmin = JSON.parse(localStorage.getItem("user"));
      console.log("Stored admin from localStorage:", storedAdmin);
      if (storedAdmin && storedAdmin.email) {
        setAdmin(storedAdmin);
      }
    } catch (error) {
      console.error("Failed to parse admin from localStorage", error);
    }
  }, []);
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
          <span className="block font-semibold text-gray-800">{admin.name || "Admin"}</span>
          <span className="block text-sm text-gray-600">{admin.email}</span>
        </div>
        <FaUserCircle className="text-blue-500 text-3xl cursor-pointer" />
      </div>
    </header>
  );
}

export default Navbar