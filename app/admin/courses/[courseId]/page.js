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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormatDate } from '@/utility/FormatDate';
import { Textarea } from '@/components/ui/textarea';
import deleteIcon from '../../../../assets/delete.png'

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(true);
    const pathname = usePathname();
    const courseId = pathname.split('/')[3];
    const [ selectedFeedback, setSelectedFeedback] = useState(null);
    const [ userFeedback, setUserFeedback ] = useState('');

    // const form = useForm({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: 
    //     {
    //         comment: userFeedback
    //     },
    // })

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

    const handleUpdate = async (id, type) =>
    {
        try
        {
            const feedbackDetails = { comment: userFeedback, type, courseId: course._id}
            const url = `/api/feedback/${id}`
            const response = await axios.put(url, feedbackDetails)
            toast.success(response.data.message)
            getCourse();
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const handleDelete = async (id) =>
    {
        try
        {
            const url = `/api/feedback/${id}`
            const response = await axios.delete(url, { courseId: course._id})
            toast.success(response.data.message);
            // getCourse()
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    if(isLoading)
        return <Loading/>

    return(
        <div className='space-y-4 md:text-sm text-xs leading-relaxed'>
            <CourseDetail level='admin' course={course}/>
            <h1 className='text-lg font-semibold pt-4'>Course feedbacks</h1>
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
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
            {course.feedbacks.map((feed)=>
            (
                <Card key={feed._id} className='p-4 space-y-4 relative'>
                    <Image className="h-12 w-12 object-cover rounded-full object-top" src={feed.user?.imageURL ? feed.user?.imageURL  : defaultDP } alt='user' width={100} height={100}/>
                    <div className="space-y-2">
                        <p className='leading-relaxed'>{feed.comment}</p>
                        <p className="font-lg font-semibold">{feed.user.name}</p>
                        <Rating value={feed.rating}/>
                        <Dialog open={selectedFeedback === feed._id} onOpenChange={()=> setSelectedFeedback(null)}>
                            
                            <div className='absolute top-2 right-2 flex items-center gap-3' >
                                <Button className='h-6' 
                                onClick={()=> 
                                {
                                    setUserFeedback(feed.comment)
                                    setSelectedFeedback(feed._id)
                                }}>Edit</Button>
                                <Image className="h-5 w-fit cursor-pointer" onClick={()=> handleUpdate(feed._id, "delete")} src={deleteIcon} alt='delete'/> 
                            </div>

                            <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit feedback</DialogTitle>
                                <DialogDescription>
                                Feedback submitted on {FormatDate(feed.updatedAt)}
                                </DialogDescription>
                            </DialogHeader>
                                <div className='space-y-1 flex flex-col items-center'>
                                <p className="text-sm font-semibold">{feed.user.name}</p>
                                <Rating value={feed.rating}/>
                                </div>
                                <Textarea className='p-2 min-h-36' value={userFeedback} onChange={(e)=> setUserFeedback(e.target.value)}/>
                                <Button onClick={()=> handleUpdate(feed._id, "edit")}>Update</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card> 
            ))}
            </div>
        </div>
    )
}

export default Course
