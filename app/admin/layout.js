'use client'

import { useEffect, useState } from 'react';
import Header from '../components/Header'
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminPanel from '../components/AdminPanel';

export default function Layout({ children }) 
{
    const { status, data } = useSession();
    const [ userData, setUserData ] = useState(null); 

    useEffect(()=>
    {
        status === 'authenticated' && getUserChat();
    },[status])
    
    const getUserChat = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
        }
        catch(error)
        {
            toast(error.message);
        }
    }

    return(
        <div className='min-h-[100vh]'>
            <Header userData={userData}/>
            {/* <AdminPanel/> */}
            <main className='lg:px-[10vw] px-[5vw] pt-28 pb-12'>
                {children}
            </main>          
        </div>
    )
}