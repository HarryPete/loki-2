'use client'
 
import axios from "axios";
import { useSession } from "next-auth/react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Loading from '@/app/components/Loading';
import { Textarea } from '@/components/ui/textarea';
import TriggerDetails from '@/app/components/TriggerDetails';
import { Card } from "@/components/ui/card";

const Simulations = () =>
{
    const { data, status } = useSession();
    const [ simulation, setSimulation ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ response, setResponse ] = useState('');
    const params = useSearchParams();
    const triggerId = params.get('activityId');
    const router = useRouter();
    
    const getTrigger = async () =>
    {
        try
        {
            const url = `/api/triggerResponse/${triggerId}`
            const response = await axios.get(url);
            setSimulation(response.data);
        }
        catch(error)
        {
            toast.error(error.message)
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const handleResponse = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/triggerResponse/${triggerId}`
            const triggerResponseDetails = { isCompleted: true, response }
            const responseData = await axios.put(url, triggerResponseDetails);
            toast.success(responseData.data.message)
            router.back()
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false)
        }
    }
    
    useEffect(() => 
    {
        if(status === "authenticated")
            getTrigger();
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
    }, [status]);

    if(status === 'loading' || isLoading)
        return <Loading/>

    return(
        <div className="space-y-4">
            <div className="space-y-1">
                <h1 className="font-semibold">Trigger {simulation.trigger.id}</h1>
                <p className="text-muted-foreground text-sm">{simulation.batch.course.title}</p>
            </div>
            <div className="md:text-sm text-xs grid grid-cols-1 gap-4">
                <TriggerDetails simulation={simulation}/>
                <div className='space-y-4'>
                <p className="text-muted-foreground">Your Response</p>
                {simulation.isCompleted ?
                <Card className='p-4'>
                    {simulation.response}
                </Card> :
                <div className="space-y-2">
                    <Textarea className='min-h-64' value={response} onChange={(e)=> setResponse(e.target.value)}></Textarea>
                    <Button className='md:text-sm text-xs' onClick={handleResponse}>Submit</Button>
                </div>}
                </div>
            </div>
        </div>
    )
}

const Loader = () =>
{
    return(
        <Suspense fallback={"loading..."}>
            <Simulations/>
        </Suspense>
    )
}

export default Loader