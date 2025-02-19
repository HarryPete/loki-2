import show from '@/assets/show.png'
import hide from '@/assets/drop.png'
import Image from 'next/image'
import BoxReveal from '@/components/ui/box-reveal'
import { FadeText } from '@/components/ui/fade-text'
import { Card } from '@/components/ui/card'
import { faqData } from '@/utility/faqData'

const FAQ = ({showFaq, setShowFaq}) =>
{
    return(
        <div className='relative py-12 flex lg:flex-row flex-col justify-between gap-12'>
            <div className='lg:w-[50%] w-full'>
                <div className='lg:sticky top-12 space-y-2 text-start'>
                    <h1 className='font-semibold md:text-5xl text-3xl text-green-400 z-10'>FAQs</h1>
                    <p className='leading-loose'>Find answers to common queries about our training programs, certifications, and more.
                    Explore our FAQs to get the information you need.</p>
                </div>
            </div>
            <div className='lg:w-[50%] w-full space-y-4'>
            {faqData.map((data, index)=>
            (
                <Card key={index} className={`flex flex-col gap-2 p-6 space-y-4`}>
                <div className='flex items-start justify-between gap-2'>
                    <BoxReveal boxColor='black' duration={0.5}>
                        <p className={`${showFaq === index+1 ? 'font-semibold'  : ''}`}>{data.question}</p>
                    </BoxReveal>
                    <Image className='md:h-4 h-3 md:mt-0 mt-2 w-fit cursor-pointer' src={showFaq === index+1 ? hide : show} alt='icon' onClick={()=> setShowFaq((prev)=> prev===index+1 ? 0 : index+1)}/>  
                </div>
                {showFaq === index+1 && 
                <div className='leading-loose'>
                    <FadeText direction="up" framerProps={{ show: { transition: { delay: 0.2 }}}} text={data.answer}/>
                </div>}
                </Card>
            ))}
            </div>
            
        </div>
    )
}

export default FAQ