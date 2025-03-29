'use client'

import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import SlidingMenu from './SlidingMenu'
import ProfileSettings from './ProfileSettings'
import { Button } from '@/components/ui/button'



const Navbar = ({ scrollIntoSection, section4 }) =>
{
    const router = useRouter();

    return(
        <div className='z-10 absolute top-0 left-0 w-[100%] flex flex-col justify-between text-white'>
            {/* <div className='text-center bg-red-600 py-2'>New batch starts from 17th March | Transaction Monitoring | <Link href='/courses/transaction-monitoring' className='text-blue-600 hover:text-blue-800 font-semibold'>Explore!</Link></div> */}
            <div className='flex justify-between bg-[rgba(0,0,0,0.5)] p-5'>
                <Image className='h-7 w-fit' src={logo} alt='logo' onClick={()=> router.push('/')}/>  
                <div className='sm:space-x-4 space-x-2'>
                    <Button className='sm:text-sm text-xs md:p-4 p-2' onClick={()=> scrollIntoSection(section4)}>Request Callback</Button>
                    <Button className='sm:text-sm text-xs md:p-4' variant='outline'  onClick={()=> router.push('/login')}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
