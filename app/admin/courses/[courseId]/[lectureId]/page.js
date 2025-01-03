'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import lectureIcon from '../../../../../assets/lecture.png'
import Loading from '@/app/components/Loading';
import Image from 'next/image';

const Page = () =>
{
    const [ lecture, setLecture ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(true);
    const params = useSearchParams();
    const lectureId = params.get('lectureId')

    useEffect(()=>
    {
        getLecture();
    },[])

    const getLecture = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/lecture/${lectureId}`
            const response = await axios.get(url);
            setLecture(response.data);
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

    console.log(lecture)


    if(isLoading)
        return <Loading/>

    return(
        <div className='flex flex-col gap-4 space-y-4 md:text-base text-sm'>
            <div className='bg-white shadow-lg rounded'>
            <div className='flex items-center gap-2 bg-gray-200 p-4'>
            <Image  className='h-6 w-fit' src={lectureIcon} alt='icon'/>
            <h1 className='text-base font-semibold'>{lecture.title}</h1>
            
            </div>
            <div className='space-y-4 p-4 text-sm'>
            {lecture.modules.map((module,index)=>
            (
                <p key={index}>{module}</p>
            ))}
            </div>
            </div>
            <iframe className='w-[100%]' width="560" height="315" src="https://www.youtube.com/embed/aJe-HpFwT_o?si=S6UEW6PJu6ZUwcZsrel=0&modestbranding=0&showinfo=0&autoplay=1&disablekb=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            
            
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
            {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 md:text-base text-sm">
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
            </div> */}
        </div>
    )
}

const Lecture = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <Page/>
        </Suspense>
    )
}

export default Lecture
