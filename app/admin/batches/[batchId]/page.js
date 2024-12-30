'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { useParams } from 'next/navigation'
import Progress from '@/app/components/Progress'
import SessionCard from '@/app/components/SessionCard'
import Enrollment from '@/app/components/Enrollment'
import { toast } from 'sonner'
import Loading from '@/app/components/Loading'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ isLoading, setIsLoading ] = useState(true);
    const { batchId } = useParams();
   
    const getBatch = async () =>
    {
        try
        {
            // setIsLoading(true);
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatch(response.data);
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

    useEffect(()=>
    {
       getBatch();
    },[])

     const updateSessionStatus = async (sessionId, status) =>
    {
        try
        {
            const updatedStatus = status === 'Upcoming' ? 'Completed' : 'Upcoming'
            const url = `/api/session/${sessionId}`
            await axios.put(url, {status : updatedStatus});
            toast(`Session updated to ${updatedStatus}`)
            getBatch();
        }
        catch(error)
        {
            toast(error.message)
        }
    }

    console.log(batch?.enrollments)

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4'>
            <div className=''>
                <Progress batchData={batch} level='admin' getBatch={getBatch}/>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='space-y-4'>
                {batch.sessions.map((session, index) =>
                (
                    <SessionCard key={session._id} level="admin" session={session} index={index} updateSessionStatus={updateSessionStatus} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda}/>
                ))}
                </div>
                
                <div className='space-y-4'>
                {batch.enrollments.length ? 
                batch.enrollments.map((enrollment)=>
                (
                    <Enrollment enrollment={enrollment} batch={batch} getBatch={getBatch} key={enrollment._id}/>
                )) : 
                <p className='text-center text-xl mt-4 font-semibold'>No Enrollments</p>
                }
                </div>
            </div>        
        </div>
    )
}

export default Batch