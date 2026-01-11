import lectureService from "@/services/lecture.service";
const lectureInstance = new lectureService();
import courseService from "@/services/course.service";
import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
const courseInstance = new courseService();

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();

        const { courseId } = params;
        const { description, duration } = await req.json();
        const lecture = await lectureInstance.addNewLecture(description, duration);
        await courseInstance.addLectureToCourse(courseId, lecture._id);
        return NextResponse.json({message:'Lecture added'}); 
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

        const { lectureId } = params;
        const lecture= await lectureInstance.getLecture(lectureId);
        return NextResponse.json(lecture); 
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message})
    } 
}