import React from 'react'
import { Button, Card, CardContent } from '@mui/material';
import { Plus, FileText } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import JobCard from '../ui/cards/jobCards';

export default function Jobs() {
    const navigate = useNavigate();
    
    const { jobs}= useOutletContext()


  

    if (jobs?.length > 0) {
        return (
            <>
                <div className="min-h-screen w-full bg-gray-100 p-6 rounded-xl">

                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between py-4">
                            <h1 className="text-2xl font-semibold text-gray-800">All Jobs({jobs.length})</h1>
                            <Button variant="contained" onClick={() => navigate(`/jobsModal/${null}`)} color="success" sx={{
                                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
                                padding: { xs: '4px 10px', sm: '6px 14px', md: '8px 20px' },
                            }}>
                                Post a new job
                            </Button>
                        </div>

                        <Card className="mt-10">
                            <CardContent className="p-10 text-center">
                                <div className="p-6 bg-gray-50 min-h-screen">
                                   
                                    {jobs.map((job, index) => (
                                        <div key={index}>
                                            <JobCard job={job}  />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </>
        )
    } else {
        return (
            <div className="min-h-screen w-full bg-gray-100 p-6">

                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="text-2xl font-semibold text-gray-800">Jobs</h1>
                        <Button variant="contained" onClick={() => navigate(`/jobsModal/${null}`)} color="success" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
                            padding: { xs: '4px 10px', sm: '6px 14px', md: '8px 20px' },
                        }}>
                            Post a new job
                        </Button>
                    </div>

                    <Card className="mt-10">
                        <CardContent className="p-10 text-center">
                            <h2 className="text-xl font-medium mb-8">Post your first job</h2>
                            <div className="flex flex-col lg:flex-row justify-center gap-10">
                                <div onClick={()=>navigate(`/jobsModal/${null}`)} className="flex flex-col items-center">
                                    <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                                        <Plus size={28} />
                                    </div>
                                    <p className="mt-4 font-medium">Start with blank form</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Use our blank form to create your job and fill manually
                                    </p>
                                    <Button variant="outlined" onClick={() => navigate("/jobsModal")} sx={{ marginTop: "10px" }}>
                                        Start with blank form
                                    </Button>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-purple-100 text-purple-600 p-4 rounded-full">
                                        <FileText size={28} />
                                    </div>
                                    <p className="mt-4 font-medium">Use a template</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Use templates made by apna to save time and hire the right candidates.
                                    </p>
                                    <Button variant="contained" color="success" sx={{ marginTop: "10px" }}>
                                        Use a template
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
