import { Card } from "@/components/ui/card"
import Image from "next/image"
import certify from '@/assets/certify.png'
import BoxReveal from "@/components/ui/box-reveal";

const courseWorkflowData = 
[
    {
      id:1,
      title: "Foundation Module",
      description: "Learn fundamental concepts and build a strong base through live classes & study materials"
    },
    {
      id:2,
      title: "Advanced Module",
      description: "Dive deeper into complex topics with detailed case studies, and regular insights"
    },
    {
      id:3,
      title: "Simulations",
      description: "Gain hands-on experience by solving simulated problems with real-time feedback"
    },
    {
      id:4,
      title: "Query Resolution",
      description: "Address any questions through live sessions or 1-on-1 mentoring before the assessment"
    },
    {
      id:5,
      title: "Assessment",
      description: "Evaluate your application of skills through a comprehensive test"
    },
    {
      id:6,
      title: "Certification",
      description: "Receive a digital certificate to showcase your achievement for LinkedIn or your resume"
    }
];

const CourseWorkflow = () =>
{

    return(
        <div className='py-12 flex flex-col lg:flex-row gap-4'>            
            <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2'>
                  <BoxReveal boxColor='black' duration={0.5} className='min-w-full'>
                    <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Course Workflow</h1>
                    <p className='pt-4 leading-loose'>Join, learn, apply skills, and earn your certification with a streamlined workflow.</p>
                  </BoxReveal>
                </div>
            </div>
            <div className='lg:w-[50%] w-full space-y-8'>
                <div className='grid grid-cols-1 gap-4'>
                {courseWorkflowData.map((flow, index)=>
                (
                  <div key={flow.id} className="w-full">                
                  <BoxReveal boxColor='black' duration={0.5}>
                    <Card key={flow.id} className='space-y-2 flex gap-6 xl:flex-row lg:flex-col flex-row p-4'>
                        <h1 className='w-[20%] text-8xl font-semibold text-muted'>{index+1}</h1>  
                        <div className='w-[80%] space-y-2'>
                            <h1 className='font-semibold'>{flow.title}</h1>
                            <p className='text-muted-foreground leading-loose'>{flow.description}</p>
                        </div>
                    </Card>
                    </BoxReveal>
                    </div>  
                ))}
                </div>
                <BoxReveal boxColor='black' duration={0.5}>
                  <Image className='border border-muted rounded-xl sm:w-[60%] w-[100%] left-[50%] translate-x-[-50%] h-fit relative' src={certify} alt='Template'/>
                </BoxReveal>
            </div>
        </div>
    )
}

export default CourseWorkflow