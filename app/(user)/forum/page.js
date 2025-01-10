'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import ForumSearchbar from '@/app/components/ForumSearchbar'
import PopularCard from '@/app/components/PopularCard'
import Loading from '@/app/components/Loading'
import ForumPost from '@/app/components/ForumPost'
import Discussions from '@/app/components/Discussions'

const Forum = () =>
{
    const [ discussions, setDiscussions ] = useState(null);
    const [ topics, setTopics ] = useState(null)
    const [ searchQuery, setSearchQuery ] = useState({search: '', order: ''})
    const [ newDiscussion, setNewDiscussion ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() =>
    {        
        const url = '/api/forum'
        getDiscussions(url);
    },[])
    
    const getDiscussions = async (url) =>
    {
        try
        {
            const response = await axios(url)
            setDiscussions(response.data)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handleChange = (type, value) =>
    {
        if(type === "topic" && !value)
        {
            router.push(pathname)
            getDiscussions(`/api/forum`)
            setSearchQuery({...searchQuery, [type] : ''})
            return;
        }

        if(type==="topic")
        {
            const path = `topic=${value}`
            router.push(`${pathname}?${path}`)
            getDiscussions(`/api/forum?${path}`)
        }
        setSearchQuery({...searchQuery, [type] : value})
    }

    const getTopics = async () =>
    {
        const url = '/api/forum/topics';
        const response = await axios(url);
        setTopics(response.data);
    }

    return(
        <div className=''>
            {discussions ? 
            <div className='space-y-4 '> 
            
                
                {discussions.length > 0 ?
                <div className='flex items-start gap-4'>
                    <ForumPost newDiscussion={newDiscussion} setNewDiscussion={setNewDiscussion}/>
                   
                    <div className='w-[30%] space-y-4 sticky top-40'>
                        <ForumSearchbar handleChange={handleChange} searchQuery={searchQuery} getDiscussions={getDiscussions}/>
                        <PopularCard handleChange={handleChange} getTopics={getTopics} topics={topics}/>
                    </div>
                    <div className='w-[70%]'>
                        <Discussions discussions={discussions} getDiscussions={getDiscussions} getTopics={getTopics}/>
                    </div> 
                </div> :
                <div className=''>
                    No Discussions Posted
                </div>}
            </div> : 
            <Loading/>}
        </div>
    )
}

export default Forum