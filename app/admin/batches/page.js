'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import BatchCard from '@/app/components/BatchCard'
import Loading from '@/app/components/Loading'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import BatchForm from '@/app/components/BatchForm'

const Batches = () =>
{
    const [ batches, setBatches ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ newBatch, setNewBatch ] = useState(false)
    const router = useRouter();
    
    useEffect(()=>
    {
        getBatches();
    },[])

    const getBatches = async () =>
    {
        try
        {
            const url = `/api/batch`
            const response = await axios.get(url);
            const sortedBatches = response.data.sort((a,b)=> new Date(a.startDate) - new Date(b.startDate))
            setBatches(sortedBatches);
        }
        catch(error)
        {
            toast(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const removeBatch = async (id) =>
    {
        try
        {
            const url = `/api/batch/${id}`
            await axios.delete(url, batchData)
            setBatches(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4'>
            {/* <BatchForm newBatch={newBatch} setNewBatch={setNewBatch}/> */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
            {batches.map((batch) =>
            (
                <BatchCard type="batch" level="admin" key={batch._id} data={batch} removeBatch={removeBatch}/>
            ))}
            </div>
        </div>
            
    )
}

export default Batches