import { PlusCircle } from "lucide-react";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import DynamicModal from "../modals/otherModals/dynamicModal";
import {  useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserForm from "../modals/otherModals/uploadFileModal";
import { logoUpload } from "../../API/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/getData";

const CompanyProfile = () => {

  const [openModal, setOpenModal] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [openFileModal, setOpenFileModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchUserProfile())
  })

  const {employer} = useSelector((state)=> state.getDataReducer)



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
    <div className="w-full max-w-3xl mx-auto mt-1 px-4 pb-10">
      {/* Alert */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 text-sm mb-4 rounded">
        <strong className="font-medium">Please share company information</strong> to improve job seekers trust.
        <span className="ml-1 font-semibold text-black">Update 7 information</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Company details</h2>

        {/* Company Logo and Name */}
        <div onClick={() => setOpenFileModal(!openFileModal)} className="flex items-start space-x-4 mb-6">
          {company?.logoUrl ?<img src={company.logoUrl} alt="Logo"  className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg"/> :<div  className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center font-semibold text-lg">
            company?companyName.split("")[0].toUpperCase()
          </div>}
        
        </div>

        {/* Info List */}
        <div className="h-[50vh] overflow-scroll" style={{scrollbarWidth: "none"}}>

        {fields.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-left py-3 border-b border-gray-200"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.label}</p>
              <p className={`text-sm ${item.value === "Not available" ? "text-gray-400 italic" : "text-gray-700"}`}>
                {item.value}
              </p>
            </div>
            <button onClick={() => showModal(item)} className="flex items-center text-secondary hover:underline text-sm">
              <PlusCircle className="w-4 h-4 mr-1" />
              Suggest
            </button>
          </div>
        ))}
        <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Social profiles</h2>
          <button className="flex items-center text-secondary hover:underline text-sm">
            <PlusCircle className="w-4 h-4 mr-1" />
            Suggest
          </button>
        </div>

        <div className="flex gap-6 text-gray-700 flex-col md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <Linkedin className="w-5 h-5 text-gray-800" />
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Facebook className="w-5 h-5 text-gray-800" />
            <span>Facebook</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Instagram className="w-5 h-5 text-gray-800" />
            <span>Instagram</span>
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
          open= {openFileModal} 
          label="Logo Upload" 
          onClose={()=> setOpenFileModal(false)} 
          metaData={{onSubmitFunc: logoUpload}}
          />
      )}

    </div>
  );
};

export default CompanyProfile;
