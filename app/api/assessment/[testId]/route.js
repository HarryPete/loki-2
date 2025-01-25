import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import testService from "@/services/test.service";
const testInstance = new testService();

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();
        const {testId} = await params;
        const mockDetails = await req.json();
        await testInstance.updateScores(testId, mockDetails)
        if(mockDetails.status === 'Pending')
            return NextResponse.json({message: 'Assessment reset'})
        else
            return NextResponse.json({message: 'Assessment completed'})
        
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();
        const {testId} = await params;
        const test = await testInstance.findById(testId);
        return NextResponse.json(test);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}