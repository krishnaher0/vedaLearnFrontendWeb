import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function DashboardContent() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Global decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>

      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-h-screen relative z-10">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Content area decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-transparent to-purple-600/3 pointer-events-none"></div>
          
          {/* Scrollable Outlet Area */}
          <div className="relative z-10 overflow-y-auto h-full">
            {/* Content wrapper with enhanced styling */}
            <div className="p-6 md:p-8 min-h-full">
              {/* Content background with glass effect */}
              <div className="relative bg-gradient-to-br from-slate-900/40 via-slate-800/20 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden min-h-[calc(100vh-200px)]">
                {/* Inner decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
                
                {/* Content area */}
                <div className="relative z-10 p-6 md:p-8">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        {/* Bottom gradient glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        {/* Left gradient glow */}
        <div className="absolute top-0 bottom-0 left-72 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        
        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-indigo-400/25 rounded-full animate-ping delay-1000"></div>
      </div>
    </div>
  );
}

export default DashboardContent;