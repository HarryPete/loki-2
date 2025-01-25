'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import locked from '../../../../assets/locked.png'
import pendingIcon from '../../../../assets/pendingIcon.png'
import correctIcon from '../../../../assets/correct.png'
import { useParams, usebatchId, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import ProgressBar from '@/app/components/ProgressBar';
import Lecturecard from '@/app/components/LectureCard';
import mockIcon from '../../../../assets/mock.png'
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
    const [ pendingTests, setPendingTests ] = useState(null);
    const pathname = usePathname();
    
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
            const pendingTests = response.data.batch.mocks.slice(response.data.mocks.length)
            setPendingTests(pendingTests.length)
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

    console.log(enrollment)

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
            toast.error('Access denied')
    }

    const handleMock = async (mock) =>
    {
        if(mock.status === 'Locked')
            return toast.error('Access denied')

        try
        {
            setIsLoading(true);
            const url = `/api/assessment`;
            const response = await axios.post(url, {quizId: mock.quiz, enrollmentId: enrollment._id, batchId: enrollment.batch._id, id:mock.id})
            toast.success(response.data.message);
            getBatchData();
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    if(status === 'loading' || isLoading)
    return(
        <Loading/>   
    )

    return(
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 relative text-sm'>
            <div>
            <div className="flex flex-col gap-2 lg:sticky lg:top-28">
                <ProgressBar batch={enrollment.batch}/>
                <div className="grid grid-cols-3 gap-3 pt-2">
                <Link className="" href={`${pathname}/mock-tests?eId=${enrollment._id}`}>
                    <Card className='p-5 text-center'>
                        Mock Tests
                    </Card>
                </Link>
                    <Card className='p-5 flex justify-between items-center'>
                        <span>Total mocks</span>
                        <span className="p-0.25 px-2 bg-green-500 rounded-full text-white">{enrollment.batch.mocks.length}</span>
                    </Card>
                    <Card className='p-5 flex justify-between items-center'>
                        <span>Assigned mocks</span>
                        <span className="p-0.25 px-2 bg-orange-500 rounded-full text-white">{enrollment.mocks.length}</span>
                    </Card>
                </div>
            </div>
            </div>
            <div className='grid grid-cols-1 gap-4'>
            {enrollment.batch.sessions.map((session, index)=>
            (
                <Card className='flex gap-2 justify-between cursor-pointer items-center p-6' 
                    key={session._id} onClick={()=> handleAccess(session, index)}>
                    <p>{session.lecture.title}</p>
                    {session.status === 'Upcoming' && <Image className='h-5 w-fit' src={locked} alt={session.status}/>}
                </Card>
            ))}
            </div>                
        </div>
    )
}

export default Page

