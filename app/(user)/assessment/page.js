'use client'

import { useSession } from "next-auth/react"
import Image from 'next/image';
import back from '../../../assets/back.png'
import next from '../../../assets/next.png'
import flag from '../../../assets/flag-dark.png'
import flagged from '../../../assets/flag.png'
import { useParams, usebatchId, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import axios from "axios"
import { toast } from "sonner"
import { useFieldArray, useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addAnswerTemplate, flagQuestion, updateAnswer, updateOptions, updateVerdict } from "@/store/slices/mockAnswerReducer";
import { Card } from "@/components/ui/card";

const Page = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <Mock/>
        </Suspense>
    )
}

const Mock = () =>
{
    const { data, status } = useSession();
    const dispatch = useDispatch();
    const [ mock, setMock ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const params = useSearchParams();
    const mockId = params.get('assessmentId');
    const router = useRouter();
    const pathname = usePathname();
    const [ index, setIndex ] = useState(0);
    const [ active, setActive ] = useState(null);
    const mockAnswers = useSelector((state)=> state.mockAnswers.responses);
    const [ reviewQuestions, setReviewQuestions ] = useState([]);

    const onSubmit = async () =>
    {
        let score = 0;
        for(let i=0;i<mockAnswers.length;i++)
        {
            mock.quiz.reference[i].answers.every((answer)=> 
            {
                if(mockAnswers[i].includes(answer) && mock.quiz.reference[i].answers.length === mockAnswers[i].length)
                {
                    score++;
                }
            })
        }

        const mockDetails = { answers: mockAnswers, score, isCompleted: true}

        try
        {
            setIsLoading(true);
            const url = `/api/assessment/${mockId}`;
            const response = await axios.put(url, mockDetails);
            toast.success(response.data.message);
            router.back()
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const getMockTest = async () =>
    {
        try
        {
            const url = `/api/assessment/${mockId}`
            const response = await axios.get(url);
            // if(!response.data.batch.access)
            // {
            //     router.push('/dashboard')
            //     toast('Access Denied')
            // }
            setActive(response.data.quiz.reference)
            setMock(response.data);
            if(mockAnswers.length === response.data.quiz.reference.length)
                return
            dispatch(addAnswerTemplate({length: response.data.quiz.reference.length}))
        }
        catch(error)
        {
            toast(error.message);
        }
        finally
        {
            setIsLoading(false)
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
        {
            getMockTest();
        }
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
            
    }, [status]);

    if(status === 'loading' || isLoading)
    return(
        <Loading/>   
    )

    return(
        <div className="space-y-4">
        <div className="space-y-1">
            <h1 className="font-semibold">{mock.quiz.course.title}</h1>
            <p className="text-sm text-muted-foreground">{mock.quiz.reference.length} Questions</p>
        </div>
        <Card className='grid grid-cols-1 gap-4 relative md:text-sm text-xs p-8'>
           <p className="font-semibold leading-relaxed">{index+1 +'. ' +active[index].question}</p>
                {active[index].options.map((data,ind)=>
                (
                    <div key={ind} className="flex items-start gap-4 bg-stone-900 p-4 rounded">
                        <Checkbox
                            id={ind + 1}
                            checked={mockAnswers[index]?.includes(ind + 1)}
                            onCheckedChange={(checked) => {
                            if (checked) 
                                dispatch(updateAnswer({ index, answer: ind + 1 }));
                            else
                                dispatch(updateOptions({ index, option: ind + 1 }));
    
                            }}
                        />
                    <p>{data}</p>
                </div>
                ))}

                <div className="flex gap-2 justify-center mt-4 w-full relative">
                    <Image className={`${index > 0 ? 'bg-red-600 cursor-pointer' : 'bg-stone-900' }  rounded-full p-2 h-8 w-fit`} src={back} alt='previous' 
                        onClick={()=> 
                        {   
                            if(index < 1)
                                return; 
                            setIndex((prev)=> prev-1)
                        }}
                    />
                    <Image className={`${mockAnswers[index].length > 0 && index+1 !== mockAnswers.length ? 'bg-red-600 cursor-pointer' : 'bg-stone-900' }  rounded-full p-2 h-8 w-fit`} src={next} alt='previous' 
                        onClick={()=> 
                        {
                            if(!(mockAnswers[index].length > 0))
                                return
                            if(index+1 === mockAnswers.length)
                                return
                            setIndex((prev)=> prev+1)
                        }}/>
                    {/* <Image className="h-8 w-fit cursor-pointer absolute b-0 right-0" src={mockAnswers[index].isFlagged ? flagged : flag} alt='previous' 
                        onClick={()=> 
                        {
                            if(!mockAnswers[index].isFlagged)
                                setReviewQuestions((prev)=> [...prev, index])
                            else
                            {
                                const updatedReviewQuestions = reviewQuestions.filter((question)=> question !== index)
                                setReviewQuestions(updatedReviewQuestions)
                            }
                            dispatch(flagQuestion({ index, isFlagged: !mockAnswers[index].isFlagged}))
                        }
                    }/> */}
                </div>
                
        </Card>
        {index+1 === mockAnswers.length && 
        <div className="flex justify-center">
            <Button className='text-xs' onClick={onSubmit}>Submit</Button>
        </div>}
        {/* {reviewQuestions.length>0 && <p className="font-semibold text-sm text-center mt-6">Review flagged questions</p>}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
        {reviewQuestions.map((question)=>
        (
            <div className={`${question === index && 'bg-yellow-400 text-white'} border p-1.5 px-3 rounded-full cursor-pointer`} key={question} onClick={()=> setIndex(question)}>{question+1}</div>
        ))}
        </div> */}
        </div>
    )
}

export default Page