import testService from "@/services/test.service";
import assignmentService from "@/services/assignment.service";
import groupService from "@/services/group.service";
import quizService from "@/services/quiz.service";
import batchService from "@/services/batch.service";
import enrollmentService from "@/services/enrollment.service";

const testInstance = new testService();
const assignmentInstance = new assignmentService();
const groupInstance = new groupService();
const quizInstance = new quizService();
const batchInstance = new batchService();
const enrollmentInstance = new enrollmentService();

import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();
        
        const {quizId} = params;
        const {users, batch} = await req.json();
        
        const batchId = await batchInstance.findById(batch);
        const quiz = await quizInstance.getQuizById(quizId);
        let group = null;
        const groups = quiz.group;
        if(!groups.length)
            group = await groupInstance.createGroup(batchId._id)
        else 
        {
            const isOldGroup = groups.find((group)=> group.batch._id.toString() === batchId._id.toString());
            group = isOldGroup ? isOldGroup : await groupInstance.createGroup(batchId._id)
        }
        
        for(let user of users)
        {
            const test = await testInstance.createNewTest(quiz.title, quiz.quiz)
            await enrollmentInstance.assignTest(user, test._id)
            const assignment = await assignmentInstance.assign(user, test._id)
            await groupInstance.updateAssignment(group, assignment._id)
        }
        await quizInstance.updateGroup(quizId, group._id)

    return NextResponse.json({message: 'Quizzes added'})
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

        const {quizId} = await params;
        const quiz = await quizInstance.getQuizByTitle(quizId);
        return NextResponse.json(quiz);
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}





