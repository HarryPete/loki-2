import { Card } from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PopularCard = ({handleChange, getTopics, topics}) =>
{
    const [ active, setActive ] = useState(null);

    useEffect(()=>
    {
        getTopics();
    },[])

    const handleClick = (e) =>
    {
        e.stopPropagation();
        handleChange('topic', '')
        setActive(null)
    }

    return(
        <Card className='text-sm p-4 space-y-4'>
            <h1 className='text-xl font-semibold' style={{color: 'var(--primary-color)'}}>Popular Topics</h1>
            {topics?.map((topic, index) =>
            (
                <div key={index} className='p-2 hover:bg-gray-200 rounded flex justify-between items-start' style={{backgroundColor: index===active ?  'var(--action-color)' : ''}} onClick={()=> {handleChange('topic', topic._id); setActive(index)}}>
                    <div className='cursor-pointer'>
                        <p className=''>{index+1 +'. ' +topic._id}</p>  
                        <p className='text-gray-400 text-sm'>Discussions : {topic.count}</p>
                    </div>    
                    {index === active && <p className='bg-white px-1 font-bold rounded-full text-xs cursor-pointer' onClick={handleClick}>x</p>}    
                </div>
            ))}            
        </Card>
    )
} 

export default PopularCard