
import React, { useState } from "react";
import { motion } from "framer-motion";

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icons as inline SVG components (same as Index.tsx)
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
      title: "AI-Powered Matching",
      description:
        "Advanced machine learning algorithms analyze candidate profiles and job requirements to deliver precision matches with 98% accuracy rate.",
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
        "AI-driven suggestions for optimizing job descriptions, improving candidate experiences, and enhancing hiring strategies.",
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
    { feature: "AI-Powered Matching", talenthire: true, traditional: false },
    {
      feature: "Real-Time Analytics",
      talenthire: true,
      traditional: "Limited",
    },
    { feature: "Automated Screening", talenthire: true, traditional: false },
    { feature: "Team Collaboration", talenthire: true, traditional: "Basic" },
    { feature: "Mobile Apps", talenthire: true, traditional: false },
    {
      feature: "24/7 Support",
      talenthire: true,
      traditional: "Business Hours",
    },
    {
      feature: "Custom Integrations",
      talenthire: true,
      traditional: "Limited",
    },
    { feature: "Global Compliance", talenthire: true, traditional: false },
  ];

  return (
    <div className="min-h-screen bg-white">
 

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
              make TalentHire the leading choice for companies looking to
              revolutionize their hiring process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
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
              Next-generation features that set TalentHire apart, providing
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
              Why Choose <span className="text-blue-600">TalentHire</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how TalentHire compares to traditional hiring methods and
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
              <div className="text-blue-600 font-bold">TalentHire</div>
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
                  {item.talenthire === true ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-blue-600 font-medium">
                      {item.talenthire}
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
              Join thousands of companies already using TalentHire to transform
              their hiring process. Start your free trial today and see the
              difference our features can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#2563EB] text-blue-600 "
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                TalentHire
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                The world's leading talent acquisition platform, connecting
                exceptional candidates with forward-thinking companies since
                2020.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 TalentHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
