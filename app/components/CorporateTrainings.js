import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import compliance from '@/assets/compliance.png'
import updated from '@/assets/updated.png'
import risk from '@/assets/risk.png'
import goal from '@/assets/goal.png'
import BoxReveal from "@/components/ui/box-reveal"
import cpdIcon from '@/assets/cpd.png'

const corporateTrainingBenefits = [
  {
    icon: compliance,
    focus: "Tailored Training Programs",
    description: "Customizable training sessions designed to meet the unique needs of your organization and employees"
  },
  {
    icon: risk,
    focus: "Boost Employee Performance",
    description: "Improve employee productivity, and skills with targeted training that aligns with your company’s goals"
  },
  {
    icon: updated,
    focus: "Industry Knowledge",
    description: "Ensure your employees are equipped with the latest industry trends, regulations, and best practices"
  },
  // {
  //   icon: "🔑",
  //   focus: "Access to Expert Trainers",
  //   description: "Gain access to experienced industry professionals who can provide practical insights and real-world applications"
  // },
  // {
  //   icon: "👥",
  //   focus: "Team Collaboration & Growth",
  //   description: "Foster collaboration and growth within teams through interactive, group-focused training sessions"
  // },
  {
    icon: goal,
    focus: "Measurable Results",
    description: "Track progress and measure the impact of training with inputs and feedback, ensuring ROI for your organization"
  }
];

const CorporateTrainings = ({corporateCourses}) =>
{
    return(
    <div className="py-12 space-y-6">
        <div className='flex flex-col-reverse lg:flex-row gap-4'>            
            <div className='lg:w-[50%] w-full'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 z-10'>
                {corporateTrainingBenefits.map((data, index)=>
                (
                    <BoxReveal boxColor="black" duration={0.5} key={index}>
                    <Card className='space-y-4 p-6 ' key={index}>
                        <Image className='lg:h-10 h-8 w-fit' src={data.icon} alt='icon'/>
                        <h1 className='font-semibold'>{data.focus}</h1>
                        <p className='text-muted-foreground leading-loose'>{data.description}</p>
                    </Card>
                    </BoxReveal>
                ))}
                </div>
            </div>
            <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2 lg:text-end text-start'>
                    <BoxReveal boxColor="black" duration={0.5}>
                        <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Corporate Trainings</h1>
                        <p className='leading-loose pt-4'>Empower your team with tailored corporate training programs that enhance skills, boost productivity, and drive business success.</p>
                    </BoxReveal>
                </div>
            </div>
        </div>

        <BoxReveal boxColor='black' duration={0.5}>
        <h1 className='md:text-xl text-lg font-semibold relative pb-4'>Courses offered</h1>
        <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-[80vw] w-[90vw] relative gap-4'>
            {corporateCourses.map((course)=>
            (
                <Link href={`/courses/${course.id}`} key={course._id}>
                <Card  className='space-y-4 p-4 '>
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
                    
                        <Image className='lg:h-10 h-8 w-fit' src={cpdIcon} alt='CPD member icon'/>
                    </div>
                </Card>
                </Link>
            ))}
        </div>
        </BoxReveal>


    </div>
    )
}

export default CorporateTrainings