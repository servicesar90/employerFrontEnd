import { Menu, HelpCircle, Database } from "lucide-react";
import { useRef, useState } from "react";
import MenuProfileModal from "../modals/otherModals/menuProfileModal";
import { profilePicUpload } from "../../API/ApiFunctions";
import UserForm from "../modals/otherModals/uploadFileModal";

const Header = ({ onMenuClick, data, isDataChange }) => {

  const [showProfileModal, setShowprofileModal] = useState(false);




  const avatarRef = useRef();
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer"
          onClick={onMenuClick} />
          <img src="/unigrowLogo.png" alt="Unigrow" className="w-20 h-8" />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
          {/* <Database className="w-5 h-5 text-gray-600" /> */}
          {/* <span>Available Credits</span> */}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span>Support</span>
        </div>
        {/* Avatar circle */}
        <div ref={avatarRef} onClick={() => setShowprofileModal(!showProfileModal)}>

          {data?.profile ? <img src={data?.profile} className="w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer" /> : <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer">
            {data?.name ? data.name.charAt(0).toUpperCase() : ''}

          </div>}
        </div>
      </div>

      {showProfileModal &&
        <MenuProfileModal open={showProfileModal} isDataChange={isDataChange} anchor={avatarRef.current} handleClose={() => setShowprofileModal(false)} data={data} />
      }

      
    

    </header>
  );
};

export default Header;



