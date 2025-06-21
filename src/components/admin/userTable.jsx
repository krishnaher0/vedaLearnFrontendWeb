import React from "react";
import { useAdminUser } from "../../hooks/admin/useAdminUser";

export default function UserTable() {
  const { data, isLoading, error } = useAdminUser();

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error fetching users.</div>;

  const users = data || [];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">User Table</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Email</th>
              <th className="py-3 px-5">Age</th>
              <th className="py-3 px-5">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50"}
              >
                <td className="py-3 px-5">{user.name}</td>
                <td className="py-3 px-5">{user.email}</td>
                <td className="py-3 px-5">{user.age}</td>
                <td className="py-3 px-5">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
