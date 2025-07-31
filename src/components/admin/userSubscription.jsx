import React from "react";
import { useGetUserSubscriptions } from "../../hooks/useSubscriptionHook";
import SubscriptionTable from "./SubscriptionTable";

export default function UserSubscriptionsPage() {
  const { data = [], isLoading, isError, error } = useGetUserSubscriptions();

  return (
    <div className="relative p-6 md:p-8 min-h-full bg-gradient-to-br from-slate-900/40 via-slate-800/20 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
      {/* Inner decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>

      {/* Content Area */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>Subscription History</span>
        </h2>

        {isLoading ? (
          <p className="text-center text-slate-300">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500 font-medium">{error.message}</p>
        ) : data.length === 0 ? (
          <p className="text-center text-slate-400 italic">No subscriptions found.</p>
        ) : (
          <SubscriptionTable subscriptions={data} />
        )}
      </div>
    </div>
  );
}
