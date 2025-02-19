import email from '@/assets/email.png'
import linkedin from '@/assets/linkedin.png'
import instagram from '@/assets/instagram.png'
import youtube from '@/assets/youtube.png'
import fintsLogo from '@/assets/logo.png'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import RequestForm from './RequestForm'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  return (
    <div className='p-4'>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInVariant}
        className='px-[10vw] space-y-12 justify-center py-24 text-white md:text-sm text-xs rounded-xl bg-stone-800 shadow-2xl
        '
      >
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
          <motion.div variants={fadeInVariant} className='space-y-8'>
            <Image className='h-8 w-8 bg-white rounded-full p-1' src={email} alt='icon' />
            <h1 className='md:text-3xl text-xl font-bold text-white'>Contact us</h1>
            <p className='leading-loose text-muted-foreground'>
              We are always looking for ways to improve our products and services.
              Contact us and let us know how we can help you.
            </p>
            <div className='flex flex-col sm:flex-row items-center gap-6'>
              <a href='mailto:contact@yoursaas.ai' className='hover:text-blue-400 transition-colors'>
                admin@fintsacademy.com
              </a>
              <span className='hidden sm:inline'>•</span>
              <div className='flex gap-4 items-center'>
                <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                  <Image className='h-8 w-8 bg-white rounded-full p-1' src={linkedin} alt='linkedin' />
                </a>
                <a href='https://www.youtube.com/@FinTS_lokesh' target='_blank'>
                  <Image className='h-8 w-8 bg-white rounded-full p-1' src={youtube} alt='youtube' />
                </a>
                <a href='https://www.instagram.com/fints.aml/' target='_blank'>
                  <Image className='h-8 w-8 bg-white rounded-full p-1' src={instagram} alt='instagram' />
                </a>
              </div>
            </div>
          </motion.div>
          <RequestForm />
        </div>
        <motion.div variants={fadeInVariant} className='flex flex-col justify-center items-center gap-4 py-8'>
            <Image className='lg:h-16 md:h-12 h-10 w-fit object-cover' src={fintsLogo} alt='youtube' />
          <p className='text-center text-gray-400 leading-loose'>
            © 2024 FinCrime Trusted Source. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;