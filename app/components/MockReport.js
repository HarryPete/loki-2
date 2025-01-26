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

    const handleOpenDialog = (mockId) => 
    {
        setSelectedMock(mockId);
    };

    const handleCloseDialog = () => 
    {
        setSelectedMock(null);
    };

    // console.log(batch)

    // const updateMockStatus = async (id, status) =>
    // {
    //   try
    //   {
    //       const url = `/api/batch/${batch._id}`
          
          
    //       const response = await axios.put(url, batchDetails);
    //       toast.success(response.data.message);
    //       getBatch()
    //   }
    //   catch(error)
    //   {
    //     toast.error(error.message)
    //   }
    // }

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
        {batch.mocks[index] && <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Mock {batch.mocks[index]?.id}</DialogTitle>
                <DialogDescription>
                  {batch.mocks[index].quiz.reference.length} Questions
                </DialogDescription>
            </DialogHeader>
            <h1 className="font-semibold text-sm">{batch.mocks[index]?.results?.length} Participants</h1>
            <div className="space-y-2 max:h-[60vh] overflow-y-scroll">
              {batch.mocks[index].results.map((result)=>
              (
                <Card className="flex justify-between items-center text-xs p-4" key={result._id}>
                  <div className="flex items-center gap-1">
                    <Image className="h-5 w-5 rounded-full object-cover object-top" width={100} height={100} src={result.enrollment.user?.imageURL ? result.enrollment.user?.imageURL : defaultDP} alt={result.enrollment.user.name}/>
                    <p>{result.enrollment.user.name}</p>
                  </div>
                  <span>{FormatDate(result.updatedAt)}</span>
                  <span>{result.score}/{batch.mocks[index].quiz.reference.length}</span>
                  {/* <p>{(result.score * 100 / mock.quiz.reference.length).toFixed(2)} %</p> */}
                </Card>
              ))}
            </div>
        </DialogContent>}
    </Dialog>
  )
}

export default MockReport

