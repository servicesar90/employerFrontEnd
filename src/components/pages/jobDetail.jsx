import { useEffect, useState } from 'react';
import { Download, ChevronDown, ChevronLeft, Info, MoreVertical, Filter, Users } from 'lucide-react';
import {  Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SimplePaper from '../ui/cards/NewCard';
import { getJobById } from '../../API/ApiFunctions';

const filters = [
  { label: 'Matched to job requirements (10)' },
  { label: 'Have Resume Attached (12)' },
  { label: 'Tried contacting you (5)', badge: 'New' }
];



const CandidateManagementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null)
  const [filterIndex, setFilterIndex] = useState(0);
  const [allCandidates, setAllCandidates] = useState({})
  const [candidateStatus, setCandidateStatus] = useState({})
  


  useEffect(() => {

    const getData = async()=>{
      const response = await getJobById(id);
      if(response){
        setData(response.data.data[0])
        const jobApps = response.data.data[0]?.JobApplications || [];
  const pendingCandidate = jobApps.filter(app => app.status === "Applied");
  const selectedCandidate = jobApps.filter(app => app.status === "Selected");
  const rejectedCandidate = jobApps.filter(app => app.status === "Rejected");

  setAllCandidates({
    0: jobApps,
    1: pendingCandidate,
    3: selectedCandidate,
    4: rejectedCandidate
  });
         }else{
        console.log("Couldn't fetch the data")
      }
    }

    if (id) {
      getData()
    }
  }, []);


const handleFilteration = (id, status) => {
  const allApps = allCandidates[0] || [];
 setCandidateStatus(prev => ({
  ...prev,
  [id]: status
}));
  const appToUpdate = allApps.find(app => app.id === id);
  if (!appToUpdate) return;

  const isPending = allCandidates[1]?.some(app => app.id === id);

  setAllCandidates(prev => ({
    ...prev,
    1: isPending
      ? prev[1].filter(app => app.id !== id)
      : prev[1] || [],
    3: status === "Selected"
      ? [...(prev[3] || []).filter(app => app.id !== id), appToUpdate]
      : (prev[3] || []).filter(app => app.id !== id),
    4: status === "Rejected"
      ? [...(prev[4] || []).filter(app => app.id !== id), appToUpdate]
      : (prev[4] || []).filter(app => app.id !== id)
  }));
};





  return (
    <div className="bg-gray-50 min-h-screen w-full ">
      <div className="flex items-center justify-between px-4 py-3 bg-white ">
        {/* Left Side */}
        <div className="flex items-center space-x-3">
          <ChevronLeft
            className="cursor-pointer text-gray-600"
            onClick={() => navigate("/employerHome/jobs")}
          />
          <div className='flex flex-row gap-2 items-center justify-center'>
            <h2 className="text-lg font-semibold text-gray-900">
              {data?.jobTitle}
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                {data?.status==="P"? "Pending": (data?.status ==="A"?"Active":  "Expired" ) }
              </span>
            </h2>
            <p className="text-sm text-gray-500 px-3 border-l border-r">{data?.location}</p>
          </div>
          <div className="ml-2 text-xs text-gray-500 border border-gray-300 rounded px-3 py-0.5">
            Current: {data?.JobApplications.length}
          </div>
          {/* <span className="text-sm text-blue-500 cursor-pointer hover:underline ml-2">
            more details
          </span> */}

          <span className='text-black=500 font-bold ml-2 text-sm' onClick={() => navigate(`/jobsModal/${id}`)}>Edit Job</span>
        </div>

        {/* Right Side */}
        {/* <div className="flex items-center space-x-4">
          <Info className="text-gray-600 cursor-pointer" />
          <MoreVertical className="text-gray-600 cursor-pointer" />
        </div> */}
      </div>

      
      {/* Top Summary Box */}
      <div className="bg-white shadow-sm rounded-lg p-4 m-4 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-gray-600" />
            <h2 className="text-lg font-medium">Applied to job ({data?.JobApplications.length})</h2>
          </div>
          {/* <div className="flex gap-2 items-center">
            <Button variant="outlined" size="small" startIcon={<Download size={16} />}>
              Download excel
            </Button>
            <Button variant="outlined" size="small" endIcon={<ChevronDown size={16} />}>
              Relevance
            </Button>
          </div> */}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {[`All candidates (${allCandidates[0]?.length})`, `Action Pending (${allCandidates[1]?.length})`, `Downloaded/Viewed Number`, `Shortlisted (${allCandidates[3]?.length})`, `Rejected (${allCandidates[4]?.length})`].map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-1 rounded-full text-sm font-medium border ${idx === filterIndex
                  ? 'bg-blue-100 text-blue-600 border-blue-300'
                  : 'bg-white text-gray-600 border-gray-300'
                }`}
              
              onClick={()=>setFilterIndex(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

       {/* bottom section */}
      <div className="flex gap-6 p-4">
        {/* Left Filters */}
        <div className="w-1/4 space-y-4">
          <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
            <Filter size={18} /> Filters (0)
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-3">
            {filters.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-2 text-sm text-gray-700">
            <details open>
              <summary className="cursor-pointer font-medium">Applied in</summary>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Location</summary>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Gender</summary>
            </details>
          </div>
        </div>

        {/* Right: Candidate List */}
        <div className="w-3/4 max-h-[60vh] overflow-scroll">
          <div className="text-sm text-gray-600 mb-2">Showing {allCandidates[filterIndex]?.length} candidates</div>
          {allCandidates[filterIndex]?.map((candidate, index) => (
            <div key={index}>
              <SimplePaper job={data} candidate={candidate} candidateStatus={candidateStatus[candidate?.id]? candidateStatus[candidate?.id]: candidate?.status} setCandidateStatus={(id, status)=>handleFilteration(id, status)} />
            </div>
          ))}


          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <div className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateManagementPage;
