import React, { useState } from 'react';
import Header from '../components/ui/header';
import Sidebar from '../components/ui/sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';


const EmployerHome = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
 const {data, jobs, isDataChange}= useOutletContext()


  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      console.log("mobile");

      setMobileVisible(!mobileVisible);
      setIsCollapsed(!isCollapsed)
    } else {
      console.log("big screen");

      setIsCollapsed(!isCollapsed);
    }
  };


  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col w-full'>
        <Header onMenuClick={handleMenuClick} data={data} isDataChange={isDataChange} />
      </div>


      <div className="flex flex-row w-full" >
        <div className='flex md:w-[15vw]'>
        <Sidebar
          collapsed={isCollapsed}
          mobileVisible={mobileVisible}
          onCloseMobile={handleMenuClick}
          data={data} />
        </div> 

        <div className="flex-1 w-full lg:w-[85vw]  ">

          {(data && jobs) ? (
            <Outlet context={{data: data, isDataChange: isDataChange, jobs:jobs}} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;



