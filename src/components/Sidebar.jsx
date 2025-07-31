import React from "react";
import logo from "../assets/logo/vedlogo.png";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaGraduationCap,
  FaUserGraduate,
  FaCreditCard,
  FaChalkboardTeacher,
  FaTags,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl h-screen p-6 flex flex-col border-r border-slate-700 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center mb-12 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <img src={logo} alt="VedLingo" className="w-8 h-8" />
        </div>
        <div>
          <div className="text-xl font-bold text-white">Admin Panel</div>
          <div className="text-sm text-slate-400">VedLingo Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 relative z-10">
        <ul className="space-y-3">
          <SidebarItem
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={handleNavigate("/admin/dashboard")}
            active
            gradient="from-blue-500 to-blue-600"
          />
          <SidebarItem
            icon={<FaBookOpen />}
            label="Courses"
            onClick={handleNavigate("/admin/courses")}
            gradient="from-emerald-500 to-emerald-600"
          />
          <SidebarItem
            icon={<FaGraduationCap />}
            label="Learnings"
            onClick={handleNavigate("/admin/learnings")}
            gradient="from-purple-500 to-purple-600"
          />
          <SidebarItem
            icon={<FaCreditCard />}
            label="Payment History"
            onClick={handleNavigate("/admin/subscribed-users")}
            gradient="from-orange-500 to-orange-600"
          />
          <SidebarItem
            icon={<FaChalkboardTeacher />}
            label="Teachers"
            onClick={handleNavigate("/admin/teacher")}
            gradient="from-teal-500 to-teal-600"
          />
          <SidebarItem
            icon={<FaUserGraduate />}
            label="Students"
            onClick={handleNavigate("/admin/student")}
            gradient="from-indigo-500 to-indigo-600"
          />
          <SidebarItem
            icon={<FaTags />}
            label="Plans"
            onClick={handleNavigate("/admin/plan")}
            gradient="from-pink-500 to-pink-600"
          />
        </ul>
      </nav>

      {/* Footer */}
      <div className="relative z-10 mt-auto pt-0">
        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="text-sm text-slate-400 mb-2">Powered by</div>
          <div className="text-white font-semibold">VedLingo © 2025</div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  onClick,
  active = false,
  gradient = "from-gray-500 to-gray-600",
}) {
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className={`group relative flex items-center px-4 py-4 rounded-xl transition-all duration-300 font-medium overflow-hidden ${
          active
            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-500/30"
            : "text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:border-white/20 border border-transparent"
        }`}>
        {/* Icon container with gradient background */}
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300 ${
            active ? "shadow-blue-500/25" : ""
          }`}>
          <span className="text-white text-lg">{icon}</span>
        </div>

        {/* Label */}
        <span className="text-base font-medium relative z-10">{label}</span>

        {/* Active indicator */}
        {active && (
          <div className="absolute right-3 w-2 h-2 bg-blue-400 rounded-full shadow-lg"></div>
        )}

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </a>
    </li>
  );
}

export default Sidebar;
