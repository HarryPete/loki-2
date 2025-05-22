import { Card } from "@/components/ui/card"
import Image from "next/image"

import star from '@/assets/star.png'
import globe from '@/assets/globe.png'
import simulate from '@/assets/simulate.png'
import connect from '@/assets/connect.png'
import Link from "next/link"
import BoxReveal from "@/components/ui/box-reveal"
import cpdIcon from '@/assets/cpd.png'

const certificationBenefits = [
  {
    focus: "Simulations",
    icon: simulate,
    description: "Hands-on simulation experience that mirror real-world challenges, enhancing problem-solving skills"
  },
  {
    focus: "Networking",
    icon: connect,
    description: "Connect with professionals across industries, expanding your network and creating career growth opportunities"
  },
  {
    focus: "Global Reach",
    icon: globe,
    description: "Earn globally recognized credentials, giving you the flexibility to pursue career opportunities worldwide"
  },
  {
    focus: "Skill Growth",
    icon: star,
    description: "Develop advanced skills that help you excel in your field and contribute to organizational success"
  }
];

const CertificationTrainings = ({certificationCourses}) =>
{

    return(
    <div className="py-12 space-y-8">
        <div className='relative flex lg:flex-row flex-col justify-between gap-4'>            
            <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2 text-start'>
                    <BoxReveal boxColor='black' duration={0.5}>
                    <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Certification Trainings</h1>
                    <p className='leading-loose pt-4'>Step into the future of your career with certification-focused courses. Tailored training programs designed to prepare you for success in certification exams and beyond.</p>
                    </BoxReveal>
                </div>
            </div>
            
            <div className='lg:w-[50%] w-full'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 z-10'>
                {certificationBenefits.map((data, index)=>
                (
                    <BoxReveal boxColor='black' duration={0.5} key={index}>
                    <Card className='space-y-4 p-6 '>
                        <Image className='lg:h-10 h-8 w-fit' src={data.icon} alt='icon'/>
                        <h1 className='font-semibold'>{data.focus}</h1>
                        <p className='text-muted-foreground leading-loose'>{data.description}</p>
                    </Card>
                    </BoxReveal>
                ))}
                </div>
            </div> 

            
        </div>
        <BoxReveal boxColor='black' duration={0.5}>
        <h1 className='md:text-xl text-lg font-semibold relative pb-8'>Courses offered</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-[90vw]'>
        {certificationCourses.map((course)=>
        (
            <Link href={`/courses/${course.id}`} key={course._id}>
                <Card className='space-y-2 p-4'>
                    <div className='relative h-40'>
                        <Image className='rounded w-[100%] object-cover' src={course.imageURL} layout='fill' alt={course.title}/>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className='space-y-2'>
                            <h1 className='font-semibold'>{course.title}</h1>
                            <p className='bg-muted-foreground text-black text-xs py-0.5 px-2 rounded-xl w-fit'>{course.level}</p>
                            <div className="flex items-center gap-2">
                                <p className='font-semibold'>${course.offerPrice}</p>
                                <p className='line-through text-xs'>${course.price}</p>
                            </div>
                        </div>
                        {/* <Image className='lg:h-10 h-8 w-fit' src={cpdIcon} alt='CPD member icon'/> */}
                    </div>
                </Card>
            </Link>
        ))}
        </div>
        </BoxReveal>
    </div>   
    )
}

export default CertificationTrainings