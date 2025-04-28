import { ArrowLeft, Download } from "lucide-react";

const DownloadApplicationsCard = () => {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      {/* Back Button */}
      <button className="flex items-center text-sm text-gray-700 mb-6 hover:underline">
        <ArrowLeft className="mr-1 w-4 h-4" />
        Back
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Download applications</h2>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              {/* Placeholder illustration */}
              <img
                src="/placeholder-doc-icon.png" // Replace with actual icon if needed
                alt="Document"
                className="w-14 h-14"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full">
              <Download className="text-white w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Download applications from last 7 days
        </h3>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
          Looks like you have never downloaded applications data. You can download applications
          received across all jobs in the last 7 days.
        </p>

        {/* Download Button */}
        <button className="bg-green-600 text-white font-medium px-5 py-2 rounded hover:bg-green-700 text-sm">
          Download now
        </button>
      </div>
    </div>
  );
};

export default DownloadApplicationsCard;
