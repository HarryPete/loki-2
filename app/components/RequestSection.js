import BoxReveal from "@/components/ui/box-reveal"
import RequestForm from "./RequestForm"

const RequestSection = () =>
{
    return(
        <div className='flex lg:flex-row flex-col gap-4 py-12'>
            <div className='lg:w-[50%] w-full space-y-4'>
                <BoxReveal boxColor="black" duration={0.5}>
                    <h1 className='md:text-5xl text-3xl font-semibold text-green-400'>Request a Callback </h1>
                    <p className='pt-4 leading-loose'>Have questions or need more information about our corporate training programs or certification training? Our team is here to help. Fill out the form, and we'll get back to you as soon as possible.</p>
                </BoxReveal>
            </div>
            <div className='lg:w-[50%] w-full'>
                <RequestForm/>
            </div>
        </div>
    )
}

export default RequestSection