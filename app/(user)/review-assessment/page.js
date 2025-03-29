'use client'

import { useSession } from "next-auth/react"
import Image from 'next/image';
import correctIcon from '../../../assets/correct.png'
import wrongIcon from '../../../assets/wrong.png'
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
import { addAnswerTemplate, flagQuestion, updateAnswer, updateOptions } from "@/store/slices/mockAnswerReducer";
import MockTestBar from "@/app/components/MockTestBar";
import { Card } from "@/components/ui/card";

const Page = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <Mock/>
        </Suspense>
    )
}

const alphabets = [
    {
        letter: 'a',
    },
    {
        letter: 'b',
    },
    {
        letter: 'c',
    },
    {
        letter: 'd',
    },
    {
        letter: 'e',
    },
    {
        letter: 'f',
    }
]

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
    const [ active, setActive ] = useState(null);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ incorrectAnswers, setIncorrectAnswers ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const [ partiallyCorrectAnswers, setPartiallyCorrectAnswers ] = useState([]);

    const retakeTest = async () =>
    {
      try
      {
          setIsLoading(true);
          const mockDetails = { answers: [], status: 'Pending'}
          const url = `/api/assessment/${mock._id}`
          const response = await axios.put(url, mockDetails)
          toast.success(response.data.message);
          router.push(`/mock-test?mockId=${mock._id}`)
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

            setMock(response.data);
            const numbers =  Array.from({ length: response.data.answers.length }, (_, index) => index)
            setAnswers(numbers)
            setActive(numbers)

            const correctAnswers = [];
            const incorrectAnswers = [];
            const partiallyCorrectAnswers = [];
            const mockAnswers = response.data.answers

            for (let index = 0; index < mockAnswers.length; index++) 
            {
                const referenceAnswers = response.data.quiz.reference[index].answers; 
                const userAnswers = mockAnswers[index]; 

                
                    const allCorrect =
                    userAnswers.every((answer) => referenceAnswers.includes(answer)) &&
                    userAnswers.length === referenceAnswers.length;

                    const someCorrect = userAnswers.some((answer) => referenceAnswers.includes(answer));

                    if (allCorrect) 
                        correctAnswers.push(index);
                    else if (someCorrect) 
                        partiallyCorrectAnswers.push(index);
                    else 
                        incorrectAnswers.push(index);
                
            }
            
            setCorrectAnswers(correctAnswers);
            setPartiallyCorrectAnswers(partiallyCorrectAnswers);
            setIncorrectAnswers(incorrectAnswers);
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
        <div className="flex lg:flex-row flex-col gap-4 items-start md:text-sm text-xs relative">
            <div className="flex flex-col gap-4 lg:w-[40%] w-full lg:sticky lg:top-24 top-0">
                <MockTestBar mockData={mock}/>
                {/* <Card className="p-4 space-y-2 text-xs">
                    <p className="font-semibold">Feedback </p>
                    <p className="leading-relaxed ">{message}</p>
                </Card> */}
                <Card className="grid grid-cols-4 text-xs font-semibold">
                    <div className={`${active.length === answers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(answers)}>Questions<span className="ml-1 text-xs font-normal bg-blue-500 text-white w-fit p-0.5 px-2  rounded-full">{answers.length}</span></div>
                    <div className={`${active.length === correctAnswers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(correctAnswers)}>Correct<span className="ml-1 text-xs font-normal bg-green-500 text-white w-fit p-0.5 px-2  rounded-full">{correctAnswers.length}</span></div>
                    <div className={`${active.length === partiallyCorrectAnswers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(partiallyCorrectAnswers)}>Partial<span className="ml-1 text-xs font-normal bg-orange-500 text-white w-fit p-0.5 px-2  rounded-full">{partiallyCorrectAnswers.length}</span></div>
                    <div className={`${active.length === incorrectAnswers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(incorrectAnswers)}>Incorrect<span className="ml-1 text-xs font-normal bg-red-500 text-white w-fit p-0.5 px-2  rounded-full">{incorrectAnswers.length}</span></div>
                    {/* <div className={`${active.length === flaggedAnswers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(flaggedAnswers)}>Flagged<span className="ml-1 text-xs font-normal bg-yellow-400 text-white w-fit p-0.5 px-2  rounded-full">{flaggedAnswers.length}</span></div>     */}
                </Card>
            </div>
            <div className="w-full lg:w-[60%] space-y-4 leading-relaxed">
            {active.map((que, index)=>
            (
                <Card className="p-6 space-y-4" key={index}>
                    <h1 className="font-semibold">{que+1 +'. ' +mock.quiz.reference[que].question}</h1>
                    <div className="space-y-2">
                    {mock.quiz.reference[que].options.map((data, ind)=>
                    (
                        <div className="flex items-start gap-2"  key={ind}>
                            <span className="inline-block mt-4">{alphabets[ind].letter}.</span>
                            
                            <div className="bg-stone-900 w-full p-4 rounded flex items-start justify-between gap-4">
                            <p>{data}</p>
                            {(mock.quiz.reference[que].answers.includes(ind+1) || mock.answers[que].includes(ind+1)) && 
                                <Image className='h-5 w-fit' 
                                src={(mock.quiz.reference[que].answers.includes(ind+1)) ? correctIcon : wrongIcon} alt='correct'/>}
                            </div>
                        </div>
                    ))}
                    </div>
                </Card>
            ))}
            </div>
        </div>
    )
}

export default Page