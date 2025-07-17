import React from "react";
import { useNavigate } from "react-router-dom";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const Features = () => {
  
  const navigate = useNavigate();

  // Icons as inline SVG components (same as Index.tsx)
  const StarIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );

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

  const socialLinks = [
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
  ];

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

  const BrainIcon = ({ className = "h-5 w-5" }) => (
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
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
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

  const GlobeIcon = ({ className = "h-5 w-5" }) => (
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
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );

  const DatabaseIcon = ({ className = "h-5 w-5" }) => (
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
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );

  const MobileIcon = ({ className = "h-5 w-5" }) => (
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
        d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
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
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  };

  // Core Features Data
  const coreFeatures = [
    {
      icon: TargetIcon,
      title: "Powered Matching",
      description:
        "Advanced algorithms analyze candidate profiles and job requirements to deliver precision matches with 98% accuracy rate.",
      features: [
        "50+ data points analysis",
        "Behavioral pattern recognition",
        "Skills compatibility scoring",
        "Cultural fit assessment",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BarChart3Icon,
      title: "Real-Time Analytics",
      description:
        "Comprehensive hiring metrics and insights delivered through interactive dashboards that update in real-time as your hiring progresses.",
      features: [
        "Live conversion tracking",
        "Performance benchmarking",
        "Predictive hiring insights",
        "Custom report builder",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: ZapIcon,
      title: "Lightning-Fast Hiring",
      description:
        "Streamlined workflows and automated processes reduce time-to-hire by 70% while maintaining quality standards.",
      features: [
        "Automated screening",
        "One-click scheduling",
        "Instant notifications",
        "Smart pipeline management",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: ShieldIcon,
      title: "Enterprise Security",
      description:
        "Bank-grade security with SOC 2 compliance, end-to-end encryption, and comprehensive audit trails for peace of mind.",
      features: [
        "256-bit encryption",
        "GDPR compliance",
        "Role-based access",
        "Activity monitoring",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description:
        "Built-in collaboration tools enable seamless teamwork with shared feedback, decision workflows, and unified communication.",
      features: [
        "Shared candidate notes",
        "Team feedback system",
        "Decision workflows",
        "Integrated messaging",
      ],
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description:
        "Round-the-clock expert support with dedicated account managers, comprehensive training, and rapid response times.",
      features: [
        "Live chat support",
        "Video tutorials",
        "Dedicated account manager",
        "API documentation",
      ],
      color: "from-red-500 to-red-600",
    },
  ];

  // Advanced Features Data
  const advancedFeatures = [
    {
      icon: BrainIcon,
      title: "Smart Recommendations",
      description:
        "Suggestions for optimizing job descriptions, improving candidate experiences, and enhancing hiring strategies.",
      details: [
        "Job description optimization",
        "Salary benchmarking",
        "Interview question suggestions",
        "Process improvement recommendations",
      ],
    },
    {
      icon: GlobeIcon,
      title: "Global Reach",
      description:
        "Access to a worldwide talent pool with multi-language support and location-specific compliance features.",
      details: [
        "100+ countries supported",
        "Multi-language interface",
        "Local compliance tools",
        "Currency conversion",
      ],
    },
    {
      icon: DatabaseIcon,
      title: "Advanced Integrations",
      description:
        "Seamless connectivity with 500+ HR tools, applicant tracking systems, and productivity platforms.",
      details: [
        "ATS integrations",
        "HRIS connectivity",
        "Calendar sync",
        "Video interview platforms",
      ],
    },
    {
      icon: MobileIcon,
      title: "Mobile-First Design",
      description:
        "Fully responsive platform with native mobile apps for hiring on-the-go and improved candidate accessibility.",
      details: [
        "iOS & Android apps",
        "Offline capabilities",
        "Push notifications",
        "Mobile-optimized workflows",
      ],
    },
  ];

  // Comparison Features
  const comparisonFeatures = [
    { feature: "Matching", Unigrow: true, traditional: false },
    {
      feature: "Real-Time Analytics",
      Unigrow: true,
      traditional: "Limited",
    },
    { feature: "Automated Screening", Unigrow: true, traditional: false },
    { feature: "Team Collaboration", Unigrow: true, traditional: "Basic" },
    { feature: "Mobile Apps", Unigrow: true, traditional: false },
    {
      feature: "24/7 Support",
      Unigrow: true,
      traditional: "Business Hours",
    },
    {
      feature: "Custom Integrations",
      Unigrow: true,
      traditional: "Limited",
    },
    { feature: "Global Compliance", Unigrow: true, traditional: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <SparklesIcon className="h-6 w-6 text-blue-500 mr-3" />
              <span className="text-blue-600 font-semibold text-lg">
                Platform Features
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Powerful Features for</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Hiring
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the comprehensive suite of tools and capabilities that
              make Unigrow Talent the leading choice for companies looking to
              revolutionize their hiring process.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Schedule Demo
              </Button>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
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
              Core Platform <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential features that power your hiring success, designed to
              streamline every step of your recruitment process from candidate
              discovery to final hiring decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
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
              Advanced <span className="text-blue-600">Functionality</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Next-generation features that set Unigrow Talent apart, providing
              enterprise-grade capabilities for organizations of all sizes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Unigrow Talent</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how Unigrow Talent compares to traditional hiring methods and
              legacy platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-gray-50 text-center py-4">
              <div className="text-gray-600 font-medium">Feature</div>
              <div className="text-blue-600 font-bold">Unigrow Talent</div>
              <div className="text-gray-600 font-medium">
                Traditional Methods
              </div>
            </div>

            {comparisonFeatures.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 border-t border-gray-100 py-4 px-6"
              >
                <div className="text-gray-900 font-medium">{item.feature}</div>
                <div className="text-center">
                  {item.Unigrow === true ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-blue-600 font-medium">
                      {item.Unigrow}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  {item.traditional === true ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                  ) : item.traditional === false ? (
                    <div className="w-6 h-6 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {item.traditional}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using Unigrow Talent to
              transform their hiring process. Start your free trial today and
              see the difference our features can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate("/contact-us")}
              >
                Contact Sales
              </Button>
            </div>
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
                  <a
                    href="mailto:sales@unigrowtalent
                .com"
                    className=""
                  >
                    sales@unigrowtalent.com
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <PhoneIcon className="h-4 w-4 mr-3" />
                  +91 120-4178-702
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPinIcon className="w-7 mr-3" />
                  <p className="text-left">
                    Office No:-435A, 4th Floor Orbit Plaza, Crossing Republic
                    Ghaziabad, India
                  </p>
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
    </div>
  );
};

export default Features;
