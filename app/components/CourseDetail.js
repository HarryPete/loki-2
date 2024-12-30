'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Lecturecard from './LectureCard'
import { Button } from '@/components/ui/button'

export const details =
[
    {
        id: 1,
        header: 11,
        detail: 'Weeks'
    },
    {
        id: 2,
        header: 32,
        detail: 'Sessions'
    },
    {
        id: 3,
        header: 16,
        detail: 'Learning Sessions'
    },
    {
        id: 4,
        header: 16,
        detail: 'Practice Sessions'
    }
]

const CourseDetail = ({course, level}) =>
{
    const router = useRouter();

    const handleClick = () =>
    {
        localStorage.setItem('selectedCourse', course.id)
        router.push('/cart')
    }

    return (
        <div className='flex flex-col gap-4'>
            <p className='lg:text-3xl md:text-2xl text-xl font-bold' style={{color:'var(--primary-color)'}}>{course.title}</p>
            <div className='md:h-[60vh] h-48 rounded flex items-center justify-center shadow-lg relative'>
                <Image className='h-[100%] w-[100%] object-cover rounded' src={course.imageURL} alt={course.title} layout='fill'/>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
            {details.map((data)=>
            (
                <div key={data.id} className='flex flex-col items-center bg-white shadow-md p-4 rounded'>
                    <h1 className='font-bold md:text-3xl text-2xl'>{data.header}</h1>
                    <span>{data.detail}</span>
                </div>
            ))}
            </div>
            <p className='leading-8'>{course.description}</p>
            
            <h1 className='lg:text-2xl text-xl font-bold'>Sessions in Brief</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            {course.lectures.map((lecture)=>
            (
                <Lecturecard course={course} lecture={lecture} level={level} key={lecture._id}/>  
            )).slice(0,16)}
            </div>
            {level === 'visitor' && <Button onClick={handleClick} className='w-fit md:h-12 h-10 text-sm md:text-base'>Join Now</Button>}
        </div>
    )
}

export default CourseDetail