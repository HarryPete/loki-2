'use client'

import { useEffect, useRef, useState } from 'react'
import { faqData } from '@/utility/faqData'
import chat from '@/assets/chat.png'
import certify from '@/assets/certify.png'
import global from '@/assets/global.png'
import live from '@/assets/live.png'
import material from '@/assets/material.png'
import record from '@/assets/record.png'
import mock from '@/assets/mock_dark.png'
import discussion from '@/assets/discussion.png'
import simulation from '@/assets/simulation.png'

import profile1 from '@/assets/profile1.jpeg'
import profile2 from '@/assets/profile2.jpg'
import profile3 from '@/assets/profile1.jpeg'

import globe from '@/assets/globe.png'
import compliance from '@/assets/compliance.png'
import connect from '@/assets/connect.png'
import goal from '@/assets/goal.png'

import certificate from '@/assets/certificate.png'
import star from '@/assets/star.png'
import lulu from '@/assets/lulu.png'
import trust from '@/assets/trust.png'
import updated from '@/assets/updated.png'
import risk from '@/assets/risk.png'
import simulate from '@/assets/simulate.png'
import comment from '@/assets/comment.png'
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
import Navbar from './components/Navbar'
import { toast } from 'sonner'
import axios from 'axios'
import Link from 'next/link'
import Founder from './components/Founder'
import { Feedback } from '@/utility/feedback'
import Rating from './components/Rating'
// import { AnimatedList } from '@/components/ui/animated-list'
// import Squares from '@/Squares/Squares'

const corporateTrainingBenefits = [
  {
    icon: compliance,
    focus: "Tailored Training Programs",
    description: "Customizable training sessions designed to meet the unique needs of your organization and employees."
  },
  {
    icon: risk,
    focus: "Boost Employee Performance",
    description: "Improve employee productivity, and skills with targeted training that aligns with your company’s goals."
  },
  {
    icon: updated,
    focus: "Industry Knowledge",
    description: "Ensure your employees are equipped with the latest industry trends, regulations, and best practices."
  },
  // {
  //   icon: "🔑",
  //   focus: "Access to Expert Trainers",
  //   description: "Gain access to experienced industry professionals who can provide practical insights and real-world applications."
  // },
  // {
  //   icon: "👥",
  //   focus: "Team Collaboration & Growth",
  //   description: "Foster collaboration and growth within teams through interactive, group-focused training sessions."
  // },
  {
    icon: goal,
    focus: "Measurable Results",
    description: "Track progress and measure the impact of training with reports and feedback, ensuring ROI for your organization."
  }
];


const heroData =
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
        detail: 'Recorded sessions for you to review anytime, anywhere'
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

const certificationFlow = [
  {
    id:1,
    title: "Foundation Module",
    description: "Learn fundamental concepts and build a strong base through live classes & study materials"
  },
  {
    id:2,
    title: "Advanced Module",
    description: "Dive deeper into complex topics with detailed case studies, and regular insights."
  },
  // {
  //   id:3,
  //   title: "Real-World Cases",
  //   description: "Apply your knowledge to practical scenarios with case studies and group discussions."
  // },
  {
    id:4,
    title: "Simulations",
    description: "Gain hands-on experience by solving simulated problems with real-time feedback."
  },
  {
    id:5,
    title: "Query Resolution",
    description: "Address any questions through live sessions or 1-on-1 mentoring before the assessment."
  },
  {
    id:6,
    title: "Assessment",
    description: "Evaluate your application of skills through a comprehensive test."
  },
  {
    id:7,
    title: "Certification",
    description: "Receive a digital certificate to showcase your achievement for LinkedIn or your resume."
  }
];

const certificationBenefits = [
  {
    focus: "Simulations",
    icon: simulate, // Example icon, can be replaced with your choice
    description: "Hands-on experience through simulations that mirror real-world challenges, enhancing practical problem-solving skills."
  },
  {
    focus: "Networking",
    icon: connect, // Example icon, can be replaced with your choice
    description: "Connect with professionals across industries, expanding your network and creating career growth opportunities."
  },
  {
    focus: "Global Reach",
    icon: globe, // Example icon, can be replaced with your choice
    description: "Earn globally recognized credentials, giving you the flexibility to pursue career opportunities worldwide."
  },
  {
    focus: "Skill Growth",
    icon: star, // Example icon, can be replaced with your choice
    description: "Develop advanced skills that help you excel in your field and contribute to organizational success."
  }
];

const corporateTrainingFeedback = [
  {
    company: "Lulu Exchange",
    logo: lulu,
    country: 'UAE',
    feedback: "The training provided by Fints was exceptional. It helped our compliance team stay ahead of the latest AML and CFT regulations. Highly recommended!",
    clientName: "Ravi Kumar Kudupudi",
    position: "MLRO"
  },
  {
    company: "Trust Exchange",
    logo: trust,
    country: 'Qatar',
    feedback: "The tailored training sessions were invaluable in strengthening our team's understanding of KYC and AML protocols. It greatly improved our risk assessment processes.",
    clientName: "Aneesh Kumar",
    position: "MLRO"
  },
];



const feedbacks = [
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

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true)
    const [ corporateCourses, setCorporateCourses ] = useState(null);
    const [ certificationCourses, setCertificationCourses ] = useState(null);
    const [ poition, setPosition ] = useState(-1);

    const section1 = useRef(null);
    const section2 = useRef(null);
    const section3 = useRef(null);
    const section4 = useRef(null);
    
    const scrollIntoSection = (ref) =>
    {
      ref.current.scrollIntoView({ behaviour: 'smooth'})
    }

    useEffect(()=>
    {
      getCourses();
    },[])

    const getCourses = async () =>
    {
      try
      {
        const url = '/api/course' 
        const response = await axios.get(url);
        const corporateCourses = response.data.filter((course)=> course.isCorporateTraining);
        const certificationCourses = response.data.filter((course)=> !course.isCorporateTraining)
        setCertificationCourses(certificationCourses);
        setCorporateCourses(corporateCourses);
      }
      catch(error)
      {
        toast(error.message)
      }
      finally
      {
        setIsLoading(false)
      }
    }

    return(
        <div className='md:text-base text-sm leading-relaxed'>
           
      
            {/* <div className=' flex p-5 rounded-full fixed md:w-[60%] w-[90%] md:left-[20%] left-[5%] top-[85%] text-gray-300 md:justify-evenly justify-between lg:text-sm text-xs font-semibold z-30 border border-gray-800'>
              <p className='cursor-pointer hover:scale-105' onClick={()=> scrollIntoSection(section1)}>Trainings</p>
              <p className='cursor-pointer hover:scale-105' onClick={()=> scrollIntoSection(section2)}>Highlights</p>
              <p className='cursor-pointer hover:scale-105' onClick={()=> scrollIntoSection(section3)}>Workflow</p>
              <p className='cursor-pointer hover:scale-105' onClick={()=> scrollIntoSection(section4)}>contact us</p>
            </div> */}
            <HeroSection scrollIntoSection={scrollIntoSection} section4={section4}/>
            {/* <Squares
      speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>  */}
            <div className='lg:px-[10vw] space-y-8 px-[5vw] py-12 relative'>
            <div className=''>
             
            <h1 className='font-semibold text-2xl flex flex-wrap items-center gap-2 justify-center'>Corporate training clients <span className='bg-green-400  text-black px-2 py-1 text-sm rounded-full h-fit'>Recent</span></h1>
            
            </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {corporateTrainingFeedback.map((data, index)=>
                (
                    <Card className='flex flex-col gap-4 p-8 rounded-xl relative ' key={data.company}>
                        <div className='z-10 flex items-start gap-4'>
                          <Image className='lg:h-16 h-10 w-fit text-sm md:text-base rounded-full' src={data.logo} alt='icon'/>
                          <div className='space-y-1'>
                            <h1 className='font-semibold mt-4 z-10'>{data.company}</h1>
                            <p className='text-xs'>{data.country}</p>
                          </div>
                        </div>
                        <p className='text-sm text-muted-foreground leading-loose z-10'>{data.feedback}</p>
                        <div className='z-10 space-y-1'>
                          <h1 className='text-sm font-semibold'>{data.clientName}</h1>
                          <p className='text-sm text-muted'>{data.position}</p>
                        </div>
                    </Card>
                ))}
                </div>    
            </div>
           

            <div className='relative' ref={section1}>
              {/* <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1637946175491-53bca31c90ba?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} /> */}
              <div className='lg:px-[10vw] px-[5vw] relative py-12 flex flex-col lg:flex-row gap-4'>            
                <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2'>
                  <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Corporate Training</h1>
                  <p className='leading-loose'>Empower your team with tailored corporate training programs that enhance skills, boost productivity, and drive business success.</p>
                </div>
                </div>
                <div className='lg:w-[50%] w-full'>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-4 z-10'>
                    {corporateTrainingBenefits.map((data, index)=>
                    (
                      <Card className='space-y-4 p-6 ' key={index}>
                       <Image className='lg:h-10 h-8 w-fit text-sm md:text-base' src={data.icon} alt='icon'/>
                        <h1 className='font-semibold'>{data.focus}</h1>
                        <p className='text-muted-foreground text-sm leading-loose'>{data.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>
            </div>
            <div className='lg:px-[10vw] px-[5vw] text-2xl font-semibold relative'>Courses offered</div>
            <div className='lg:px-[10vw] px-[5vw] grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 relative py-12 gap-4'>
                {!isLoading && corporateCourses?.map((course)=>
                (
                  <Link href={`/courses/${course.id}`} key={course._id}>
                    <Card  className='space-y-2 p-4 '>
                    <div className='relative h-40'>
                      <Image className='rounded w-[100%] object-cover' src={course.imageURL} layout='fill' alt={course.title}/>
                    </div>
                    
                    <h1 className='font-semibold'>{course.title}</h1>
                    <p className='bg-muted-foreground text-black text-xs py-0.5 px-2 rounded-xl w-fit'>{course.level}</p>
                    <div className='flex items-center gap-2'>
                    <p className='font-semibold'>${course.offerPrice}</p>
                    <p className='line-through text-xs'>${course.price}</p>
                    </div>
                    </Card>
                  </Link>
                ))}
            </div>

         <div className='lg:px-[10vw] px-[5vw] relative py-12 flex lg:flex-row flex-col-reverse justify-between gap-4'>            
                
                <div className='lg:w-[50%] w-full'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 z-10'>
                    {certificationBenefits.map((data, index)=>
                    (
                      <Card className='space-y-4 p-6 ' key={index}>
                       <Image className='lg:h-10 h-8 w-fit text-sm md:text-base' src={data.icon} alt='icon'/>
                        <h1 className='font-semibold'>{data.focus}</h1>
                        <p className='text-muted-foreground text-sm leading-loose'>{data.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>  
                <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2 lg:text-end text-start'>
                  <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Certification Training</h1>
                  <p className='leading-loose'>Step into the future of your career with certification-focused courses. Tailored training programs designed to prepare you for success in certification exams and beyond.</p>
                </div>
                </div>
            </div>
            <div className='lg:px-[10vw] px-[5vw] text-2xl font-semibold relative'>Courses offered</div>
            <div className='lg:px-[10vw] px-[5vw] grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 relative py-12 gap-4'>
                {!isLoading && certificationCourses?.map((course)=>
                (
                  
                  <Link href={`/courses/${course.id}`} key={course._id}>
                    <Card className='space-y-2 p-4 '>
                    <div className='relative h-40'>
                      <Image className='rounded w-[100%] object-cover' src={course.imageURL} layout='fill' alt={course.title}/>
                    </div>
                    
                    <h1 className='font-semibold'>{course.title}</h1>
                    <p className='bg-muted-foreground text-black text-xs py-0.5 px-2 rounded-xl w-fit'>{course.level}</p>
                    <div className='flex items-center gap-2'>
                    <p className='font-semibold'>${course.offerPrice}</p>
                    <p className='line-through text-xs'>${course.price}</p>
                    </div>
                    </Card>
                  </Link>
                ))}
            </div>
            </div>
                

            <div className='lg:px-[10vw] space-y-8 px-[5vw] py-12' ref={section2}>
            <h1 className='font-semibold w-full text-center text-2xl'>Course highlights</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {heroData.map((data, index)=>
                (
                    <Card className='flex flex-col gap-2 shadow-lg p-6 rounded-xl ' key={data.id}>
                      
                        <Image className='lg:h-10 h-8 w-fit p-2 bg-white rounded-full z-10' src={data.image} alt='icon'/>
                        <h1 className='font-semibold mt-4 z-10'>{data.header}</h1>
                        <p className='text-gray-400 text-sm leading-loose z-10'>{data.detail}</p>
                    </Card>
                ))}
                </div>    
            </div>

            <div className='relative'ref={section3}>
              {/* <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1637946175491-53bca31c90ba?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} /> */}
              <div className='lg:px-[10vw] px-[5vw] relative py-12 flex flex-col lg:flex-row gap-4'>            
                <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2'>
                  <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Course Workflow</h1>
                  <p className='leading-loose'>Join, learn, apply skills, and earn your certification with a streamlined workflow.</p>
                </div>
                </div>
                <div className='lg:w-[50%] w-full'>
                <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
                  {certificationFlow.map((flow, index)=>
                  (
                    <Card key={flow.id} className='space-y-2 flex gap-6 xl:flex-row lg:flex-col flex-row p-4 '>
                        <h1 className='w-[20%] text-8xl font-semibold text-muted'>{index+1}</h1>  
                        <div className='w-[80%] space-y-2'>
                          <h1 className='text-base font-semibold'>{flow.title}</h1>
                          <p className='text-muted-foreground text-sm leading-loose'>{flow.description}</p>
                        </div>
                    </Card>
                  ))}
                </div>
                
              <Image className='border border-muted my-12 sm:w-[60%] w-[100%] left-[50%] translate-x-[-50%] h-fit relative' src={certify} alt='Template'/>
                
                </div>
                
            </div>
            
            
            <h1 className='lg:px-[10vw] px-[5vw] font-semibold text-2xl text-center z-10 relative'>Hear from our learners</h1>
         <div className='md:px-[10vw] px-[15vw] relative py-12 flex justify-between gap-4'>            
                
                <div className='w-[100%]'>
                <Carousel >
            <CarouselContent>
            {Feedback.map((feed, index) => (
            <CarouselItem key={index} className='lg:basis-1/3'>
              <Card className=''>
                <CardContent className="flex flex-col items-start gap-4 justify-center md:p-6 p-4">
                        <Image className='h-14 aspect-square w-fit' src={comment} alt='user'/>
                        <p className='text-sm leading-loose'>{feed.comment}</p>
                        <div className='space-y-1'>
                          <h1 className='font-semibold text-sm'>{feed.name}</h1>
                          <Rating value={feed.rating}/>
                        </div>
                </CardContent>
              </Card>
          </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext />
          </Carousel>
                </div>  
                
            </div>
           
            </div>

            <div className='lg:px-[10vw] space-y-4 px-[5vw] flex flex-col items-center gap-4 py-12'>
              <h1 className='font-semibold text-2xl text-center'>Founder & Instructor</h1>
              <Founder/>  
            </div>

            <div className='relative' ref={section4}>
              {/* <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1637946175491-53bca31c90ba?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} /> */}
              <div className='lg:px-[10vw] px-[5vw] relative py-12 flex lg:flex-row flex-col gap-4'>
              <div className='lg:w-[50%] w-full space-y-4'>
              <p className='font-semibold text-2xl'>Heard us enough?</p>
              <h1 className='md:text-5xl text-3xl font-semibold text-green-400'>Request a Callback </h1>
              <p className='text-gray-400 leading-loose'>Have questions or need more information about our corporate training programs or certification training? Our team is here to help. Fill out the form, and we'll get back to you as soon as possible.</p>
            </div>
            <div className='lg:w-[50%] w-full'>
              <RequestForm/>
            </div>
              </div>
            </div>          
                


          <div className='lg:px-[10vw] px-[5vw] py-12 flex flex-col gap-6 items-center'>
              <p className='font-semibold text-2xl mb-4'>FAQs</p>
              <div className='flex flex-col gap-4 lg:w-[80%] w-full  leading-loose'>
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

