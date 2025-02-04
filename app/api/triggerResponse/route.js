import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import enrollmentService from "@/services/enrollment.service";
import batchService from "@/services/batch.service";
import mongoose from "mongoose";
import triggerResponseService from "@/services/trigger.response.service";
const triggerResponseInstance = new triggerResponseService();
const enrollmentInstance = new enrollmentService();
const batchInstance = new batchService();

export async function POST(req, res) 
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        const { triggerId, enrollmentId, batchId, id } = await req.json();
        const triggerResponse = await triggerResponseInstance.createTriggerResponse(triggerId, batchId, enrollmentId);
        await enrollmentInstance.assignTrigger(enrollmentId, triggerResponse._id.toString())
        await batchInstance.updateSimulations(batchId, id, triggerResponse._id.toString())
        return NextResponse.json({message: 'Trigger Created'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({error: error.message})
    }
}

// export async function GET(req, {params}) 
// {
//     try
//     {
//         await dbConnect();
//         const triggerResponses = await testInstance.findById(testId);
//         return NextResponse.json(test);
//     }
//     catch(error)
//     {
//         return NextResponse.json({error: error.message});
//     }
// }