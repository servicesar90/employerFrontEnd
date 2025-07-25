import {
  Menu,
  HelpCircle,
  Database,
  CoinsIcon,
  HandCoins,
  DatabaseIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuProfileModal from "../modals/otherModals/menuProfileModal";
import { fetchCredits, fetchUserProfile } from "../../Redux/getData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GstVerifyModal from "../modals/otherModals/verifyModal";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showProfileModal, setShowprofileModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCredits());
  }, [dispatch]);

  const { employer, jobCredit, dataBaseCredit } = useSelector(
    (state) => state.getDataReducer
  );

  const avatarRef = useRef();

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-4">
          <Menu
            className="w-6 h-6 text-gray-700 cursor-pointer"
            onClick={onMenuClick}
          />
          <img
            id="image"
            src="/unigrowLogo.png"
            alt="Unigrow"
            className="w-20 h-8"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center md:gap-6 gap-3">
          <div
            id="credit"
            className="flex items-center md:gap-3 gap-1 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <div className="flex flex-row md:gap-2 gap-1">
              <HandCoins className="w-5 h-5 text-gray-600" />
              <span> {jobCredit ? jobCredit : 0}</span>
            </div>

            <div className="flex flex-row md:gap-2 gap-1">
              <DatabaseIcon className="w-5 h-5 text-gray-600" />
              <span> {dataBaseCredit ? dataBaseCredit : 0}</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/contact-us")}
            className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="hidden md:flex">Support</span>
          </div>
          {/* Avatar circle */}
          <div
            id="profile"
            ref={avatarRef}
            onClick={() => setShowprofileModal(!showProfileModal)}
          >
            {employer?.profile ? (
              <img
                src={employer?.profile}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer">
                {employer?.name ? employer.name.charAt(0).toUpperCase() : ""}
              </div>
            )}
          </div>
        </div>

        {showProfileModal && (
          <MenuProfileModal
            open={showProfileModal}
            anchor={avatarRef.current}
            handleClose={() => setShowprofileModal(false)}
            data={employer}
            showVerifyModal={() => setShowVerifyModal(true)}
          />
        )}

        {showVerifyModal && (
          <GstVerifyModal
            open={showVerifyModal}
            onClose={() => setShowVerifyModal(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;
