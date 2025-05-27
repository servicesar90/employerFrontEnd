import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, MoreVertical, Copy, RefreshCcw } from 'lucide-react';
import { Chip, Button, Menu, Paper, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateJobById } from '../../../API/ApiFunctions';
import { showErrorToast, showSuccessToast } from '../toast';
import { useDispatch } from 'react-redux';
import { fetchJobs, fetchJobsById } from '../../../Redux/getData';

const JobCard = ({ job }) => {

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate()
  const modalRef = useRef();
  const [pendingCount, setPendingCount] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (job?.JobApplications?.length) {
      const pendings = job.JobApplications.filter(
        (application) => application.status === "Applied"
      );

      const pendingLength = pendings.length;

      setPendingCount((prev) => (prev !== pendingLength ? pendingLength : prev));
    }
  }, [job]);


  const expiredJob = async (id) => {
    const response = await updateJobById({ status: "E" }, id);
    if (response) {
      dispatch(fetchJobs())
      showSuccessToast("Successfully Expired")
    } else {
      showErrorToast("could not Expired")
    }
  }

  const activeJob = async (id) => {
    const response = await updateJobById({ status: "A" }, id);
    if (response) {
      dispatch(fetchJobs())
      showSuccessToast("Successfully Expired")
    } else {
      showErrorToast("could not Expired")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div onClick={() => navigate(`/employerHome/jobsDetail/${job.id}`)} className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
            {job?.jobTitle}
            {job?.status === 'A' && (
              <Chip label="Active" size="small" color="success" />
            )}
            {job?.status === 'P' && (
              <Chip label="pending" size="small" color="success" />
            )}
            {job?.status === 'E' && (
              <Chip label="Expired" size="small" color="error" />
            )}
          </h3>
          <p className="text-sm text-gray-600">
            {job?.location} • Posted on: {job?.createdAt?.split("T")[0]} • {job?.otherRecruiterName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {job?.status === 'A' ? (
            <Button variant="outlined" size="small" startIcon={<Copy size={16} />}>
              Duplicate
            </Button>
          ) : (
            <> {job?.status === 'P' ? (
              <Button onClick={(e) => {
                e.stopPropagation()
                navigate(`/jobsModal/${job?.id}`)
              }} variant="outlined" size="small" startIcon={<RefreshCcw size={16} />}>
                Finish Posting
              </Button>
            ) : (<Button variant="outlined" size="small" startIcon={<RefreshCcw size={16} />}>
              Repost now
            </Button>)}
            </>

          )}
          <MoreVertical ref={modalRef} onClick={(e) => {
            e.stopPropagation()
            setShowEditModal(!showEditModal)
          }} className="text-gray-500 z-50 cursor-pointer" />
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">{job?.JobApplications?.length}</span> Applicants
          {pendingCount !== null && (
            <span className="ml-6 text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full text-xs">
              {pendingCount} pending
            </span>
          )}
        </div>
        {/* <div>
          <span className="font-medium">{dbMatches}</span> Database Matches
        </div> */}
      </div>

      {job?.status === 'A' && (
        <div className="bg-blue-50 text-blue-700 text-sm mt-3 px-3 py-2 rounded-md">
          <BadgeCheck className="inline mr-2" size={16} />
          Not receiving enough candidates? Check our suggestions to attract 2X more candidates.{' '}
          <span className="text-blue-700 font-medium cursor-pointer hover:underline">
            Update requirements
          </span>
        </div>
      )}

      {job?.status === 'E' && (
        <div className="bg-blue-50 text-blue-700 text-sm mt-3 px-3 py-2 rounded-md">
          <BadgeCheck className="inline mr-2" size={16} />
          Repost now to receive new candidates

        </div>
      )}



      {showEditModal &&
        <Menu
          anchorEl={modalRef.current}
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          PaperProps={{
            className: "w-64 p-4",
            elevation: 4,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >

          <MenuItem onClick={() => {
            setShowEditModal(false)
            navigate(`/jobsModal/${job?.id}`)
          }}>
            <span className="text-sm text-gray-700">Edit Job</span>
          </MenuItem>

          {job?.status !== "A" && (

            <MenuItem onClick={() => {
              setShowEditModal(false)
              activeJob(job?.id)
            }}>
              <span className="text-sm text-green-700"> Active Job</span>
            </MenuItem>
          )}

          <MenuItem onClick={() => {
            setShowEditModal(false)
            expiredJob(job?.id)
          }}>
            <span className="text-sm text-red-700">{job?.status === "E" ? "Delete" : "Expire"} Job</span>
          </MenuItem>

        </Menu>
      }
    </div>
  );
};

export default JobCard;
