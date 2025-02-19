import { motion } from "framer-motion";
import fintsamlLogo from '@/assets/fintsaml.png'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AMLCourses = () =>
{
    return(
        <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="grid lg:grid-cols-2 grid-cols-1 gap-8 p-8 rounded-xl bg-yellow-400 text-black">

      <div className="space-y-4 ">
        
          <h2 className="font-semibold md:text-xl text-lg">Advance Your AML Career with CAMS & CGSS</h2>
            <h2 className="leading-loose pb-8">Fints AML offers top-tier courses designed to help you excel in CAMS (Certified Anti-Money Laundering Specialist) and CGSS (Certified Global Sanctions Specialist) certifications.
        </h2>
        <Link href='https://www.fintsaml.com' className="p-2 bg-neutral-50 rounded-lg hover:bg-neutral-100">Explore offerings</Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Image className='rounded-full object-cover md:h-40 md:w-40 p-4 h-20 w-20'  style={{
            backgroundImage:
              "radial-gradient(164.75% 100% at 50% 0, #334155 0, #0f172a 48.73%)",
          }} src='https://res.cloudinary.com/dzuaagm1a/image/upload/v1739445196/hvsjbetlcmyalyzy2kfa.png' alt='CAMS' height={100} width={100}/>
        
        <Image className='rounded-full object-contain md:p-10 md:h-40 md:w-40 p-4 h-20 w-20'  style={{
            backgroundImage:
              "radial-gradient(164.75% 100% at 50% 0, #334155 0, #0f172a 48.73%)",
          }} src={fintsamlLogo} alt='Fints AML' height={100} width={100}/>
        
        <Image className='rounded-full object-cover md:h-40 md:w-40 p-4 h-20 w-20'  style={{
            backgroundImage:
              "radial-gradient(164.75% 100% at 50% 0, #334155 0, #0f172a 48.73%)",
          }} src='https://res.cloudinary.com/dzuaagm1a/image/upload/v1739445204/rlgb5myrdrahzqbeucqb.png' alt='CGSS' height={100} width={100}/>
      </div>
      
    </motion.div>
    )
}

export default AMLCourses