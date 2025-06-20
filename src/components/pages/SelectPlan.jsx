import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";
import { BadgeCheck, Briefcase, Database } from "lucide-react";

const SelectPlan = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getPlans();
      if (response) {
        setPlans(response.data.data);
      } else {
        showErrorToast("Could not fetch Plans");
      }
    };

    getData();
  }, []);

  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/employerHome/checkout");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Choose a Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h2>
            <p className="text-gray-500 text-sm mb-4">
              Valid for <span className="font-medium">{plan.validity} days</span>
            </p>

            <div className="mb-4 space-y-2 text-sm">
              <div className="flex items-center text-gray-700">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                <span className="font-medium">{plan.job_Credits}</span> Job Credits
              </div>
              <div className="flex items-center text-gray-700">
                <Database className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">{plan.database_Credits}</span> Database Credits
              </div>
            </div>

            <p className="text-xl font-semibold text-green-600 mb-4">
              ₹{plan.price}
            </p>

            <button
              onClick={() => handleSelect(plan)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPlan;
