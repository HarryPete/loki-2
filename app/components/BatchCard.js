
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormatDate } from '@/utility/FormatDate';
import deleteIcon from '@/assets/delete.png'
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const BatchCard = ({type, level, enrollment, batch, participants, removeBatch, batchId}) =>
{
    const router = useRouter();
    const pathname = usePathname();

    const deleteBatch = async () =>
    {
        try
        {
            const url = `/api/batch/${batch._id}`
            await axios.delete(url)
        }
        catch(error)
        {
            toast(error)
        }
    }

    const checkAccess = () =>
    {
        if(batch.access)
            return router.push(`/course/${batch.course.id}?eId=${enrollment._id}`)
        else
            toast('Access Denied')
    }

    return(
        <Card className='bg-black p-4 flex flex-col gap-4 relative cursor-pointer' onClick={()=>  {level === 'admin' ? (type === 'batch' ? router.push(`/admin/batches/${batch.title}`) : `${pathname}/${batchId}`) : checkAccess()}}>
            <div className='rounded flex flex-col h-48 p-4 justify-center items-center shadow-md relative'>
                <Image className='rounded object-cover' src={batch.course.imageURL} alt={batch.title} layout='fill'/>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center text-sm'>
                <p className='font-semibold'>{batch.course.title}</p>
                {level !== 'user' && <p className='absolute top-6 right-6 bg-red-600 text-white p-2 text-xs rounded-md'>{batch.isCompleted ? "Completed" : "Ongoing"}</p>}
                {level !== 'user' && <p>{batch.title.split('-')[2] +'-' +batch.title.split('-')[3]}</p>}
            </div>
            {level === 'user' && <p className='absolute top-6 right-6 bg-black p-1 rounded text-xs '>{FormatDate(batch.startDate)}</p>}
             {/* 
            <div className='flex justify-between items-end text-sm'>
                {level === "admin" ? (type === 'batch' ? <p> Enrollments : {batch.enrollments.length}</p> : <p> Participants : {participants}</p>) : <p>{batch.sessions.length} lectures</p>}
                
                
            </div>  */}
        </Card>
    )
}

export default BatchCard