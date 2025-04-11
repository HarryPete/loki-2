'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Header from '../components/Header'
import CourseCard from '../components/CourseCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Slash } from "lucide-react"
import BoxReveal from '@/components/ui/box-reveal'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import cpdIcon from '@/assets/cpd.png'

const Courses = () =>
{
    const [ courses, setCourses ] = useState(null);
    const  [ isLoading, setIsLoading ] = useState(true);    

    useEffect(()=>
    {
        getCourses();
    },[])

    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data);
        }
        catch(error)
        {
            conosle.error(error.message)
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const removeCourse = async (id) =>
    {
        try
        {
            const url = `/api/course/${id}`
            const response = await axios.delete(url)
            setCourses(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    if(isLoading)
        return <Loading/>
    

    return(
        <div className='mt-12'>
            <Header/>

            <div className='lg:px-[10vw] px-[5vw] py-12 flex flex-col gap-4'>
            

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {courses?.map((course) =>
            (
                <Link href={`/courses/${course.id}`} key={course._id}>
                <Card  className='space-y-2 p-4 '>
                    <div className='relative h-40'>
                        <Image className='rounded w-[100%] object-cover' src={course.imageURL} layout='fill' alt={course.title}/>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className='space-y-2'>
                            <h1 className='font-semibold text-sm'>{course.title}</h1>
                            <p className='bg-muted-foreground text-black text-xs py-0.5 px-2 rounded-xl w-fit'>{course.level}</p>
                            <div className="flex items-center gap-2">
                                <p className='font-semibold'>${course.offerPrice}</p>
                                <p className='line-through text-xs'>${course.price}</p>
                            </div>
                        </div>
                        {/* <Image className='lg:h-10 h-8 w-fit' src={cpdIcon} alt='CPD member icon'/> */}
                    </div>
                </Card>
                </Link>
            ))}
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Courses