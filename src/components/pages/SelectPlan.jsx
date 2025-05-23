import {useNavigate} from 'react-router-dom'
 

const plans = [
  { id: "basic", name: "Basic Plan", price: 99, credits: 1 },
  { id: "pro", name: "Pro Plan", price: 199, credits: 5 },
];

const SelectPlan = () => {
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/employerHome/checkout");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {plans.map((plan) => (
        <div key={plan.id} className="border p-4 rounded">
          <h2>{plan.name}</h2>
          <p>₹{plan.price}</p>
          <button onClick={() => handleSelect(plan)}>Choose</button>
        </div>
      ))}
    </div>
  );
};

export default SelectPlan;
