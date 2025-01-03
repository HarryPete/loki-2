'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import MediaPlayer from './MediaPlayer'
import Link from 'next/link'

const Lecturecard = ({course, lecture, level}) =>
{
    const [ play, setPlay ] = useState(false);
    const [ videoSrc, setVideo ] = useState(null);
    const [ showUpload,  setShowUpload ] = useState(false);

    const videojsOptions = {
        autoplay: false,
        controls: true,
        sources: [{
            src: videoSrc,
            type: 'video/mp4'
        }]
    }
    
    const handlePlay = async () =>
    {
        try
        {
            // const url = '/api/videos'
            // const response = await axios.post(url, {objectKey: 'test'});
            // setVideo(response.data);
            setPlay(true);
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    // DAY 17 Practice Questions.mp4

    return(
        <Link href={level === 'visitor' ? '' : ( level === 'user' ?`/admin/courses/${course?.id}/lecture?lectureId=${lecture._id}` : `/admin/courses/${course?.id}/lecture?lectureId=${lecture._id}`) } className='flex items-start gap-2 justify-between rounded shadow-lg p-6 z-10 bg-white relative' >
            
                <p>{lecture.title}</p>
                <span className='text-gray-400 md:text-sm text-xs'>2 hours</span>
            
           
            {/* {showUpload && 
            <div className={styles.uploadWrapper}>
                <Upload setShowUpload={setShowUpload}/>
            </div>} */}
        </Link>
    )
}

export default Lecturecard