// import { Users2, ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ApplicationsReportCard = () => {

//     const navigate= useNavigate();
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6 alig shadow-sm w-full max-w-md">
//       <div className="flex items-start gap-4">
//         {/* Icon */}
//         <div className="bg-gray-100 p-2 rounded-md">
//           <Users2 className="text-gray-700" />
//         </div>

//         {/* Content */}
//         <div className="flex flex-col">
//           <h3 className="text-lg font-semibold text-gray-800">Applications</h3>
//           <p className="text-sm text-gray-500 mt-1">
//             Get all applications received in a single report
//           </p>

//           <button onClick={()=>navigate("/employerHome/downloadReport")} className="flex items-center text-sm text-green-600 font-medium mt-4 hover:underline">
//             View Report
//             <ArrowRight className="w-4 h-4 ml-1" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationsReportCard;
import React from "react";
import { Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#DEF3F9", padding: "40px" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        

        {/* Platform Under Development Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid rgba(7, 132, 201, 0.1)",
            borderRadius: "20px",
            padding: "60px 50px",
            textAlign: "center",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            position: "relative",
            overflow: "hidden",
            transform: "translateY(0)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
          }}
        >
          {/* Animated background elements */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #DEF3F9 0%, #0784C9 100%)",
              opacity: "0.1",
              animation: "float 6s ease-in-out infinite",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#0784C9",
              opacity: "0.05",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#DEF3F9",
              opacity: "0.3",
              animation: "pulse 3s ease-in-out infinite 1s",
            }}
          />

          {/* Enhanced icon with multiple layers */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
              position: "relative",
            }}
          >
            {/* Outer glow */}
            <div
              style={{
                position: "absolute",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(7, 132, 201, 0.1) 0%, transparent 70%)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            {/* Main icon container */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #DEF3F9 0%, #ffffff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #0784C9",
                boxShadow: "0 8px 32px rgba(7, 132, 201, 0.3), 0 2px 8px rgba(7, 132, 201, 0.1)",
                position: "relative",
                zIndex: "2",
              }}
            >
              <Briefcase
                style={{
                  width: "40px",
                  height: "40px",
                  color: "#0784C9",
                  filter: "drop-shadow(0 2px 4px rgba(7, 132, 201, 0.2))"
                }}
              />
            </div>
          </div>

          {/* Enhanced typography */}
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #000000 0%, #374151 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              position: "relative",
              letterSpacing: "-0.5px",
            }}
          >
            Platform Under Development
          </h2>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              lineHeight: "1.7",
              maxWidth: "560px",
              margin: "0 auto 35px auto",
              position: "relative",
              fontWeight: "400",
            }}
          >
            We're building something amazing for job seekers and employers. Our
            comprehensive platform will include advanced features for job
            matching, application tracking, and talent management.
          </p>

          {/* Enhanced progress bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "6px",
                backgroundColor: "#DEF3F9",
                borderRadius: "3px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  height: "100%",
                  width: "65%",
                  background: "linear-gradient(90deg, #0784C9 0%, #06B6D4 100%)",
                  borderRadius: "3px",
                  animation: "progressPulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Progress dots with animation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#0784C9",
                animation: "dotPulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#0784C9",
                animation: "dotPulse 1.5s ease-in-out infinite 0.2s",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#DEF3F9",
                animation: "dotPulse 1.5s ease-in-out infinite 0.4s",
              }}
            />
          </div>

          <p
            style={{
              background: "linear-gradient(135deg, #0784C9 0%, #06B6D4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "14px",
              fontWeight: "600",
              position: "relative",
              letterSpacing: "0.5px",
            }}
          >
            Development in Progress...
          </p>
        </div>

        {/* Add CSS animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.05); }
            }
            @keyframes progressPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
            @keyframes dotPulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.7; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Index;

