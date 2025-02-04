import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'sonner';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => !session.isCompleted).length
}

const Progress = ({batchData, getBatch}) =>
{
    console.log(batchData)

    const updateBatch = async (enrollmentStatus, access, type)=>
    {
        try
        {
            const batchDetails = type === "access" ? { access, type } : { enrollmentStatus, type, courseId: batchData.course._id }
            const url = `/api/batch/${batchData._id}`
            const response = await axios.put(url, batchDetails)
            toast.success(response.data.message)
            getBatch()
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }
    
    return(
        <div className='space-y-4'>
            <div className='flex justify-between items-end'>
            <div className='text-2xl space-y-2'>
                <p className='font-semibold'>{batchData.title.split('-')[1]}</p>
                <p className='text-sm text-muted-foreground'>{new Date(batchData.startDate).toLocaleDateString('en-US', options)} - {new Date(batchData.endDate).toLocaleDateString('en-US', options)}</p>
            </div>
            <div className="flex justify-between space-x-4">
                <div className="flex items-center gap-2 justify-between">
                   <Label>Batch access</Label>
                    <Switch checked={batchData.access} onCheckedChange={()=> updateBatch(batchData.enrollmentStatus, !batchData.access, "access")}/>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <Label>Enrollment status</Label>
                    <Switch checked={batchData.enrollmentStatus}  onCheckedChange={()=> updateBatch(!batchData.enrollmentStatus, batchData.access, "enrollmentStatus")}/>
                </div>
            </div>
            
            </div>
            <div className='flex flex-col text-sm md:text-base h-[60vh] text-white justify-center items-center rounded p-6 relative'>
                <Image className='object-cover rounded-xl' src={batchData.course.imageURL} alt={batchData.course.title} layout='fill'/>
            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
                <Card className='p-4 text-center text-sm space-y-1'>
                    <h1 className='text-xl font-semibold'>{Math.ceil((batchData.sessions?.length - pendingSessions(batchData.sessions))*100/batchData.sessions.length)}%</h1>
                    <p>Completion</p>
                </Card>
                {/* <Card className='p-4 text-center text-sm space-y-1'>
                    <h1 className='text-xl font-semibold'>{pendingSessions(batchData.sessions)}</h1>
                    <p>Sessions pending</p>
                </Card> */}
                <Card className='p-4 text-center text-sm space-y-1'>
                    <h1 className='text-xl font-semibold'>{batchData.enrollments.length}</h1>
                    <p>Enrollments</p>
                </Card>
                <Card className='p-4 text-center text-sm space-y-1'>
                    <h1 className='text-xl font-semibold'>{batchData.simulations.length}</h1>
                    <p>Simulations</p>
                </Card>
                <Card className='p-4 text-center text-sm space-y-1'>
                    <h1 className='text-xl font-semibold'>{batchData.mocks.length}</h1>
                    <p>Mocks</p>
                </Card>
            </div>

            
        </div>
    )
}

export default Progress