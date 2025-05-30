import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Radio, RadioGroup, Pagination, Button } from '@mui/material';
import {  Download } from 'lucide-react';
import SimplePaper from '../ui/cards/NewCard';
import { getJobById } from '../../API/ApiFunctions';

const UnlockedCandidates = () => {
 
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({
    unlockedBy: 'me',
    unlockedIn: '1',
    hasCV: false,
  });

   useEffect(() => {
  
      const getData = async()=>{
        const response = await getJobById(id);
        if(response){
          setData(response.data.data[0])
         
           }else{
          console.log("Couldn't fetch the data")
        }
      }
  
     
        getData()
      
    }, []);
  

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  return (
    <div className="flex flex-col w-full p-4 bg-gray-50">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Unlocked Candidates</h1>
    <div className="flex items-center">
      <Button variant="contained" color="primary" className="mr-4">
        <Download size={20} /> Download Excel
      </Button>
      <div className="text-lg ml-2 font-bold ">46 candidates</div>
    </div>
  </div>

  {/* Filters + Candidate Cards */}
  <div className="flex gap-4 w-full">
    {/* Filters Section - 30% */}
    <div className="w-[30%] bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="font-medium text-lg mb-3">Filters (0)</h2>
      <div className="space-y-4">
        {/* Unlocked In */}
        <div className="flex flex-col">
          <h3 className="font-medium text-sm mb-2">Unlocked in (days)</h3>
          <RadioGroup
            name="unlockedIn"
            value={filters.unlockedIn}
            onChange={handleFilterChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Last 1 day" />
            <FormControlLabel value="3" control={<Radio />} label="Last 3 days" />
            <FormControlLabel value="7" control={<Radio />} label="Last 7 days" />
            <FormControlLabel value="15" control={<Radio />} label="Last 15 days" />
          </RadioGroup>
        </div>

        {/* Unlocked By */}
        <div>
          <h3 className="font-medium text-sm mb-2">Unlocked by</h3>
          <RadioGroup
            name="unlockedBy"
            value={filters.unlockedBy}
            onChange={handleFilterChange}
          >
            <FormControlLabel value="me" control={<Radio />} label="Me" />
            <FormControlLabel value="team" control={<Radio />} label="Team members" />
          </RadioGroup>
        </div>

        {/* CV Attached */}
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.hasCV}
                onChange={handleCheckboxChange}
                name="hasCV"
              />
            }
            label={
              <span className="font-semibold text-sm">
                Show only candidates who have CV attached
              </span>
            }
          />
        </div>
      </div>
    </div>

    {/* Candidate Cards Section - 68% */}
    <div className="w-[68%] grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-2">
      {data?.jobApplications.map((candidate, index) => (
        <SimplePaper key={index} candidate={candidate}  />
      ))}
    </div>
  </div>

  {/* Pagination */}
  <div className="mt-6 flex justify-center">
    <Pagination count={3} variant="outlined" color="primary" />
  </div>
</div>

  );
};

export default UnlockedCandidates;
