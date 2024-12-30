import dbConnect from "@/dbConfig/dbConnect";
import displayService from "@/services/display.service";
import { NextResponse } from "next/server";
const displayInstance = new displayService();

export async function GET() 
{
    try
    {
        await dbConnect();

        const displayData = await displayInstance.getDisplayData();
        return NextResponse.json(displayData);
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}