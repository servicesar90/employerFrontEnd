import React, { useEffect, useState } from 'react';
import Header from '../components/ui/header';
import Sidebar from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../Redux/getData';


const EmployerHome = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(fetchUserProfile());
  // },[dispatch])

  // console.log("hello")


  // const {employer, loading } = useSelector((state)=> state.getDataReducer);

// if (loading) return (
//     <div className="flex justify-center items-center w-full min-h-[80vh] bg-black/20">
//       <img
//         src="/unigrowLogo.png"
//         alt="logo"
//         className="w-40 h-16 animate-heartbeat"
//       />
//     </div>
//   );

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
        <Header onMenuClick={handleMenuClick} />
      </div>


      <div className="flex flex-row w-full fixed top-[50px] md:top-[56px]" >
        
        <Sidebar
          collapsed={isCollapsed}
          mobileVisible={mobileVisible}
          onCloseMobile={handleMenuClick}
          />
          <div style={{
            height: "calc(100vh - 50px)",
            width:"100%",
            overflow: "auto"
          }}>

          <Outlet />
          </div>
     
      </div>
    </div>
  );
};

export default EmployerHome;



