import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CandidateLoginModal from "../components/modals/loginModals/CandidateLoginModal";
import OtpModal from "../components/modals/loginModals/OtpModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Redux/getData";
//import ContactUs from '../components/pages/contactUs'


const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
 

  const { employee } = useSelector((state) => state.getDataReducer);

  const storedUser = localStorage.getItem("User");

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

  // Icons as inline SVG components
  const StarIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );

  const SparklesIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3l7 7 7-7M5 21l7-7 7 7"
      />
    </svg>
  );

  const UsersIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-3-5.197m-3 5.197v1z"
      />
    </svg>
  );

  const BriefcaseIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"
      />
    </svg>
  );

  const TrendingUpIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );

  const ArrowRightIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );

  const SearchIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const TargetIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const BarChart3Icon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  const ZapIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  const ShieldIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const ClockIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CheckCircleIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CalendarIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const ChevronLeftIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRightIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const ChevronDownIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const QuoteIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );

  const AwardIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );

  const UserIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const BookOpenIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const MailIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const PhoneIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const MapPinIcon = ({ className = "h-5 w-5" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const TwitterIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );

  const LinkedinIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const FacebookIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const InstagramIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.26a3.43 3.43 0 00-1.24.485 2.458 2.458 0 00-.909.909 3.43 3.43 0 00-.485 1.24C2.33 3.439 2.208 4.013 2.175 4.96 2.139 5.908 2.126 6.315 2.126 9.936v4.128c0 3.621.013 4.028.048 4.976.033.947.155 1.521.21 2.021.056.5.24.96.485 1.24.25.351.568.669.909.909.28.245.74.429 1.24.485.5.055 1.074.177 2.021.21.948.035 1.355.048 4.976.048h4.128c3.621 0 4.028-.013 4.976-.048.947-.033 1.521-.155 2.021-.21a3.43 3.43 0 001.24-.485 2.458 2.458 0 00.909-.909 3.43 3.43 0 00.485-1.24c.055-.5.177-1.074.21-2.021.035-.948.048-1.355.048-4.976V9.936c0-3.621-.013-4.028-.048-4.976-.033-.947-.155-1.521-.21-2.021a3.43 3.43 0 00-.485-1.24 2.458 2.458 0 00-.909-.909 3.43 3.43 0 00-1.24-.485c-.5-.055-1.074-.177-2.021-.21C16.045.013 15.638 0 12.017 0z" />
    </svg>
  );

  const MenuIcon = ({ className = "h-6 w-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const XIcon = ({ className = "h-6 w-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // Inline Button Component
  const Button = ({
    children,
    className = "",
    size = "default",
    variant = "default",
    ...props
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    };

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary",
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  };

  // Inline Card Component
  const Card = ({ children, className = "", ...props }) => (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  const CardContent = ({ children, className = "", ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );

  // Inline Badge Component
  const Badge = ({
    children,
    className = "",
    variant = "default",
    ...props
  }) => {
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
    };

    const classes = `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`;

    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  };

  // Reduced floating elements for better performance
  const floatingElements = [
    { icon: StarIcon, delay: 0, x: 80, y: 40 },
    { icon: SparklesIcon, delay: 2, x: -60, y: 60 },
  ];

  const companies = [
    { name: "TechCorp", logo: "TC", color: "from-blue-500 to-blue-600" },
    { name: "InnovateLab", logo: "IL", color: "from-purple-500 to-purple-600" },
    { name: "DataFlow", logo: "DF", color: "from-green-500 to-green-600" },
    { name: "CloudSync", logo: "CS", color: "from-orange-500 to-orange-600" },
    { name: "Dynamics", logo: "AD", color: "from-red-500 to-red-600" },
    { name: "FutureWork", logo: "FW", color: "from-teal-500 to-teal-600" },
    { name: "CodeCraft", logo: "CC", color: "from-indigo-500 to-indigo-600" },
    { name: "NextGen", logo: "NG", color: "from-pink-500 to-pink-600" },
  ];

  const features = [
    {
      icon: TargetIcon,
      title: "Smart Matching",
      description:
        "Our advanced algorithm analyzes 50+ data points including skills, experience, cultural fit, and personality traits to find your perfect candidates.",
      color: "from-blue-500 to-blue-600",
      stats: "98% accuracy",
      delay: 0,
    },
    {
      icon: BarChart3Icon,
      title: "Real-time Analytics",
      description:
        "Track your hiring progress with detailed insights, conversion rates, and performance metrics updated in real-time with interactive dashboards.",
      color: "from-purple-500 to-purple-600",
      stats: "24/7 insights",
      delay: 0.1,
    },
    {
      icon: ZapIcon,
      title: "Lightning Fast Hiring",
      description:
        "Reduce time-to-hire by 70% with our streamlined process, automated screening, and instant candidate notifications.",
      color: "from-orange-500 to-orange-600",
      stats: "70% faster",
      delay: 0.2,
    },
    {
      icon: ShieldIcon,
      title: "Verified Candidates",
      description:
        "All candidates undergo comprehensive verification including skills assessment, background checks, and reference validation.",
      color: "from-green-500 to-green-600",
      stats: "100% verified",
      delay: 0.3,
    },
    {
      icon: ClockIcon,
      title: "24/7 Expert Support",
      description:
        "Get dedicated support from our hiring experts, account managers, and technical team whenever you need assistance.",
      color: "from-red-500 to-red-600",
      stats: "Always available",
      delay: 0.4,
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description:
        "Collaborate seamlessly with your team through shared dashboards, feedback tools, and integrated decision-making workflows.",
      color: "from-teal-500 to-teal-600",
      stats: "Unlimited users",
      delay: 0.5,
    },
  ];

  const dashboardFeatures = [
    {
      label: "Active Jobs",
      value: "24",
      icon: BarChart3Icon,
      color: "blue",
      trend: "+12%",
    },
    {
      label: "New Candidates",
      value: "156",
      icon: UsersIcon,
      color: "green",
      trend: "+8%",
    },
    {
      label: "Interviews Scheduled",
      value: "18",
      icon: CalendarIcon,
      color: "purple",
      trend: "+15%",
    },
    {
      label: "Avg Response Time",
      value: "2.4h",
      icon: ClockIcon,
      color: "orange",
      trend: "-20%",
    },
  ];

  const activities = [
    {
      name: "Sarah Johnson",
      action: "Applied for Senior Developer",
      time: "2 min ago",
      avatar: "SJ",
      status: "new",
    },
    {
      name: "Mike Chen",
      action: "Interview completed",
      time: "1 hour ago",
      avatar: "MC",
      status: "completed",
    },
    {
      name: "Emma Davis",
      action: "Profile viewed",
      time: "3 hours ago",
      avatar: "ED",
      status: "viewed",
    },
    {
      name: "Alex Rodriguez",
      action: "Skills test passed",
      time: "5 hours ago",
      avatar: "AR",
      status: "passed",
    },
  ];

  const benefits = [
    {
      icon: BarChart3Icon,
      title: "Advanced Analytics Dashboard",
      description:
        "Get comprehensive insights into your hiring funnel with real-time analytics, conversion tracking, source performance, and team productivity metrics.",
      features: [
        "Real-time conversion tracking",
        "Source performance analytics",
        "Team productivity insights",
        "Custom reporting tools",
      ],
    },
    {
      icon: CalendarIcon,
      title: "Smart Interview Scheduling",
      description:
        "Seamlessly coordinate interviews with scheduling, integrated calendar management, and automated reminder systems.",
      features: [
        "Scheduling",
        "Calendar integration",
        "Automated reminders",
        "Timezone optimization",
      ],
    },
    {
      icon: UsersIcon,
      title: "Collaborative Team Hiring",
      description:
        "Enable your entire team to participate in the hiring process with shared feedback systems, collaborative decision-making tools, and workflow automation.",
      features: [
        "Team feedback system",
        "Shared candidate notes",
        "Decision workflows",
        "Role-based permissions",
      ],
    },
  ];

  const testimonials = [
    {
      
      text: "Unigrow Talent transformed our hiring process completely. We reduced our time-to-hire by 60% and found candidates that are perfect cultural fits. The matching is incredibly accurate.",
      stats: { hired: 45, timeReduced: "60%" },
    },
    {
      
      text: "As a startup, we needed to hire fast without compromising quality. Unigrow Talent delivered exceptional candidates within days. The platform is intuitive and the support team is fantastic.",
      stats: { hired: 12, timeReduced: "75%" },
    },
    {
      
      text: "The quality of candidates we receive through Unigrow Talent is unmatched. The pre-screening process saves us countless hours, and the analytics help us make data-driven hiring decisions.",
      stats: { hired: 28, timeReduced: "50%" },
    },
    {
      
      text: "We have tried multiple hiring platforms, but Unigrow Talent stands out. The candidate quality is exceptional, and the collaborative features make team hiring decisions seamless.",
      stats: { hired: 67, timeReduced: "65%" },
    },
  ];

  const stats = [
    {
      icon: BriefcaseIcon,
      value: "50K+",
      label: "Jobs Filled",
      description: "Successfully matched positions",
      color: "from-blue-500 to-blue-600",
      delay: 0,
    },
    {
      icon: UsersIcon,
      value: "1M+",
      label: "Active Candidates",
      description: "Qualified professionals ready to work",
      color: "from-green-500 to-green-600",
      delay: 0.1,
    },
    {
      icon: StarIcon,
      value: "4.9",
      label: "Average Rating",
      description: "From employers worldwide",
      color: "from-yellow-500 to-yellow-600",
      delay: 0.2,
    },
    {
      icon: ClockIcon,
      value: "24h",
      label: "Average Hire Time",
      description: "From posting to final decision",
      color: "from-purple-500 to-purple-600",
      delay: 0.3,
    },
    {
      icon: TrendingUpIcon,
      value: "95%",
      label: "Success Rate",
      description: "Candidates still employed after 1 year",
      color: "from-red-500 to-red-600",
      delay: 0.4,
    },
    {
      icon: AwardIcon,
      value: "15K+",
      label: "Happy Employers",
      description: "Companies that hired through us",
      color: "from-indigo-500 to-indigo-600",
      delay: 0.5,
    },
  ];

  const faqs = [
    {
      question: "How does Unigrow Talent match candidates to job postings?",
      answer:
        "Our  matching system analyzes multiple factors including skills, experience, location preferences, salary expectations, and cultural fit indicators. The algorithm continuously learns from successful matches to improve accuracy over time.",
    },
    {
      question: "What is the average time to fill a position?",
      answer:
        "Most positions are filled within 2-4 weeks, which is 60% faster than traditional hiring methods. For urgent roles, our priority posting feature can deliver qualified candidates within 24-48 hours.",
    },
    {
      question: "How do you verify candidate qualifications?",
      answer:
        "We use a comprehensive verification process including skill assessments, background checks, reference verification, and portfolio reviews. All candidates must pass our screening before being eligible for matching.",
    },
    {
      question: "Can I collaborate with my team during the hiring process?",
      answer:
        "Absolutely! Unigrow Talent includes built-in collaboration tools allowing team members to leave feedback, rate candidates, schedule interviews, and make collective decisions through our shared dashboard.",
    },
    {
      question: "What pricing plans do you offer?",
      answer:
        "We offer flexible pricing including pay-per-post, monthly subscriptions, and enterprise packages. All plans include candidate matching, basic analytics, and customer support. Contact us for custom pricing based on your hiring volume.",
    },
    {
      question: "Do you offer customer support and training?",
      answer:
        "Yes, we provide 24/7 customer support, comprehensive onboarding, and ongoing training resources. Enterprise clients receive dedicated account managers and personalized support.",
    },
    {
      question: "Can I post jobs in multiple locations or remote positions?",
      answer:
        "Yes, you can post jobs for any location worldwide or specify remote work options. Our platform supports multi-location postings and has a global candidate database spanning over 100 countries.",
    },
    {
      question: "How do you ensure data security and privacy?",
      answer:
        "We maintain enterprise-grade security with SOC 2 compliance, end-to-end encryption, and strict data privacy protocols. All candidate and company data is protected according to GDPR and other international privacy standards.",
    },
  ];

  const articles = [
    {
      title: "How to Write Job Descriptions That Attract Top Talent",
      excerpt:
        "Learn the key elements of compelling job descriptions that resonate with qualified candidates and improve your application rates.",
      author: "Ramesh kaul",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "Hiring Tips",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      title: "Mastering Remote Interview Techniques",
      excerpt:
        "Best practices for conducting effective virtual interviews that help you evaluate candidates accurately in a remote setting.",
      author: "Aditya Chuhan",
      date: "Jan 12, 2025",
      readTime: "7 min read",
      category: "Interviewing",
      image: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "2024 Salary Trends Across Tech Industries",
      excerpt:
        "Comprehensive analysis of salary trends and compensation packages to help you make competitive offers.",
      author: "Mansi Awasthi",
      date: "Feb 10, 2025",
      readTime: "8 min read",
      category: "Market Insights",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
    },
  ];

  const seals = [
    {
      icon: ShieldIcon,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security standards",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: AwardIcon,
      title: "ISO 27001 Certified",
      description: "Information security management",
      color: "from-green-500 to-green-600",
    },
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckCircleIcon,
      title: "GDPR Compliant",
      description: "Data privacy protection",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const footerSections = [
    {
      title: "Platform",
      links: [
        "Post a Job",
        "Browse Candidates",
        "Pricing Plans",
        "Success Stories",
        "How It Works",
      ],
    },
    {
      title: "Resources",
      links: [
        "Hiring Guide",
        "Interview Tips",
        "Salary Insights",
        "Industry Reports",
        "Blog",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Live Chat",
        "Video Tutorials",
        "API Documentation",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners", "Investors"],
    },
  ];

  const socialLinks = [
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex z-0 items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <StarIcon className="h-4 w-4" />
                <span>🚀 #1 Hiring Platform 2024</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                <span className="block">Hire Top Talent</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Faster Than Ever
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Connect with qualified candidates instantly using our{" "}
                <span className="text-blue-600 font-semibold">Platform</span>{" "}
                that matches you with perfect talent for your company's needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white group"
                  onClick={() => navigate("/employerHome")}
                >
                  <BriefcaseIcon className="w-5 h-5 mr-2" />
                  Post a Job Now
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <SearchIcon className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button> */}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              >
                {[
                  {
                    icon: UsersIcon,
                    value: "1M+",
                    label: "Active Candidates",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    icon: BriefcaseIcon,
                    value: "50K+",
                    label: "Jobs Posted",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    icon: TrendingUpIcon,
                    value: "95%",
                    label: "Success Rate",
                    color: "from-green-400 to-green-600",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Dashboard Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Smart Matching
                      </h3>
                      <p className="text-sm text-gray-600">
                        98% compatibility found
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {["red", "yellow", "green"].map((color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-${color}-400`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Candidate Matches */}
                <div className="p-6 space-y-4">
                  {[
                    {
                      role: "Senior Frontend Developer",
                      match: "98%",
                      color: "green",
                    },
                    {
                      role: "Full Stack Engineer",
                      match: "95%",
                      color: "blue",
                    },
                    { role: "UI/UX Designer", match: "92%", color: "purple" },
                  ].map((candidate, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {candidate.role}
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-${candidate.color}-100 text-${candidate.color}-700`}
                      >
                        {candidate.match}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    Live Candidates
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    247 online now
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24h</div>
                  <div className="text-sm text-gray-600">Avg. Hire Time</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-gray-600 font-medium">
                Trusted Worldwide
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join <span className="text-blue-600">15,000+ Companies</span>{" "}
              Hiring Successfully
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From startups to Fortune 500 companies, leading organizations
              trust Unigrow Talent to find their perfect matches
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="group relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${company.color} rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3`}
                    >
                      {company.logo}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">
              15,000+ Companies
            </div>
            <div className="text-gray-600">Actively Hiring</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <SparklesIcon className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-blue-600 font-medium">
                Why Choose Unigrow Talent
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Future of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Hiring
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of hiring with powerful features
              designed to streamline your recruitment process and connect you
              with top talent faster than ever before.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 group-hover:from-white group-hover:to-blue-50">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="" className="bg-gray-100 text-gray-700">
                        {feature.stats}
                      </Badge>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Hiring?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of companies already using Unigrow Talent to
                build their dream teams
              </p>
              <Button
                size="lg"
                className="bg-[#2563EB] text-blue-600 "
                onClick={() => setShowLoginModal(true)}
              >
                <ArrowRightIcon className="w-5 h-5 mr-2" />
                Start Hiring Today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="text-blue-600">Hire Smarter</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and intelligent insights to make data-driven hiring
              decisions and build your dream team faster than ever before
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Hiring Dashboard
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Real-time insights
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {["red", "yellow", "green"].map((color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-${color}-400`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="p-6 grid grid-cols-2 gap-4">
                  {dashboardFeatures.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon
                          className={`h-5 w-5 text-${stat.color}-600`}
                        />
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full bg-${stat.color}-100 text-${stat.color}-700`}
                        >
                          {stat.trend}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Activity Feed */}
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Live Activity Feed
                  </h4>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 py-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 mb-1">
                    98% Match
                  </div>
                  <div className="text-xs text-gray-600">
                    Perfect candidate found
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">+47%</div>
                  <div className="text-xs text-gray-600">Hiring Speed</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Employers <span className="text-blue-600">Say About Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of companies that have revolutionized their hiring
              process
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12"
              >
                <div className="text-center">
                  <QuoteIcon className="h-8 w-8 text-blue-500 mx-auto mb-6" />
                  <blockquote className="text-xl lg:text-2xl text-gray-900 font-medium mb-8 leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonials[currentIndex].image}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonials[currentIndex].title} at{" "}
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div> */}

                  

                  <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {testimonials[currentIndex].stats.hired}
                      </div>
                      <div className="text-sm text-gray-600">
                        Successful Hires
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {testimonials[currentIndex].stats.timeReduced}
                      </div>
                      <div className="text-sm text-gray-600">Time Reduced</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Industry Leaders{" "}
              <span className="text-blue-300">Worldwide</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our numbers speak for themselves. Join thousands of companies that
              have transformed their hiring process with Unigrow Talent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-blue-200">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-blue-200 mb-6">
              Join the growing community of successful employers
            </p>
            <Button
              size="lg"
              className="bg-[#2563EB] text-blue-900 "
              onClick={() => setShowLoginModal(true)}
            >
              Start Hiring Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about hiring with Unigrow Talent
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you succeed with your hiring
              goals.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate("/contact-us")}>
              Contact Support
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hiring <span className="text-blue-600">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights and practical guides to help you hire better,
              faster, and smarter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Article Image */}
                  <div className={`h-48 ${article.image} relative`}>
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{article.date}</span>
                        <span className="font-medium">{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 -mb-15"
          ></motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted & Secure Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your data and hiring process are protected by industry-leading
              security standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {seals.map((seal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${seal.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <seal.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {seal.title}
                </h3>
                <p className="text-sm text-gray-600">{seal.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              Bank-level encryption • 99.9% uptime • Regular security audits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                Unigrow Talent
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-left">
                The world's leading talent acquisition platform, connecting
                exceptional candidates with forward-thinking companies since
                2025.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <MailIcon className="h-4 w-4 mr-3" />
                  sales@unigrowtalent.com
                </div>
                <div className="flex items-center text-gray-400">
                  <PhoneIcon className="h-4 w-4 mr-3" />
                  +91 120-4178-702
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPinIcon className="w-7 mr-3" />
                  <p className="text-left">Office No:-435A, 4th Floor Orbit Plaza, Crossing Republic
                  Ghaziabad, India</p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          {/* <div className="py-8 border-t border-gray-800">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-gray-400">
                  Get the latest hiring insights and platform updates.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div> */}

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
            {/* Social Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2025 Unigrow Talent. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
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
            setShowLoginModal(false);
          }}
        />
      )}
      {showOtp && (
        <OtpModal
          mobile={mobile}
          onClose={() => setShowOtp(false)}
          onSubmit={() => {
            setIsLoggedIn(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;
