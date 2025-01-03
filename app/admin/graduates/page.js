'use client'

import Loading from "@/app/components/Loading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import logo from '../../../assets/logo.png'
import trophy from '../../../assets/trophy.png'
import Image from "next/image";
import Link from "next/link";

const Graduates = () =>
{
    const [ isLoading, setIsLoading ] = useState(true);
    const [ graduates, setGraduates ] = useState(null);   
    const divRef = useRef(null);

    useEffect(()=>
    {
      getGraduates();
    },[])

    const getGraduates = async ()=>
    {
        try
        {
            const url = '/api/graduates';
            const response = await axios.get(url);
            setGraduates(response.data)
        }
        catch(error)
        {
            toast(error.message)
        }
        finally
        {
            setIsLoading(false)
        }
    }

    if(isLoading)
        return <Loading/>

    return(
            
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {graduates.map((graduate)=>
            (
                <Link href={`/admin/graduates/${graduate.month +'-' +graduate.year}?graduationId=${graduate._id}`} className="bg-white shadow-md rounded space-y-4 p-4" key={graduate._id}>
                    <div className="relative h-48 rounded">
                        <Image src='https://cdn.pixabay.com/photo/2020/09/13/20/28/graduate-5569301_1280.png' className="w-full rounded object-cover" alt='graduate' layout="fill"/>
                    </div>
                    <p className="font-semibold">{graduate.month +' ' +graduate.year}</p>
                </Link>
            ))}
        </div>
    )
}

export default Graduates