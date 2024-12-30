'use client'

import Loading from "@/app/components/Loading";
import Rating from "@/app/components/Rating";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import defaultDP from '../../../assets/defaultDP.png'

const Page = () =>
{
    const [ feedbacks, setFeedbacks ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(()=>
    {
        getFeedbacks();
    },[])

    const getFeedbacks = async () =>
    {
        try
        {
            const url = '/api/feedback'
            const response = await axios.get(url);
            setFeedbacks(response.data)
        }
        catch(error)
        {
            toast.error()
        }
        finally
        {
            setIsLoading(false);
        }
    }

    console.log(feedbacks)

    if(isLoading)
        return <Loading/>

    return(
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:text-base text-sm">
        {feedbacks.map((feed)=>
        (
            <Card key={feed._id} className='p-4 space-y-4'>
                <Image className="h-20 w-20 object-cover rounded-full object-top" src={feed.user?.imageURL ? feed.user?.imageURL  : defaultDP } alt='user' width={100} height={100}/>
                <div className="space-y-2">
                    <p className="font-lg font-semibold">{feed.user.name}</p>
                    <p>{feed.comment}</p>
                    <p className="font-semibold">{feed.user?.country}</p>
                    <Rating value={feed.rating}/>
                </div>
            </Card> 
        ))}
        </div>
    )
}

export default Page