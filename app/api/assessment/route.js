import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import testService from "@/services/test.service";
import enrollmentService from "@/services/enrollment.service";
import batchService from "@/services/batch.service";
import mongoose from "mongoose";
const testInstance = new testService();
const enrollmentInstance = new enrollmentService();
const batchInstance = new batchService();

export async function POST(req, res) 
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        const { quizId, enrollmentId, batchId, id } = await req.json();
        const test = await testInstance.createNewTest(quizId, enrollmentId);
        await enrollmentInstance.assignMockTest(enrollmentId, test._id.toString())
        await batchInstance.updateMocks(batchId, id, test._id.toString())
        return NextResponse.json({message: 'Mock Test Created'})
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
//         const {testId} = params;
//         console.log(testId)
//         const test = await testInstance.findById(testId);
//         return NextResponse.json(test);
//     }
//     catch(error)
//     {
//         return NextResponse.json({error: error.message});
//     }
// }