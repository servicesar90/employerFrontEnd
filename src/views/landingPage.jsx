


import Navbar from "../components/ui/navbar";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Target,
  ChevronDown,
  Bell,
  Search,
  Building2,
  Sparkles,
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
  Zap,
  Star,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
  Award,
  HelpCircle,
  User,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";


const LandingPage = () => {

   
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);



  
  const floatingElements = [
    { icon: Star, delay: 0, x: 100, y: 50 },
    { icon: Zap, delay: 1, x: -80, y: 80 },
    { icon: Sparkles, delay: 2, x: 120, y: -60 },
    { icon: Users, delay: 0.5, x: -100, y: -40 },
  ];
  const companies = [
    { name: "TechCorp", logo: "TC", color: "from-blue-500 to-blue-600" },
    { name: "InnovateLab", logo: "IL", color: "from-purple-500 to-purple-600" },
    { name: "DataFlow", logo: "DF", color: "from-green-500 to-green-600" },
    { name: "CloudSync", logo: "CS", color: "from-orange-500 to-orange-600" },
    { name: "AI Dynamics", logo: "AD", color: "from-red-500 to-red-600" },
    { name: "FutureWork", logo: "FW", color: "from-teal-500 to-teal-600" },
    { name: "CodeCraft", logo: "CC", color: "from-indigo-500 to-indigo-600" },
    { name: "NextGen", logo: "NG", color: "from-pink-500 to-pink-600" },
  ];
  const features = [
    {
      icon: Target,
      title: "Smart AI Matching",
      description:
        "Our advanced AI algorithm analyzes 50+ data points including skills, experience, cultural fit, and personality traits to find your perfect candidates.",
      color: "from-blue-500 to-blue-600",
      stats: "98% accuracy",
      delay: 0,
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track your hiring progress with detailed insights, conversion rates, and performance metrics updated in real-time with interactive dashboards.",
      color: "from-purple-500 to-purple-600",
      stats: "24/7 insights",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Lightning Fast Hiring",
      description:
        "Reduce time-to-hire by 70% with our streamlined process, automated screening, and instant candidate notifications.",
      color: "from-orange-500 to-orange-600",
      stats: "70% faster",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Verified Candidates",
      description:
        "All candidates undergo comprehensive verification including skills assessment, background checks, and reference validation.",
      color: "from-green-500 to-green-600",
      stats: "100% verified",
      delay: 0.3,
    },
    {
      icon: Clock,
      title: "24/7 Expert Support",
      description:
        "Get dedicated support from our hiring experts, account managers, and technical team whenever you need assistance.",
      color: "from-red-500 to-red-600",
      stats: "Always available",
      delay: 0.4,
    },
    {
      icon: Users,
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
      icon: BarChart3,
      color: "blue",
      trend: "+12%",
    },
    {
      label: "New Candidates",
      value: "156",
      icon: Users,
      color: "green",
      trend: "+8%",
    },
    {
      label: "Interviews Scheduled",
      value: "18",
      icon: Calendar,
      color: "purple",
      trend: "+15%",
    },
    {
      label: "Avg Response Time",
      value: "2.4h",
      icon: Clock,
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
      icon: BarChart3,
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
      icon: Calendar,
      title: "Smart Interview Scheduling",
      description:
        "Seamlessly coordinate interviews with AI-powered scheduling, integrated calendar management, and automated reminder systems.",
      features: [
        "AI-powered scheduling",
        "Calendar integration",
        "Automated reminders",
        "Timezone optimization",
      ],
    },
    {
      icon: Users,
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
      name: "Sarah Mitchell",
      title: "HR Director",
      company: "TechCorp Solutions",
      image: "SM",
      rating: 5,
      text: "TalentHire transformed our hiring process completely. We reduced our time-to-hire by 60% and found candidates that are perfect cultural fits. The AI matching is incredibly accurate.",
      stats: { hired: 45, timeReduced: "60%" },
    },
    {
      name: "David Chen",
      title: "Startup Founder",
      company: "InnovateLab",
      image: "DC",
      rating: 5,
      text: "As a startup, we needed to hire fast without compromising quality. TalentHire delivered exceptional candidates within days. The platform is intuitive and the support team is fantastic.",
      stats: { hired: 12, timeReduced: "75%" },
    },
    {
      name: "Maria Rodriguez",
      title: "VP of Engineering",
      company: "DataFlow Inc",
      image: "MR",
      rating: 5,
      text: "The quality of candidates we receive through TalentHire is unmatched. The pre-screening process saves us countless hours, and the analytics help us make data-driven hiring decisions.",
      stats: { hired: 28, timeReduced: "50%" },
    },
    {
      name: "James Wilson",
      title: "Talent Acquisition Lead",
      company: "CloudSync",
      image: "JW",
      rating: 5,
      text: "We have tried multiple hiring platforms, but TalentHire stands out. The candidate quality is exceptional, and the collaborative features make team hiring decisions seamless.",
      stats: { hired: 67, timeReduced: "65%" },
    },
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
  const stats = [
    {
      icon: Briefcase,
      value: "50K+",
      label: "Jobs Filled",
      description: "Successfully matched positions",
      color: "from-blue-500 to-blue-600",
      delay: 0,
    },
    {
      icon: Users,
      value: "1M+",
      label: "Active Candidates",
      description: "Qualified professionals ready to work",
      color: "from-green-500 to-green-600",
      delay: 0.1,
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      description: "From employers worldwide",
      color: "from-yellow-500 to-yellow-600",
      delay: 0.2,
    },
    {
      icon: Clock,
      value: "24h",
      label: "Average Hire Time",
      description: "From posting to final decision",
      color: "from-purple-500 to-purple-600",
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Candidates still employed after 1 year",
      color: "from-red-500 to-red-600",
      delay: 0.4,
    },
    {
      icon: Award,
      value: "15K+",
      label: "Happy Employers",
      description: "Companies that hired through us",
      color: "from-indigo-500 to-indigo-600",
      delay: 0.5,
    },
  ];
  const faqs = [
    {
      question: "How does TalentHire match candidates to job postings?",
      answer:
        "Our AI-powered matching system analyzes multiple factors including skills, experience, location preferences, salary expectations, and cultural fit indicators. The algorithm continuously learns from successful matches to improve accuracy over time.",
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
        "Absolutely! TalentHire includes built-in collaboration tools allowing team members to leave feedback, rate candidates, schedule interviews, and make collective decisions through our shared dashboard.",
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
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Hiring Tips",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      title: "Mastering Remote Interview Techniques",
      excerpt:
        "Best practices for conducting effective virtual interviews that help you evaluate candidates accurately in a remote setting.",
      author: "Mike Chen",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      category: "Interviewing",
      image: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "2024 Salary Trends Across Tech Industries",
      excerpt:
        "Comprehensive analysis of salary trends and compensation packages to help you make competitive offers.",
      author: "Lisa Rodriguez",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      category: "Market Insights",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
    },
  ];
  const seals = [
    {
      icon: Shield,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security standards",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      title: "ISO 27001 Certified",
      description: "Information security management",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckCircle,
      title: "GDPR Compliant",
      description: "Data privacy protection",
      color: "from-orange-500 to-orange-600",
    },
  ];
   const footerSections = [
      {
        title: 'Platform',
        links: [
          'Post a Job',
          'Browse Candidates',
          'Pricing Plans',
          'Success Stories',
          'How It Works'
        ]
      },
      {
        title: 'Resources',
        links: [
          'Hiring Guide',
          'Interview Tips',
          'Salary Insights',
          'Industry Reports',
          'Blog'
        ]
      },
      {
        title: 'Support',
        links: [
          'Help Center',
          'Contact Us',
          'Live Chat',
          'Video Tutorials',
          'API Documentation'
        ]
      },
      {
        title: 'Company',
        links: [
          'About Us',
          'Careers',
          'Press',
          'Partners',
          'Investors'
        ]
      }
    ];
  
    const socialLinks = [
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Instagram, href: '#', label: 'Instagram' }
    ];

  return (
    <div >
      <Navbar />
  
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#a0d3ef] via-[#0584C8] to-[#8dc0dc]">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [-50, 50, -50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute z-10"
            style={{
              left: `${50 + element.x}px`,
              top: `${50 + element.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + element.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <element.icon className="w-6 h-6 text-white/80" />
            </div>
          </motion.div>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white relative z-20"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <span className="text-sm font-medium">
                  🚀 #1 Hiring Platform 2024
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Hire Top Talent
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Faster Than Ever
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-xl sm:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl"
              >
                Connect with qualified candidates instantly using our{" "}
                <motion.span
                  className="text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  AI-powered platform
                </motion.span>{" "}
                that matches you with perfect talent for your company's needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-6 mb-12"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(255, 255, 255, 0.2)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center px-10 py-5 bg-white text-[#0c39cf] text-lg font-bold rounded-2xl overflow-hidden shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Post a Job Now</span>
                  <motion.div
                    className="relative z-10 ml-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                >
                  <motion.span whileHover={{ scale: 1.05 }}>
                    Watch Demo
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="grid grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: Users,
                    value: "1M+",
                    label: "Active Candidates",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    icon: Briefcase,
                    value: "50K+",
                    label: "Jobs Posted",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    icon: TrendingUp,
                    value: "95%",
                    label: "Success Rate",
                    color: "from-green-400 to-green-600",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                      className="text-3xl font-bold text-white mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-blue-200 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Right Content - Interactive Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative z-20"
            >
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Main Dashboard Card */}
                <motion.div
                  animate={{
                    y: [-15, 15, -15],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative z-10 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-14 h-14 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Users className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          Smart Matching
                        </h3>
                        <motion.p
                          className="text-gray-600"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          98% compatibility found
                        </motion.p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
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
                        key={candidate.role}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 + index * 0.3 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`w-3 h-3 bg-${candidate.color}-500 rounded-full`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                          />
                          <span className="font-semibold text-gray-700 group-hover:text-[#0c39cf] transition-colors">
                            {candidate.role}
                          </span>
                        </div>
                        <motion.span
                          className={`text-${candidate.color}-600 font-bold text-lg`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {candidate.match}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Floating Elements */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-3, 3, -3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 z-20 border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-4 h-4 bg-green-500 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-800">
                        Live Candidates
                      </div>
                      <div className="text-xs text-gray-600">
                        247 online now
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    rotate: [3, -3, 3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 z-20 border border-white/20"
                >
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-[#0c39cf] mb-1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      24h
                    </motion.div>
                    <div className="text-xs text-gray-600 font-medium">
                      Avg. Hire Time
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    x: [-2, 2, -2],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 -left-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-4 z-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Star className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-32 h-32 border border-blue-200 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-24 h-24 border border-purple-200 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0c39cf]/10 to-[#336ECF]/10 rounded-full px-6 py-3 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-[#336ECF]" />
              </motion.div>
              <span className="text-sm font-semibold text-[#0c39cf] uppercase tracking-wide">
                Trusted Worldwide
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join{" "}
              <motion.span
                className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                15,000+ Companies
              </motion.span>{" "}
              Hiring Successfully
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From startups to Fortune 500 companies, leading organizations
              trust TalentHire to find their perfect matches
            </motion.p>
          </motion.div>

          {/* Enhanced Company Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -10,
                  rotateY: 10,
                  rotateX: 5,
                }}
                className="group cursor-pointer perspective-1000"
              >
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 group-hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    whileHover={{
                      boxShadow: "0 25px 50px rgba(12, 57, 207, 0.2)",
                      borderColor: "#336ECF",
                    }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${company.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {company.logo}
                    </motion.div>

                    {/* Hover effect overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#0c39cf]/10 to-[#336ECF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <motion.span
                    className="block text-sm text-gray-600 font-semibold text-center group-hover:text-[#336ECF] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {company.name}
                  </motion.span>

                  {/* Floating particles on hover */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-2 h-2 bg-[#336ECF] rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [-5, -15, -5],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 inline-block">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.2, z: 10 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-full border-3 border-white flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      <span className="text-white text-sm font-bold">{i}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Building2 className="w-8 h-8 text-[#336ECF]" />
                  </motion.div>
                  <div className="text-left">
                    <motion.div
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      15,000+ Companies
                    </motion.div>
                    <div className="text-gray-600 font-medium">
                      Actively Hiring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-96 h-96 border-2 border-[#0c39cf] rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-80 h-80 border-2 border-[#336ECF] rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0c39cf]/10 to-[#336ECF]/10 rounded-full px-8 py-4 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-[#336ECF]" />
              </motion.div>
              <span className="text-lg font-bold text-[#0c39cf]">
                Why Choose TalentHire
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The Future of{" "}
              <motion.span
                className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Smart Hiring
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the next generation of hiring with powerful AI-driven
              features designed to streamline your recruitment process and
              connect you with top talent faster than ever before.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: feature.delay,
                  type: "spring",
                  bounce: 0.3,
                }}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className="group perspective-1000"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full overflow-hidden">
                  {/* Background gradient on hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-[#0c39cf]/5 to-[#336ECF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      y: -10,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-2xl transition-all duration-500`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />

                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30`}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0c39cf] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>

                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>

                  {/* Stats badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: feature.delay + 0.3 }}
                    className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 group-hover:bg-[#0c39cf] group-hover:text-white transition-all duration-300"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: feature.delay,
                      }}
                      className="w-2 h-2 bg-[#336ECF] rounded-full group-hover:bg-white"
                    />
                    <span className="text-sm font-semibold">
                      {feature.stats}
                    </span>
                  </motion.div>

                  {/* Animated progress bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: feature.delay + 0.5 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                  />

                  {/* Hover arrow */}
                  <motion.div
                    className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.2, x: 5 }}
                  >
                    <ArrowRight className="w-6 h-6 text-[#336ECF]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-3xl p-12 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 right-0 w-64 h-64 border border-white rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute bottom-0 left-0 w-48 h-48 border border-white rounded-full"
                />
              </div>

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl sm:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Ready to Transform Your Hiring?
                </motion.h3>

                <motion.p
                  className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  Join thousands of companies already using TalentHire to build
                  their dream teams
                </motion.p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="group relative px-12 py-5 bg-white text-[#0c39cf] text-xl font-bold rounded-2xl overflow-hidden shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Start Hiring Today
                    <motion.div
                      className="ml-3"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-64 h-64 border-2 border-blue-300 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-48 h-48 border-2 border-purple-300 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Everything You Need to{" "}
              <motion.span
                className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Hire Smarter
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Powerful tools and intelligent insights to make data-driven hiring
              decisions and build your dream team faster than ever before
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Enhanced Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden"
              >
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-xl flex items-center justify-center"
                    >
                      <BarChart3 className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Hiring Dashboard
                      </h3>
                      <p className="text-gray-600">Real-time insights</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {["red", "yellow", "green"].map((color, i) => (
                      <motion.div
                        key={color}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className={`w-3 h-3 bg-${color}-500 rounded-full`}
                      />
                    ))}
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {dashboardFeatures.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`bg-${stat.color}-50 border border-${stat.color}-100 rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            className={`w-12 h-12 bg-${stat.color}-500 rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <stat.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + index * 0.1,
                            }}
                            className={`text-sm font-semibold text-${stat.color}-600 bg-${stat.color}-100 px-2 py-1 rounded-full`}
                          >
                            {stat.trend}
                          </motion.span>
                        </div>

                        <motion.div
                          className={`text-3xl font-bold text-${stat.color}-600 mb-2`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            bounce: 0.5,
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Activity Feed */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700 mb-4 flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-2 h-2 bg-green-500 rounded-full mr-3"
                    />
                    Live Activity Feed
                  </h4>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {activity.avatar}
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-[#0c39cf] transition-colors">
                          {activity.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {activity.action}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className={`w-3 h-3 rounded-full ${
                          activity.status === "new"
                            ? "bg-green-500"
                            : activity.status === "completed"
                            ? "bg-blue-500"
                            : activity.status === "viewed"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 z-20 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      98% Match
                    </div>
                    <div className="text-sm text-gray-600">
                      Perfect candidate found
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [2, -2, 2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-6 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-2xl shadow-2xl p-6 z-20 text-white"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  </motion.div>
                  <div className="text-lg font-bold">+47%</div>
                  <div className="text-sm opacity-90">Hiring Speed</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-start space-x-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-2xl transition-all duration-500"
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <motion.h3
                        className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0c39cf] transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {benefit.title}
                      </motion.h3>

                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {benefit.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefit.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5 + idx * 0.1,
                            }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-[#0c39cf]/5 transition-all duration-300 group/item"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.4 }}
                            >
                              <CheckCircle className="w-5 h-5 text-[#336ECF] group-hover/item:text-[#0c39cf]" />
                            </motion.div>
                            <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#0c39cf] transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Employers{" "}
              <span className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of companies that have revolutionized their hiring
              process
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0c39cf]/5 to-[#336ECF]/5 rounded-full -translate-y-32 translate-x-32"></div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <Quote className="w-12 h-12 text-[#336ECF] opacity-50" />

                    <blockquote className="text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[currentIndex].image}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600">
                          {testimonials[currentIndex].title} at{" "}
                          {testimonials[currentIndex].company}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(testimonials[currentIndex].rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0c39cf] mb-2">
                          {testimonials[currentIndex].stats.hired}
                        </div>
                        <div className="text-gray-600 font-medium">
                          Successful Hires
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#336ECF] mb-2">
                          {testimonials[currentIndex].stats.timeReduced}
                        </div>
                        <div className="text-gray-600 font-medium">
                          Time Reduced
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrevious}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#0c39cf] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNext}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-[#0c39cf] via-[#093EB2] to-[#336ECF] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Trusted by Industry Leaders{" "}
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our numbers speak for themselves. Join thousands of companies that
              have transformed their hiring process with TalentHire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: stat.delay + 0.2,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-blue-100 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: stat.delay + 0.4 }}
                    className="h-1 bg-gradient-to-r from-white/30 to-white/60 rounded-full mt-6"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 inline-block border border-white/20">
              <p className="text-blue-100 text-lg mb-4">
                Join the growing community of successful employers
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#0c39cf] font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
              >
                Start Hiring Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-[#336ECF] mr-2" />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Everything you need to know about hiring with TalentHire
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)" }}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-[#336ECF]" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"
                        />
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-[#0c39cf]/5 to-[#336ECF]/5 rounded-2xl p-8 border border-[#336ECF]/10">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you succeed with your hiring
                goals.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(12, 57, 207, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#0c39cf] to-[#336ECF] text-white font-semibold rounded-lg hover:from-[#093EB2] hover:to-[#0c39cf] transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-[#336ECF] mr-2" />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Hiring{" "}
                <span className="bg-gradient-to-r from-[#0c39cf] to-[#336ECF] bg-clip-text text-transparent">
                  Resources
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights and practical guides to help you hire better,
              faster, and smarter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  {/* Article Image */}
                  <div
                    className={`h-48 ${article.image} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-[#0c39cf] group-hover:translate-x-0.5 transition-all duration-300" />
                    </motion.div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0c39cf] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <span className="font-medium text-[#336ECF]">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(12, 57, 207, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0c39cf] to-[#336ECF] text-white font-semibold rounded-xl hover:from-[#093EB2] hover:to-[#0c39cf] transition-all duration-300 group"
            >
              <span>View All Articles</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted & Secure Platform
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your data and hiring process are protected by industry-leading
              security standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seals.map((seal, index) => (
              <motion.div
                key={seal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${seal.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}
                >
                  <seal.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0c39cf] transition-colors">
                  {seal.title}
                </h4>

                <p className="text-gray-600 text-sm">{seal.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 text-[#336ECF]" />
              <span className="text-gray-700 font-medium">
                Bank-level encryption • 99.9% uptime • Regular security audits
              </span>
            </div>
          </motion.div>
        </div>
      </section>
       <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Footer Content */}
              <div className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                  {/* Company Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0c39cf] to-[#336ECF] rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold">TalentHire</span>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      The world's leading talent acquisition platform, connecting exceptional 
                      candidates with forward-thinking companies since 2020.
                    </p>
      
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Mail className="w-5 h-5 text-[#336ECF]" />
                        <span>hello@talenthire.com</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Phone className="w-5 h-5 text-[#336ECF]" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-[#336ECF]" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </motion.div>
      
                  {/* Footer Links */}
                  {footerSections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link}>
                            <motion.a
                              href="#"
                              whileHover={{ x: 5, color: '#336ECF' }}
                              className="text-gray-300 hover:text-[#336ECF] transition-all duration-300"
                            >
                              {link}
                            </motion.a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
      
              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="py-8 border-t border-gray-800"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                    <p className="text-gray-300">Get the latest hiring insights and platform updates.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#336ECF] transition-colors flex-1 lg:w-64"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(51, 110, 207, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-[#0c39cf] to-[#336ECF] text-white font-semibold rounded-lg hover:from-[#093EB2] hover:to-[#0c39cf] transition-all duration-300"
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </motion.div>
      
              {/* Bottom Footer */}
              <div className="py-8 border-t border-gray-800">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Social Links */}
                  <div className="flex items-center space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#336ECF] transition-all duration-300 group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>
      
                  {/* Legal Links */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <span>© 2024 TalentHire. All rights reserved.</span>
                    <motion.a
                      href="#"
                      whileHover={{ color: '#336ECF' }}
                      className="hover:text-[#336ECF] transition-colors"
                    >
                      Privacy Policy
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ color: '#336ECF' }}
                      className="hover:text-[#336ECF] transition-colors"
                    >
                      Terms of Service
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ color: '#336ECF' }}
                      className="hover:text-[#336ECF] transition-colors"
                    >
                      Cookie Policy
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
  
    </div>
  );
};

export default LandingPage;