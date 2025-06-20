import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";
import { getBill } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";



const BillingPage = () => {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null)

  useEffect(()=>{
    const getData =async()=>{
      const response = await getBill();
      if(response){
        setData(response.data.data);
        setAllData(response.data.data)
        console.log(response.data.data)
      }else{
        showErrorToast("could not fetch bills")
      }
    }

    getData()

  },[]);

  const applyFilter =(filters)=>{

    

    if(filters == "All"){
      setData(allData)
    }else if(filters == "Success"){
      const successData = allData.filter((el)=> el.status == "success");
      setData(successData)
    }else if(filters == "Pending"){
      const successData = allData.filter((el)=> el.status == "pending");
      setData(successData)
    }else if(filters == "Failed"){
      const successData = allData.filter((el)=> el.status == "failed");
      setData(successData)
    }
  }

  

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full text-gray-800">
     
     

      {/* Billing History */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-4">
          {["All", "Success", "Pending", "Failed"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 text-sm border rounded-full ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
              onClick={() => {
                setFilter(tab)
                applyFilter(tab)
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Plan details</th>
                <th className="px-4 py-2 font-medium">Expires on</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((entry, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{entry.created_at.split("T")[0]}</td>
                  <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                    <p>{entry.Plan?.job_credits} Jobs</p>
                    <p>{entry.Plan?.Database_credits} Databases</p>
                  </td>
                  <td className="px-4 py-2">{entry.expired_at.split("T")[0]}</td>
                  <td className="px-4 py-2">{entry.amount_paid}</td>
                  <td className="px-4 py-2">
                    {entry.status === "success" && (
                      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
                        Success
                      </span>
                    )}
                    {entry.status === "failed" && (
                      <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold">
                        Failed
                      </span>
                    )}
                    {entry.status === "Pending" && (
                      <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {entry.status === "Success" ? (
                      <button className="flex items-center text-green-600 hover:underline">
                        <Download className="w-4 h-4 mr-1" /> Invoice
                      </button>
                    ) : (
                      <button className="flex items-center text-red-600 hover:underline">
                        <Mail className="w-4 h-4 mr-1" /> Contact us
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!data || data?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
