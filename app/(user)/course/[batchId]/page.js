'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import locked from '../../../../assets/locked.png'
import pendingIcon from '../../../../assets/pendingIcon.png'
import agenda from '../../../../assets/agenda.png'
import correctIcon from '../../../../assets/correct.png'
import { useParams, usebatchId, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from 'sonner';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import ProgressBar from '@/app/components/ProgressBar';
import Lecturecard from '@/app/components/LectureCard';
import mockIcon from '../../../../assets/mock.png'
import triggerIcon from '../../../../assets/course.png'
import certificate from '../../../../assets/certificate.png'
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { FormatDate } from "@/utility/FormatDate";
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  
import { Loader } from "lucide-react";
import { toPng } from "html-to-image";
import template from '@/assets/template.png'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Confetti } from "@/utility/confetti";
import { calculateResult } from "@/utility/calculateScores";

const montserrat = Montserrat({ subsets: ['latin'] });

export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => !session.isCompleted).length
}

export const recordings = (sessions) =>
{
    const count = sessions.filter((session) => session.status === 'Completed').length
    return count === 0 ? 'NA' : count
}

const tabs = 
[
    { id: "sessions", label: "Sessions", image: agenda },
    { id: "simulations", label: "Simulations", image: triggerIcon },
    { id: "assessments", label: "Assessments", image: mockIcon },
    { id: "certificate", label: "Certificate", image: certificate },
];

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
    const [activeTab, setActiveTab] = useState("sessions");
    const divRef = useRef(null);
    const [ unlockCertificate, setUnlockCertificate ] = useState(false);

    console.log(enrollment)

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

            if(response.data.batch.mocks.length === 0 || response.data.mocks.length === 0)
                return

            const isAssessmentCompleted = response.data.mocks.filter((mock)=> mock.isCompleted);
            if(isAssessmentCompleted.length === 0)
                return
            
            const isAssessmentCleared = calculateResult(isAssessmentCompleted[isAssessmentCompleted.length - 1].score, 20)
            if(!isAssessmentCleared)
                return

            setUnlockCertificate(true)
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

    const downloadCertification = () =>
    {
        if(divRef.current === null) 
            return
        
        Confetti();
    
        toPng(divRef.current, { cacheBust: true, })
        .then((dataUrl) => 
        {
            const link = document.createElement('a')
            link.download = 'fintsacademy.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => 
        {
            toast.error(err)
        })
    }

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

    const start = new Date(enrollment.batch.startDate).toLocaleString(
    'en-IN',
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    );

    const end = new Date(enrollment.batch.endDate).toLocaleString(
    'en-IN',
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    );

    return(
        <div className='grid grid-cols-1 gap-8 relative md:text-sm text-xs'>
            <div className='space-y-2 text-base'>
                <CardTitle>{enrollment.batch.course.title}</CardTitle>
                <CardDescription>{FormatDate(enrollment.batch.startDate) +' - ' +FormatDate(enrollment.batch.endDate) }</CardDescription>
            </div>

            
                
            <div className="grid grid-cols-1 gap-8 relative">
                <div className="relative h-[50vh]">
                    <Image className="h-[100%] object-cover rounded-xl" src={enrollment.batch.course.imageURL} alt={enrollment.batch.course.title} layout="fill"/>
                </div>
                {/* <ProgressBar batch={enrollment.batch} enrollment={enrollment}/> */}
                {/* <Button className='text-xs absolute top-4 right-4' onClick={downloadCertification}>Download certificate</Button> */}
                
            </div>       

            <div className="flex flex-col gap-4">
                <div className="space-x-2 items-center flex mb-2">
                {tabs.map((tab) =>
                (
                    <TooltipProvider key={tab.id}>
                        <Tooltip>
                        <TooltipTrigger className="flex space-y-1 flex-col items-center">
                            <Image className={`${activeTab === tab.id ? 'bg-red-600' : 'bg-stone-900'} h-12 w-12 p-3 object-cover rounded-lg cursor-pointer`} onClick={()=> setActiveTab(tab.id)} src={tab.image} alt={tab.label}/> 
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tab.label}</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                ))}
                </div>
            <div className="w-full">

    
            {activeTab === 'sessions' && 
            <div className='grid grid-cols-1 gap-4'>
                {enrollment.batch.sessions.map((session, index)=>
                (
                    <Card className='flex gap-2 justify-between items-center p-6 bg-stone-900' 
                        key={session._id}>
                            <div className='flex items-center gap-2'>
                            <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger><Image className='h-4 w-fit' src={agenda} alt='agenda'/></TooltipTrigger>
                                <TooltipContent>
                                    {/* <p>{session.lecture.title}</p> */}
                                 </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <p>Session {index+1}</p>
                            </div>
                        <Image className='h-6 w-fit' src={session.isCompleted ? correctIcon : locked} alt={session.isCompleted ? "Completed" : "upcoming"}/>
                    </Card>
                ))}
            </div>}

            {activeTab === 'simulations' && 
            <div className='w-full grid grid-cols-1 gap-4'>
            {enrollment.simulations.map((simulation, index)=>
            (
                <Card key={index} className={`p-6 h-fit flex items-center bg-stone-900 justify-between relative`}>
                    <div className="flex items-center gap-2">
                        <Image className='h-5 w-fit' src={triggerIcon} alt='simulation'/> 
                        <p>Trigger {index+1}</p>    
                    </div>           
                    {/* <Button className='text-xs h-6 w-fit absolute top-0 right-4'>Retake</Button> */}
                    {/* `${pathname}/simulations?activityId=${simulation._id}` */}
                    <Button className='text-xs h-6' onClick={()=> router.push(`/simulations?activityId=${simulation._id}`)}>{simulation.isCompleted ? 'Review' : 'Continue'}</Button>
                </Card>
            ))}
            {enrollment.batch.simulations.map((simulation)=>
                (
                    <Card key={simulation._id} className={`p-6 h-fit flex items-center bg-stone-900 justify-between relative`}>
                        <div className="flex items-center gap-2">
                            <Image className='h-5 w-fit' src={triggerIcon} alt='simulation'/> 
                            <p>Trigger {simulation.id}</p>    
                        </div> 
                        {cardLoading ? <Button><Loader className="animate-spin"></Loader></Button> : <Button className='text-xs h-6' onClick={()=> handleTrigger(simulation)}>Start</Button>}
                    </Card>
                )).slice(enrollment.simulations.length)}
            </div>}     

            
            {activeTab === 'assessments' && 
            (enrollment.batch.mocks.length > 0 ?
            <div className="grid grid-cols-1 gap-4">
                {enrollment.batch.mocks.map((data)=>
                (
                    <Card key={data._id} className={`p-6 h-fit flex items-center justify-between relative bg-stone-900`}>
                        <div className="flex items-center gap-2">
                            <Image className='h-5 w-fit object-cover' src={mockIcon} alt='test'/>
                             <h1>Assessment {data.id}</h1>
                        </div>
                       {cardLoading ? <Button><Loader className="animate-spin"></Loader></Button> : <Button className='text-xs h-6' onClick={()=> handleMock(data)}>Start</Button>}
                    </Card>
                )).slice(enrollment.mocks.length)}
                {enrollment.mocks.map((data, index)=>
                (
                    <Card key={data._id} className={`p-6 h-fit flex items-center justify-between relative bg-stone-900`}>
                        <div className="flex items-center gap-2">
                            <Image className='h-5 w-fit object-cover' src={mockIcon} alt='test'/>
                             <h1>Assessment {index+1}</h1>
                        </div>
                        <Button className='text-xs h-6' onClick={()=> !data.isCompleted ? router.push(`/assessment?assessmentId=${data._id}`) : router.push(`/review-assessment?assessmentId=${data._id}`)}>{data.isCompleted ? 'Review' : 'Continue'}</Button> 
                    </Card>
                ))}            
            </div> : <p className="text-center py-6 text-muted-foreground">Assessments will be assigned soon</p>)}
        </div>

        {activeTab  === 'certificate' && 
                <Dialog open={activeTab === "certificate"} onOpenChange={()=> setActiveTab("sessions")}>
                    <DialogContent className="sm:max-w-[425px] space-y-0.5">
                        <DialogHeader>
                        <DialogTitle>Certificate</DialogTitle>
                        <DialogDescription>{enrollment.batch.course.title}</DialogDescription>
                        </DialogHeader>
                        {!unlockCertificate ? 
                        <div className="min-h-[40vh] flex text-center items-center text-muted-foreground text-sm">Certificate wil be unlocked on successful completion of sprint and assessment</div> : 
                        <div>  
                            <div ref={divRef} className={`relative text-[#d39800] font-sans ${montserrat.className}`}>
                                <Image className="w-fit h-400px" src={template} alt='certificate'/>
                                <h1 className="absolute md:text-md sm:text-sm text-xs font-bold text w-full md:left-10 left-[10%] top-[46%]">{enrollment.user.name.toUpperCase()}</h1>
                                <p className="absolute md:text-md sm:text-sm text-xs font-bold w-full md:left-10 left-[10%] top-[56%]">{enrollment.batch.course.title.toUpperCase()}</p>
                                <p className="absolute md:text-md sm:text-sm text-xs font-bold w-full md:left-10 left-[10%] top-[66%]">{start.toUpperCase() +' - ' +end.toUpperCase()}</p>
                            </div>
                        </div>}
              
                        {unlockCertificate && <Button className='text-xs' onClick={downloadCertification}>Download certificate</Button>}
                    </DialogContent>
                </Dialog>}
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

