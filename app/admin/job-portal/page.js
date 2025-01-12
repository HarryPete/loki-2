'use client'

import JobForm from "@/app/components/JobForm";
import Loading from "@/app/components/Loading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { FormatDate } from "@/utility/FormatDate";
import axios from "axios";
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner";

const Page = () =>
{
    const [ jobs, setJobs ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(()=>
    {
        getJobs();
    },[])

    const getJobs = async () =>
    {
        try
        {
            const url = '/api/job'
            const response  = await axios.get(url);
            setJobs(response.data);
        }
        catch(error)
        {
            toast.error(error.message)
        }
        finally
        {
            setIsLoading(false)
        }
    } 

    console.log(jobs)

    if(isLoading)
        return <Loading/>

    return(
        <div className="space-y-4">
            {/* <JobForm showJobForm={showJobForm} setShowJobForm={setShowJobForm}/> */}
            <div>
                <h1 className="font-semibold text-lg">Listed Jobs</h1>
                <p className="text-xs text-muted-foreground">Last updated {FormatDate(jobs[jobs.length-1].createdAt)}</p>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {jobs.map((job)=>
            (
                <Card key={job._id} className='p-6 md:text-sm text-xs space-y-1'>
                    <div className="font-semibold flex items-center justify-between">
                        <span>{job.title}</span>
                        <span className="text-muted-foreground">{job.company}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p><span>Experience : </span>{job.experience} years</p>
                        <span></span>{job.city +', ' +job.country}
                    </div>
                    <p className="pb-4"><span>Openings : </span>{job.openings}</p>
                    {/* <p className="border-t py-4">{job.description}</p> */}
                    <footer className="flex gap-2 text-xs justify-between">
                        <div className="space-x-2">
                            <span className="bg-yellow-400 p-1 rounded">{job.jobType}</span>
                            <span className="bg-yellow-400 p-1 rounded">{job.workplaceType}</span>
                        </div>
                        <p className="text-muted-foreground">Posted on {FormatDate(job.createdAt)}</p>
                    </footer>
                </Card>
            ))}
            </div>
        </div>
    )
}

const JobPortal = () =>
{

    return(
        <Suspense fallback={<Loading/>}>
            <Page/>
        </Suspense>
    )
}

export default JobPortal