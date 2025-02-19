'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CourseCard from '@/app/components/CourseCard'
import { toast } from 'sonner'
import Loading from '@/app/components/Loading'

const Courses = () =>
{
    const [ courses, setCourses ] = useState(null);
    const  [ isLoading, setIsLoading ] = useState(true);
    const router =  useRouter();

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
            toast.error(error.message)
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
            <div className=''>
                                
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    {courses.map((course) =>
                    (
                        <CourseCard level="admin" key={course._id} course={course} removeCourse={removeCourse}/>
                    ))}
                </div>
            </div>
    )
}

export default Courses