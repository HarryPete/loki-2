import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";

import userService from "@/services/user.service";
const userInstance = new userService();
import batchService from "@/services/batch.service";
const batchInstance = new batchService();
import enrollmentService from "@/services/enrollment.service";
const enrollmentInstance = new enrollmentService(); 

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();

        const { userId } = await params;
        const { batchId } = await req.json();
        const enrollment = await enrollmentInstance.enroll(userId, batchId)
        await userInstance.updatEnrollment(userId, enrollment._id);
        await batchInstance.enrollUser(batchId, enrollment._id)
        return NextResponse.json({message : 'Enrolled successfully'});
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

        
        const { userId } = await params;
        const enrollment = await enrollmentInstance.getEnrollmentById(userId);
        
        return NextResponse.json(enrollment);
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}

export async function PUT(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = await params;
        const { batchId, enrollmentId } = await req.json(); 
        await userInstance.removeEnrollment(userId, enrollmentId);
        await batchInstance.removeEnrollment(batchId, enrollmentId);
        await enrollmentInstance.removeEnrollment(enrollmentId)
        return NextResponse.json({message: 'Duplicate removed'})
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}