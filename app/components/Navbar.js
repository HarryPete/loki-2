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
        <div className='z-10 absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-[100%] flex justify-between p-5 text-white'>
            <Image className='h-7 w-fit' src={logo} alt='logo' onClick={()=> router.push('/')}/>  
            <div className='sm:space-x-4 space-x-2'>
                <Button className='sm:text-sm text-xs md:p-4 p-2' onClick={()=> scrollIntoSection(section4)}>Request Callback</Button>
                <Button className='sm:text-sm text-xs md:p-4' variant='outline'  onClick={()=> router.push('/login')}>Login</Button>
            </div>
        </div>
    )
}

export default Navbar
