import Image from 'next/image'
import founder from '@/assets/founder.png'
import jpmorganLogo from '@/assets/jp-morgan.png'
import standardLogo from '@/assets/standard-chartered.png'
import mashreqLogo from '@/assets/mashreq.png'
import westernLogo from '@/assets/western-union.png'
import brightLogo from '@/assets/bright-money.png'
import { Card } from '@/components/ui/card'
import BoxReveal from '@/components/ui/box-reveal'
const lokeshNaikHighlights = [
    {
      title: "10+ Years of Expertise",
      description: "Setting benchmarks in financial regulation and compliance",
      icon: "expertise-icon"
    },
    {
      title: "100+ Compliance Strategies",
      description: "Shaped solutions for top-tier banks globally",
      icon: "strategy-icon"
    },
    {
      title: "15+ Countries Impacted",
      description: "Influenced global financial crime standards",
      icon: "global-icon"
    },
    {
      title: "5000+ AML Training Sessions",
      description: "Trained professionals in Anti-Money Laundering",
      icon: "training-icon"
    }
  ];
  
    

const Founder = () =>
{

    return(
        <div className='py-12 flex lg:flex-row flex-col-reverse justify-between gap-12'>
            <div className='lg:w-[50%] w-full space-y-4'>
                <div className='z-10 flex flex-col items-center gap-4'>
                        <a href='https://www.linkedin.com/in/lokesh-naik-amltrustedsource/' target='_blank'>
                            <Image className='h-fit w-48 aspect-square bg-gray-100 p-1 rounded-full object-cover object-top' src={founder} alt='Lokesh Naik'/>
                        </a> 
                        <div>
                        <p className='font-semibold'>Lokesh Naik</p>
                        <p className='font-sm text-muted-foreground text-center'>India</p>
                        </div>
                    </div>
                <div className='z-10 grid grid-cols-1 pt-4 gap-4 relative'>
                {lokeshNaikHighlights.map((highlight, index)=>
                (
                    <Card key={index} className='space-y-2 gap-2 items-center shadow-md p-4 rounded-xl'>
                        <h1 className='font-semibold'>{highlight.title}</h1>
                        <p className='text-muted-foreground leading-loose'>{highlight.description}</p>
                    </Card>
                ))}              
                </div>
                <div className='z-10 flex justify-center gap-4'>
                    <Image className='sm:h-16 sm:w-16 h-10 w-10 bg-gray-100 rounded-full' src={jpmorganLogo} alt='logo'/>
                    <Image className='sm:h-16 sm:w-16 h-10 w-10 bg-gray-100 rounded-full' src={standardLogo} alt='logo'/>
                    <Image className='sm:h-16 sm:w-16 h-10 w-10 bg-gray-100 rounded-full' src={mashreqLogo} alt='logo'/>
                    <Image className='sm:h-16 sm:w-16 h-10 w-10 bg-gray-100 rounded-full' src={westernLogo} alt='logo'/>
                    <Image className='sm:h-16 sm:w-16 h-10 w-10 bg-gray-100 rounded-full' src={brightLogo} alt='logo'/>
                </div>
            </div>

            <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2 lg:text-end text-start'>
                    <BoxReveal boxColor='black' duration={0.5}>
                    <h1 className=' font-semibold md:text-5xl text-3xl text-green-400 z-10'>Founder & Instructor </h1>
                    <p className='pt-4 leading-loose'>Learn from Lokesh Naik, a seasoned instructor with thousands of training hours. Expert-led programs designed to equip professionals with real-world skills and certification success.</p>
                    </BoxReveal>
                </div>
            </div>
        </div>
    )
}

export default Founder