import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, MoreVertical, Copy, RefreshCcw, LocateIcon } from 'lucide-react';
import { Chip, Button, Menu, Paper, MenuItem, Avatar, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateJobById } from '../../../API/ApiFunctions';
import { showErrorToast, showSuccessToast } from '../toast';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../../../Redux/getData';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const JobCard = ({ job }) => {

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate()
  const modalRef = useRef();
  const [pendingCount, setPendingCount] = useState(null);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

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
      showSuccessToast("Activated Successfully")
    } else {
      showErrorToast("could not Expired")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 mb-6  border">
      <div onClick={() => navigate(`/employerHome/jobsDetail/${job.id}`)} className="flex justify-between items-start">
        <div className='flex flex-col justify-start items-start'>
          <h3 className="flex items-center gap-4 md:gap-2">
            <span className='heading text-left w-auto'>{job?.jobTitle}</span>
            {job?.status === 'A' && (
              <Chip sx={{ backgroundColor: "#0784C9", color: "white", borderRadius: "5px" }} label="Active" size="small" />
            )}
            {job?.status === 'P' && (
              <Chip sx={{ backgroundColor: "#0784C9", color: "white", borderRadius: "5px" }} label="pending" size="small" color="success" />
            )}
            {job?.status === 'E' && (
              <Chip sx={{ color: "white", borderRadius: "5px" }} label="Expired" size="small" color="error" />
            )}
          </h3>
          <ul className="flex mt-4 flex-col md:flex-row md:gap-4 gap-3 justify-start items-start text-sm md:text-md text-gray-600">
            <li className='chips text-left'><LocationOnIcon className='text-secondary' fontSize='small' />{job?.location}</li>
            <li className='chips text-left'><CalendarMonthIcon className='text-secondary' fontSize='small' /> {job?.createdAt?.split("T")[0]}</li>
            <li className='chips text-left'><PersonIcon className='text-secondary' fontSize='small' />{job?.otherRecruiterName || "N/A"}</li>
          </ul>
        </div>



        <div className="flex items-center gap-2">
          <span
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            className="cursor-pointer"
          >
            <InfoOutlinedIcon sx={{ color: 'gray' }} />
          </span>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose,
              sx: {
                p: 2,
                maxWidth: 300,
                boxShadow: 3,
                borderRadius: 2,
              },
            }}
          >
            {job?.status === 'A' && (
              <div className="text-sm text-gray-800">
                <BadgeCheck className="inline mr-2 text-blue-600" size={16} />
                Not receiving enough candidates? Check our suggestions to attract 2X more candidates.{' '}
                <div className="text-blue-700 font-medium cursor-pointer hover:underline">
                  Update requirements
                </div>
              </div>
            )}

            {job?.status === 'E' && (
              <div className="text-sm text-blue-700">
                <BadgeCheck className="inline mr-2" size={16} />
                Repost now to receive new candidates.
              </div>
            )}
          </Popover>

          {job?.status === 'A' ? (
            <button
              className="relative group flex items-center justify-center p-1 md:px-3 md:py-1 border border-gray-300 rounded md:flex-row flex-col gap-1 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <Copy size={16} />
              <span className="hidden md:inline">Duplicate</span>
              {/* Tooltip for mobile */}
              <span className="absolute left-1/2 top-5 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:hidden pointer-events-none">
                Duplicate
              </span>
            </button>
          ) : job?.status === 'P' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobsModal/${job?.id}`);
              }}
              className="relative group flex items-center justify-center p-1 md:px-3 md:py-1 border border-gray-300 rounded md:flex-row flex-col gap-1 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <RefreshCcw size={16} />
              <span className="hidden md:inline">Finish Posting</span>
              <span className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:hidden pointer-events-none">
                Finish Posting
              </span>
            </button>
          ) : (
            <button
              className="relative group flex items-center justify-center p-1 md:px-3 md:py-1 border border-gray-300 rounded md:flex-row flex-col gap-1 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <RefreshCcw size={16} />
              <span className="hidden md:inline">Repost now</span>
              <span className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:hidden pointer-events-none">
                Repost now
              </span>
            </button>
          )}

          <MoreVertical
            ref={modalRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowEditModal(!showEditModal);
            }}
            className="text-gray-500 z-50 cursor-pointer"
          />
        </div>

      </div>

      <div className="flex justify-between mt-4 mr-2 text-sm text-gray-700">
        <div className='w-full mt-2 justify-between items-center flex mb-2 '>
          <span className="font-medium content chips bg-light px-2">{job?.JobApplications?.length} Applicants</span>
          {pendingCount !== null && (
            <span className="content chips bg-light px-2">
              {pendingCount} pending
            </span>
          )}
        </div>
    
      </div>


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
