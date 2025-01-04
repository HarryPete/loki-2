import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";

import userService from "@/services/user.service";
const userInstance = new userService();
import batchService from "@/services/batch.service";
const batchInstance = new batchService();
import enrollmentService from "@/services/enrollment.service";
const enrollmentInstance = new enrollmentService(); 

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();

        const { enrollmentId } = await params;
        const updates = await req.json();
        await enrollmentInstance.updateEnrollment(enrollmentId, updates)
        return NextResponse.json({message : 'Updated'});
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