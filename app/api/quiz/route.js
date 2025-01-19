
import dbConnect from "@/dbConfig/dbConnect";
import quizService from "@/services/quiz.service";
import { NextResponse } from "next/server";
const quizInstance = new quizService();

export async function POST(req)
{
    try
    {
        await dbConnect();

        const { title, course, reference } = await req.json();
        await quizInstance.createQuiz(title, course, reference)
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