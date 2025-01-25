import dbConnect from "@/dbConfig/dbConnect";
import graduateService from "@/services/graduate.service";
import { NextResponse } from "next/server";
const graduatesInstance = new graduateService();

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();
        const graduationDetails = await req.json()
        await graduatesInstance.createGraduationBatch(graduationDetails);
        return NextResponse.json({message: `Graduation Batch ${graduationDetails.month +' ' +graduationDetails.year} Created`})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
} 

export async function GET() 
{
    try
    {
        await dbConnect();
        const graduates = await graduatesInstance.getGraduates();
        return NextResponse.json(graduates);
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message});
    } 
}
