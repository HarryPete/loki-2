import live from '@/assets/live.png'
import material from '@/assets/material.png'
import record from '@/assets/record.png'
import mock from '@/assets/mock_dark.png'
import discussion from '@/assets/discussion.png'
import certificate from '@/assets/certificate.png'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import BoxReveal from '@/components/ui/box-reveal'

const courseHighlightData =
[
    {
        id: 1,
        image: live,
        header: 'Live Classes',
        detail: 'Engage with live, interactive sessions led by industry experts'
    },
    {
        id: 2,
        image: material,
        header: 'Curated Study Materials',
        detail: 'Detailed notes, summaries, and cheat sheets for quick revision'
    },
    {
        id: 3,
        image: record,
        header: 'Recorded Sessions',
        detail: 'Recorded sessions for you to review anytime and from anywhere'
    },
    {
        id: 4,
        image: mock,
        header: 'Interactive Assessments',
        detail: 'Engage in quizzes and assessments to evaluate your understanding'
    },
    {
        id: 5,
        image: discussion,
        header: 'Forum',
        detail: 'Ask questions and collaborate with peers preparing for the same exams'
    },
    {
        id: 6,
        image: certificate,
        header: 'Certified Expertise',
        detail: 'Earn a recognized certification that boosts your career and credibility in the industry'
    }
]

const CourseHighlights = () =>
{

    return(
        <div className='relative py-12 flex lg:flex-row flex-col-reverse justify-between gap-4'>
        <div className='lg:w-[50%] w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {courseHighlightData.map((data, index)=>
            (
                <BoxReveal key={index} boxColor='black' duration={0.5}>
                <Card className='flex flex-col gap-2 shadow-lg p-6 rounded-xl'>
                    <Image className='lg:h-10 h-8 w-fit p-2 bg-white rounded-full' src={data.image} alt='icon'/>
                    <h1 className='font-semibold mt-4'>{data.header}</h1>
                    <p className='text-muted-foreground leading-loose'>{data.detail}</p>
                </Card>
                </BoxReveal>
            ))}
            </div>    
        </div>
        <div className='lg:w-[50%] w-full'>
        <div className='lg:sticky top-12 space-y-2 lg:text-end text-start'>
             <BoxReveal boxColor='black' duration={0.5}>
            <h1 className=' font-semibold md:text-5xl text-3xl text-green-400'>Course Highlights</h1>
            <p className='pt-4 leading-loose'>Step into the future of your career with certification-focused courses. Tailored training programs designed to prepare you for success in certification exams and beyond.</p>
            </BoxReveal>
        </div>
        </div>
    </div>
    )
}

export default CourseHighlights