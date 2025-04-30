import React from 'react';
import Header from '../components/ui/header';
import Sidebar from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const EmployerHome = () => {


  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col w-full'>
        <Header />
      </div>
  
    <div className="flex flex-row w-full" >
      <div className='flex w-[15rem]'>
        <Sidebar />
      </div>

      <div className="flex-1 w-[85rem] ">
    
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default EmployerHome;
