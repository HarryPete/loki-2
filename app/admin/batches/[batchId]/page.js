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
import defaultDP from '../../../../assets/defaultDP.png'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import ProfileDetails from '@/app/components/ProfileDetails'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormatDate } from '@/utility/FormatDate'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import UpdateDisplayPicture from '@/app/components/UpdateDisplayPicture'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ isLoading, setIsLoading ] = useState(true);
    const { batchId } = useParams();
    const [ editInfo, setEditInfo ] = useState(false)
    const [ editDP, setEditDP ] = useState(false)
   
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

    const [ openUserId, setOpenUserId ] = useState(null);

    const handleOpenDialog = (userId) => 
    {
        setOpenUserId(userId);
    };

    const handleCloseDialog = () => 
    {
        setOpenUserId(null);
    };

    const updateProfileStatus = async (userId, status) =>
    {
        try
        {
            const updates = { isProfileComplete : status }
            const url= `/api/user/${userId}`
            const response = await axios.put(url, updates)
            toast(response.data.message);
            getBatch()
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const updateAccessStatus = async (enrollmentId, status) =>
    {
        try
        {
            const updates = { access : status }
            const url= `/api/enrollment/access/${enrollmentId}`
            const response = await axios.put(url, updates)
            toast(response.data.message);
            getBatch()
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4'>
            <div className=''>
                <Progress batchData={batch} level='admin' getBatch={getBatch}/>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 relative'>
                <div className='space-y-4'>
                {batch.sessions.map((session, index) =>
                (
                    <SessionCard key={session._id} level="admin" session={session} index={index} updateSessionStatus={updateSessionStatus} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda}/>
                ))}
                </div>
                
                <div className='flex flex-col gap-3'>
                {batch.enrollments.length ? 
                batch.enrollments.map((enrollment, index)=>
                (
                    <Card key={enrollment._id} className="p-4 flex items-center gap-4 h-fit">
                    <Image className='h-6 w-6 object-cover object-top rounded-full' src={enrollment?.user?.imageURL ? enrollment?.user?.imageURL : defaultDP} alt={enrollment.user.name} width={100} height={100}/>
                    <div className="text-sm space-y-1 flex justify-between w-full">
                        <h1>{enrollment.user.name}</h1>
                            <Button className='h-6 text-xs' onClick={() => handleOpenDialog(enrollment.user._id)}>Details</Button>
                       
                        <Dialog open={openUserId === enrollment.user._id} onOpenChange={handleCloseDialog}>
                        <DialogContent className="sm:max-w-[425px] text-sm">
                            <DialogHeader>
                                <DialogTitle>{enrollment.user.name}</DialogTitle>
                                <DialogDescription>{enrollment.user.role}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <UpdateDisplayPicture level="admin" userData={enrollment.user} getBatch={getBatch} editDP={editDP} setEditDP={setEditDP}/> 
                                    <ProfileDetails level="admin" userData={enrollment.user} getBatch={getBatch} editInfo={editInfo} setEditInfo={setEditInfo}/>
                                </div>
                                <h1 className="font-semibold border-b border-gray-300 pb-2">Profile details</h1>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Email</span>
                                        <span>{enrollment.user?.email}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Contact</span>
                                        <span>{enrollment.user?.contact}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Experience</span>
                                        <span>{enrollment.user?.experience}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Domain</span>
                                        <span>{enrollment.user?.domain}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Country</span>
                                        <span>{enrollment.user?.country}</span>
                                    </div>
                                </div>

                                
                                {/* <h1 className="font-semibold border-b border-gray-300 pb-2">Enrollments</h1> */}
                                {/* <div className="space-y-1">
                                    {enrollment.user?.enrollments?.map((data)=>
                                    (
                                        <div key={data._id}>
                                            <h1>{data?.batch?.title}</h1>
                                        </div>
                                    ))}
                                </div> */}
                               {/* <p className={`p-2 rounded text-white text-center text-xs ${enrollment.access ? 'bg-green-400' : 'bg-red-400'}`}>{enrollment.access ? 'Accessible' : 'Revoked'}</p> */}
                                
                            </div>
                            <div className='flex justify-between border-t space-y-2 pt-4'>
                            
                            
                                
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="airplane-mode">Profile status</Label>
                                <Switch checked={enrollment.user.isProfileComplete} onCheckedChange={()=> updateProfileStatus(enrollment.user._id, !enrollment.user.isProfileComplete)}/>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="airplane-mode">Access status</Label>
                                <Switch checked={enrollment.access} onCheckedChange={()=> updateAccessStatus(enrollment._id, !enrollment.access)}/>
                            </div>
                            </div>                                
                        </DialogContent>
                        </Dialog>    
                    </div>
                    
                    </Card>
                )) : 
                <p className='text-center text-xl mt-4 font-semibold'>No Enrollments</p>
                }
                </div>
            </div>        
        </div>
    )
}

export default Batch

// <Enrollment enrollment={enrollment} batch={batch} getBatch={getBatch} key={enrollment._id}/>