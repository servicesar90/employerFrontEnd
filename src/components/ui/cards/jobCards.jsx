import React, { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  MoreVertical,
  Copy,
  RefreshCcw,
  LocateIcon,
} from "lucide-react";
import {
  Chip,
  Button,
  Menu,
  Paper,
  MenuItem,
  Avatar,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteJobById, updateJobById } from "../../../API/ApiFunctions";
import { showErrorToast, showSuccessToast } from "../toast";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../../../Redux/getData";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const JobCard = ({ job }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
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
      setPendingCount((prev) =>
        prev !== pendingLength ? pendingLength : prev
      );
    }
  }, [job]);

  const expiredJob = async (id) => {
    const response = await updateJobById({ status: "E" }, id);
    if (response) {
      dispatch(fetchJobs());
      showSuccessToast("Successfully Expired");
    } else {
      showErrorToast("could not Expired");
    }
  };

  const activeJob = async (id) => {
    const response = await updateJobById({ status: "A" }, id);
    if (response) {
      dispatch(fetchJobs());
      showSuccessToast("Activated Successfully");
    } else {
      showErrorToast("could not Expired");
    }
  };

  const deleteJob = async (id) => {
    const response = await deleteJobById(id);
    if (response) {
      console.log("delete");
      dispatch(fetchJobs());
      showSuccessToast("Successfully Deleted");
    } else {
      showErrorToast("could not Deleted");
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "A":
        return {
          label: "Active",
          bgColor: "#dcfce7",
          textColor: "#15803d",
          borderColor: "#bbf7d0",
          iconColor: "#16a34a",
        };
      case "P":
        return {
          label: "Pending",
          bgColor: "#fef3c7",
          textColor: "#a16207",
          borderColor: "#fde68a",
          iconColor: "#d97706",
        };
      case "E":
        return {
          label: "Expired",
          bgColor: "#fee2e2",
          textColor: "#dc2626",
          borderColor: "#fecaca",
          iconColor: "#ef4444",
        };
      default:
        return {
          label: "Unknown",
          bgColor: "#f3f4f6",
          textColor: "#374151",
          borderColor: "#d1d5db",
          iconColor: "#6b7280",
        };
    }
  };

  const statusConfig = getStatusConfig(job.status);

  return (
    <div
      onClick={() => navigate(`/employerHome/jobsDetail/${job.id}`)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: "1px solid #f3f4f6",
        transform: "translateY(0)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      }}
    >
      {/* Header with gradient background */}
      <div
        style={{
          background: "linear-gradient(to right, #DFF3F9, #ffffff)",
          padding: "24px",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#003B70",
                  margin: 0,
                  transition: "color 0.3s ease",
                }}
              >
                {job?.jobTitle}
              </h3>

              {/* Status Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: statusConfig.bgColor,
                  color: statusConfig.textColor,
                  border: `1px solid ${statusConfig.borderColor}`,
                }}
              >
                {job?.status === "A" && (
                  <BadgeCheck
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "4px",
                      color: statusConfig.iconColor,
                    }}
                  />
                )}
                {job?.status === "P" && (
                  <RefreshCcw
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "4px",
                      color: statusConfig.iconColor,
                    }}
                  />
                )}
                {job?.status === "E" && (
                  <LocateIcon
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "4px",
                      color: statusConfig.iconColor,
                    }}
                  />
                )}
                {statusConfig.label}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <LocationOnIcon
                  style={{ width: "16px", height: "16px", color: "#0784C9" }}
                />
                <span>{job?.location}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <CalendarMonthIcon
                  style={{ width: "16px", height: "16px", color: "#0784C9" }}
                />
                <span>{job?.createdAt?.split("T")[0]}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <PersonIcon
                  style={{ width: "16px", height: "16px", color: "#0784C9" }}
                />
                <span>{job?.otherRecruiterName || "N/A"}</span>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <MoreVertical
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(!showEditModal);
              }}
              style={{
                color: "#6b7280",
                cursor: "pointer",
                width: "20px",
                height: "20px",
                padding: "4px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#003B70";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        {/* Suggestions/Alerts */}
        {job?.status === "A" && (
          <div
            style={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <InfoOutlinedIcon
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#2563eb",
                  marginTop: "2px",
                }}
              />
              <div>
                <p style={{ fontSize: "14px", color: "#1e40af", margin: 0 }}>
                  Not receiving enough candidates? Check our suggestions to
                  attract 2X more candidates.{" "}
                  <button
                    style={{
                      fontWeight: "500",
                      textDecoration: "underline",
                      background: "none",
                      border: "none",
                      color: "#1e40af",
                      cursor: "pointer",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Update requirements
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {job?.status === "E" && (
          <div
            style={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <RefreshCcw
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#ea580c",
                  marginTop: "2px",
                }}
              />
              <div>
                <p style={{ fontSize: "14px", color: "#c2410c", margin: 0 }}>
                  Repost now to receive new candidates.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Summary */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "2px solid #f3f4f6",
            marginBottom: "-15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "14px" }}>
              <span style={{ fontWeight: "600", color: "#003B70" }}>
                {job?.JobApplications?.length || 0}
              </span>
              <span style={{ color: "#6b7280", marginLeft: "4px" }}>
                Applicants
              </span>
            </div>

            {pendingCount !== null && pendingCount > 0 && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: "#fef3c7",
                  color: "#a16207",
                  border: "1px solid #fde68a",
                }}
              >
                {pendingCount} pending
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {job?.status === "A" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle duplicate
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #0784C9",
                  backgroundColor: "#ffffff",
                  color: "#0784C9",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0784C9";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#0784C9";
                }}
              >
                <Copy style={{ width: "16px", height: "16px" }} />
                Duplicate
              </button>
            ) : job?.status === "P" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/jobsModal/${job?.id}`);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#0784C9",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#003B70";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0784C9";
                }}
              >
                <RefreshCcw style={{ width: "16px", height: "16px" }} />
                Finish Posting
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  activeJob(job?.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#0784C9",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#003B70";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0784C9";
                }}
              >
                <RefreshCcw style={{ width: "16px", height: "16px" }} />
                Repost now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal/Dropdown */}
      {showEditModal && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "24px",
            zIndex: 50,
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e5e7eb",
            padding: "8px",
            minWidth: "160px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => {
              setShowEditModal(false);
              navigate(`/jobsModal/${job?.id}`);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#374151",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Edit Job
          </div>

          {job?.status !== "A" && (
            <div
              onClick={() => {
                setShowEditModal(false);
                activeJob(job?.id);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Active Job
            </div>
          )}

          <div
            onClick={() => {
              if (job?.status === "E") {
                setShowEditModal(false);
                deleteJob(job?.id);
              }else{
                setShowEditModal(false);
                expiredJob(job?.id);
              }
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#374151",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {job?.status === "E" ? "Delete" : "Expire"} Job
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
