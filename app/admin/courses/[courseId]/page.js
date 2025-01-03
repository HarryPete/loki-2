'use client'

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lecturecard from '@/app/components/LectureCard';
import { toast } from 'sonner';
import Loading from '@/app/components/Loading';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Rating from '@/app/components/Rating';
import defaultDP from '../../../../assets/defaultDP.png'
import CourseDetail from '@/app/components/CourseDetail';

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(true);
    const pathname = usePathname();
    const courseId = pathname.split('/')[3];

    useEffect(()=>
    {
       getCourse();
    },[])

    const getCourse = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourse(response.data);
        }
        catch(error)
        {
            toast.error(error.message)
        }
        finally
        {
            setIsLoading(false)
        }
    }

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4 md:text-base text-sm'>
            <CourseDetail level='admin' course={course}/>
            <h1 className='text-3xl font-semibold pt-4'>Course feedbacks</h1>
{/*             
            <Carousel>
                <CarouselContent>
                    {course.feedbacks.map((feed) => (
                    <CarouselItem key={feed._id} className='lg:basis-1/2'>
                        <Card className='p-4 space-y-4 aspect-square'>
                            <Image className="h-12 w-12 object-cover" src={feed.user?.imageeURL ? feed.user?.imageeURL  : defaultDP } alt='user' width={100} height={100}/>
                            <div className="space-y-2">
                                <p className="font-lg font-semibold">{feed.user.name}</p>
                                <p>{feed.comment}</p>
                                <Rating value={feed.rating}/>
                            </div>
                        </Card>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
            </Carousel>
             */}
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 md:text-base text-sm">
            {course.feedbacks.map((feed)=>
            (
                <Card key={feed._id} className='p-4 space-y-4'>
                    <Image className="h-12 w-12 object-cover rounded-full object-top" src={feed.user?.imageURL ? feed.user?.imageURL  : defaultDP } alt='user' width={100} height={100}/>
                    <div className="space-y-2">
                        <p className="font-lg font-semibold">{feed.user.name}</p>
                        <p>{feed.comment}</p>
                        <Rating value={feed.rating}/>
                    </div>
                </Card> 
            ))}
            </div>
        </div>
    )
}

export default Course
