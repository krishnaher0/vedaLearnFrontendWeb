import React from "react";
import { useAdminUser } from "../../hooks/admin/useAdminUser";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

export default function UserTable() {
  const { data, isLoading, error } = useAdminUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className="animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"></div>
          <span className="text-white font-medium">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">!</span>
          </div>
          <span className="text-red-300 font-medium">
            Error fetching users.
          </span>
        </div>
      </div>
    );
  }

  const users = data || [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaUsers className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Learners Table</h2>
            <p className="text-slate-400">
              {users.length} {users.length === 1 ? "learner" : "learners"}{" "}
              registered
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FaUsers className="text-white text-lg" />
              </div>
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Users</p>
                <p className="text-white text-xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-white text-lg" />
              </div>
              <div>
                <p className="text-emerald-300 text-sm font-medium">
                  Active Emails
                </p>
                <p className="text-white text-xl font-bold">
                  {users.filter((u) => u.email).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaUser className="text-white text-lg" />
              </div>
              <div>
                <p className="text-purple-300 text-sm font-medium">Avg Age</p>
                <p className="text-white text-xl font-bold">
                  {users.length > 0
                    ? Math.round(
                        users.reduce((sum, u) => sum + (u.age || 0), 0) /
                          users.length
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
              <div>
                <p className="text-orange-300 text-sm font-medium">
                  Recent Joins
                </p>
                <p className="text-white text-xl font-bold">
                  {
                    users.filter((u) => {
                      const joinDate = new Date(u.createdAt);
                      const thirtyDaysAgo = new Date();
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                      return joinDate > thirtyDaysAgo;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FaUserCircle className="text-white text-sm" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                User Directory
              </h3>
              <p className="text-slate-400 text-sm">
                Manage and view all registered learners
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-blue-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Name
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-emerald-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Email
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-purple-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Age
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-orange-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Join Date
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`border-b border-slate-700/50 transition-all duration-300 ${
                      idx % 2 === 0
                        ? "bg-slate-800/30 hover:bg-slate-700/50"
                        : "bg-slate-900/30 hover:bg-slate-700/50"
                    }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-white">
                            {user.name}
                          </span>
                          <div className="text-xs text-slate-400">Learner</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-slate-300">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {user.age}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
                          <FaCalendarAlt className="text-white text-xs" />
                        </div>
                        <span className="text-slate-300 font-medium">
                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                          <FaUsers className="text-slate-400 text-2xl" />
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">
                            No users found
                          </p>
                          <p className="text-slate-500 text-sm">
                            Users will appear here once they register
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
