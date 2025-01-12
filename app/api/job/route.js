import dbConnect from "@/dbConfig/dbConnect";
import jobService from "@/services/job.service";
import { NextResponse } from "next/server";
const jobInstance = new jobService();

export async function POST(req) 
{
    try
    {
        await dbConnect();

        const jobDetails = await req.json()
        await jobInstance.postNewJob(jobDetails);
        return NextResponse.json({message: 'Job posted'})
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
        const allJobs = await jobInstance.getAllJobs();
        return NextResponse.json(allJobs)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}