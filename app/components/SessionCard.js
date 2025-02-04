
import material from '@/assets/material.png'
import complete from '@/assets/success-icon.png'
import pending from '@/assets/pending.png'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const SessionCard = ({session, index, updateSessionStatus, level}) =>
{
    
    return(
        <Card className='flex justify-between items-center text-sm p-4'>
            <div className='flex items-center gap-2'>
                {/* <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger><Image className='h-6 w-fit' src={material} alt='agenda'/></TooltipTrigger>
                    <TooltipContent>
                        <p>{session.lecture.title}</p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider> */}
                <p >Session {index+1}</p>
            </div>
            
            {level === "admin" ? 

            <div className='flex items-center gap-2'>
                <Switch checked={session.isCompleted} onCheckedChange={()=> updateSessionStatus(session._id, session.isCompleted ? false : true)}/>
                <Label>{session.status}</Label>
            </div> : 
            <div className='flex items-center'>
                {/* <p>{session.status}</p> */}
                <Image className='h-6 w-fit' src={session.isCompleted ? complete : pending} alt='img'/>
            </div>}
        </Card>
    )
}

export default SessionCard