'use client'

import gift from '@/assets/gift.png'
import subheading from '@/assets/subheading.png'
import Link from 'next/link'

import transaction from '@/assets/transaction.png'
import kyc from '@/assets/kyc.png'
import standards from '@/assets/standards.png'
import sanction  from '@/assets/sanction.png'
import Navbar from './Navbar'
import Image from 'next/image'

const numbers =
[
    {
        id: 1,
        title: 'Courses',
        number: '5'
    },
    {
        id: 2,
        title: 'Learners',
        number: '1K+'
    },
    {
        id: 3,
        title: 'Countries',
        number: '25+'
    },
    {
        id: 4,
        title: 'Success',
        number: '95%'
    }
]

const HeroSection = ({scrollIntoSection, section4}) =>
{

    return(
        <div className='h-[100vh] flex flex-col justify-center items-center relative text-white'>
            <Navbar scrollIntoSection={scrollIntoSection} section4={section4}/>
            <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} />
            <div className='z-10 flex flex-col mt-[10vh] items-center justify-between gap-8 px-[5vw]'>
                <h1 className='md:text-5xl sm:text-2xl text-xl font-semibold flex flex-col md:gap-3 gap-2 items-center'>Ready to master <span className='md:text-7xl sm:text-5xl text-4xl  text-red-600 font-bold shadow-sm'>Financial Crime </span>Detection & Prevention ?</h1>
                <p className='lg:text-lg md:text-base text-sm text-center leading-loose'>Globally Recognized Certifications and Customized Training for Career and Corporate Excellence.</p>
                <div className='grid md:grid-cols-4 grid-cols-4 lg:gap-8 sm:gap-4 gap-2 bg-gradient-to-r from-black via-gray-950 to-black text-white p-6  rounded-lg shadow-lg'>
                {numbers.map((data)=>
                (
                    <div key={data.id} className='text-center space-y-1'>
                        <h1 className='font-semibold lg:text-xl text-base'>{data.number}</h1>
                        <p className='text-gray-400 sm:text-sm text-xs'>{data.title}</p>
                    </div>
                ))}     
                </div>
            </div>
        </div>
    )
}

export default HeroSection