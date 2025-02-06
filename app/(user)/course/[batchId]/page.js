'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import locked from '../../../../assets/locked.png'
import pendingIcon from '../../../../assets/pendingIcon.png'
import agenda from '../../../../assets/agenda.png'
import correctIcon from '../../../../assets/correct.png'
import { useParams, usebatchId, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import ProgressBar from '@/app/components/ProgressBar';
import Lecturecard from '@/app/components/LectureCard';
import mockIcon from '../../../../assets/mock.png'
import triggerIcon from '../../../../assets/course.png'
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { FormatDate } from "@/utility/FormatDate";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  

export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => !session.isCompleted).length
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
    const [ cardLoading, setCardloading ] = useState(false);
    
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

    const handleTrigger = async (simulation) =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/triggerResponse`;
            const response = await axios.post(url, {triggerId: simulation.trigger, enrollmentId: enrollment._id, batchId: enrollment.batch._id, id:simulation.id})
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
        <div className='grid grid-cols-1 gap-4 relative md:text-sm text-xs'>
            <div className='space-y-2 text-base'>
                <CardTitle>{enrollment.batch.course.title}</CardTitle>
                <CardDescription>{FormatDate(enrollment.batch.startDate) +' - ' +FormatDate(enrollment.batch.endDate) }</CardDescription>
            </div>
                
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <ProgressBar batch={enrollment.batch} enrollment={enrollment}/>
                <div className='grid grid-cols-1 gap-4'>
                {enrollment.batch.sessions.map((session, index)=>
                (
                    <Card className='flex gap-2 justify-between items-center p-6' 
                        key={session._id}>
                            <div className='flex items-center gap-2'>
                            <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger><Image className='h-4 w-fit' src={agenda} alt='agenda'/></TooltipTrigger>
                                <TooltipContent>
                                    <p>{session.lecture.title}</p>
                                 </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <p>Session {index+1}</p>
                            </div>
                        <Image className='h-5 w-fit' src={session.isCompleted ? correctIcon : locked} alt={session.isCompleted ? "Completed" : "upcoming"}/>
                    </Card>
                ))}
                </div>  
            </div>       

            <h1 className='text-base font-semibold'>Simulations</h1>
            <div className='w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
            {enrollment.simulations.map((simulation, index)=>
            (
                <div className="space-y-2" key={index}>
                <Card className={`p-8 space-y-4 h-fit flex flex-col items-center relative ${simulation.isCompleted && 'border-2 border-green-500'}`}>
                    <div className="flex justify-center items-center bg-grey p-4 bg-gray-800 w-fit rounded-full">
                        <Image className='h-6 w-fit rounded-lg' src={triggerIcon} alt='simulation'/>
                    </div>                    
                    {/* <Button className='text-xs h-6 w-fit absolute top-0 right-4'>Retake</Button> */}
                    {/* `${pathname}/simulations?activityId=${simulation._id}` */}
                    <div className='flex justify-center gap-4 items-center md:text-sm text-xs w-full'>
                        <Button className='text-xs h-6' onClick={()=> router.push(`/simulations?activityId=${simulation._id}`)}>{simulation.isCompleted ? 'Review' : 'Continue'}</Button>
                            {/* <Image className='h-5 w-fit' src={data.isCompleted ? correctIcon : pendingIcon} alt={data?.status? 'Completed': "Pending"}/> */}
                    </div>
                </Card>
                <p className='text-center'>Trigger {simulation.id}</p>
                </div>
            ))}
            {enrollment.batch.simulations.map((simulation)=>
                (
                    <div key={simulation._id} className="text-center space-y-2">
                        <Card className='p-8 space-y-4'>
                        {cardLoading ? <LoadingMini/> :
                        <div className="space-y-4 flex flex-col justify-center items-center w-full">
                            <div className="flex justify-center items-center bg-grey p-4 bg-gray-800 w-fit rounded-full">
                                <Image className='h-6 w-fit rounded-lg' src={triggerIcon} alt='simulation'/>
                            </div> 
                            <div className='flex justify-center gap-4 items-center md:text-sm text-xs w-full'>
                                <Button className='text-xs h-6' onClick={()=> handleTrigger(simulation)}>Start</Button>
                                {/* <Image className='h-5 w-fit' src={data.isCompleted ? correctIcon : pendingIcon} alt={data?.status? 'Completed': "Pending"}/> */}
                            </div>
                        </div>}
                        </Card>
                        <h1 className="text-center md:text-sm text-xs">Trigger {simulation.id}</h1>
                    </div>
                )).slice(enrollment.simulations.length)}
            </div>     

            
            <h1 className="text-base font-semibold">Assessments</h1>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
                {enrollment.batch.mocks.map((data)=>
                (
                    <div key={data._id} className="text-center space-y-2">
                        <Card className='p-8 space-y-4' onClick={()=> handleMock(data)}>
                        {cardLoading ? <LoadingMini/> :
                        <div className="space-y-4 flex flex-col justify-center items-center w-full">
                            <div className="flex justify-center items-center bg-grey p-4 bg-gray-800 w-fit rounded-full">
                                <Image className='h-6 w-fit rounded-lg' src={mockIcon} alt='test'/>
                            </div>
                            <div className='flex justify-center gap-4 items-center md:text-sm text-xs w-full'>
                                <Button className='text-xs h-6' onClick={()=> handleMock(data)}>Start</Button>
                                {/* <Image className='h-5 w-fit' src={data.isCompleted ? correctIcon : pendingIcon} alt={data?.status? 'Completed': "Pending"}/> */}
                            </div>
                        </div>}
                        </Card>
                        <h1 className="text-center md:text-sm text-xs">Assessment {data.id}</h1>
                    </div>
                )).slice(enrollment.mocks.length)}
                {enrollment.mocks.map((data, index)=>
                (
                    <div key={data._id} className="text-center space-y-2">
                        <Card className={`p-8 space-y-4 h-fit flex flex-col items-center relative ${data.isCompleted && 'border-2 border-green-500'}`}>
                        {cardLoading ? <LoadingMini/> :
                        <div className="space-y-4 flex flex-col justify-center items-center w-full">
                            <div className="flex justify-center items-center bg-grey p-4 bg-gray-800 w-fit rounded-full">
                                <Image className='h-6 w-fit rounded-lg' src={mockIcon} alt='test'/>
                            </div>
                            <div className='flex justify-center gap-4 items-center md:text-sm text-xs w-full'>
                                <Button className='text-xs h-6' onClick={()=> !data.isCompleted ? router.push(`/assessment?assessmentId=${data._id}`) : router.push(`/review-assessment?assessmentId=${data._id}`)}>{data.isCompleted ? 'Review' : 'Continue'}</Button>
                                {/* <Image className='h-5 w-fit' src={data.isCompleted ? correctIcon : pendingIcon} alt={data?.status? 'Completed': "Pending"}/> */}
                            </div>
                        </div>}
                        </Card>
                        <h1>Assessment {index+1}</h1>
                    </div>
                ))}            
        </div>
            
            {/* <h1 className='text-base font-semibold'>Assessments</h1>
            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
            {enrollment.mocks.map((mock, index)=>
            (
                <Card className={`p-8 space-y-4 h-fit flex flex-col items-center relative`} key={mock._id}>
                    <div className="flex justify-center items-center bg-grey p-4 bg-gray-800 w-fit rounded-full">
                        <Image className='h-6 w-fit rounded-lg' src={mockIcon} alt='test'/>
                    </div>
                    <p className='text-center'>Assessment {index+1}</p>
                </Card>
            ))}
            </div> */}

        </div>
    )
}

export default Page

