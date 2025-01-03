'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import locked from '../../../../assets/locked.png'
import { useParams, usebatchId, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import ProgressBar from '@/app/components/ProgressBar';
import Lecturecard from '@/app/components/LectureCard';
import { Card } from '@/components/ui/card';

export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

export const recordings = (sessions) =>
{
    const count = sessions.filter((session) => session.status === 'Completed').length
    return count === 0 ? 'NA' : count
}

const Page = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <Batch/>
        </Suspense>
    )
}

const Batch = () =>
{
    const { data, status } = useSession();
    const [ enrollment, setEnrollment ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const params = useSearchParams();
    const enrolmentId = params.get('eId');
    const router = useRouter();
    
    const getBatchData = async () =>
    {
        try
        {
            const url = `/api/enrollment/${enrolmentId}`
            const response = await axios.get(url);
            if(!response.data.batch.access)
            {
                router.push('/dashboard')
                toast('Access Denied')
            }
            setEnrollment(response.data)
        }
        catch(error)
        {
            toast(error.message);
        }
        finally
        {
            setIsLoading(false)
        }
    }
    useEffect(() => 
    {
        if(status === "authenticated")
        {
            getBatchData();
        }
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
            
    }, [status]);

    const handleAccess = (session, index) =>
    {
        if(session.status === 'Completed')
            router.push(`/course/${enrollment.batch.course.id}/lecture?lectureId=${session.lecture._id}&&course=${enrollment.batch.course.id}&&id=${index+1}`)
        else
            toast('Access denied')
    }

    if(status === 'loading' || isLoading)
    return(
        <Loading/>   
    )

    return(
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 relative text-sm'>
            <ProgressBar batch={enrollment.batch}/>
            <div className='grid grid-cols-1 gap-4'>
            {enrollment.batch.sessions.map((session, index)=>
            (
                <Card className='flex gap-2 justify-between items-center p-6 cursor-pointer' key={session._id} onClick={()=> handleAccess(session, index)}>
                    <p>{session.lecture.title}</p>
                    {session.status === 'Upcoming' && <Image className='h-6 w-fit' src={locked} alt={session.status}/>}
                </Card>
            ))}
            </div>
        </div>
    )
}

export default Page