import React,{useState} from 'react';
import Header from '../components/ui/header';
import Sidebar from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const EmployerHome = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

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

console.log(`iscollapesd ${isCollapsed} mobilevisible ${mobileVisible}`);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col w-full'>
        <Header onMenuClick={handleMenuClick} />
      </div>
  
    <div className="flex flex-row w-full" >
      {/* <div className='flex w-[15rem]'> */}
        <Sidebar
        collapsed={isCollapsed}
        mobileVisible={mobileVisible}
        onCloseMobile={handleMenuClick} />
      {/* </div> */}

      <div className="flex-1 w-[85rem] ">
    
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default EmployerHome;



