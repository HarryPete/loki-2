
import dbConnect from "@/dbConfig/dbConnect";
const quizInstance = new quizService();
import quizService from "@/services/quiz.service";

import courseService from "@/services/course.service";
const courseInstance = new courseService();
import { NextResponse } from "next/server";

export async function POST(req)
{
    try
    {
        await dbConnect();

        const { title, course, reference } = await req.json();
        const quiz = await quizInstance.createQuiz(title, course, reference);
        await courseInstance.addMockToCourse(course, quiz._id.toString())
        return NextResponse.json({message: 'Quiz created'})
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
        const quizzes = await quizInstance.getAllQuizzes();
        return NextResponse.json(quizzes);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}