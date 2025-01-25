import { Card } from '@/components/ui/card';
import Image from 'next/image';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

const Progress = ({batchData}) =>
{
    
    return(
        <div className='space-y-4'>
            <div className='flex flex-col text-sm md:text-base h-[45vh] text-white justify-center items-center rounded p-6 relative'>
                <Image className='object-cover' src={batchData.course.imageURL} alt={batchData.course.title} layout='fill'/>
                <div className='text-3xl absolute bottom-4 font-bold mb-2 z-50'>{batchData.title.split('-')[1]}</div>
                <p className='absolute top-4 right-4 bg-gray-700 p-2 rounded z-50 text-xs'>{new Date(batchData.startDate).toLocaleDateString('en-US', options)} - {new Date(batchData.endDate).toLocaleDateString('en-US', options)}</p>
            </div>
            
            <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
                <Card className='p-4 text-center'>
                    <h1 className='text-2xl font-bold'>{Math.ceil((batchData.sessions?.length - pendingSessions(batchData.sessions))*100/batchData.sessions.length)}%</h1>
                    <span>Completion</span>
                </Card>
                <Card className='p-4 text-center'>
                    <h1 className='text-2xl font-bold'>{pendingSessions(batchData.sessions)}</h1>
                    <span>Sessions pending</span>
                </Card>
                <Card className='p-4 text-center'>
                    <h1 className='text-2xl font-bold'>{batchData.enrollments.length}</h1>
                    <span>Enrollments</span>
                </Card>
                <Card className='p-4 text-center'>
                    <h1 className='text-2xl font-bold'>{batchData.mocks.length}</h1>
                    <span>Mocks</span>
                </Card>
            </div>
        </div>
    )
}

export default Progress