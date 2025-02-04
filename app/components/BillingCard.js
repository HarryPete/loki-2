'use client'

import { signOut, useSession } from 'next-auth/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const BillingCard = ({course, selectedBatch}) =>
{
    const router = useRouter();
    const {data, update} = useSession();
    const user = data?.user?.id;
    const session = useSession();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleBuy = async (e) =>
    {
        e.preventDefault();
        try
        {
            const newSession = {...session, user: { ...session?.user, role: 'user'}}
            if(!selectedBatch)
                return toast.error('Batch is required')

            setIsLoading(true);
            const url = `/api/enrollments/${user}`
            const response = await axios.post(url, {batchId : selectedBatch});
            await update(newSession);
            toast.success(response.data.message);
            router.push('/dashboard');
            localStorage.removeItem('seletedCourse')
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

    return(
        <div className='space-y-4'>
        <Card className='p-4'>
            <p className='text-green-500 text-center'>You saved ${course.price - course.offerPrice} on this</p>
        </Card>
        <Card className='p-4 space-y-6'>
            <p className='text-center font-semibold text-base'>PRICE DETAILS</p>
            <div className='flex justify-between'>
                <p className=''>Price (1 Item)</p>
                <p className=''>${course.price}</p>
            </div>
            <div className='flex justify-between border-b border-muted pb-8'>
                <p className=''>Discount</p>
                <p className=''>${course.price - course.offerPrice}</p>
            </div>
            <div className='flex justify-between'>
                <p className=''>Total Amount</p>
                <p className=''>${course.offerPrice}</p>
            </div>            
            {isLoading ? <Button className='lg:h-12 h-10 text-md'>
                <Loader2 className='animate-spin'/>
                Enrolling...
            </Button> :
            <Button className='text-xs' onClick={handleBuy}>
                Register now
            </Button>}
            
        </Card>
        </div>
    )
}

export default BillingCard