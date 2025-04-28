import React from 'react';

import Sidebar from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const EmployerHome = () => {

  
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 pl-15">
      {/* Your main content here */}
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <Outlet />
    </div>
  </div>
    
  );
};

export default EmployerHome;
