import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import graduateService from "@/services/graduate.service";
import enrollmentService from "@/services/enrollment.service";
const graduateInstance = new graduateService();
const enrollmentInstance = new enrollmentService();

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();
        const { graduationId } = await params
        const graduationDetails = await req.json()
        await graduateInstance.updateGraduationList(graduationId, graduationDetails.enrollmentId);
        await enrollmentInstance.updateGraduation(graduationDetails.enrollmentId, graduationId)
        return NextResponse.json({message: 'Graduation list updated'})
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

        const { graduationId } =  await params
        const course = await graduateInstance.getMonthlyGraduates(graduationId);
        return NextResponse.json(course)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
} 


