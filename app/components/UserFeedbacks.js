import { motion, useInView } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "./Rating";
import { Card, CardContent } from "@/components/ui/card";
import { userFeedbackData } from "@/utility/feedback";
import comment from '@/assets/comment.png';
import Image from "next/image";
import { useRef } from "react";
import { Marquee } from "@/components/magicui/marquee";

const UserFeedbacks = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <div ref={ref} className="py-12 overflow-hidden">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-semibold md:text-2xl text-lg md:text-center text-start "
            >
                Hear from our learners
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative py-12 flex justify-between gap-4"
            >   
            <Marquee pauseOnHover className="[--duration:100s]">
     

        {userFeedbackData.map((item, idx) => (
        
              <div className="w-96 min-h-48 border p-4 flex flex-col justify-between bg-black rounded-xl" key={item.id}>
              <span className="relative z-20 text-sm leading-loose text-gray-100 font-normal">
                {item.comment}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-semibold">
                    {item.name}
                  </span>
                  <Rating value={item.rating} />
                </span>
              </div>
              </div>
        ))}
    </Marquee>
            </motion.div>
        </div>        
    );
};

export default UserFeedbacks;
