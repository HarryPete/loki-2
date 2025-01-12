
import email from '@/assets/email.png'
import linkedin from '@/assets/linkedin.png'
import instagram from '@/assets/instagram.png'
import logo from '@/assets/logo.png'
import youtube from '@/assets/youtube.png'
import Image from 'next/image'

const Footer = () =>
{

    return(
        <div className='px-[10vw] justify-center py-24 text-white md:text-sm text-xs' style={{backgroundColor: 'var(--primary-color)'}}>
            <div className='flex flex-col items-center sm:flex-row gap-2 sm:justify-between mb-6  border-b border-gray-800 pb-8'>
                <Image className='h-12 w-fit' src={logo} alt='icon'/>
                
                <div className='flex gap-2 items-center'>
                    <Image className='h-8 w-8 bg-white rounded-full p-1' src={email} alt='icon'/>
                    <p>admin@fintsacademy.com</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-4 py-8'>
                
            <div className='flex gap-4 items-center'>
                <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                    <Image className='h-8 w-8 bg-white rounded-full p-1' src={linkedin} alt='linkedin'/>
                </a>
                <a href='https://www.youtube.com/@FinTS_lokesh' target='_blank'>
                    <Image className='h-8 w-8 bg-white rounded-full p-1' src={youtube} alt='youtube'/>
                </a> 
                <a href='https://www.instagram.com/fints.aml/' target='_blank'>
                    <Image className='h-8 w-8 bg-white rounded-full p-1' src={instagram} alt='instagram'/>
                </a>   
            </div>
            <p className='text-center text-gray-400 leading-loose'>© 2024 FinCrime Compliance Education & Consultancy. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
