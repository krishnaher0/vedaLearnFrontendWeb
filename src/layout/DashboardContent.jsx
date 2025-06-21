import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function DashboardContent() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-h-screen">
        <Navbar />
        
        {/* Scrollable Outlet Area */}
        <div className="overflow-y-auto flex-1 p-5 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
