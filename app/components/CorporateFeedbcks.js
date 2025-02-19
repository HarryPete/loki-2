import { Card } from "@/components/ui/card";
import Image from "next/image";
import lulu from '@/assets/lulu.png';
import trust from '@/assets/trust.png';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const Corporatefeedbacks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div className="py-12">
      <h1 className='font-semibold md:text-xl text-lg md:text-center text-start'>Insights from LRO's</h1>
      <div className='relative py-12 flex justify-between gap-4'>
        <div ref={ref} className='md:w-[100%] w-[90%] grid md:grid-cols-2 grid-cols-1 gap-4'>
          {corporateTrainingFeedback.map((data, index) => (
            <motion.div 
              key={data.company}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className='flex flex-col gap-4 p-8 rounded-xl relative shadow-lg'>
                <div className='z-10 flex items-start gap-4'>
                  <Image className='lg:h-16 h-10 w-fit rounded-full' src={data.logo} alt='icon'/>
                  <div className='space-y-1'>
                    <h1 className='font-semibold md:mt-2'>{data.company}</h1>
                    <p className='text-sm'>{data.country}</p>
                  </div>
                </div>
                <p className='text-muted-foreground leading-loose'>{data.feedback}</p>
                <div className='z-10 space-y-1'>
                  <h1 className='font-semibold'>{data.clientName}</h1>
                  <p className='text-muted-foreground'>{data.position}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Corporatefeedbacks;
