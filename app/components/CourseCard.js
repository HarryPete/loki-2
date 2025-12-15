import Image from 'next/image'
import { useRouter } from 'next/navigation'
import verified from '../../assets/verified.png'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
import { Card } from '@/components/ui/card'
import logo from '../../assets/logo.png'

const extraData =
[
    {
        id:1,
        description: 'Recorded lectures'
    },
    {
        id:2,
        description: '10+ mock tests'
    },
    {
        id:3,
        description: '1:1 sessions'
    },
    {
        id:4,
        description: 'Exclusive study guides'
    },
    {
        id:5,
        description: 'Lifetime access to forum'
    },
    {
        id:6,
        description: 'Exam strategies'
    },
    {
        id:7,
        description: 'Job assistance'
    },
]

const CourseCard = ({level, course}) =>
{

    return(
        <Link href={level === 'admin' ? `/admin/courses/${course.id}` : `/courses/${course.id}`} className='relative'>
        <Card className='space-y-6 p-4 bg-black'>
            <div className='flex flex-col items-center justify-center h-48 rounded relative'>
                <Image className='h-[100%] w-full rounded object-cover' src={course.imageURL} alt={course.id} layout='fill'/>
            </div>
            {/* {level !== 'admin' && <BorderBeam colorFrom='var(--primary-color)' colorTo='var(--action-color)' className='rounded-xl'/>} */}
            
            <p className='md:text-sm text-xs font-semibold' >{course.title}</p> 
            
            {/* <p className='md:text-3xl text-2xl text-center w-full font-bold'>${course.price}</p> */}
            {level !== 'admin' && 
            <div className='flex flex-col gap-2'>
                {extraData.map((data)=>
                (
                    <div key={data.id} className='flex gap-2 items-center text-sm'>
                        <Image className='h-5 w-fit' src={verified} alt='icon'/>
                        <p>{data.description}</p>
                    </div>
                ))}
                <p className='text-gray-400 mt-2 text-sm'>35 lectures, 60 hours</p>
            </div>}
        </Card>
        </Link>
    )
}

export default CourseCard