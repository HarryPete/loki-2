'use client'

import Loading from "@/app/components/Loading";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormatDate } from "@/utility/FormatDate"
import axios from "axios";
import { useEffect, useState } from "react";
import defaultDP  from '../../../assets/defaultDP.png'
import { toast } from "sonner";
import Image from "next/image";
import UserHistory from "@/app/components/UserHistory";

const Users = () =>
{
    const [ isLoading, setIsLoading ] = useState(true);
    const [ users, setUsers ] = useState(null);   
    const [ openUserId, setOpenUserId ] = useState(null);

    const handleOpenDialog = (userId) => 
    {
        setOpenUserId(userId);
    };

    const handleCloseDialog = () => 
    {
        setOpenUserId(null);
    };

    useEffect(()=>
    {
        getEnrollments();
    },[])

    const getEnrollments = async ()=>
    {
        try
        {
            const url = '/api/user';
            const response = await axios.get(url);
            setUsers(response.data)
        }
        catch(error)
        {
            toast(error.message)
        }
        finally
        {
            setIsLoading(false)
        }
    }

    console.log(users)

    if(isLoading)
        return <Loading/>

    return(
            
        <div className="space-y-2">
            {/* <Input onChange={handleChnage} className='p-2'/> */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {users?.map((user, index) => 
            (
                <div key={user._id} className="p-4 flex items-start gap-4 rounded shadow-md">
                    <Image className='h-12 w-12 object-cover object-top rounded-full' src={user?.imageURL ? user?.imageURL : defaultDP} alt={user.name} width={100} height={100}/>
                    <div className="text-sm space-y-1">
                        <h1 className="font-semibold">{user.name}</h1>
                        <p>{user?.email}</p>
                        <Button className='h-6 text-xs' onClick={() => handleOpenDialog(user._id)}>Details</Button>
                       
                        <Dialog open={openUserId === user._id} onOpenChange={handleCloseDialog}>
                        <DialogContent className="sm:max-w-[425px] text-sm">
                            <DialogHeader>
                                <DialogTitle>{user.name}</DialogTitle>
                                <DialogDescription>{user.role}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <Image className='h-20 w-20 object-cover rounded-full object-top' src={user?.imageURL ? user?.imageURL : defaultDP} alt={user.name} width={100} height={100}/>
                                   
                                </div>
                                <h1 className="font-semibold border-b border-gray-300 pb-2">Profile details</h1>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Email</span>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Contact</span>
                                        <span>{user?.contact}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Experience</span>
                                        <span>{user?.experience}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Domain</span>
                                        <span>{user?.domain}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Country</span>
                                        <span>{user?.country}</span>
                                    </div>
                                </div>
                                <h1 className="font-semibold border-b border-gray-300 pb-2">Enrollments</h1>
                                <div className="space-y-1">
                                    {user?.enrollments?.map((enrollment)=>
                                    (
                                        <div key={enrollment._id}>
                                            <h1>{enrollment?.batch?.title}</h1>
                                        </div>
                                    ))}
                                </div>
                                <p className="pt-4 text-gray-400">{user.role +' since ' +FormatDate(user.createdAt)}</p>
                            </div>
                        </DialogContent>
                        </Dialog>    
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Users