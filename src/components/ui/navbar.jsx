import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {  Menu, X } from "lucide-react";
import CandidateLoginModal from "../modals/loginModals/CandidateLoginModal";
import OtpModal from "../modals/loginModals/OtpModal";
import UnigrowOnboardingForm from "../modals/otherModals/createProfileModal";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/getData";
import MenuProfileModal from "../modals/otherModals/menuProfileModal";

export default function Navbar() {
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showProfileModal, setShowProfileModal]= useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [anchor, setAnchor]= useState(null);
  const [profile, setProfile]= useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
   const {employee } = useSelector((state)=>state.getDataReducer);

     const storedUser = localStorage.getItem('User');


 useEffect(() => {
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);

      if (user.profile && !employee) {
        dispatch(fetchUserProfile());
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch, storedUser, employee]);


  useEffect(() => {
    if (employee) {
      setProfile(employee);
    }
  }, [employee]);

 
 


  const handleLogout = () => {
    localStorage.removeItem("TokenId");
    localStorage.removeItem("User");// or sessionStorage
    setIsLoggedIn(false);
    setShowProfileModal(false);
    setProfile(null)
    setMobile("");
    navigate("/")
    window.location.reload();
  };


  const services = [
    {
      title: "AI Resume builder",
      subtitle: "Create your best resume using AI",
      link: "/ai-resume-builder",
    },
    {
      title: "AI Resume checker",
      subtitle: "Get instant resume feedback",
      link: "/ai-resume-checker",
    },
    {
      title: "AI Cover letter generator",
      subtitle: "Stand out and get hired faster",
      link: "/ai-cover-letter-generator",
    },
    {
      title: "Direct connection with recruiter",
      subtitle: "Stand out and get hired faster",
      link: "/recruiter-connection",
    },
    {
      title: "Blog",
      subtitle: "Guidance for securing your dream job",
      link: "/blog",
    },
  ];


  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between w-full h-20 items-center relative">

        <img onClick={() => navigate("/")} src="/unigrowLogo.png" className="w-[7rem] h-auto" alt="Logo" />



        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center ml-auto items-center gap-4 flex flex-row">

          <div className=" flex  flex-row gap-4">
            <Link to="/" className="font-semibold text-16 text-gray-800">Home</Link>
          </div>

            <div
              className="relative"
          
              onClick={()=>navigate("/employerHome/jobs")}
            >
              <button className="flex items-center gap-1 font-semibold text-16 text-gray-800">
                DashBoard 
              </button>
          
            </div>

             <div
              className="relative"
          
              onClick={()=>navigate("/jobsModal/null")}
            >
              <button className="flex items-center gap-1 font-semibold text-16 text-gray-800">
                Post Job 
              </button>
          
            </div>
        </div> 


          <div className="flex items-center gap-4 ml-auto">
            {!isLoggedIn ? (
              <div className="flex flex-row gap-2">
                <button
                  disabled
                  className="bg-blue-500 text-white px-1 md:px-2 py-1 rounded-md text-[0.8rem] md:text-16 font-medium"
                >
                  Candidate Login
                </button>
                <button
                 onClick={() => setShowLoginModal(true)}
                  className="text-blue-500 hover:text-white cursor-pointer bg-white px-1 md:px-2 py-1 rounded-md text-[0.8rem] md:text-16  font-medium hover:bg-secondary transition-colors duration-300 "
                >
                  Employer Login
                </button>
              </div>
            ) : (
              <div>
                {profile ? 
                <div onClick={(e)=>{
                  setAnchor(e.currentTarget);
                  setShowProfileModal(!showProfileModal)
                  
                }
                } className="rounded-[50%] flex justify-center items-center bg-secondary text-white py-3 px-5">
                  <strong>{profile?.fullName?.trim()?.charAt(0).toUpperCase()}</strong>
                </div> :
                  <button
                    onClick={handleLogout}
                    className="bg-secondary text-white px-2 py-1 rounded-md text-16 font-medium"
                  >
                    Logout
                  </button>
                }

              </div>

            )}
          </div>

            <div className="lg:hidden md:hidden flex flex">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md focus:outline-none"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
            </div>

        

        
      </nav>

      {/* Mobile Menu */}
    <Drawer
      anchor="right"
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '50%',
          maxWidth: 300,
          padding: '1.5rem',
        },
      }}
    >
      <IconButton
        onClick={() => setIsMenuOpen(false)}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <X />
      </IconButton>

      <List sx={{ marginTop: 6 }}>
        <ListItem button component={Link} to="/" onClick={() => setIsMenuOpen(false)}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/jobsModal/null" onClick={() => setIsMenuOpen(false)}>
          <ListItemText primary="Post Jobs" />
        </ListItem>
        <ListItem button component={Link} to="/employerHome/jobs" onClick={() => setIsMenuOpen(false)}>
          <ListItemText primary="My Jobs" />
        </ListItem>
        {/* Uncomment if needed */}
        {/* <ListItem button component={Link} to="/contact-us" onClick={() => setIsMenuOpen(false)}>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button component={Link} to="/about-us" onClick={() => setIsMenuOpen(false)}>
          <ListItemText primary="About Us" />
        </ListItem> */}
      </List>
    </Drawer>

      {/* Modals */}
      {showLoginModal && (
        <CandidateLoginModal
          mobile={mobile}
          setMobile={setMobile}
          onClose={() => {
            setShowLoginModal(false);
          }}
          onSubmit={() => {
            setShowOtp(true);
            setShowLoginModal(false)
          }}
        />
      )}
      {showOtp && <OtpModal mobile={mobile} onClose={() => setShowOtp(false)} onSubmit={() => {
        setIsLoggedIn(true)

      }} />}

   
    </>
  );
}
