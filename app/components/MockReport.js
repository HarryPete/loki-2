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
import mockIcon from '../../assets/mock.png'
import defaultDP from '../../assets/defaultDP.png'
import correctIcon from '../../assets/correct.png'
import wrongIcon from '../../assets/wrong.png'
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import LoadingMini from "./LoadingMini"

const MockReport = ({mock, index, batch, getBatch, selectedMock, setSelectedMock}) =>
{  
    const [ isLoading, setIsLoading ] = useState(false);
    const [ active, setActive ] = useState(null);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ incorrectAnswers, setIncorrectAnswers ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const [ flaggedAnswers, setFlaggedAnswers ] = useState([]);
    const [ partiallyCorrectAnswers, setPartiallyCorrectAnswers ] = useState([]);
    const [ viewResult, setViewResult ] = useState(-1);

    const handleOpenDialog = (mockId) => 
    {
        setSelectedMock(mockId);
    };

    const handleCloseDialog = () => 
    {
        setSelectedMock(null);
    };

    console.log(viewResult)

    const getUserMockResult = (resultId) =>
    {
      setViewResult(resultId)
      const numbers =  Array.from({ length: batch.mocks[index].quiz.reference.length }, (_, i) => i)
      setAnswers(numbers)
      setActive(numbers)

      const flaggedAnswers = [];
      const correctAnswers = [];
      const incorrectAnswers = [];
      const partiallyCorrectAnswers = [];
      const mockAnswers = batch.mocks[index].results[resultId].answers

      for (let i = 0; i < mockAnswers.length; i++) 
        {
            const isFlagged = mockAnswers[i].isFlagged;
            const referenceAnswers = batch.mocks[index].quiz.reference[i].answers; 
            const userAnswers = mockAnswers[i].answers; 

            if (isFlagged) 
                flaggedAnswers.push(i);
            else
            {
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
        }
        
        setFlaggedAnswers(flaggedAnswers);
        setCorrectAnswers(correctAnswers);
        setPartiallyCorrectAnswers(partiallyCorrectAnswers);
        setIncorrectAnswers(incorrectAnswers);
    }

    const updateMock = async (id, status="", type) =>
    {
      try
      {
          setIsLoading(true)
          const url = `/api/batch/${batch._id}`
          const batchDetails = { mock: {quiz:mock._id, id}, id, status, type }
          const response = await axios.put(url, batchDetails);
          toast.success(response.data.message);
          getBatch()
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
    
    return (
    <Dialog open={selectedMock === batch.mocks[index]?.id} onOpenChange={handleCloseDialog}>
        
          <Card className={`${batch.mocks[index] ? 'border-green-500' : 'border-red-500' } border-2 p-4 text-sm`}>
            {isLoading ? <LoadingMini/> :
            <div className="space-y-3">
            <div className='bg-gray-100 p-6 gap-2 flex flex-col items-center rounded relative'>
              <Image className='h-12 w-fit' src={mockIcon} alt='mock'/>
              <p>Set {index+1}</p>
              {batch.mocks[index] && 
              <div className="absolute top-2 right-2">
                {/* <Label htmlFor="airplane-mode text-xs">{mock.status}</Label> */}
                <Switch checked={batch.mocks[index]?.status === 'Unlocked'} onCheckedChange={()=> updateMock(batch.mocks[index].id, batch.mocks[index].status === 'Locked' ? 'Unlocked' : 'Locked', "retake")}/>
              </div>}
            </div>
            <div className="flex justify-center">
              {batch.mocks[index] ? <Button className='text-xs h-6' onClick={()=> handleOpenDialog(batch.mocks[index].id)}>Details</Button> :
              <Button className='text-xs h-6' onClick={()=> updateMock(batch.course.mocks[index].id, "Locked" ,"assign")}>Assign</Button>}
            </div>
            </div>}
          </Card>
          {batch.mocks[index] && 
          <DialogContent className="lg:h-[90vh]">
            <DialogHeader>
                <DialogTitle>Mock {batch.mocks[index]?.id}</DialogTitle>
                <DialogDescription>
                  {batch.mocks[index]?.results?.length} Participants
                </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col max-h-[70vh] gap-4">
              {viewResult !== -1 ? 
              (batch.mocks[index].results[viewResult].answers.length > 0 ? <div className="space-y-2 h-[75%] overflow-y-scroll">
                {/* <span className="font-semibold">Score : {correctAnswers.length}/{batch.mocks[index].quiz.reference.length}</span> */}
                <Card className="grid grid-cols-5 text-xs font-semibold fixed top-4">
                  <div className={`${active.length === answers.length && 'bg-gray-50'} hover:bg-gray-50 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(answers)}>Questions<span className="ml-1 text-xs font-normal bg-blue-500 text-white w-fit p-0.5 px-2  rounded-full">{answers.length}</span></div>
                  <div className={`${active.length === correctAnswers.length && 'bg-gray-50'} hover:bg-gray-50 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(correctAnswers)}>Correct<span className="ml-1 text-xs font-normal bg-green-500 text-white w-fit p-0.5 px-2  rounded-full">{correctAnswers.length}</span></div>
                  <div className={`${active.length === partiallyCorrectAnswers.length && 'bg-gray-50'} hover:bg-gray-50 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(partiallyCorrectAnswers)}>Partial<span className="ml-1 text-xs font-normal bg-orange-500 text-white w-fit p-0.5 px-2  rounded-full">{partiallyCorrectAnswers.length}</span></div>
                  <div className={`${active.length === incorrectAnswers.length && 'bg-gray-50'} hover:bg-gray-50 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(incorrectAnswers)}>Incorrect<span className="ml-1 text-xs font-normal bg-red-500 text-white w-fit p-0.5 px-2  rounded-full">{incorrectAnswers.length}</span></div>
                  <div className={`${active.length === flaggedAnswers.length && 'bg-gray-50'} hover:bg-gray-50 items-center flex flex-col gap-1 lg:p-4 px-2 p-4 cursor-pointer`} onClick={()=> setActive(flaggedAnswers)}>Flagged<span className="ml-1 text-xs font-normal bg-yellow-400 text-white w-fit p-0.5 px-2  rounded-full">{flaggedAnswers.length}</span></div>    
                </Card>
                <div className="w-full space-y-4 leading-relaxed">
                {active.map((que, queIndex)=>
                (
                  <Card className="p-6 space-y-4 text-xs" key={queIndex}>
                    <h1 className="font-semibold">{que+1 +'. ' +batch.mocks[index].quiz.reference[que].question}</h1>
                    <div className="space-y-2">
                    {batch.mocks[index].quiz.reference[que].options.map((data, ind)=>
                    (
                      <div className="bg-gray-100 p-4 rounded flex items-start justify-between gap-4" key={ind}>
                        <p>{ind+1 +'. ' +data.option}</p>
                        {(batch.mocks[index].quiz.reference[que].answers.includes(ind+1) || batch.mocks[index].results[viewResult].answers[que].answers.includes(ind+1)) && 
                        <Image className='h-5 w-fit' 
                        src={(batch.mocks[index].results[viewResult].answers[que].answers.includes(ind+1) || batch.mocks[index].results[viewResult].answers[que].isFlagged) ? correctIcon : wrongIcon} alt='correct'/>}
                      </div>
                    ))}
                    </div>
                  </Card>
                  ))}
                </div>
              </div> : <div className="text-muted-foreground text-sm flex justify-center items-center h-[75%]">{batch.mocks[index].results[viewResult].enrollment.user.name} is yet take up assigned mock</div>) : <div className="text-muted-foreground text-sm flex justify-center items-center h-[75%]">Select participant to analyse</div>}
             
              <div className="space-y-2 h-[25%] overflow-y-scroll">
              <h1 className="font-semibold">Participants</h1>
              {batch.mocks[index].results.map((result, resultId)=>
              (
                <Card className={`${viewResult === resultId && 'bg-yellow-400'} flex justify-between items-center text-xs p-4 cursor-pointer`} key={result._id} onClick={()=> getUserMockResult(resultId)}>
                  <div className="flex items-center gap-1">
                    <Image className="h-5 w-5 rounded-full object-cover object-top" width={100} height={100} src={result.enrollment.user?.imageURL ? result.enrollment.user?.imageURL : defaultDP} alt={result.enrollment.user.name}/>
                    <p>{result.enrollment.user.name}</p>
                  </div>
                  <div className="space-x-2">
                    <span className="text-muted-foreground">{FormatDate(result.updatedAt)}</span>
                  </div>
                </Card>
              ))}
              </div>
            </div>
        </DialogContent>}
    </Dialog>
  )
}

export default MockReport

