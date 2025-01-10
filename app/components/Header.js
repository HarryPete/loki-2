'use client'

import user from '@/assets/user.png'
import logo from '@/assets/logo.png'
import settings from '@/assets/settings.png'
import menu from '@/assets/menu.png'
import close from '@/assets/close.png'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
// import Logout from '../logout/Logout'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import ProfileSettings from './ProfileSettings';
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import axios from 'axios'

const Header = () =>
{
    const router = useRouter();
    const { data, status } = useSession();
    const [ showDetails, setShowDetails ] = useState(false);
    const [ userData, setUserData ] = useState(null); 

    useEffect(()=>
    {
        status === 'authenticated' && getUserData();
    },[status])
    
    const getUserData = async () =>
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
        <div className='fixed md:text-base text-sm top-0 z-50 w-[100%] flex items-center justify-between p-5 shadow-lg' style={{backgroundColor: 'var(--primary-color)'}}>
            <Image className='h-8 w-fit cursor-pointer' src={logo} alt='logo' onClick={()=> router.push('/')}/>
            <div className='flex items-center gap-4 text-white'>
                {/* <Link className='' href='/courses'>Courses</Link>
                <Link className='' href='/about'>About</Link> */}
                {data?.user && 
                <Image className='h-8 w-fit cursor-pointer' src={menu} alt='profile' onClick={()=> setShowDetails(true)}/>}
            </div>
            
            {showDetails && 
            <Card className='fixed w-[90%] sm:w-96 top-20 sm:right-5 flex flex-col items-end gap-2 p-6 '>
                <Image className='h-6 w-fit cursor-pointer' src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <div className='flex gap-4 w-full border-b border-gray-300'>
                    <Image className='h-12 w-12 object-cover rounded-full' src={userData?.imageURL ? userData?.imageURL : user} height={100} width={100} alt='user'/>
                    <div className='flex flex-col gap-1 pb-5 w-[100%]'>
                        <p className='text-base'>{data.user.name}</p>
                        <p className='text-md'>{data.user.email}</p>
                    </div>
                </div>
                <Link href='/settings'  onClick={()=> setShowDetails(false)} className='flex items-center gap-4 w-[100%] hover:bg-yellow-400 cursor-pointer py-4 px-2 rounded'>
                    <Image className='h-6 w-fit' src={settings} alt='settings'/>
                    <p>Settings</p>
                </Link>
                <Logout/>
            </Card>}
        </div>
    )
}

export default Header
