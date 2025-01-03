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
import pull from '@/assets/pull.png'
import { FormatDate } from "@/utility/FormatDate"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

const AdminPanel = () =>
{
    const { data } = useSession()

    return (
        <Sheet>
        <SheetTrigger asChild>
        <Image className="h-8 w-fit fixed top-20 right-5 cursor-pointer" src={pull} alt='icon'/>
        </SheetTrigger>
        <SheetContent className='text-sm'>
            <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
            </SheetHeader>
            
            <div className='flex flex-col justify-center gap-2 h-full'>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/dashboard'>Dashboard</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/enrollments'>Enrollments</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/graduates'>Graduates</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/courses'>Courses</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/batches'>Batches</Link>
                <Link className=' hover:bg-yellow-400 p-4 rounded' href='/admin/requests'>Requests</Link>
            </div> 

            </SheetContent>
    </Sheet>    
  )
}

export default AdminPanel
