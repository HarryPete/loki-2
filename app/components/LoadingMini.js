"use client";

import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import Image from "next/image";

const LoadingMini = () =>
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
    
        <div className="h-40 flex justify-center items-center">
            <AnimatedCircularProgressBar
        className='h-20 w-20'
        max={100}
        min={0}
        value={value}
        gaugePrimaryColor="var(--action-color)"
        gaugeSecondaryColor="rgba(0,0,0,0.1)"/>
        </div>
  );
}

export default LoadingMini
