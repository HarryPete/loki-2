'use client'

import { useEffect, useState } from 'react'
import { faqData } from '@/utility/faqData'
import chat from '@/assets/chat.png'
import defaultDP from '@/assets/defaultDP.png'
import linkedin from '@/assets/linkedinn.png'
import live from '@/assets/live.png'
import material from '@/assets/material.png'
import record from '@/assets/record.png'
import mock from '@/assets/mock.png'
import discussion from '@/assets/discussion.png'
import placement from '@/assets/placement.png'

import profile1 from '@/assets/profile1.jpeg'
import profile2 from '@/assets/profile2.jpg'
import profile3 from '@/assets/profile1.jpeg'

import globe from '@/assets/globe.png'
import compliance from '@/assets/compliance.png'
import career from '@/assets/career.png'
import goal from '@/assets/goal.png'

import organisation from '@/assets/organisation.png'
import prevention from '@/assets/prevention.png'
import risk from '@/assets/risk.png'
import updated from '@/assets/updated.png'
import success from '@/assets/success.png'

import Image from 'next/image'
import HeroSection from './components/Herosection'
import Accordian from './components/Accordian'
import Footer from './components/Footer'
import Query from './components/Query'
import Marquee from '@/components/ui/marquee'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import RequestForm from './components/RequestForm'
import axios from 'axios'
import { toast } from 'sonner'
import Rating from './components/Rating'
import Link from 'next/link'
import Founder from './components/Founder'
import { Skeleton } from '@/components/ui/skeleton'
import { FormatDate } from '@/utility/FormatDate'

const heroData =
[
    {
        id: 1,
        image: live,
        header: 'Live Classes',
        detail: 'Engage with live, interactive sessions led by industry experts.'
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
        detail: 'Recorded sessions for you to review anytime, anywhere.'
    },
    {
        id: 4,
        image: mock,
        header: 'Mock Tests',
        detail: 'Test your knowledge with our carefully designed mock exams..'
    },
    {
        id: 5,
        image: discussion,
        header: 'Forum',
        detail: 'Ask questions and collaborate with peers preparing for the same exams'
    },
    {
        id: 6,
        image: placement,
        header: 'Referrals',
        detail: 'Benefit from job referrals and career guidance through our strong alumni network'
    }
]

const roadmap = [
  {
    weeks: "1–2",
    focus: "Build the Foundation",
    description:
      "Understand the basics of compliance, AML, and sanctions frameworks. Study key principles, terminologies, and regulatory bodies like FATF, OFAC, and EU laws.",
  },
  {
    weeks: "3–4",
    focus: "Deep Dive into Regulations and Risks",
    description:
      "Explore AML laws, sanctions compliance programs, risk assessment strategies, money laundering typologies, and sanctions evasion tactics through detailed study.",
  },
  {
    weeks: "5–6",
    focus: "Practical Application and Testing",
    description:
      "Engage in case studies, quizzes, and scenarios to apply knowledge. Practice compliance measures, risk mitigation strategies, and take initial mock tests.",
  },
  {
    weeks: "7-9",
    focus: "Initial Mock Tests and Analysis",
    description:
      "Take one full-length mock test per week for both CAMS and CGSS. Analyze performance, identify weak areas, and revise key topics to build confidence.",
  },
  {
    weeks: "10–11",
    focus: "Advanced Mock Tests and Refinement",
    description:
      "Take two full-length mock tests per week for each certification. Focus on high-weightage topics, refine time management, and ensure consistent performance.",
  },
];



const numbers =
[
    {
        id: 1,
        title: 'Courses',
        number: '2'
    },
    {
        id: 2,
        title: 'Batches',
        number: '150+'
    },
    {
        id: 3,
        title: 'Success Stories',
        number: '1000+'
    },
]

const feeds = [
    {
      name: "John Doe",
      image: profile1,
      feedback: "The training program was well-structured. The mock tests and curated materials made exam preparation much easier. The instructors were knowledgeable and provided excellent support throughout. Highly recommended for CAMS and CGSS aspirants!",
    },
    {
      name: "Jane Smith",
      image: profile2,
      feedback: "I found the live sessions and interactive discussions extremely helpful. The real-world examples and case studies made the concepts easy to understand. The forum and chat support were great for clarifying doubts quickly. This program is a complete package!",
    },
    {
      name: "Sam Wilson",
      image: profile3,
      feedback: "The flexibility of accessing recordings and curated materials at my own pace was a game-changer. The detailed curriculum covered every topic needed for the certifications. The mock tests helped me identify areas for improvement. Overall, a fantastic learning experience!",
    },
    {
      name: "John Doe",
      image: profile1,
      feedback: "The training program was well-structured. The mock tests and curated materials made exam preparation much easier. The instructors were knowledgeable and provided excellent support throughout. Highly recommended for CAMS and CGSS aspirants!",
    },
    {
      name: "Jane Smith",
      image: profile2,
      feedback: "I found the live sessions and interactive discussions extremely helpful. The real-world examples and case studies made the concepts easy to understand. The forum and chat support were great for clarifying doubts quickly. This program is a complete package!",
    },
    {
      name: "Sam Wilson",
      image: profile3,
      feedback: "The flexibility of accessing recordings and curated materials at my own pace was a game-changer. The detailed curriculum covered every topic needed for the certifications. The mock tests helped me identify areas for improvement. Overall, a fantastic learning experience!",
    },
    {
      name: "John Doe",
      image: profile1,
      feedback: "The training program was well-structured. The mock tests and curated materials made exam preparation much easier. The instructors were knowledgeable and provided excellent support throughout. Highly recommended for CAMS and CGSS aspirants!",
    },
    {
      name: "Jane Smith",
      image: profile2,
      feedback: "I found the live sessions and interactive discussions extremely helpful. The real-world examples and case studies made the concepts easy to understand. The forum and chat support were great for clarifying doubts quickly. This program is a complete package!",
    },
    {
      name: "Sam Wilson",
      image: profile3,
      feedback: "The flexibility of accessing recordings and curated materials at my own pace was a game-changer. The detailed curriculum covered every topic needed for the certifications. The mock tests helped me identify areas for improvement. Overall, a fantastic learning experience!",
    },
  ];

  const whyCamsAndCgss = [
    {
      id: 1,
      icon: compliance, // Replace with actual icons or paths to images
      header: "Regulatory Compliance",
      description: "Increasing regulatory scrutiny demands professionals skilled in AML and sanctions compliance.",
    },
    {
      id: 2,
      icon: career,
      header: "Career Opportunities",
      description: "Certifications open high-paying career opportunities in compliance and risk management.",
    },
    {
      id: 3,
      icon: prevention,
      header: "Financial Crime Prevention",
      description: "They provide tools to identify and prevent financial crimes like money laundering and fraud.",
    },
    {
      id: 4,
      icon: updated,
      header: "Stay Updated",
      description: "Keep professionals updated with evolving financial crime techniques and sanctions frameworks.",
    },
    {
      id: 5,
      icon: globe,
      header: "Global Recognition",
      description: "CAMS and CGSS are globally recognized, enhancing professional credibility.",
    },
    // {
    //   id: 6,
    //   icon: organisation,
    //   header: "Organizational Compliance",
    //   description: "Help organizations avoid fines, sanctions, and reputational damage by ensuring compliance.",
    // },
    // {
    //   id: 7,
    //   icon: risk,
    //   header: "Risk Mitigation",
    //   description: "Build expertise in assessing and mitigating financial and sanctions-related risks.",
    // },
    {
      id: 8,
      icon: goal,
      header: "Professional Commitment",
      description: "Demonstrate commitment to compliance and readiness for specialized challenges.",
    },
  ];
  

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);
    const [ displayData, setDisplayData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(()=>
    {
      getDisplayData();
    },[])

    const getDisplayData = async () =>
    {
      try
      {
        const url = '/api/display'
        const response =await axios.get(url);
        setDisplayData(response.data[0])
      }
      catch(error)
      {
        toast(error.message)
      }
      finally
      {
        setIsLoading(false);
      }
    }

    return(
        <div className='md:text-sm text-xs md:leading-7 leading-5'>
            <HeroSection />
            <div className='space-y-6 text-center items-center py-12'>
            <h1 className='font-semibold text-center text-2xl'>CAMS Graduates, December 2024</h1>
                <Marquee className="justify-center overflow-hidden [--duration:60s] [--gap:2rem] w-[100%]">
                {isLoading ? 
                [1,2,3,4,5,6,7,8].map((_, index)=>
                  (
                      <div className='transition-all flex flex-col items-center p-2 rounded' key={index}>
                          <Skeleton className='lg:p-24 md:p-16 p-8 bg-gray-200 shadow-md rounded-full mb-2'/>
                          <Skeleton className='p-2 rounded-xl bg-gray-200 mt-2 shadow-md mb-3 w-36'/>
                          <Skeleton className='p-1.5 rounded-xl shadow-md w-20 bg-gray-200'/>
                      </div>
                  ))
                :  
                displayData?.recentGraduates?.map((user, index)=>
                (
                    <div className='transition-all flex flex-col items-center p-2 rounded' key={index}>
                        <Link className='relative' href={user?.linkedIn ?? ''}>
                          <Image className='lg:h-48 md:h-36 h-24 w-fit aspect-square object-cover rounded-full object-top' src={user?.imageURL ? user?.imageURL : defaultDP} width={100}  height={100} alt={user?.name}/>
                          <Image className='lg:h-10 md:h-8 h-6  w-fit absolute bottom-0 right-2' src={linkedin} alt={user?.name}/>
                        </Link>
                        <h1 className='text-base font-semibold mt-2'>{user?.name}</h1>
                        <p className='lg:text-sm text-xxs text-gray-400'>{user?.country}</p>
                    </div>
                ))}
                </Marquee>
                {/* <div className='space-y-2'>
                  <h1 className='lg:px-[10vw] px-[5vw] text-2xl  leading-snug font-semibold text-orange-700'>Join Our Growing Network of Successful Graduates</h1>
                  <p className='lg:px-[10vw] px-[5vw] text-gray-400'>Explore the achievements of our recent graduates and see how our program is shaping the future of AML and compliance professionals.</p>
                </div> */}

                <div className='sm:px-[10vw] px-[15vw] py-12'>
            <h1 className='font-semibold w-full flex items-center justify-center gap-2 text-2xl mb-8'>Job Openings <span className='bg-yellow-400 px-1 p-2 rounded-full text-xs'>New</span></h1>
            {isLoading ?
            <div className='grid md:grid-cols-2 grid-cols-1 w-full rounded gap-5'>
            {[1,2].map((_,index)=>(
              <div className='space-y-6 shadow-md p-8 rounded bg-white' key={index}>
                  <div className='flex justify-between w-full'>
                    <Skeleton className='w-[40%] p-2 shadow-md bg-gray-200 rounded'/>
                    <Skeleton className='w-[30%] p-2 shadow-md bg-gray-200 rounded'/>
                  </div>
                  <div className='space-y-3'>
                    <Skeleton className='p-1.5 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-1.5 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-1.5 rounded-xl bg-gray-200'/>
                  </div>
                  <Skeleton className='p-0.5 rounded-xl bg-gray-200'/>
                  <div className='space-y-3'>
                    <div className='flex gap-2'>
                      <Skeleton className='p-3 w-12 rounded bg-gray-200'/>
                      <Skeleton className='p-3 w-12 rounded bg-gray-200'/>  
                    </div>
                    <Skeleton className='p-1.5 rounded bg-gray-200 w-56'/>
                  </div>
              </div>
            ))}
            </div> :
            <Carousel >
            <CarouselContent>
            
            {displayData?.recentJobs?.map((job, index) => (
            <CarouselItem key={job._id} className='lg:basis-1/2 p-2 space-y-1'>
              <>
                <CardContent className="p-6 bg-white rounded shadow-md text-start">
                   <div className="flex lg:flex-row flex-col font-semibold lg:items-center items-start pb-4 justify-between">
                      <span className='text-start'>{job.title}</span>
                      <span className="text-muted-foreground">{job.company}</span>
                    </div>
                    
                  <div >
                    <p><span>Experience : </span>{job.experience} years</p>
                    <p><span>Location : </span>{job.city +', ' +job.country}</p>
                    <p className="pb-4"><span>Openings : </span>{job.openings}</p>
                  </div>
                                      {/* <p className="border-t py-4">{job.description}</p> */}
                  <footer className="flex flex-col gap-4 text-xs w-full border-t pt-6">
                    <div className="space-x-2">
                      <span className="bg-yellow-400 p-1 rounded">{job.jobType}</span>
                      <span className="bg-yellow-400 p-1 rounded">{job.workplaceType}</span>
                  </div>
                  <p className="text-muted-foreground">Posted on {FormatDate(job.createdAt)}</p>
                  </footer>     
                </CardContent>
              </>
          </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext />
          </Carousel>}
          </div>
            </div>
            

            <div className='lg:px-[10vw] px-[5vw] space-y-12 text-white relative py-12 flex flex-col gap-4' style={{backgroundColor: 'var(--primary-color)'}}>            
                <h1 className='font-semibold text-center text-2xl'>Why CAMS & CGSS ?</h1>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    {whyCamsAndCgss.map((data, index)=>
                    (
                      <div className='space-y-2 p-8 rounded-xl shadow-2xl' key={data.id}  style={{backgroundColor: 'var(--primary-bg)'}}>
                       <Image className='lg:h-12 h-10 w-fit text-sm md:text-base' src={data.icon} alt='icon'/>
                        <h1 className='font-semibold'>{data.header}</h1>
                        <p className='text-gray-400'>{data.description}</p>
                      </div>
                    ))}
                  </div>
            </div>

            <div className='lg:px-[10vw] space-y-16 px-[5vw] bg-white py-12'>
            <h1 className='font-semibold w-full text-center text-2xl mb-8'>Course benefits</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {heroData.map((data, index)=>
                (
                    <div className='flex flex-col gap-2' key={data.id}>
                        <Image className='lg:h-12 h-10 w-fit text-sm md:text-base' src={data.image} alt='icon'/>
                        <h1 className='md:text-base text-sm font-semibold mt-4'>{data.header}</h1>
                        <p className='text-gray-400'>{data.detail}</p>
                    </div>
                ))}
                </div>    
            </div>

            <div className='lg:px-[10vw] px-[5vw] space-y-12 text-white relative py-12 flex flex-col gap-4' style={{backgroundColor: 'var(--primary-color)'}}>            
                <div className='flex lg:flex-row flex-col lg:items-start items-center gap-8'>
                  <div className='lg:w-[50%] space-y-4 lg:sticky top-[5%]'>
                    <p className='font-semibold text-2xl lg:text-start text-center'>Course timeline</p>
                    <p className='text-gray-400'>Master the essentials, refine your skills, and excel with a structured 11-week roadmap for certification excellence.</p>
                    <Image className='md:h-20 h-16 w-fit' src={success} alt='icon'/>
                  </div>
                  <div className='lg:w-[50%] space-y-4'>
                    {roadmap.map((data, index)=>
                    (
                      <div className='space-y-2 p-8 rounded-xl shadow-2xl' key={index}style={{backgroundColor: 'var(--primary-bg)'}}>
                       {/* <Image className='lg:h-12 h-10 w-fit text-sm md:text-base' src={data.icon} alt='icon'/> */}
                        <h1 className='font-semibold bg-white text-black px-2 rounded w-fit'>Week {data.weeks}</h1>
                        <p className='font-semibold'>{data.focus}</p>
                        <p className='text-gray-400'>{data.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div className='lg:px-[10vw] px-[5vw] space-y-6 py-12 flex flex-col gap-4'>
              
              <h1 className='font-semibold w-full text-center text-2xl'>Founder & Instructor</h1>
              <div className='flex justify-center'>
              <Founder/>
              </div>
            </div>

            <div className='sm:px-[10vw] px-[5vw] py-12 flex lg:flex-row flex-col gap-8 text-white' style={{backgroundColor: 'var(--primary-color)'}}>
            <div className='lg:w-[50%] w-full space-y-4'>
              <h1 className='lg:text-4xl md:text-2xl text-xl  leading-snug font-semibold'>Request a Callback</h1>
              <p className='text-gray-400'>Get personalized assistance, clear your doubts, and take the first step toward achieving your CAMS & CGSS certifications with expert guidance.</p>
            </div>
            <div className='lg:w-[50%] w-full'>
              <RequestForm/>
            </div>
          </div>
            

            <div className='sm:px-[10vw] px-[15vw] py-12'>
            <h1 className='font-semibold w-full text-center text-2xl mb-8'>Testimonials</h1>
            {isLoading ?
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full rounded gap-5'>
            {[1,2,3].map((_,index)=>(
              <div className='space-y-6 shadow-md p-6 rounded h-84 bg-white' key={index}>
                  <Skeleton className='h-16 w-16 shadow-md bg-gray-100 rounded-full'/>
                  <div className='space-y-3'>
                    <Skeleton className='p-2 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-2 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-2 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-2 rounded-xl bg-gray-200'/>
                    <Skeleton className='p-2 rounded-xl bg-gray-200 w-[50%]'/>
                  </div>
                  <div className='space-y-3'>
                  <Skeleton className='p-2 rounded-xl bg-gray-200 w-56'/>
                  <Skeleton className='p-2 rounded-xl bg-gray-200 w-40'/>
                  </div>
              </div>
            ))}
            </div> :
            <Carousel >
            <CarouselContent>
            
            {displayData?.feedbacks?.map((feed, index) => (
            <CarouselItem key={index} className='lg:basis-1/3'>
              <>
                <CardContent className="flex flex-col items-start gap-4 justify-center md:p-6 p-4 bg-white rounded shadow-md">
                        <Link className='relative' href={feed.user?.linkedIn ?? ''}>
                          <Image className='h-20 text-sm md:text-base aspect-square w-fit object-cover rounded-full' src={feed.user?.imageURL ? feed.user?.imageURL : defaultDP} width={100} height={100} alt='user'/>
                          <Image className='h-8 w-fit absolute bottom-0 right-0' src={linkedin} alt={feed.user.name}/>
                        </Link>
                        
                        <p className=''>{feed.comment}</p>
                        <div className='space-y-1'>
                        <h1 className='font-semibold'>{feed.user.name}</h1>
                        <Rating value={feed.rating}/>
                        </div>
                </CardContent>
              </>
          </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext />
          </Carousel>}
          </div>

          

          <div className='lg:px-[10vw] px-[5vw] py-12 flex flex-col gap-6 items-center' >
              <p className='font-semibold text-2xl mb-4'>FAQs</p>
              <div className='flex flex-col gap-8 w-full'>
              {faqData.map((data, index)=>
              (
                <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
              ))}
              </div>
          </div>

          
          <Footer/>
        </div>
    )
}

export default Home

