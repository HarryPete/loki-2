'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormatDate } from "@/utility/FormatDate"
import defaultDP from '../../../../../assets/defaultDP.png'
import correctIcon from '../../../../../assets/correct.png'
import wrongIcon from '../../../../../assets/wrong.png'
import { Card } from "@/components/ui/card"
import Image from "next/image"
import axios from "axios"
import { toast } from "sonner"
import { Suspense, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Loading from "@/app/components/Loading"

const MockReport = () =>
{  
    const [ isLoading, setIsLoading ] = useState(true);
    const [ batch, setBatch ] = useState(null);
    const [ active, setActive ] = useState(null);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ incorrectAnswers, setIncorrectAnswers ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const [ flaggedAnswers, setFlaggedAnswers ] = useState([]);
    const [ partiallyCorrectAnswers, setPartiallyCorrectAnswers ] = useState([]);
    const [ viewResult, setViewResult ] = useState(-1);
    const params = useSearchParams();
    const set = params.get('set')
    const index = set-1
    const pathname = usePathname();
    const batchId = pathname.split('/')[3]

    console.log(batch)

    useEffect(()=>
    {
        getBatch();
    },[])

    const getUserMockResult = (resultId) =>
    {
            setViewResult(resultId)
            const numbers =  Array.from({ length: batch.mocks[index].quiz.reference.length }, (_, i) => i)
            setAnswers(numbers)
            setActive(numbers)

            const correctAnswers = [];
            const incorrectAnswers = [];
            const partiallyCorrectAnswers = [];
            const mockAnswers = batch.mocks[index].results[resultId].answers

            for (let i= 0; i< mockAnswers.length; i++) 
            {
                const referenceAnswers = batch.mocks[index].quiz.reference[i].answers; 
                const userAnswers = mockAnswers[i]; 

                
                    const allCorrect =
                    userAnswers.every((answer) => referenceAnswers.includes(answer)) &&
                    userAnswers.length === referenceAnswers.length;

                    const someCorrect = userAnswers.some((answer) => referenceAnswers.includes(answer));

                    if (allCorrect) 
                        correctAnswers.push(i);
                    else if (someCorrect) 
                        partiallyCorrectAnswers.push(i);
                    else 
                        incorrectAnswers.push(i);
                
            }
            
            setCorrectAnswers(correctAnswers);
            setPartiallyCorrectAnswers(partiallyCorrectAnswers);
            setIncorrectAnswers(incorrectAnswers);
    }

    const getBatch = async () =>
    {
        try
        {
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatch(response.data);
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

    if(isLoading)
        return <Loading/>
    
    return (
        <div className="space-y-4">
            <div>
                <h1 className="font-semibold">{batchId} / Set {set}</h1>
                <h1 className="text-muted-foreground text-sm">{batch.mocks[index].results.length} Participants</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 relative">
            <div className="lg:w-[40%] w-full">
            <div className="lg:sticky lg:top-28">
              <div className="space-y-2 max-h-[80vh] overflow-y-scroll pr-4">
              {batch.mocks[index].results.map((result, resultId)=>
              (
                <Card className={`${viewResult === resultId && 'bg-red-600'} flex justify-between items-center md:text-sm text-xs p-4 cursor-pointer`} key={result._id} onClick={()=> getUserMockResult(resultId)}>
                  <div className="flex items-center gap-1">
                    <Image className="h-5 w-5 rounded-full object-cover object-top" width={100} height={100} src={result.enrollment.user?.imageURL ? result.enrollment.user?.imageURL : defaultDP} alt={result.enrollment.user.name}/>
                    <p>{result.enrollment.user.name}</p>
                  </div>
                  <div className="space-x-2">
                    <span className="">{FormatDate(result.updatedAt)}</span>
                  </div>
                </Card>
              ))}
              </div>
              
            </div>
                
            </div>
            {viewResult !== -1 ? 
            (batch.mocks[index].results[viewResult].answers.length > 0 ? 
            <div className="space-y-4 lg:w-[60%] w-full">
                {/* <span className="font-semibold">Score : {correctAnswers.length}/{batch.mocks[index].quiz.reference.length}</span> */}
                
                
                <Card className="grid grid-cols-4 md:text-sm text-xs font-semibold">
                  <div className={`${active.length === answers.length && 'bg-stone-800'} hover:bg-stone-800 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(answers)}>Questions<span className="ml-1 text-xs font-normal bg-blue-500 text-white w-fit p-0.5 px-2  rounded-full">{answers.length}</span></div>  
                  <div className={`${active.length === correctAnswers.length && 'bg-stone-900'} hover:bg-stone-900 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(correctAnswers)}>Correct<span className="ml-1 md:text-sm text-xs font-normal bg-green-500 text-white w-fit p-0.5 px-2  rounded-full">{correctAnswers.length}</span></div>
                  <div className={`${active.length === partiallyCorrectAnswers.length && 'bg-stone-900'} hover:bg-stone-900 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(partiallyCorrectAnswers)}>Partial<span className="ml-1 md:text-sm text-xs font-normal bg-orange-500 text-white w-fit p-0.5 px-2  rounded-full">{partiallyCorrectAnswers.length}</span></div>
                  <div className={`${active.length === incorrectAnswers.length && 'bg-stone-900'} hover:bg-stone-900 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(incorrectAnswers)}>Incorrect<span className="ml-1 md:text-sm text-xs font-normal bg-red-500 text-white w-fit p-0.5 px-2  rounded-full">{incorrectAnswers.length}</span></div>
                  {/* <div className={`${active.length === flaggedAnswers.length && 'bg-stone-900'} hover:bg-stone-900 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(flaggedAnswers)}>Flagged<span className="ml-1 md:text-sm text-xs font-normal bg-yellow-400 text-white w-fit p-0.5 px-2  rounded-full">{flaggedAnswers.length}</span></div>     */}
                </Card>
                <div className="w-full space-y-3 leading-relaxed">
                {active.map((que, queIndex)=>
                (
                  <Card className="p-6 space-y-4 md:text-sm text-xs" key={queIndex}>
                    <h1 className="font-semibold">{que+1 +'. ' +batch.mocks[index].quiz.reference[que].question}</h1>
                    <div className="space-y-2">
                    {batch.mocks[index].quiz.reference[que].options.map((data, ind)=>
                    (
                      <div className="bg-stone-900 p-4 rounded flex items-start justify-between gap-4" key={ind}>
                        <p>{data}</p>
                        {(batch.mocks[index].quiz.reference[que].answers.includes(ind+1) || batch.mocks[index].results[viewResult].answers[que].includes(ind+1)) && 
                        <Image className='h-5 w-fit' 
                        src={(batch.mocks[index].quiz.reference[que].answers.includes(ind+1) || batch.mocks[index].results[viewResult].answers[que].isFlagged) ? correctIcon : wrongIcon} alt='correct'/>}
                      </div>
                    ))}
                    </div>
                  </Card>
                  ))}
                </div>
              </div> : <div className="text-muted-foreground text-sm lg:w-[60%] w-full text-center">{batch.mocks[index].results[viewResult].enrollment.user.name} is yet take up assigned mock</div>) : 
              <div className="text-muted-foreground lg:w-[60%] w-full text-sm text-center">Select participant to analyze</div>}
             
              
            </div>
        </div>
  )
}

const Page = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <MockReport/>
        </Suspense>
    )
}

export default Page

