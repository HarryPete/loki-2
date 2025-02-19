import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import fints360Icon from '@/assets/fints360.ico';
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

export default function Fints360() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const features = [
    {
      id: 1,
      title: 'Transaction Monitoring',
      description: 'Detect suspicious activities in real time.'
    },
    {
      id: 2,
      title: 'Due Diligence',
      description: 'Assess risk and make informed decisions.'
    },
    {
      id: 3,
      title: 'Know Your Customer (KYC)',
      description: 'Verify identities with real-world scenarios.'
    },
    {
      id: 4,
      title: 'Sanctions Screening',
      description: 'Ensure compliance with global regulations.'
    }
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 gap-4 md:p-6 lg:p-8 p-4 rounded-xl bg-orange-100 text-black"
    >
      <div className="space-y-4">
        <Image src={fints360Icon} alt='Fints 360' className="md:h-12 h-10 w-fit"/>
        <div className="space-y-1 pb-6">
          <h2 className="md:text-xl text-base font-semibold">
            Experience Financial Crime Simulations Like Never Before
          </h2>
          <h2 className="leading-loose">
            A cutting-edge simulation tool that offers hands-on experience in financial crime compliance.  It provides real-world case scenarios, data analysis, and risk assessment models, enabling users to develop critical decision-making skills in AML and fraud detection.
          </h2>
        </div>
        <Link href='/courses' className="bg-orange-500 text-white p-2 rounded mt-4">Explore courses</Link>
      </div>
      
      
    </motion.div>
  );
}
