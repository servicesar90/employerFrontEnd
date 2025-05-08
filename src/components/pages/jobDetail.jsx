import React, { useEffect, useState } from 'react';
import {
  Download, ChevronDown, ChevronLeft, Info, MoreVertical, Filter, UserCheck, MapPin, BadgeCheck,
  GraduationCap, Briefcase, Users, CircleCheck, Eye, X, ChevronRight
} from 'lucide-react';
import { Card, CardContent, Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { employer } from '../../assets/data';
import SimplePaper from '../ui/cards/NewCard';

const filters = [
  { label: 'Matched to job requirements (10)' },
  { label: 'Have Resume Attached (12)' },
  { label: 'Tried contacting you (5)', badge: 'New' }
];

const CandidateCard = ({ candidate }) => (
  <Card className="w-full mb-4 shadow-sm border border-gray-200 rounded-xl">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold">
            {candidate.name
              .split(' ')
              .map(word => word[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}

          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">{candidate.name}</h2>
              <span className="text-green-600 text-sm font-medium cursor-pointer">
                View full profile <ChevronRight size={14} />
              </span>
            </div>
            <div className="flex flex-wrap text-sm text-gray-600 gap-4 mt-1">
              <span>{candidate.gender}, {candidate.age} yr</span>
              <span>{candidate.experienceYear} yrs</span>
              <span>₹ {candidate.currentSalary} / mos</span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {candidate.location}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs font-semibold text-blue-600 border border-blue-600 rounded-md px-2 py-0.5">
          {candidate.match ? <p>Matched</p> : <p>Not Matched</p>}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-800 space-y-3">
        <div className="flex gap-2">
          <Briefcase size={16} className="mt-1 text-gray-500" />
          <div>
            <strong>Current / Latest</strong>: {candidate.experience.title} ({candidate.experience.joinDate} – {candidate.experience.endDate})
            <br />
            Role: {candidate.experience.jobRole}
            <br />
            Industry: {candidate.experience.industry}
          </div>
        </div>

        <div className="flex gap-2">
          <GraduationCap size={16} className="mt-1 text-gray-500" />
          <div>
            <strong>Education</strong>: {candidate.education.degree}, {candidate.education.subject} – {candidate.education.university}
          </div>
        </div>

        <div className="flex gap-2">
          <BadgeCheck size={16} className="mt-1 text-gray-500" />
          <div>
            <strong>Skills</strong>: {candidate.skills.map((skill, index) => (<span key={index}>{skill}</span>))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CandidateManagementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null)


  useEffect(() => {
    if (id) {
      const newData = employer.jobs.filter((job) => job.id == id);

      setData(newData[0]);
    }
  }, [])
  return (
    <div className="bg-gray-50 min-h-screen pl-20">
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">
        {/* Left Side */}
        <div className="flex items-center space-x-3">
          <ChevronLeft
            className="cursor-pointer text-gray-600"
            onClick={() => navigate("/employerHome/jobs")}
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {data?.jobTitle}
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                {data?.jobActivity.status}
              </span>
            </h2>
            <p className="text-sm text-gray-500">{data?.location}</p>
          </div>
          <div className="ml-2 text-xs text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">
            Current: Classic {data?.jobActivity.appliedCount}
          </div>
          <span className="text-sm text-blue-500 cursor-pointer hover:underline ml-2">
            more details
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Info className="text-gray-600 cursor-pointer" />
          <MoreVertical className="text-gray-600 cursor-pointer" />
        </div>
      </div>
      {/* Top Summary Box */}
      <div className="bg-white shadow-sm rounded-lg p-4 border mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-gray-600" />
            <h2 className="text-lg font-medium">Applied to job ({data?.candidatesData.length})</h2>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outlined" size="small" startIcon={<Download size={16} />}>
              Download excel
            </Button>
            <Button variant="outlined" size="small" endIcon={<ChevronDown size={16} />}>
              Relevance
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {[`All candidates ${data?.candidatesData.length}`, `Action Pending (${data?.candidatesData.length})`, `Downloaded/Viewed Number (${data?.candidatesData.length})`, 'Shortlisted (0)', 'Rejected (0)'].map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-1 rounded-full text-sm font-medium border ${idx === 1
                  ? 'bg-blue-100 text-blue-600 border-blue-300'
                  : 'bg-white text-gray-600 border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Candidates Layout */}
      <div className="flex gap-6">
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
        <div className="w-3/4">
          <div className="text-sm text-gray-600 mb-2">Showing 13 candidates</div>
          {data?.candidatesData.map((candidate, index) => (
            <div key={index}>
              <SimplePaper candidate={candidate} />
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
