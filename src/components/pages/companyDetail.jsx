
import { PlusCircle } from "lucide-react";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import DynamicModal from "../modals/otherModals/dynamicModal";
import { useEffect, useState } from "react";

import UserForm from "../modals/otherModals/uploadFileModal";
import { logoUpload } from "../../API/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/getData";

const CompanyProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [openFileModal, setOpenFileModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const { employer } = useSelector((state) => state.getDataReducer);

  const company = employer?.company;

  const fields = [
    { label: "Company name", value: company?.companyName },
    { label: "Founded", value: "Not available" },
    { label: "Website", value: "Not available" },
    { label: "Company size", value: company?.numOfEmployees },
    { label: "Type of company", value: "Not available" },
    { label: "Industry", value: company?.industry },
    { label: "About Company", value: company?.about },
  ];

  const showModal = (item) => {
    setModalField(item);
    setOpenModal(true);
  };

  return (
    <div
      className="w-full  mx-auto mt-1 px-4 pb-10"
      style={{
        backgroundColor: "#DFF3F9",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      {/* Alert */}
      <div
        className="border-l-4 text-sm mb-4 rounded p-4"
        style={{
          backgroundColor: "white",
          borderLeftColor: "#0784C9",
          color: "#003B70",
          boxShadow: "0 4px 12px rgba(7, 132, 201, 0.2)",
        }}
      >
        <strong className="font-medium">
          Please share company information
        </strong>{" "}
        to improve job seekers trust.
        <span className="ml-1 font-semibold" style={{ color: "#003B70" }}>
          Update 7 information
        </span>
      </div>

      {/* Profile Card */}
      <div
        className="bg-white rounded shadow p-6 mb-6"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid rgba(7, 132, 201, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: "#003B70" }}>
          Company details
        </h2>

        {/* Company Logo and Name */}
        <div className="flex items-start space-x-4 mb-6">
          {company?.logoUrl ? (
            <img
              src={company.logoUrl}
              alt="Logo"
              className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-full text-white flex items-center justify-center font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, #0784C9 0%, #003B70 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {company?.companyName?.split("")[0]?.toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold" style={{ color: "#003B70" }}>
                {company?.companyName || "Your Company Name"}
              </h3>
              <button
                onClick={() => setOpenFileModal(!openFileModal)}
                className="flex items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  color: "#0784C9",
                  backgroundColor: "rgba(7, 132, 201, 0.1)",
                  border: "1px solid rgba(7, 132, 201, 0.3)",
                }}
              >
                <PlusCircle className="w-3 h-3 mr-1" />
                Update Logo
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "#0784C9",
                  color: "white",
                }}
              >
                {company?.industry || "Industry"}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  borderColor: "#0784C9",
                  color: "#003B70",
                  backgroundColor: "white",
                }}
              >
                {company?.numOfEmployees || "Team Size"}
              </span>
            </div>
          </div>
        </div>

        {/* Info List */}
        <div
          className="h-[50vh] overflow-scroll pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#0784C9 #DFF3F9",
          }}
        >
          {fields.map((item, index) => {
            const hasValue = item.value && item.value !== "Not available";
            return (
              <div
                key={index}
                className="flex justify-between items-center text-left py-3 border-b transition-all duration-200 hover:bg-gray-50 rounded-lg px-4 mb-2"
                style={{
                  borderBottomColor: hasValue
                    ? "rgba(7, 132, 201, 0.3)"
                    : "#e9ecef",
                  borderBottomWidth: "1px",
                  backgroundColor: hasValue ? "#DFF3F9" : "#f8f9fa",
                  border: "1px solid",
                  borderColor: hasValue ? "rgba(7, 132, 201, 0.3)" : "#e9ecef",
                }}
              >
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#003B70" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-sm ${item.value === "Not available" ? "italic" : ""}`}
                    style={{
                      color:
                        item.value === "Not available" ? "#6c757d" : "#003B70",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
                <button
                  onClick={() => showModal(item)}
                  className="flex items-center hover:underline text-sm px-3 py-1 rounded-md transition-all duration-200 hover:scale-105"
                  style={{
                    color: "#0784C9",
                    backgroundColor: "rgba(7, 132, 201, 0.1)",
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Suggest
                </button>
              </div>
            );
          })}
          <div
            className="bg-white rounded shadow p-6"
            style={{
              background: "linear-gradient(135deg, #DFF3F9 0%, #E8F7FC 100%)",
              marginTop: "16px",
              borderRadius: "8px",
              border: "1px solid #0784C9",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: "#003B70" }}>
                Social profiles
              </h2>
              <button
                className="flex items-center hover:underline text-sm px-3 py-1 rounded-md transition-all duration-200 hover:scale-105"
                style={{
                  color: "#0784C9",
                  backgroundColor: "rgba(7, 132, 201, 0.1)",
                }}
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Suggest
              </button>
            </div>

            <div
              className="flex gap-6 flex-col md:flex-row"
              style={{ color: "#003B70" }}
            >
              <div
                className="flex items-center gap-2 text-sm bg-white rounded-lg p-3 transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                }}
              >
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "#0077B5" }}
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">LinkedIn</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm bg-white rounded-lg p-3 transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                }}
              >
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "#1877F2" }}
                >
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Facebook</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm bg-white rounded-lg p-3 transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e9ecef",
                }}
              >
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "#E4405F" }}
                >
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles */}

      {openModal && modalField && (
        <DynamicModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          fields={{ [modalField.label]: modalField.value }}
          type={{ [modalField.label]: "text" }}
          suggestions={[]}
        />
      )}

      {openFileModal && (
        <UserForm
          open={openFileModal}
          label="Logo Upload"
          onClose={() => setOpenFileModal(false)}
          metaData={{ onSubmitFunc: logoUpload }}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
