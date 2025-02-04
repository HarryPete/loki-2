import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import triggerResponseService from "@/services/trigger.response.service";
const triggerResponseInstance = new triggerResponseService();

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();
        const {triggerId} = await params;
        const triggerResponseDetails = await req.json();
        await triggerResponseInstance.updateTriggerResponses(triggerId, triggerResponseDetails)
        if(triggerResponseDetails.isCompleted)
            return NextResponse.json({message: 'Trigger response recorded'})
        else
            return NextResponse.json({message: 'Trigger responses reset'})
        
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
        const {triggerId} = await params;
        const triggerResponse = await triggerResponseInstance.findById(triggerId);
        return NextResponse.json(triggerResponse);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}