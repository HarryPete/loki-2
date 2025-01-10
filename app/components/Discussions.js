'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import upArrow from '@/assets/show.png'
import downArrow from '@/assets/drop.png'
import { toast } from 'sonner';
import Discussion from './Discussion';
import Comment from './Comment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Discussions = ({discussions, getDiscussions, getTopics}) =>
{   
    const [ comment, setComment ] = useState('')
    const [ viewComment, setViewComment ] = useState(null)

    const session = useSession();
    const user = session?.data?.user?.id

    const handleDelete = async (id) =>
    {
        try
        {
            const url = `/api/forum/${id}`
            const response = await axios.delete(url);
            toast.success(response.data.message);
            getDiscussions('/api/forum');
            getTopics();
        }
        catch(error)
        {
            toast.error(error);
        }
    }

    const handleComment = async (id) =>
    {
        try
        {
            if(!comment)
                return toast.error('Comment cannot be empty')

            const url = `/api/comment/${id}`
            if(user)
            {
                const response = await axios.post(url, {comment, author: user});
                toast.success(response.data.message)
                getDiscussions('/api/forum');
                setComment('');
                setViewComment(id);
            }
            return
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    return(
        <div className='grid grid-cols-1 gap-4'>
            {discussions.map((discussion) =>
            (
                <Card className='space-y-4 p-4' key={discussion._id}>
                    <Discussion discussion={discussion} handleDelete={handleDelete}/>
                    <div className='flex gap-2'>
                        <Input value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Reply'/>
                        <Button onClick={()=> handleComment(discussion._id)}>Send</Button>
                    </div>
                    { discussion.comments.length > 0 ?
                    <div className='flex items-center gap-2 cursor-pointer bg-white w-fit p-2 ursor-pointer rounded-2xl text-sm' onClick={()=> setViewComment((prev) => prev  === discussion._id ? null : discussion._id)}>
                        <p>{discussion.comments?.length > 1 ? 'View responses' : 'View response'}</p>
                       <Image className='h-4 w-fit' src={viewComment === discussion._id ? upArrow : downArrow} alt='comments'/> 
                    </div>:<p className='text-muted-foreground text-sm'>Be the first one to respond</p>}
                    {viewComment === discussion._id &&
                    <div className='space-y-4'>
                    {discussion.comments.map((comment) =>
                    (
                        <Comment key={comment._id} comment={comment} user={user} getDiscussions={getDiscussions}/>
                    ))}
                    </div>}
                </Card>
            ))}
        </div>
    )
}

export default Discussions