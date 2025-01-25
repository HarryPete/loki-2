'use client'

import gift from '@/assets/gift.png'
import subheading from '@/assets/subheading.png'
import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
import RequestForm from './RequestForm'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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

const HeroSection = () =>
{
    // const [ showPopup, setShowPopup ] = useState(false);

    // useEffect(()=>
    // (
    //     setTimeout(()=>
    //     (
    //       setShowPopup(true)  
    //     ),2000)
    // ),[])

    return(
        <div className='lg:px-[10vw] px-[5vw] h-[80vh] flex flex-col justify-end pb-[5vh] relative'>
            <Navbar/>
            <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply' alt='FINTS AML' layout='fill' priority={true} />

               <div className='z-10'>
                    {/* <div className='w-[50%]'>
                        
                    </div> */}
                    <div className='space-y-8 w-full'>
                        {/* <span className='border border-gray-400 text-xs font-semibold text-white p-2 rounded-xl'>For Professionals</span> */}
                        <h1 className='lg:text-3xl md:text-2xl text-xl text-yellow-400 font-semibold'>CAMS & CGSS Certification Pathway</h1>
                        <p className='text-gray-300 lg:text-base leading-relaxed md:text-sm text-xs'>Unlock your potential in anti-money laundering and sanctions compliance with expert-led learning, practical applications, and real-world case studies.</p>
                        <div className='space-y-2 space-x-2'>
                            <span className='border border-gray-400 text-xs font-semibold text-gray-300 p-1 rounded-xl'>Live classes</span>
                            {/* <span className='border border-gray-400 text-xs font-semibold text-gray-300 p-1 rounded-xl'>Real world cases</span> */}
                            <span className='border border-gray-400 text-xs font-semibold text-gray-300 p-1 rounded-xl'>Mocks</span>
                            <span className='border border-gray-400 text-xs font-semibold text-gray-300 p-1 rounded-xl'>1:1 sessions</span>
                            <p></p>
                        </div>
                        <Card className='flex items-center lg:gap-8 md:gap-4 gap-2 z-10 w-fit'>
                        {numbers.map((data)=>
                        (
                            <div className='p-4 text-center space-y-1' key={data.id}>
                                <h1 className='font-semibold md:text-xl text-base '>{data.number}</h1>
                                <h1 className='text-gray-500 text-sm'>{data.title}</h1>
                                
                            </div>
                        ))}
                        </Card>
                        {/* <Image className='md:h-16 h-12 w-fit z-10' src={subheading} alt='icon'/> */}
                        {/* <div className='bg-[rgba(0,0,0,0.5)] shadow-xl border border-gray-800 md:p-8 p-4 rounded-xl'>
                            <h1 className='md:text-base text-sm text-center text-gray-100'><span className='text-yellow-400 font-semibold'>CAMS-149</span> commences on January 17, 2025</h1>
                        </div>

                        <Dialog open={showPopup} onOpenChange={setShowPopup}>
                            <DialogTrigger asChild>
                                <Button className='w-min text-xs h-6'></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit your profile</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            </DialogContent>
                        </Dialog> */}

                    </div>
                    {/* <div className='lg:w-[30%] w-0 bg-white rounded p-6'>
                    <RequestForm/>
                    </div> */}
               </div>
                
                
            
            {/* <div className='w-[90%] flex items-center justify-between rounded-xl lg:p-12 p-6 absolute bottom-[-10vh] lg:bottom-[-15vh] bg-white shadow-md' style={{backgroundColor: 'var(--action-color)'}}>
                <div className='flex flex-col lg:gap-4 gap-2'>
                    <p className='font-bold lg:text-2xl md:text-xl text-base text-white'>All courses at 20% off</p>
                    <h1 className='lg:text-5xl font-bold text-3xl text-wrap text-center leading-loose' style={{color: 'var(--primary-color)'}}>New Year Sale</h1>
                    <Link href='/courses' className='w-fit bg-white lg:p-2 p-1 text-sm lg:text-base rounded font-bold hover:shadow-lg'>Explore</Link>
                </div>
                <Image className='lg:h-16  md:h-10 h-8 w-fit' src={gift} alt='offer' priority={true} />
            </div> */}
        </div>
    )
}

export default HeroSection