import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
const batchInstance = new batchService();
import batchService from "@/services/batch.service";
const courseInstance = new courseService();
import courseService from "@/services/course.service";

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

        if(type === "assignTrigger")
        {
            await batchInstance.addSimulationToBatch(batchId, batchDetails.simulation);
            return NextResponse.json({message: 'Trigger Assigned'})
        }

        if(type === "retakeTrigger")
        {
            await batchInstance.updateSimulationStatus(batchId, batchDetails.id, batchDetails.isLocked);
            return NextResponse.json({message: `Mock Retake ${batchDetails.isLocked ? 'Locked' : 'Unlocked'}`})
        }

        if(type === "assignMock")
        {
            await batchInstance.addQuizToBatch(batchId, batchDetails.mock);
            return NextResponse.json({message: 'Mock Assigned'})
        }

        if(type === "retakeMock")
        {
            await batchInstance.updateMockStatus(batchId, batchDetails.id, batchDetails.isLocked);
            return NextResponse.json({message: `Mock Retake ${batchDetails.status}`})
        }

        if(type === "access")
        {
            await batchInstance.updateBatchAccess(batchId, batchDetails.access);
            return NextResponse.json({message: batchDetails.access ? 'Batch Access Granted' : 'Batch Access Revoked'})
        }

        if(type === "enrollmentStatus")
        {
            await batchInstance.updateBatchEnrollmentStatus(batchId, batchDetails.enrollmentStatus);
            if(batchDetails.enrollmentStatus)
                await courseInstance.enableEnrollment(batchDetails.courseId, batchId)
            else
                await courseInstance.disableEnrollment(batchDetails.courseId, batchId )
            return NextResponse.json({message: !batchDetails.enrollmentStatus ? 'Enrollment Disabled' : 'Enrollment Enabled'})
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