import dbConnect from "@/dbConfig/dbConnect";
import batchService from "@/services/batch.service";
import { NextResponse } from "next/server";
const batchInstance = new batchService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = await params;
        const batch = await batchInstance.findById(batchId);
        return NextResponse.json(batch)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function PUT(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = await params;
        const batchDetails = await req.json();
        const { type } = batchDetails

        if(type === "assign")
        {
            await batchInstance.addQuizToBatch(batchId, batchDetails.mock);
            return NextResponse.json({message: 'Mock is assigned to batch'})
        }

        if(type === "retake")
        {
            await batchInstance.updateMockStatus(batchId, batchDetails.id, batchDetails.status);
            return NextResponse.json({message: `Mock retake ${batchDetails.status.toLowerCase()}`})
        }

        if(type === "access")
        {
            await batchInstance.updateBatchAccess(batchId, batchDetails.access);
            return NextResponse.json({message: access === 'true' ? 'Batch Access Granted' : 'Batch Access Revoked'})
        }
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function DELETE(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = params;
        await batchInstance.deleteById(batchId);
        return NextResponse.json({message: 'deleted'})
    }
    catch(error)
    {
        return NextResponse.json(batch)
    }
}