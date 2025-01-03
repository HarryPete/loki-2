import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import more from '@/assets/more.png'
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

const Progress = ({batchData, level, assessments, getBatch}) =>
{
    const [ whatsapplink, setWhatsapplink ] = useState('');
    const [ zoomLink, setZoomLink ] = useState('');
    const [ showwlink, setShowWlink ] = useState(false);
    const [ showzlink, setShowZlink ] = useState(false);
    const [ showAccess, setShowAccess ] = useState(false);
    const router = useRouter();
    const { data } = useSession();
    
    const addWhatsappLink = async () =>
    {
        const url = `/api/links/whatsapp/${batchData._id}`
        await axios.post(url, {link : whatsapplink})
        setShowWlink(false)
        setWhatsapplink('');
    }

    const addZoomLink = async () =>
    {
        try
        {
            const url = `/api/links/zoom/${batchData._id}`
            const response = await axios.post(url, {link : zoomLink})
            toast.success(response.data.message);
            setShowZlink(false)
            setZoomLink('');
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    const handleBatchAccess = async () =>
    {
        try
        {
            const grant = batchData.access === 'true' ? 'false' : 'true'
            const url =  `/api/batch/${batchData._id}`
            const response = await axios.put(url, {access: grant})
            toast(response.data.message || response.data.error);
            getBatch();
        }
        catch(error)
        {
            toast(error.message)
        }
    }

    console.log(batchData)

    return(
        <div className='space-y-4'>
            
            
            <div className='flex flex-col text-sm md:text-base h-[50vh] text-white justify-center items-center rounded p-6 relative'>
                <Image className='object-cover' src={batchData.course.imageURL} alt={batchData.course.title} layout='fill'/>
                <div className='text-3xl absolute bottom-4 font-bold mb-2 z-50'>{batchData.title.split('-')[1]}</div>
                <p className='absolute top-4 right-4 bg-gray-700 p-2 rounded z-50 text-xs'>{new Date(batchData.startDate).toLocaleDateString('en-US', options)} - {new Date(batchData.endDate).toLocaleDateString('en-US', options)}</p>
            </div>
            
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <   div className='p-4 rounded text-center' style={{backgroundColor: 'var(--action-color)'}}>
                    <h1 className='text-white text-3xl font-bold'>{Math.ceil((batchData.sessions?.length - pendingSessions(batchData.sessions))*100/batchData.sessions.length)}%</h1>
                    <span>Completion</span>
                </div>
                <div className='p-4 rounded text-center' style={{backgroundColor: 'var(--action-color)'}}>
                    <h1 className='text-white text-3xl font-bold'>{pendingSessions(batchData.sessions)}</h1>
                    <span>Sessions pending</span>
                </div>
                <div className='p-4 rounded text-center' style={{backgroundColor: 'var(--action-color)'}}>
                    <h1 className='text-white text-3xl font-bold'>{batchData.enrollments.length}</h1>
                    <span>Enrollments</span>
                </div>
            </div>
           {/* {showAccess && <button onClick={handleBatchAccess}>{batchData.access ==='true' ? 'Revoke Batch Acess' : 'Grant Batch Access'}</button>}
            
           {level === 'admin' && <p>{batchData.access ===  'true' ? 'Accessible' : 'Restricted'}</p>} */}
         </div>
    )
}

export default Progress