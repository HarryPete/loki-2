"use client";

import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { useEffect, useState } from "react";
import logo from '@/assets/logo.png'
import Image from "next/image";
import { motion } from "framer-motion";

const Loading = () =>
{
    const [value, setValue] = useState(0);

    useEffect(() => 
    {
        const handleIncrement = (prev) => 
        {
            if (prev === 100)
                return 0;
            return prev + 10;
        };
    
        setValue(handleIncrement);
        const interval = setInterval(() => setValue(handleIncrement), 2000);
    
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-[100vw] bg-black h-[100vh] flex justify-center items-center">
        <motion.div className="flex items-center justify-center h-screen"   animate={{ scale: [0.75, 1.25, 0.75], opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
        <Image
        src={logo}// Replace with your logo path
        alt="Logo"
        className="w-fit h-16"
      />
    </motion.div>
    </div>
  );
}

export default Loading
