import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import graduateService from "@/services/graduate.service";
const graduateInstance = new graduateService();

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


