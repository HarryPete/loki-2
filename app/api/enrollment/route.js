import dbConnect from "@/dbConfig/dbConnect";
import enrollmentService from "@/services/enrollment.service";
import { NextResponse } from "next/server";
const enrollmentInstance = new enrollmentService();

export async function GET() 
{
    try
    {
        await dbConnect();
        const enrollments = await enrollmentInstance.getEnrollments();
        return NextResponse.json(enrollments);
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message});
    } 
}