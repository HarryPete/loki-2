import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import logo from '@/assets/logo.png'
import { FormatDate } from "@/utility/FormatDate"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const ProfileSettings = () =>
{
    const { data, status } = useSession()
    
    return (
        <Sheet>
        <SheetTrigger asChild>
        <div className="space-y-1 cursor-pointer">
            <div className="px-4 py-0.5 rounded" style={{backgroundColor:'var(--action-color)'}}></div>
            <div className="px-4 py-0.5 rounded" style={{backgroundColor:'var(--action-color)'}}></div>
            <div className="px-4 py-0.5 rounded" style={{backgroundColor:'var(--action-color)'}}></div>
        </div>
        </SheetTrigger>
        <SheetContent className='text-sm'>
            <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
            </SheetHeader>
            
            <Image className='lg:h-16 h-12 w-fit aspect-square object-contain p-2 mb-4 rounded-full' style={{backgroundColor: 'var(--primary-color)'}} src={logo} alt='logo' onClick={()=> router.push('/')}/> 
            <div className='flex flex-col gap-2'>
                {(data?.user?.role === 'user' || data?.user?.role === 'admin') && <Link className=' hover:bg-yellow-400 p-4 rounded' href='/dashboard'>Dashboard</Link>}
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/courses'>Courses</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/forum'>Forum</Link>
                {status === 'unauthenticated' && <Link className=' hover:bg-yellow-400 p-4 rounded' href='/signup' >Signup</Link>}
            </div>  
            <h1 className="text-lg py-4 font-semibold">Ongoing batches</h1>
            <div className="space-y-3">
            <Card className="bg-gray-100 space-y-2 p-4">
                <h1>CAMS - 148</h1>
                <p className="text-gray-400">December 20, 2024</p>
            </Card>
            <Card className="bg-gray-100 space-y-2 p-4">
                <h1>CAMS - 149</h1>
                <p className="text-gray-400">Jaunuary 17, 2025</p>
            </Card>
            <Card className=" p-4 space-y-2 " style={{backgroundColor: 'var(--action-color)'}}>
                <h1 className="text-white text-xl font-semibold">Extended New year Sale</h1>
                <p>Avail all courses at 20% off</p>
            </Card>
            </div>
            {/* <h1 className="md:text-xl text-lg py-4 font-semibold">Offers</h1>
            <div className="bg-gray-100 rounded space-y-2 p-4 shadow-lg" >
                <div className="flex justify-between ">
                    <h1>AML20</h1>
                    <p>20% off</p>
                </div>
                <p className="text-gray-400">Valid till January 20</p>
            </div> */}

            </SheetContent>
    </Sheet>    
  )
}

export default ProfileSettings
