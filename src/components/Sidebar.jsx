// Sidebar.js
import React from "react";
import logo from "../assets/logo/vedlogo.png"

import {
  FaTachometerAlt,
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaCommentAlt,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };
 
 
  return (
    <div className="w-64 bg-white shadow-lg p-5">
      <div className="flex flex-col items-center pb-5 mb-5 ml-9 border-b border-gray-200">
        <img
              src={logo}
              alt="VedLingo"
              className=" fixed top-1 left-4 w-[60px] h-auto z-[100]"
            />
        <div className="text-l font-semibold text-gray-800">
          Admin Dashboard
        </div>
      </div>
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/dashboard")}

              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 active:bg-blue-100 active:text-blue-700 font-medium bg-blue-50 text-blue-600">
              {/* Added active classes for Dashboard */}
              <FaTachometerAlt className="mr-3 text-lg" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/courses")}

              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaBook className="mr-3 text-lg" />
              <span>Courses</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href=""
              onClick={handleNavigate("/admin/teacher")}

              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaChalkboardTeacher className="mr-3 text-lg" />
              <span >Teachers</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/student")}

              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaUserGraduate className="mr-3 text-lg" />
              <span >Students</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/reports")}

              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaFileAlt className="mr-3 text-lg" />
              <span>Reports</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/feedback")}
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaCommentAlt className="mr-3 text-lg" />
              <span>Feedback</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={handleNavigate("/admin/settings")}
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FaCog className="mr-3 text-lg" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
