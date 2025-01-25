import dbConnect from "@/dbConfig/dbConnect";
import feedbackService from "@/services/feedback.service";
import courseService from "@/services/course.service";
import { NextResponse } from "next/server";
const courseInstance = new courseService();
const feedbackInstance = new feedbackService

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();
        const { feedbackId } = await params
        const feedbackDetails = await req.json()

        if(feedbackDetails.type === 'edit')
        {
            await feedbackInstance.updateFeedback(feedbackId, feedbackDetails);
            return NextResponse.json({message: 'Feedback updated'})
        }
        else
        {
            await courseInstance.deleteFeedbackFromCourse(feedbackDetails.courseId, feedbackId)
            await feedbackInstance.deleteFeedback(feedbackId);
            return NextResponse.json({message: 'Feedback removed'})
        }
        
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

// export async function DELETE(req, {params}) 
// {
//     try
//     {
//         await dbConnect();
//         const { feedbackId } = await params
//         const { courseId } = await req.json()
//         await courseInstance.deleteFeedbackFromCourse(courseId, feedbackId)
//         await feedbackInstance.deleteFeedback(feedbackId);
//         return NextResponse.json({message: 'Feedback removed'})
//     }
//     catch(error)
//     {
//         return NextResponse.json({error: error.message})
//     }
// }