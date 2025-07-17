import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Typography,
    Button,
    IconButton,
    Chip,
    Divider,
    DialogActions
} from '@mui/material';
import { Close, Phone, WhatsApp, ThumbUp, Close as RejectIcon, PictureAsPdf } from '@mui/icons-material';
import { Eye, View } from 'lucide-react';
import { updateApplication } from '../../../API/ApiFunctions';
import { showErrorToast, showSuccessToast } from '../../ui/toast';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { useDispatch } from 'react-redux';
import { fetchJobsById } from '../../../Redux/getData';


const ProfileModal = ({ open, onClose, jobId, candidate, phone, isDatabase, id , status }) => {



    const [age, setAge] = useState(0);
    const dispatch = useDispatch();

    console.log(candidate)

    const handleReject = async (id) => {
        console.log(id)
        const response = await updateApplication(id, { status: "Rejected" });
        if (response) {
          showSuccessToast("succesfully Rejected")
          dispatch(fetchJobsById(jobId))
        } else {
          showErrorToast("could not processed, Try again!")
        }
      }
    
      const handleShortList = async (id) => {
        const response = await updateApplication(id, { status: "Selected" });
        if (response) {
          showSuccessToast("succesfully Shortlisted")
          dispatch(fetchJobsById(jobId))
        } else {
          showErrorToast("could not processed, Try again!")
        }
      }

    useEffect(() => {
        const dob = candidate?.dob;
        const years = dob.split("-")[0];
        const currentYear = new Date().getFullYear();
        setAge(currentYear - years)
    }, [])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >

            <DialogTitle className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
                        {candidate.fullName.split("")[0].toUpperCase()}
                    </div>
                    <div>
                        <Typography variant="h6">{candidate.fullName}</Typography>
                        <Typography variant="body2" sx={{ color: "darkgray", fontWeight: 700 }}>
                            {candidate.gender}, {age} years &nbsp; | &nbsp;
                            <span>₹{candidate.salary}/mo</span> &nbsp; | &nbsp;
                            {candidate.currentLocation}, {candidate.hometown}
                        </Typography>
                    </div>
                </div>
                <IconButton onClick={onClose}><Close /></IconButton>
            </DialogTitle>



            <DialogContent className="space-y-6 p-6">

                <>
                    <section>
                        <Typography variant="subtitle1" className="font-bold" sx={{ fontWeight: 700 }}>Work Experience</Typography>
                        {candidate.EmployeeExperiences.map((experience, index) => (

                            <Typography key={index} variant="body2" sx={{ marginTop: "20px" }}>
                                {experience.jobTitle} at {experience.companyName} ({experience.startDate}- {experience.endDate})<br />
                                {/* Role: {JSON.parse(experience.jobRole).map((role, index)=> <p key={index}>{role}</p>)} | Industry: {experience.industry} */}
                            </Typography>
                        ))}
                    </section>

                    <section>
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Education</Typography>
                        {candidate.EmployeeEducations.map((edu, index) => (
                            <Typography key={index} variant="body2">
                                {edu.degree},{edu.specialization} | {edu.instituteName} | {edu.startDate.split("-")[0]}-{edu.endDate.split("-")[0]}
                            </Typography>
                        ))}
                    </section>

                    <section>
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Languages</Typography>
                        <Chip label={`English (${candidate.englishProficiency})`} className="mr-2 mt-1" />
                        {(Array.isArray(candidate.preferredShifts)? candidate.preferredShifts: JSON.parse(candidate.otherLanguages))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}
                    </section>

                    <section>
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Skills</Typography>

                        {(Array.isArray(candidate.skills)? candidate.skills: JSON.parse(candidate.skills))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}
                    </section>

                    <section>
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Candidate Preferences</Typography>

                        {(Array.isArray(candidate.preferredShifts)? candidate.preferredShifts: JSON.parse(candidate.preferredShifts))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}

                        {(Array.isArray(candidate.prefferedEmploymentTypes)? candidate.prefferedEmploymentTypes: JSON.parse(candidate.prefferedEmploymentTypes))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}

                        {(Array.isArray(candidate.preferredLocationTypes)? candidate.preferredLocationTypes: JSON.parse(candidate.preferredLocationTypes))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}

                        {(Array.isArray(candidate.preferredJobCity)? candidate.preferredJobCity: JSON.parse(candidate.preferredJobCity))?.map((lang, idx) => (
                            <Chip key={idx} label={lang} className="mr-2 mt-1" />
                        ))}
                    </section>

                    <section>
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Basic Details</Typography>

                        <Typography sx={{ color: "grey", fontSize: ["0.9rem"] }}>Email</Typography>
                        {candidate.email}
                    </section>


                    <section >
                        <Typography variant="subtitle1" className="font-semibold" sx={{ fontWeight: 700 }}>Resume</Typography>
                        <div className='flex flex-row gap-4 mt-4'>


                            <div className='flex flex-row gap-2'>
                                <PictureAsPdf sx={{ color: 'red' }} />

                                {candidate.resumeURL?.split("/").pop()}

                            </div>
                            <button onClick={() => window.open(candidate.resumeURL, '_blank')}>
                                <RemoveRedEyeTwoToneIcon />
                            </button>
                        </div>
                    </section>

                    {/* <section>
              <Typography variant="subtitle1" className="font-semibold">Matching</Typography>
              <Typography variant="body2" className="text-gray-700">
                {candidate.matching}
              </Typography>
            </section> */}
                </>

            </DialogContent>

            <DialogActions sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>

                <Divider />

                <div className="flex flex-wrap gap-3 mt-4 justify-start">
                    <Button variant="contained" startIcon={<Phone />} className="bg-green-600 hover:bg-green-700">
                        {phone}
                    </Button>
                    <Button variant="outlined" startIcon={<WhatsApp />} className="text-green-600 border-green-600">
                        WhatsApp
                    </Button>
                    {!isDatabase && <><Button variant="outlined" onClick={() => handleShortList(id)} disabled={status === "Selected"} color="success">{(status === "Selected") ? "Shortlisted" : "ShortList"}</Button>
                    <Button variant="contained" onClick={() => handleReject(id)} disabled={status === "Rejected"} color="error">{(status === "Rejected") ? "Rejected" : "Reject"}</Button></>}

                </div>

                <Typography variant="caption" className="text-gray-500 mt-3 block" >
                    Applied {candidate.appliedAgo} | Active {candidate.lastActive}
                </Typography>

            </DialogActions>


        </Dialog>
    );
};

export default ProfileModal;
