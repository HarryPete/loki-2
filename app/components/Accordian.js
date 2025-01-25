import show from '@/assets/show.png'
import hide from '@/assets/drop.png'
import Image from 'next/image'
import BoxReveal from '@/components/ui/box-reveal'
import { FadeText } from '@/components/ui/fade-text'
import { Card } from '@/components/ui/card'

const Accordian = ({data, index, showFaq, setShowFaq}) =>
{
    return(
        <Card className='flex flex-col gap-2 p-6'>
            <div className='flex items-start justify-between gap-2'>
                <BoxReveal boxColor='white' duration={0.5}>
                    <p className={`${showFaq === index+1 ? 'font-semibold'  : ''}`}>{data.question}</p>
                </BoxReveal>
                <Image className='md:h-4 h-3 md:mt-0 mt-2 w-fit cursor-pointer' src={showFaq === index+1 ? show : hide} alt='icon' onClick={()=> setShowFaq((prev)=> prev===index+1 ? 0 : index+1)}/>  
            </div>
            {showFaq === index+1 && 
            <div>
                <FadeText direction="up" framerProps={{ show: { transition: { delay: 0.2 }}}} text={data.answer}/>
            </div>}
        </Card>
    )
}

export default Accordian