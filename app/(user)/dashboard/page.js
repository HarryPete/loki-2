'use client'

import BatchCard from "@/app/components/BatchCard";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import ProfileDetails from "@/app/components/ProfileDetails";

const Dashboard = () =>
{
    
    const { data, status } = useSession();
    const [ userData, setUserData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const router = useRouter();

    const getUserData = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data);
            // if(!response.data.isProfileComplete)
            //     router.push('/settings')
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
            getUserData();
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
    }, [status]);

    if(status === 'loading' || isLoading)
        return(
            <Loading/> 
        )
        
    return(
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {userData?.enrollments?.map((enrollment)=>
                (
                    <BatchCard batch={enrollment.batch} enrollment={enrollment} key={enrollment._id} level='user'/>
                ))}
            </div>
            {/* <ProfileDetails userData={userData}/> */}
        </div>
    )
}

export default Dashboard