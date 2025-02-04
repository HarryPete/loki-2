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
import TriggerDetails from "@/app/components/TriggerDetails"

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
    const trigger = params.get('trigger')
    const index = trigger-1
    const pathname = usePathname();
    const batchId = pathname.split('/')[3]

    useEffect(()=>
    {
        getBatch();
    },[])

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

    console.log(batch)

    if(isLoading)
        return <Loading/>
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between pb-4">
                <div>
                  <h1 className="font-semibold">{batch.course.title}</h1>
                  <h1 className="text-muted-foreground text-sm">{batch.simulations[index].responses.length} Participants</h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='text-xs'>Trigger details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] space-y-0.5">
                    <DialogHeader>
                      <DialogTitle>Trigger {trigger}</DialogTitle>
                        <DialogDescription>
                          {batch.course.title}
                        </DialogDescription>
                          </DialogHeader>
                          
                          <div className="text-sm">
                          <TriggerDetails simulation={batch.simulations[index]}/>
                          </div>
                          </DialogContent>
                        </Dialog>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 relative">
            <div className="lg:w-[40%] w-full">
            <div className="lg:sticky lg:top-28">
              <div className="space-y-2 max-h-[80vh] overflow-y-scroll pr-4">
              {batch.simulations[index].responses.map((response, resultId)=>
              (
                <Card className={`${viewResult === resultId && 'bg-red-600'} flex justify-between items-center md:text-sm text-xs p-4 cursor-pointer`} key={response._id} onClick={()=> setViewResult(resultId)}>
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5 rounded-full object-cover object-top" width={100} height={100} src={response.enrollment.user?.imageURL ? response.enrollment.user?.imageURL : defaultDP} alt={response.enrollment.user.name}/>
                    <p>{response.enrollment.user.name}</p>
                  </div>
                  <div className="space-x-2">
                    <span className="">{FormatDate(response.updatedAt)}</span>
                  </div>
                </Card>
              ))}
              </div>
              
            </div>
                
            </div>
            {viewResult !== -1 ? 
            (batch.simulations[index].responses[viewResult].response ? 
            <div className="space-y-4 lg:w-[60%] w-full">
                <Card className='p-4 md:text-sm text-xs'>
                  {batch.simulations[index].responses[viewResult].response}
                </Card>
            </div> : <div className="text-muted-foreground text-sm lg:w-[60%] w-full text-center">{batch.simulations[index].responses[viewResult].enrollment.user.name} is yet to start activity</div>) : 
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

