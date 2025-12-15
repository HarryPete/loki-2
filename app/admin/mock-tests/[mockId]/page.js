'use client'

import Loading from "@/app/components/Loading"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner"
import correct from '../../../../assets/correct.png'
import editIcon from '../../../../assets/edit-dark.png'
import deleteIcon from '../../../../assets/delete-dark.png'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Page = () =>
{
    const [ mock, setMock ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const params = useSearchParams();
    const mockId = params.get('mockId');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(()=>
    {
        getMock();
    },[])

    const getMock = async () =>
    {
        try
        {
            const url = `/api/quiz/${mockId}`
            const response = await axios.get(url);
            setMock(response.data);
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
        <div className="space-y-6">
            <div className="flex justify-between items-center font-semibold">
                <h1>Set {mock.title.split('-')[0][0]} - {mock.title.split('-')[1]}</h1>
                <Button className='h-8 text-sm' onClick={()=> router.push(`${pathname}/edit?mockId=${mock._id}`)}>Edit</Button>
            </div>
            <div className="space-y-6">
            {mock.reference.map((data, index)=>
            (
                <Card key={index} className='bg-black p-4 text-sm space-y-2'>
                    <h1 className="font-semibold leading-relaxed p-2">{index+1 +'. ' +data.question}</h1>
                    <div className="space-y-2">
                        {data.options.map((opt, ind)=>
                        (
                            <div key={ind} className={`${opt.isCorrect && 'bg-gray-100 rounded text-black'} p-3 flex items-start justify-between gap-4 lg:w-[70%] w-full`}>
                                <p className={`rounded`}>{ind+1 +'. ' +opt.option}</p>
                                {opt.isCorrect && <Image className="h-5 w-5" src={correct} alt='correct'/>}
                            </div>
                        ))}
                    </div>
                    {/* <div className="flex gap-4 p-2 border-t pt-5 text-gray-400">
                        <div className="flex items-center gap-1 cursor-pointer hover:scale-105">
                            <Image className="h-4 w-fit" src={editIcon} alt='edit'/>
                            <span>Edit</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:scale-105">
                            <Image className="h-4 w-fit" src={deleteIcon} alt='delete'/>
                            <span>Delete</span>
                        </div>
                    </div> */}
                </Card>
            ))}
            </div>
        </div>
    )
}

const Mock = () =>
{
    return(
        <Suspense fallback={<Loading/>}>
            <Page/>
        </Suspense>
    )
}

export default Mock