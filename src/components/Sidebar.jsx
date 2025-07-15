import React from "react";
import logo from "../assets/logo/vedlogo.png";
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
    <div className="w-72 bg-white shadow-xl h-screen p-6 flex flex-col border-r border-gray-200">
      <div className="flex items-center mb-10">
        <img src={logo} alt="VedLingo" className="w-12 h-12 mr-3" />
        <div className="text-xl font-bold text-gray-800">Admin Panel</div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <SidebarItem
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={handleNavigate("/admin/dashboard")}
            active
          />
          <SidebarItem
            icon={<FaBook />}
            label="Courses"
            onClick={handleNavigate("/admin/courses")}
          />
          <SidebarItem
            icon={<FaChalkboardTeacher />}
            label="Teachers"
            onClick={handleNavigate("/admin/teacher")}
          />
          <SidebarItem
            icon={<FaUserGraduate />}
            label="Students"
            onClick={handleNavigate("/admin/student")}
          />
          <SidebarItem
            icon={<FaFileAlt />}
            label="Reports"
            onClick={handleNavigate("/admin/reports")}
          />
          <SidebarItem
            icon={<FaCommentAlt />}
            label="Feedback"
            onClick={handleNavigate("/admin/feedback")}
          />
          <SidebarItem
            icon={<FaCog />}
            label="Settings"
            onClick={handleNavigate("/admin/settings")}
          />
        </ul>
      </nav>

      <div className="mt-auto text-sm text-gray-400 text-center pt-6 border-t">
        © 2025 VedLingo
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, active = false }) {
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        }`}
      >
        <span className="mr-3 text-lg">{icon}</span>
        <span className="text-base">{label}</span>
      </a>
    </li>
  );
}

export default Sidebar;
