
import deleteIcon from '@/assets/delete.png'
import Image from 'next/image';
import { FormatTime } from '@/utility/formatTime';
import { useSession } from 'next-auth/react';

const Discussion = ({discussion, handleDelete}) =>
{
    const {data} = useSession(); 
    const { author, title, createdAt, like, keywords } = discussion

    console.log('discussion', discussion)

    return(
        <div className='space-y-2'>
            <div className=''>
                <p className='font-semibold'>{title}</p>
                {/* {data?.user?.role === 'admin' && <Image src={deleteIcon} alt='delete' onClick={()=> handleDelete(id)}/>} */}
            </div>
            <div className='flex gap-2 text-sm'>
                <p>Posted by {author?.name}</p>
                <p>•</p>
                <p>{FormatTime(createdAt)}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
            {keywords.map((key, index)=>
            (
                <p key={index} className='bg-gray-200 rounded p-1 w-fit relative text-xs'>{key}</p>
            ))}
            </div>
        </div>
    )
}

export default Discussion