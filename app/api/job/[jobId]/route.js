import dbConnect from "@/dbConfig/dbConnect";
import jobService from "@/services/job.service";
import { NextResponse } from "next/server";
const jobInstance = new jobService();

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();

        const { jobId } = await params
        const jobDetails = await req.json();
        await jobInstance.updateJob(jobId, jobDetails);
        return NextResponse.json({message: 'Apllied Successfully'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req) 
{
    try
    {
        await dbConnect();
        const { jobId } = await params
        const job = await jobInstance.getJobById(jobId);
        return NextResponse.json(job)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}