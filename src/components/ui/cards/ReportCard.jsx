import { Users2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationsReportCard = () => {

    const navigate= useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm w-full max-w-md">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="bg-gray-100 p-2 rounded-md">
          <Users2 className="text-gray-700" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">Applications</h3>
          <p className="text-sm text-gray-500 mt-1">
            Get all applications received in a single report
          </p>

          <button onClick={()=>navigate("/employerHome/downloadReport")} className="flex items-center text-sm text-green-600 font-medium mt-4 hover:underline">
            View Report
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsReportCard;
