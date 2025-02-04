import Link from 'next/link'

const TriggerDetails = ({simulation}) =>
{

    return(
        <div>
            <p>{simulation.trigger.description}</p>
            <table className='w-full mt-4 flex'>
                <thead className='w-[40%]'>
                    <tr className='flex flex-col'>
                        <th className='text-muted-foreground border text-center p-3'>Case</th>
                        <th className='text-muted-foreground border text-center p-3'>TriggerId</th>
                        <th className='text-muted-foreground border text-center p-3'>Type</th>
                        <th className='text-muted-foreground border text-center p-3'>Filter</th>
                    </tr>
                </thead>
                <tbody className='w-[60%]'>
                    <tr className='flex flex-col'>
                        <td className='border text-center p-3'>History</td>
                        <td className='border text-center p-3'>{simulation.trigger.triggerId.toUpperCase()}</td>
                        <td className='border text-center p-3'>{simulation.trigger.type}</td>                            
                        <td className='border text-center p-3'><Link href='https://fints360.vercel.app/home' legacyBehavior><a target='_blank'  className='text-blue-500 underline'>Fints360</a></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TriggerDetails