import React from "react";
import { 
  FaUser, 
  FaTag, 
  FaMoneyBillWave, 
  FaReceipt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaCalendarAlt,
  FaCreditCard
} from "react-icons/fa";

export default function SubscriptionTable({ subscriptions }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETE":
        return <FaCheckCircle className="text-emerald-400 text-sm" />;
      case "FAILED":
        return <FaTimesCircle className="text-red-400 text-sm" />;
      default:
        return <FaClock className="text-yellow-400 text-sm" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "COMPLETE":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "FAILED":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <FaCreditCard className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Payment History</h3>
            <p className="text-slate-400 text-sm">Transaction records and subscription details</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Name</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaTag className="text-emerald-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Plan</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className="text-purple-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Amount</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaReceipt className="text-orange-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Transaction ID</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-pink-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Status</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-teal-400 text-sm" />
                    <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Date</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr
                  key={sub._id}
                  className={`border-b border-slate-700/50 transition-all duration-300 ${
                    idx % 2 === 0
                      ? "bg-slate-800/30 hover:bg-slate-700/50"
                      : "bg-slate-900/30 hover:bg-slate-700/50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xs">
                          {sub.userId?.name?.charAt(0)?.toUpperCase() || 'N'}
                        </span>
                      </div>
                      <span className="font-medium text-white">
                        {sub.userId?.name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-md flex items-center justify-center">
                        <FaTag className="text-white text-xs" />
                      </div>
                      <span className="text-slate-300 font-medium">{sub.plan?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">₹</span>
                      </div>
                      <span className="text-purple-300 font-semibold">Rs. {sub.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
                        <FaReceipt className="text-white text-xs" />
                      </div>
                      <span className="text-slate-400 font-mono text-xs bg-slate-800/50 px-2 py-1 rounded border border-slate-600/50">
                        {sub.transactionId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(sub.status)}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(sub.status)}`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-md flex items-center justify-center">
                        <FaCalendarAlt className="text-white text-xs" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}