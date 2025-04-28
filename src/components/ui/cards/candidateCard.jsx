import { Lock, MapPin, Download } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CandidateCard = ({ candidate }) => {
    const navigate = useNavigate();

    return (

        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-4">
                    {/* Profile Picture or Initials */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-white font-semibold text-lg uppercase">
                        {candidate.image ? (
                            <img
                                src={candidate.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            candidate.name
                                .split(" ")
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join("")
                        )}
                    </div>

                    {/* Name & Location */}
                    <div>
                        <h3 className="font-medium text-base">{candidate.name}</h3>
                        <div className="text-xs text-gray-500 flex gap-2 mt-1 items-center">
                            <span>{candidate.experience}</span>
                            <span className="text-gray-300">•</span>
                            <span>{candidate.salary}</span>
                            <span className="text-gray-300">•</span>
                            <MapPin size={14} className="inline" />
                            <span>{candidate.location}</span>
                        </div>
                    </div>
                </div>

                {/* Unlocked Tag */}
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                    Un-locked
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-row w-full text-sm text-gray-700 mt-2">
  {/* Labels column */}
  <div className="flex flex-col gap-2 w-1/3 text-left">
    <div className="font-medium">Current / Latest:</div>
    <div className="font-medium">Previous:</div>
    <div className="font-medium">Education:</div>
    <div className="font-medium">Pref. Location:</div>
    <div className="font-medium">Skills:</div>
    <div className="font-medium">Languages:</div>
  </div>

  {/* Values column */}
  <div className="flex flex-col gap-2 w-2/3 text-left">
    <div>{candidate.currentJob}</div>
    <div>{candidate.previousJob}</div>
    <div>{candidate.education}</div>
    <div>{candidate.prefLocations.join(" | ")}</div>
    <div>
      {candidate.skills.slice(0, 4).join(" | ")}
      {candidate.skills.length > 4 && (
        <span className="text-blue-500 font-medium ml-1">
          +{candidate.skills.length - 4} more
        </span>
      )}
    </div>
    <div>{candidate.languages}</div>
  </div>
</div>



            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-green-600 text-sm font-medium">
                    <Lock size={16} className="mr-1" />
                    Un-locked
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigate("/candidateDetail")}
                >
                    View
                </Button>
            </div>
        </div>

    );
};

export default CandidateCard;
