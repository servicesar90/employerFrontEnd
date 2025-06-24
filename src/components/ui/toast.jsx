import toast from "react-hot-toast";

export const showSuccessToast = (message) =>
  toast.success(message, {
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#ffffff",
    },
  });

export const showErrorToast = (message) =>
  toast.error(message, {
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#ffffff",
    },
  });

export const showWarningToast = (message) =>
  toast(message, {
    duration: 3000,
    icon: "⚠️",
    style: {
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  });

export const showInfoToast = (message) =>
  toast(message, {
    duration: 3000,
    icon: "ℹ️",
    style: {
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  });

export const showLoadingToast = (message) =>
  toast.loading(message, {
    style: {
      background: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "8px",
    },
  });


