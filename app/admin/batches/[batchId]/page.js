'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Progress from '@/app/components/Progress'
import SessionCard from '@/app/components/SessionCard'
import Enrollment from '@/app/components/Enrollment'
import { toast } from 'sonner'
import Loading from '@/app/components/Loading'
import defaultDP from '../../../../assets/defaultDP.png'
import duplicateIcon from '../../../../assets/duplicate.png'
import removeIcon from '../../../../assets/remove.png'
import closeIcon from '../../../../assets/close-lg.png'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import ProfileDetails from '@/app/components/ProfileDetails'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormatDate } from '@/utility/FormatDate'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import UpdateDisplayPicture from '@/app/components/UpdateDisplayPicture'
import MockReport from '@/app/components/MockReport'
import { Loader2, Users } from 'lucide-react'
import LoadingMini from '@/app/components/LoadingMini'
import mockIcon from '@/assets/mock.png'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ graduationBatches, setGraduationBatches ] = useState(null);
    const [ graduationBatch, setGraduationBatch ] = useState('')
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ isLoading, setIsLoading ] = useState(true);
    const { batchId } = useParams();
    const [ editInfo, setEditInfo ] = useState(false)
    const [ editDP, setEditDP ] = useState(false)
    const [ duplicates, setDuplicates ] = useState([]);
    const [ removeDuplicates, setRemoveDuplicates ] = useState(false);
    const [ isButtonLoading, setIsButtonLoading ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const findDuplicates = () => 
    {
        const userCounts = {};
    
        batch.enrollments.forEach(enrollment => {
          const userId = enrollment.user._id; 
          if (userCounts[userId]) {
            userCounts[userId] += 1;
          } else {
            userCounts[userId] = 1;
          }
        });
    
        const duplicateUserIds = Object.keys(userCounts).filter(userid => userCounts[userid] > 1);
        setDuplicates(duplicateUserIds); 
    };
   
    const getBatch = async () =>
    {
        try
        {
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatch(response.data);
            getGraduationBatches();
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

    const getGraduationBatches = async () =>
    {
        try
        {
            const url = `/api/graduates`
            const response = await axios.get(url);
            setGraduationBatches(response.data);
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    const updateGraduation = async (enrollmentId) =>
    {
        if(!graduationBatch)
            return toast.error('Graduation batch is required')

        try
        {
            setIsButtonLoading(true)
            const url = `/api/graduates/${graduationBatch}`
            const graduationDetails = { enrollmentId }
            const response = await axios.put(url, graduationDetails);
            toast.success(response.data.message);
            setOpenUserId(null);
            getBatch();
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsButtonLoading(false);
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

    const handleDuplicates = async (enrollment) =>
    {
        try
        {
            const url = `/api/enrollment/${enrollment.user._id}`
            const response = await axios.put(url, {batchId: batch._id, enrollmentId:enrollment._id});
            toast.success(response.data.message)
            getBatch();
            setRemoveDuplicates(false)
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const updateMock = async (mock, id, status="", type) =>
    {
      try
      {
          setIsLoading(true)
          const url = `/api/batch/${batch._id}`
          const batchDetails = { mock: {quiz:mock._id, id}, id, status, type }
          const response = await axios.put(url, batchDetails);
          toast.success(response.data.message);
          getBatch()
      }
      catch(error)
      {
        toast.error(error.message)
      }
      finally
      {
        setIsLoading(false)
      }
    }

    console.log(batch)

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4'>
            <div className='relative'>
                <Progress batchData={batch} level='admin' getBatch={getBatch}/>
                <Image className='fixed cursor-pointer text-xs bottom-4 right-4 h-10 w-fit p-2.5 bg-yellow-500 rounded-full'
                 src={removeDuplicates ? closeIcon : duplicateIcon} alt='icon' onClick={()=>
                    {
                        if(!removeDuplicates)
                        {
                            setRemoveDuplicates(true);
                            findDuplicates();
                        }
                        else
                            setRemoveDuplicates(false);
                    }
                }/>
            </div>
            <h1 className='font-semibold text-base pt-4'>Mocks</h1>
            <div className='grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 pb-8'>
            
                {batch.course.mocks.map((mock, index)=>
                (
                    <Card className={`${batch.mocks[index] ? 'border-green-500' : 'border-red-500' } border-2 p-4 text-sm`} key={mock.id}>
                        {isLoading ? <LoadingMini/> :
                        <div className="space-y-3">
                            <div className='bg-gray-100 p-6 gap-2 flex flex-col items-center rounded relative'>
                                <Image className='h-12 w-fit' src={mockIcon} alt='mock'/>
                                <p>Set {mock.id}</p>
                                {batch.mocks[index] && 
                                <div className="absolute top-2 right-2">
                                    <Switch checked={batch.mocks[index]?.status === 'Unlocked'} onCheckedChange={()=> updateMock(mock, batch.mocks[index].id, batch.mocks[index].status === 'Locked' ? 'Unlocked' : 'Locked', "retake")}/>
                                </div>}
                            </div>
                            <div className="flex justify-center">
                            {batch.mocks[index] ? 
                            <Button className='text-xs h-6' onClick={()=> router.push(`${pathname}/mock-report?set=${mock.id}`)}>Report card</Button> :
                                <Button className='text-xs h-6' onClick={()=> updateMock(mock, mock.id, "Locked" ,"assign")}>Assign</Button>}
                            </div>
                        </div>}
                  </Card>                
                ))}
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 relative border-t pt-8'>
                
                <div className='space-y-4'>
                <h1 className='font-semibold text-base'>Sessions</h1>
                {batch.sessions.map((session, index) =>
                (
                    <SessionCard key={session._id} level="admin" session={session} index={index} updateSessionStatus={updateSessionStatus} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda}/>
                ))}
                </div>
                
                <div className='space-y-4'>
                <h1 className='font-semibold text-base'>Enrollments</h1>
                {batch.enrollments.length ? 
                batch.enrollments.map((enrollment)=>
                {                       
                    return(
                    <Card key={enrollment._id} className={`${removeDuplicates && duplicates.includes(enrollment.user._id) && 'bg-red-500 text-white'} p-4 flex items-center gap-4 h-fit`}>
                    <Image className='h-6 w-6 object-cover object-top rounded-full' src={enrollment?.user?.imageURL ? enrollment?.user?.imageURL : defaultDP} alt={enrollment.user.name} width={100} height={100}/>
                    <div className="text-sm flex justify-between items-center w-full">
                        <h1>{enrollment.user.name}</h1>
                        {removeDuplicates ? <Image className='cursor-pointer h-5 w-fit' onClick={()=> handleDuplicates(enrollment)} src={removeIcon} alt='remove'/> : <Button className='h-6 text-xs' onClick={() => handleOpenDialog(enrollment.user._id)}>Details</Button>
                       }
                        <Dialog open={openUserId === enrollment.user._id} onOpenChange={handleCloseDialog}>
                        <DialogContent className='sm:max-w-[425px] text-sm'>
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
                                        <span className="text-gray-500">Enrollment Id</span>
                                        <span>{enrollment._id}</span>
                                    </div>
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
                                    {enrollment.graduationBatch && 
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Graduation</span>
                                        <span>{enrollment.graduationBatch.month +' ' +enrollment.graduationBatch.year}</span>
                                    </div>}
                                </div>
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
                            
                            <Dialog>
                                <DialogTrigger asChild>
                                    {!enrollment.graduationBatch && <Button>Graduation</Button>}
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Graduation</DialogTitle>
                                    <DialogDescription>
                                        Graduate {enrollment.user.name} 
                                    </DialogDescription>
                                </DialogHeader>
                                {graduationBatches && <div className="grid gap-4 py-4">
                                    <Select onValueChange={setGraduationBatch}>
                                        <SelectTrigger className="w-full h-12">
                                            <SelectValue placeholder="Choose Graduation Batch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {graduationBatches.map((batch)=>
                                        (
                                            <SelectItem className='h-12' value={batch._id} key={batch._id}>{batch.month +' ' +batch.year}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </div>}
                                <DialogFooter>
                                    {isButtonLoading ? 
                                    <Button onClick={()=>updateGraduation(enrollment._id)}>
                                        <Loader2 className='animate-spin'/>
                                    </Button>
                                    : <Button onClick={()=>updateGraduation(enrollment._id)}>Update</Button>}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                        </DialogContent>
                        </Dialog>    
                    </div>
                    
                    </Card>)
                }) : 
                <p className='text-center text-xl mt-4 font-semibold'>No Enrollments</p>
                }
                </div>
            </div>        
        </div>
    )
}

export default Batch

// <Enrollment enrollment={enrollment} batch={batch} getBatch={getBatch} key={enrollment._id}/>