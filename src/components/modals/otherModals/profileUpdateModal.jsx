import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../Redux/getData";
import { updateProfile } from "../../../API/ApiFunctions";
import { showErrorToast, showSuccessToast } from "../../ui/toast";

const ProfileUpdate = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const { employer } = useSelector((state) => state.getDataReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: employer?.name,
      email: employer?.email,
      mobile: "9540441958",
    },
  });

  const onSubmit = async(data) => {
    
    setIsDisabled(true); 
    const response = await updateProfile(data);
    if(response){
        showSuccessToast("Successfully Update")
        dispatch(fetchUserProfile())
    }else{
        showErrorToast("Could not updated")
    }
  };

  return (
    <div
      className="min-h-screen p-6 w-full"
      style={{
        backgroundColor: "#DFF3F9",
        padding: "16px",
      }}
    >
      <div className=" mx-auto ">
        <div
          className="bg-white rounded shadow overflow-hidden"
          style={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid rgba(7, 132, 201, 0.1)",
            borderRadius: "8px",
          }}
        >
          <div className="p-6 ">
            <div
              className="flex justify-between items-center -mb-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h1
                className="text-xl font-bold "
                style={{
                  color: "#003B70",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Profile
              </h1>
              <button
                onClick={() => {
                  if (isDisabled) {
                    setIsDisabled(false); // go into edit mode
                  } else {
                    // Save clicked: manually trigger submission
                    handleSubmit(onSubmit)();
                  }
                }}
                className="px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "#0784C9",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isDisabled ? (
                  <p style={{ margin: 0 }}>Edit</p>
                ) : (
                  <p style={{ margin: 0 }}>Save</p>
                )}
              </button>
            </div>

            <h2
              className="text-lg font-medium -mb-5"
              style={{
                color: "#003B70",
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Basic Details
            </h2>

            <div className="p-4" style={{ padding: "16px" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: "#003B70",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        border: errors.name
                          ? "2px solid #dc2626"
                          : "1px solid #d1d5db",
                        backgroundColor: isDisabled ? "#f9fafb" : "white",
                        color: "#003B70",
                        fontSize: "14px",
                        focusRingColor: "#0784C9",
                      }}
                    />
                    {errors.name && (
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.name?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: "#003B70",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      disabled={isDisabled}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-3 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        border: errors.email
                          ? "2px solid #dc2626"
                          : "1px solid #d1d5db",
                        backgroundColor: isDisabled ? "#f9fafb" : "white",
                        color: "#003B70",
                        fontSize: "14px",
                        focusRingColor: "#0784C9",
                      }}
                    />
                    {errors.email && (
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: "#003B70",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Mobile
                    </label>
                    <input
                      type="tel"
                      disabled
                      {...register("mobile", {
                        required: "Mobile is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Mobile must be 10 digits",
                        },
                      })}
                      className="w-full px-4 py-3 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        border: errors.mobile
                          ? "2px solid #dc2626"
                          : "1px solid #d1d5db",
                        backgroundColor: "#f9fafb",
                        color: "#6b7280",
                        fontSize: "14px",
                        cursor: "not-allowed",
                      }}
                    />
                    {errors.mobile && (
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.mobile?.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
<div className="-mt-12">
    <h2
              className="text-lg font-medium mt-6 mb-2"
              style={{
                color: "#003B70",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: "48px",
                marginBottom: "16px",
              }}
            >
              GST Details
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: "#003B70",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  GST No.
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "white",
                    color: "#003B70",
                    fontSize: "14px",
                    focusRingColor: "#0784C9",
                  }}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#0784C9",
                    border: "2px solid #0784C9",
                    cursor: "pointer",
                    borderRadius: "6px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Verify
                </button>
              </div>
            </div>
</div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
