'use client'

import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';
import CourseDetail from '@/app/components/CourseDetail';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Slash } from "lucide-react"
import Image from 'next/image';
import Lecturecard from '@/app/components/LectureCard';
import { Button } from '@/components/ui/button';

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const { courseId } = useParams();
    const router = useRouter();
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourse(response.data);
        }
        catch(error)
        {
            console.log(error)
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const handleClick = () =>
    {
        localStorage.setItem('selectedCourse', course.id)
        router.push('/cart')
    }

    console.log(course)

    if(isLoading)
        return <Loading/>

    return(
        <div className='mt-12 relative text-xs md:text-sm'>
            <Header/>
            {/* <Image className='object-cover h-fit' src='https://images.unsplash.com/photo-1637946175491-53bca31c90ba?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} /> */}
                          
            <div className='flex flex-col gap-4 lg:px-[10vw] px-[5vw] py-12'>

            <div className='flex lg:flex-row flex-col gap-8 text-white'>
                <div className='md:h-[70vh] lg:sticky lg:top-24 lg:w-[40%] w-full h-48 rounded flex items-center justify-center shadow-lg relative' style={{backgroundColor: ' var(--primary-color)'}}>
                    <Image className='h-[50%] w-fit rounded-xl object-cover' src={course.imageURL} alt={course.title} layout='fill'/>
                </div>
                <div className='lg:w-[60%] w-full space-y-4'>
                    <p className='md:text-4xl text-2xl font-semibold text-green-400'>{course.title}</p>
                    <p className='bg-white text-black shadow-md w-fit rounded-xl px-2 py-1'>{course.level}</p>
                    <p className='leading-loose'>{course.description}</p>
                    <div className='grid grid-cols-1 gap-2 '>
                    {course.lectures.map((lecture)=>
                    (
                        <Lecturecard lecture={lecture} level="visitor" key={lecture._id}/>  
                    ))}
                </div>
            <Button onClick={handleClick} className='w-fit md:h-10 h-10 '>Join Now</Button>
            </div>
        </div>
            
            </div>
            
        </div>
    )
    
}

export default Course