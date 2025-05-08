import React, { useEffect, useState } from 'react';
import Header from '../components/ui/header';
import Sidebar from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { getProfile } from '../API/ApiFunctions';

const EmployerHome = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [data, setData] = useState(null);

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

  useEffect(() => {
    const getData = async () => {
      const response = await getProfile();
      if (response) {
      
        setData(response.data);
      } else {
        console.log("not getting data")
      }

    }

    getData()
  }, [])





  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col w-full'>
        <Header onMenuClick={handleMenuClick} data={data?.data} />
      </div>


      <div className="flex flex-row w-full" >
        {/* <div className='flex w-[15rem]'> */}
        <Sidebar
          collapsed={isCollapsed}
          mobileVisible={mobileVisible}
          onCloseMobile={handleMenuClick}
          data={data?.data} />
        {/* </div> */}

        <div className="flex-1 w-[85rem] ">

          {data?.data ? (
            <Outlet context={data.data} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;



