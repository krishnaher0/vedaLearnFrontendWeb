import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaEdit } from "react-icons/fa";
import logo from "../../assets/logo/vedlogo.png";
import { AuthContext } from "../../auth/AuthProvider";
import { useUserProgress } from "../../hooks/useProgressUser";
import { useUpdateUser } from "../../hooks/admin/useAdminUser";
import SubscriptionModal from "./SubscriptionModal"; // 👈 adjust the path if needed

const Header = ({ onScrollToStories }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [ageError, setAgeError] = useState("");


  const { user, logout } = useContext(AuthContext);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    age: user?.age || "",
  });
  const { data: progress, isLoading, isError } = useUserProgress(user?._id);
  const [openDropdown, setOpenDropdown] = useState(null); // 'profile' | 'shop' | null
  const profileRef = useRef();
  const shopRef = useRef();
  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser(() => {
    setShowEditForm(false);
    setOpenDropdown(null);
    // update user state or reload if needed
  });

  // Toggle edit form and reset data
  const handleEditProfile = () => {
    setEditData({ name: user?.name || "", age: user?.age || "" });
    setShowEditForm(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        shopRef.current &&
        !shopRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRefresh = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-100 via-white to-green-100 shadow-md backdrop-blur-md border-b border-green-200 z-50">
      <div className="flex justify-between items-center py-3 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={handleRefresh}
          className="flex items-center space-x-2 cursor-pointer">
          <img
            src={logo}
            alt="VedLinguo"
            className="w-[55px] h-auto rounded-lg shadow"
          />
          <span className="font-bold text-xl text-green-700">VedLingo</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex justify-center items-center space-x-16 text-base font-medium text-gray-700">
          <Link
            to="/user/courses"
            className="hover:text-green-600 transition text-lg font-medium">
            Courses
          </Link>
          <Link
            to="/user/learn/audio"
            className="hover:text-green-600 transition text-lg font-medium">
            Learn
          </Link>

          <a
            href="#stories"
            onClick={(e) => {
              e.preventDefault();
              onScrollToStories();
            }}
            className="hover:text-green-600 transition text-lg font-medium">
            Stories
          </a>

          <a
            href="#leaderboard"
            className="hover:text-green-600 transition text-lg font-medium">
            Leaderboard
          </a>

          {/* Shop Hover Section */}

          <div className="relative" ref={shopRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "shop" ? null : "shop")
              }
              className="hover:text-green-600 transition text-lg font-medium">
              Shop
            </button>

            {openDropdown === "shop" && (
              <div className="absolute top-[94px] left-1/2 transform -translate-x-[108%] w-[720px] z-50">
                <SubscriptionModal />
              </div>
            )}
          </div>

          {/* Subscription Modal on hover */}
        </nav>

        {/* Profile Dropdown */}
        {!user ? (
          <Link
            to="/login"
            className="text-green-600 border border-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition">
            Sign in
          </Link>
        ) : (
          <div className="relative ml-2" ref={profileRef}>
            <div
              onClick={() =>
                setOpenDropdown(openDropdown === "profile" ? null : "profile")
              }
              className="flex flex-col items-center cursor-pointer">
              <FaUserCircle className="text-green-600 text-5xl" />
              <span className="text-sm font-medium mt-0.5">
                {user?.name || "Admin"}
              </span>
              <FaChevronDown className="text-gray-600 text-xs mt-0.5" />
            </div>

            {openDropdown === "profile" && (
              <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 w-[344px] bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  <p className="font-semibold truncate">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs truncate flex items-center justify-between">
                    <span>{user?.email || ""}</span>
                    <button
                      onClick={handleEditProfile} // You can define this function
                      className="ml-2 text-gray-500 hover:text-green-600"
                      title="Edit Detail">
                      <FaEdit size={20} />
                    </button>
                  </p>
                  {showEditForm && (
                    <div className="absolute top-1 right-2 z-50 w-[320px] bg-white border rounded-md shadow p-4 space-y-3 text-sm">
                      <div className="div">Update your details</div>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border rounded focus:ring-green-500 focus:outline-none"
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        value={editData.age}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditData((prev) => ({ ...prev, age: val }));
                          setAgeError(
                            val !== "" && Number(val) < 0
                              ? "Age cannot be negative"
                              : ""
                          );
                        }}
                        className="w-full px-2 py-1 border rounded focus:ring-green-500 focus:outline-none"
                        placeholder="Age"
                      />

                      {ageError && (
                        <p className="text-red-500 text-xs mt-1">{ageError}</p>
                      )}
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowEditForm(false)}
                          className="text-gray-500 hover:underline">
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            updateUser({
                              id: user._id,
                              data: { name: editData.name, age: +editData.age },
                            })
                          }
                          disabled={isUpdating}
                          className="text-green-600 font-semibold hover:underline">
                          {isUpdating ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center mt-2 text-xs text-gray-400">
                      Loading progress...
                    </div>
                  ) : isError ? (
                    <div className="flex justify-center mt-2 text-xs text-red-500">
                      Error loading stats
                    </div>
                  ) : (
                    <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 text-white text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>❤️ Hearts</span>
                        <span className="font-semibold">
                          {progress?.hearts ?? 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>⭐ XP</span>
                        <span className="font-semibold">
                          {progress?.xp ?? 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>🔥 Streak</span>
                        <span className="font-semibold">
                          {progress?.dayStreak ?? 0}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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
