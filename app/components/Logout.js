'use client'

import Image from 'next/image'
import logout from '../../assets/logout.png'
import { signOut } from "next-auth/react"

const Logout = () => 
{
  return(
    <div className='flex items-center gap-4 w-[100%] hover:bg-red-600 cursor-pointer py-3 px-2 rounded' onClick={()=> signOut({callbackUrl: '/'})}>
      <Image className='h-7 w-fit' src={logout} alt='settings'/>
      <p>Logout</p>
    </div>
  )
}

export default Logout