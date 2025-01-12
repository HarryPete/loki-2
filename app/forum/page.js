'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import ForumSearchbar from '@/app/components/ForumSearchbar'
import PopularCard from '@/app/components/PopularCard'
import Loading from '@/app/components/Loading'
import ForumPost from '@/app/components/ForumPost'
import Discussions from '@/app/components/Discussions'
import Link from 'next/link'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

const Forum = () =>
{
    const [ discussions, setDiscussions ] = useState(null);
    // const [ topics, setTopics ] = useState(null)
    // const [ searchQuery, setSearchQuery ] = useState({search: '', order: ''})
    const [ newDiscussion, setNewDiscussion ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const session = useSession();
    const user = session?.data?.user?.id

    useEffect(() =>
    {        
        getDiscussions();
    },[])
    
    const getDiscussions = async () =>
    {
        try
        {
            const url = `/api/forum`
            const response = await axios(url)
            setDiscussions(response.data)
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    // const handleChange = (type, value) =>
    // {
    //     if(type === "topic" && !value)
    //     {
    //         router.push(pathname)
    //         getDiscussions()
    //         setSearchQuery({...searchQuery, [type] : ''})
    //         return;
    //     }

    //     if(type==="topic")
    //     {
    //         const path = `topic=${value}`
    //         router.push(`${pathname}?${path}`)
    //         getDiscussions(`/api/forum?${path}`)
    //     }
    //     setSearchQuery({...searchQuery, [type] : value})
    // }

    // const getTopics = async () =>
    // {
    //     const url = '/api/forum/topics';
    //     const response = await axios(url);
    //     setTopics(response.data);
    // }

    return(
        <div className='space-y-4'>
            {user && <ForumPost newDiscussion={newDiscussion} setNewDiscussion={setNewDiscussion} getDiscussions={getDiscussions}/>}
                   
            {discussions ? 
            <div className='space-y-4 '>                 
                {discussions.length > 0 ?
                <div className='flex items-start gap-4'>
                    
                    {/* <div className='w-[30%] space-y-4 sticky top-40'>
                        <ForumSearchbar handleChange={handleChange} searchQuery={searchQuery} getDiscussions={getDiscussions}/>
                        <PopularCard handleChange={handleChange} getTopics={getTopics} topics={topics}/>
                    </div> */}
                    <div className='w-[100%] grid grid-cols-1 gap-2 text-sm'>
                        <Discussions discussions={discussions} getDiscussions={getDiscussions}/>
                    </div> 
                </div> :
                <div className='text-center text-gray-300 md:text-3xl text-lg font-semibold'>
                    No Discussions Posted
                </div>}
            </div> : 
            <Loading/>}
        </div>
    )
}

export default Forum