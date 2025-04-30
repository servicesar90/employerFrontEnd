import React from 'react'
import { Button, Card, CardContent } from '@mui/material';
import { Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { employer } from '../../assets/data';
import JobCard from '../ui/cards/jobCards';

export default function Jobs() {
    const navigate = useNavigate();
    const jobs= employer.jobs;

    if (jobs.length == 0) {
        return (
            <>
            <Button variant="contained" onClick={() => navigate("/jobsModal")} color="success">
                            Post a new job
                        </Button>
            <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">All Jobs ({jobs.length})</h2>
            {jobs.map((job, index)=>(
                <div key={index} onClick={()=>navigate(`/employerHome/jobsDetail/${job.id}`)}>
                <JobCard title={job.jobTitle} status={job.jobActivity.status} location={job.location} postedOn={job.jobActivity.postedOn} recruiter={job.jobActivity.recruiter} appliedCount={job.jobActivity.appliedCount} pendingCount={job.jobActivity.pendingCount} dbMatches={job.jobActivity.pendingCount} showDuplicate={job.jobActivity.status==="Active"}/>
                </div>
            ))}
             </div>
            </>
        )
    } else {
        return (
            <div className="min-h-screen w-full bg-gray-100 p-6">
                <Button variant='contained' onClick={() => navigate("/profile")} color='success'>Update profile</Button>
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="text-2xl font-semibold text-gray-800">Jobs</h1>
                        <Button variant="contained" onClick={() => navigate("/jobsModal")} color="success">
                            Post a new job
                        </Button>
                    </div>

                    <Card className="mt-10">
                        <CardContent className="p-10 text-center">
                            <h2 className="text-xl font-medium mb-8">Post your first job</h2>
                            <div className="flex justify-center gap-10">
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                                        <Plus size={28} />
                                    </div>
                                    <p className="mt-4 font-medium">Start with blank form</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Use our blank form to create your job and fill manually
                                    </p>
                                    <Button variant="outlined" onClick={() => navigate("/jobsModal")} className="mt-4">
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
                                    <Button variant="contained" color="success" className="mt-4">
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
