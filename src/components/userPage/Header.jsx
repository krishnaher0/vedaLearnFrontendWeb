import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo/vedlogo.png";
import { AuthContext } from "../../auth/AuthProvider";
import { useUserProgress } from "../../hooks/useProgressUser";

const Header = ({ onScrollToStories }) => { // <--- ✅ accept prop here
  const { user, logout } = useContext(AuthContext);
  const { data: progress, isLoading, isError } = useUserProgress(user?._id);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleRefresh=()=>{
    navigate("/")
  }

  return (
  <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-100 via-white to-green-100 shadow-md backdrop-blur-md border-b border-green-200 z-50">
  <div className="flex justify-between items-center py-3 px-4 max-w-7xl mx-auto">

    {/* Logo */}
    <div onClick={handleRefresh} className="flex items-center space-x-2">
      <img  src={logo} alt="VedLingua" className="w-[55px] h-auto rounded-lg shadow" />
      <span className="font-bold text-xl text-green-700">VedLingo</span>
    </div>

    {/* Navigation */}
    <nav className="flex-1 flex justify-center items-center space-x-16 text-base font-medium text-gray-700">
      <Link
        to="/user/courses"
        className="hover:text-green-600 transition text-lg font-medium"
      >
        Courses
      </Link>

      <a
        href="#stories"
        onClick={(e) => {
          e.preventDefault();
          onScrollToStories();
        }}
        className="hover:text-green-600 transition text-lg font-medium"
      >
        Stories
      </a>

      <a href="#leaderboard" className="hover:text-green-600 transition text-lg font-medium">
        Leaderboard
      </a>

      <a href="#" className="hover:text-green-600 transition text-lg font-medium">
        Shop
      </a>
    </nav>

    {/* Profile */}
    {!user ? (
      <Link
        to="/login"
        className="text-green-600 border border-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
      >
        Sign in
      </Link>
    ) : (
      <div className="relative ml-2" ref={dropdownRef}>
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaUserCircle className="text-green-600 text-5xl" />
          <span className="text-sm font-medium mt-0.5">{user?.name || "Admin"}</span>
          <FaChevronDown className="text-gray-600 text-xs mt-0.5" />
        </div>

        {showDropdown && (
          <div className="absolute left-0 top-22 w-56 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50">
            <div className="px-4 py-3 text-sm text-gray-700 border-b">
              <p className="font-semibold truncate">{user?.name || "Admin"}</p>
              <p className="text-xs truncate">{user?.email || ""}</p>

              {isLoading ? (
  <div className="flex justify-center mt-2 text-xs text-gray-400">Loading progress...</div>
) : isError ? (
  <div className="flex justify-center mt-2 text-xs text-red-500">Error loading stats</div>
) : (
  <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 text-white text-sm space-y-2">
    <div className="flex justify-between">
      <span>❤️ Hearts</span>
      <span className="font-semibold">{progress?.hearts ?? 0}</span>
    </div>
    <div className="flex justify-between">
      <span>⭐ XP</span>
      <span className="font-semibold">{progress?.xp ?? 0}</span>
    </div>
    <div className="flex justify-between">
      <span>🔥 Streak</span>
      <span className="font-semibold">{progress?.dayStreak ?? 0}</span>
    </div>
  </div>
)}

            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</header>

  );
};

export default Header;
