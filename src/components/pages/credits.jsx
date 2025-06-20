import React, { useEffect, useState } from "react";
import { Briefcase, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../../Redux/getData";
import { useNavigate } from "react-router-dom";

const CreditsUsage = () => {
  const [showDatabaseCredit, setShowDatabaseCredit] = useState(false);
  const [showJobCredit, setShowJobCredit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCredits());
  }, []);

  const { jobCredit, dataBaseCredit, creditsData } = useSelector(
    (state) => state.getDataReducer
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full text-gray-800">
      {/* Header and Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Credits & Usage</h2>
        <button
          onClick={() => navigate("/employerHome/selectPlan")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
        >
          Buy more credits
        </button>
      </div>

      {/* Available Credits Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2">Available Credits</h3>
        <p className="text-sm text-gray-600 mb-4">
          Credits are charged each time you retrieve job posting and database
          unlocks{" "}
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Job Credits */}
          <div className="flex-1 flex items-center gap-4 flex-col border-r sm:border-r border-gray-200 pr-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="cursor-pointer">
              <h4 className="font-semibold text-sm">Job Credits</h4>
              <p className="text-lg font-bold">{jobCredit}</p>
              <a
                onClick={() => setShowJobCredit(!showJobCredit)}
                className="text-blue-600 text-sm underline"
              >
                {showJobCredit? "Hide" :"View"} all
              </a>
            </div>

            {showJobCredit && (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-300 shadow-sm rounded-lg">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="py-2 px-4 border-b font-semibold text-gray-700">
                        Job Credits
                      </th>
                      <th className="py-2 px-4 border-b font-semibold text-gray-700">
                        Expires On
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditsData?.map((credit, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b text-gray-800">
                          {credit.job_credits}
                        </td>
                        <td className="py-2 px-4 border-b text-gray-800">
                          {credit.expired_at?.split("T")[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Database Credits */}
          <div className="flex-1 flex items-center gap-4 flex-col">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div >
              <h4 className="font-semibold text-sm">Database Credits</h4>
              <p className="text-lg font-bold">{dataBaseCredit} credits</p>

              <a
                onClick={() => setShowDatabaseCredit(!showDatabaseCredit)}
                className="text-blue-600 text-sm underline cursor-pointer"
              >
                {showDatabaseCredit? "Hide" : "View"} all
              </a>
            </div>

            {showDatabaseCredit && (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-300 shadow-sm rounded-lg">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="py-2 px-4 border-b font-semibold text-gray-700">
                        Database Credits
                      </th>
                      <th className="py-2 px-4 border-b font-semibold text-gray-700">
                        Expires On
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditsData?.map((credit, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b text-gray-800">
                          {credit.database_credits}
                        </td>
                        <td className="py-2 px-4 border-b text-gray-800">
                          {credit.expired_at?.split("T")[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsUsage;
