'use client'

import { useEffect, useRef, useState } from 'react'
import HeroSection from './components/Herosection'
import Footer from './components/Footer'
import { Card } from "@/components/ui/card"
import { toast } from 'sonner'
import axios from 'axios'
import Founder from './components/Founder'
import { RetroGrid } from '@/components/retro-grid'
import Corporatefeedbacks from './components/CorporateFeedbcks'
import CorporateTrainings from './components/CorporateTrainings'
import Loading from './components/Loading'
import CertificationTrainings from './components/CertificationTrainings'
import CourseHighlights from './components/CourseHighlights'
import CourseWorkflow from './components/CourseWorkflow'
import UserFeedbacks from './components/UserFeedbacks'
import RequestSection from './components/RequestSection'
import { DotPattern } from '@/components/dot-pattern'
import { cn } from '@/lib/utils'
import FAQ from './components/FAQ'
import { AnimatedGridPattern } from '@/components/animated-grid-pattern'
import { GridPattern } from '@/components/magicui/grid-pattern'
import Fints360 from './components/Fints360'
import { FloatingDock } from '@/components/ui/floating-dock'
import { IconHome, IconNewSection, IconTerminal2 } from '@tabler/icons-react'
import Image from 'next/image'
import AMLCourses from './components/AMLCourses'

const links = [
  {
    title: "Trainings",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Highlights",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Workflow",
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Founder",
    icon: (
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
      />
    ),
    href: "#",
  },
  // {
  //   title: "Changelog",
  //   icon: (
  //     <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //   ),
  //   href: "#",
  // },

  // {
  //   title: "Twitter",
  //   icon: (
  //     <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //   ),
  //   href: "#",
  // },
  // {
  //   title: "GitHub",
  //   icon: (
  //     <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //   ),
  //   href: "#",
  // },
];

const Home = () =>
{
    const [ isLoading, setIsLoading ] = useState(true)
    const [ corporateCourses, setCorporateCourses ] = useState(null);
    const [ certificationCourses, setCertificationCourses ] = useState(null);
    const [ showfaq, setShowFaq ] = useState(-1)

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
        <div className='md:text-sm text-xs leading-relaxed relative'>
           
            <HeroSection scrollIntoSection={scrollIntoSection} section4={section4}/>
            
            <div className='relative'>
            <GridPattern width={30} height={30} x={-8} y={-1}strokeDasharray={"0.5 2"} className={cn("[mask-image:radial-gradient(3250px_circle_at_center,white,transparent)]")}/>
              <div className='lg:px-[10vw] space-y-8 px-[5vw] py-12 relative'>
                <Fints360/>
                {!isLoading && <CorporateTrainings corporateCourses={corporateCourses}/>}
                <Corporatefeedbacks/>
                {!isLoading && <CertificationTrainings certificationCourses={certificationCourses}/>}
                <UserFeedbacks/>
                <AMLCourses/>
                <CourseHighlights/>
                <CourseWorkflow/>
                <Founder/>  
                <FAQ showFaq={showfaq} setShowFaq={setShowFaq}/>
              </div>
              <Footer/>
            </div>
        </div>
    )
}

export default Home

