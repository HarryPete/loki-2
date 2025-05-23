import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { FormatDate } from "@/utility/FormatDate"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import template from '../../assets/template.png'
import { useCallback, useEffect, useRef, useState } from "react"
import { toPng } from "html-to-image"
import { useSession } from "next-auth/react"
import { calculateResult } from "@/utility/calculateScores"
import { Confetti } from "@/utility/confetti"

const chartConfig = 
{
    completed: {
      label: "Completed",
      color: "#4CAF50",
    },
    upcoming: {
      label: "Upcoming",
      color: "white",
    },
};

export const pendingSessions = (sessions) =>
{
  const pending = sessions.filter((session) => !session.isCompleted)
  return pending.length === 0 ? null :  pending.length
}

const ProgressBar = ({batch, enrollment}) =>
{

  const { data } = useSession();
  const divRef = useRef(null);
  const [ unlockCertificate, setUnlockCertificate ] = useState(true);

    const completed = batch.sessions.filter((session) => session.isCompleted).length;
    const pending = batch.sessions.length - completed;

    const chartData = 
    [
        { label: 'Completed', value: completed, fill:'#4CAF50'},
        { label: 'Upcoming', value: pending, fill:'white'},
    ]

    useEffect(()=>
    {
      if(batch.isAssessment)
        {
            if(!enrollment.mocks.length)
                return

            // if(enrollment.mocks.length === 0)
            //   setUnlockCertificate(false)

            
            const isAssessmentCompleted = enrollment.mocks.filter((mock)=> mock.isCompleted);
    
            if(!isAssessmentCompleted.length)
                return
    
            const isAssessmentCleared = calculateResult(isAssessmentCompleted[isAssessmentCompleted?.length - 1].score, 20)

            if(!isAssessmentCleared)
                return
        }

        if(!batch.isAssessment)
          return 

        if(!pendingSessions(batch.sessions))
          return

        setUnlockCertificate(true)
    },[])

    const downloadCertification = ()=>
    {
      

      console.log('Download')
        if(divRef.current === null) 
            return

        


        // Confetti();

        toPng(divRef.current, { cacheBust: true, })
        .then((dataUrl) => 
        {
            const link = document.createElement('a')
            link.download = 'fintsacademy.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => 
        {
            toast.error(err)
        })

      }

    // return (
    // <Card className="flex flex-col h-fit text-lg y-6">
    //   {/* <CardHeader className="items-center pb-0">
    //     <CardTitle>{batch.course.title}</CardTitle>
    //     <CardDescription>{FormatDate(batch.startDate) +' - ' +FormatDate(batch.endDate) }</CardDescription>
    //   </CardHeader> */}
    //   <CardContent className="flex-1 pb-0">
    //     <ChartContainer
    //       config={chartConfig}
    //       className="mx-auto aspect-square max-h-[250px]"
    //     >
    //       <PieChart>
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent hideLabel />}
    //         />
    //         <Pie
    //           data={chartData}
    //           dataKey="value"
    //           nameKey="label"
    //           innerRadius={60}
    //           strokeWidth={5}
    //         >
    //         <Label
    //           content={({ viewBox }) => {
    //           return (
    //           <text x={viewBox.cx}
    //           y={viewBox.cy}
    //           textAnchor="middle"
    //           fill="white"
    //           dominantBaseline="middle"
    //           className="text-black text-lg font-semibold">
    //           {((completed / (completed + pending)) * 100).toFixed(1)}%
    //         </text>);
    //         }}
    //           />
    //         </Pie>
    //       </PieChart>
    //     </ChartContainer>
    //   </CardContent>
    //   <CardFooter className="flex-col gap-2 text-sm">
    //     <div className="font-semibold">
          
    //     </div>
    //     <div className="flex items-center gap-2 font-semibold leading-none text-sm">
    //     {batch.title} <span className="text-gray-500 font-medium">instructed by</span> {batch.mentor.name}
    //     </div>
    //     <div className="space-x-2 text-white mt-2">
    //       {/* <Link href={batch?.zoomLink ? batch?.zoomLink : ""} target="_blank" className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Zoom</Link> */}
    //       {/* <Link href='/forum' className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Forum</Link> */}
    //       {/* <Link href='' className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Whatsapp</Link> */}
    //     </div>
    //     <Dialog>
    //     <DialogTrigger asChild>
    //         <Button className='text-xs'>Unlock Certificate</Button>
    //     </DialogTrigger>
    //     <DialogContent className="sm:max-w-[425px] space-y-0.5">
    //         <DialogHeader>
    //             <DialogTitle>Certificate</DialogTitle>
    //             <DialogDescription>
    //                 {batch.course.title}
    //             </DialogDescription>
    //         </DialogHeader>
            // {!unlockCertificate ? <div className="min-h-[40vh] flex text-center items-center text-muted-foreground text-sm">Certificate wil be unlocked on successful completion of sprint and assessment</div> : 
            // <div>  
            //   <div ref={divRef} className="relative text-[#e5c369]">
            //     <Image className="w-fit h-400px" src={template} alt='certificate'/>
            //       <h1 className="absolute sm:text-lg text-base text w-full text-center top-[45%]">{enrollment.user.name}</h1>
            //       <p className="absolute sm:text-sm text-xs w-full text-center top-[57%]">{batch.course.title}</p>
            //       <p className="absolute text-[9px] left-[18%] bottom-[15%]">{new Date(batch.endDate).toLocaleDateString()}</p>
            //     </div>
                
            //   </div>}
    //         </DialogContent>
    //     </Dialog>
    //   </CardFooter>
    // </Card>)
  
    return <Button className='text-xs absolute top-4 right-4' onClick={downloadCertification}>Download certificate</Button>
}

export default ProgressBar