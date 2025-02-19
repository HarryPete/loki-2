import { motion, useInView } from "framer-motion";
import Image from "next/image";
import fintsamlLogo from '@/assets/fintsaml.png';
import { useRef } from "react";

const FintsAMLSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid md:grid-cols-2 grid-cols-1 gap-8 bg-yellow-100 p-8 rounded-xl"
      >
        <div className="space-y-4">
          <Image 
            src={fintsamlLogo} 
            alt="Fints 360" 
            className="h-12 w-fit aspect-square rounded-full p-2 object-cover"
            style={{
              backgroundImage:
                "radial-gradient(164.75% 100% at 50% 0, #334155 0, #0f172a 48.73%)",
            }}
          />
          <h2 className="leading-loose text-black">
            Advance Your AML Career with CAMS & CGSS. Fints AML offers top-tier courses designed to help you excel in CAMS 
            (Certified Anti-Money Laundering Specialist) and CGSS (Certified Global Sanctions Specialist) certifications.
          </h2>
        </div>
        <div className="space-y-4 ">
        <Image src={fintsamlLogo} alt='Fints 360' className="h-12 w-fit aspect-square rounded-full p-2 object-cover" style={{
            backgroundImage:
              "radial-gradient(164.75% 100% at 50% 0, #334155 0, #0f172a 48.73%)",
          }}/>
        <h2 className="leading-loose text-black">Advance Your AML Career with CAMS & CGSS. Fints AML offers top-tier courses designed to help you excel in CAMS (Certified Anti-Money Laundering Specialist) and CGSS (Certified Global Sanctions Specialist) certifications.
        </h2>
      </div>
      </motion.div>
    </div>
  );
};

export default FintsAMLSection;
