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
        const { courseId, lectureId } = await req.json();
        const response = await courseInstance.addLectureToCourse(courseId, lectureId);
        console.log(response)
        return NextResponse.json({message:'Lecture added'}); 
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message})
    } 
}