import React from 'react';
import { BadgeCheck, MoreVertical, Copy, RefreshCcw } from 'lucide-react';
import { Chip, Button } from '@mui/material';

const JobCard = ({
  title,
  status,
  location,
  postedOn,
  recruiter,
  appliedCount,
  pendingCount,
  dbMatches,
  showDuplicate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
            {title}
            {status === 'Active' && (
              <Chip label="Active" size="small" color="success" />
            )}
            {status === 'Expired' && (
              <Chip label="Expired" size="small" color="error" />
            )}
          </h3>
          <p className="text-sm text-gray-600">
            {location} • Posted on: {postedOn} • {recruiter}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showDuplicate ? (
            <Button variant="outlined" size="small" startIcon={<Copy size={16} />}>
              Duplicate
            </Button>
          ) : (
            <Button variant="outlined" size="small" startIcon={<RefreshCcw size={16} />}>
              Repost now
            </Button>
          )}
          <MoreVertical className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">{appliedCount}</span> Applied to job
          {pendingCount > 0 && (
            <span className="ml-2 text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full text-xs">
              {pendingCount} pending
            </span>
          )}
        </div>
        <div>
          <span className="font-medium">{dbMatches}</span> Database Matches
        </div>
      </div>

      {status === 'Active' && (
        <div className="bg-blue-50 text-blue-700 text-sm mt-3 px-3 py-2 rounded-md">
          <BadgeCheck className="inline mr-2" size={16} />
          Not receiving enough candidates? Check our suggestions to attract 2X more candidates.{' '}
          <span className="text-blue-700 font-medium cursor-pointer hover:underline">
            Update requirements
          </span>
        </div>
      )}
    </div>
  );
};

export default JobCard;
