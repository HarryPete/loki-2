import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server"
import forumService from "@/services/forum.service";
const forumInstance = new forumService();

export async function GET(req, res)
{
    try
    {
        await dbConnect();
        // const {searchParams} = new URL(req.url);
        // const params = new URLSearchParams(searchParams);
        // const searchKey = params.get('search') ? params.get('search') : '';
        // const orderKey = params.get('order') ? params.get('order') : ''
        // const topic = params.get('topic') ? params.get('topic') : ''
        const discussions = await forumInstance.findAll();
        // const orderedDiscussion = orderKey === "dec" ? discussions.sort((a,b)=> b.updatedAt - a.updatedAt) : discussions
        // const disccussionTopic = topic ? orderedDiscussion.filter((discussion) => discussion.keywords.includes(topic)) : orderedDiscussion;
        return NextResponse.json(discussions)
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function POST(req, res)
{
    try
    {
        await dbConnect();
        const {title, author, keywords} = await req.json();

        console.log(title, author, keywords)
        const discussion = await forumInstance.addNewDiscussion(title, author, keywords);
        return NextResponse.json({message: 'Discussion posted'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}