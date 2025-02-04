'use client'

import logo from '../../assets/logo.png'
import Image from 'next/image';
import successicon from '../../assets/success-icon.png'
import erroricon from '../../assets/error-icon.png'
// import { credentialLogin, googleLogin } from '@/app/action';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleAuth from '../components/GoogleAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const Signup = () =>
{   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ error, setError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('')
    const [ success, setSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSuccess(false)
        setSuccessMessage('')

        const formData = new FormData(e.currentTarget);

        if(!formData.get('name')) 
        {
            setError(true);
            setErrorMessage('Name is required')
            return
        } 

        if(!formData.get('email')) 
        {
            setError(true);
            setErrorMessage('Email is required')
            return
        } 

        if(!formData.get('password')) 
        {
            setError(true);
            setErrorMessage('Password is required')
            return
        } 

        if(formData.get('password').length < 6) 
        {
            setError(true);
            setErrorMessage('Password is too short')
            return
        } 

        setError(false)
        setErrorMessage('')

        try
        {
            const url = '/api/user/signup'
            const response = await axios.post(url, 
                {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                })
            if(response.data.status !== 201)
            {
                setError(true)
                setErrorMessage(response.data.message)
            }
            else
            {
                setSuccess(true)
                setSuccessMessage(response.data.message)
                setTimeout(()=>
                {
                    router.push('/login')
                },500)
            }
        }
        catch(error)
        {
            setError(true)
            setErrorMessage(error.message)
        }
    }

    return(
        <div className='h-[100vh] flex items-center justify-center'>
            <Image className='object-cover z-10 h-[100%]' src='https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true} />
                        
            <Card className='sm:p-8 p-4 sm:w-96 w-[85%] z-10'> 
                <div className='flex justify-center mb-10'>
                    <Image className='h-7 w-fit cursor-pointer' src={logo} alt='logo' onClick={()=> router.push('/')}/>
                </div>
                <div className='w-full flex flex-col gap-4 items-center'>
                    <form className='flex flex-col w-full gap-4 sm:text-sm text-xs'onSubmit={handleSubmit}>
                        <Input className='sm:h-12 h-10 border sm:text-sm text-xs border-muted ' name="name" type="text" placeholder="Name" />
                        <Input className='sm:h-12 h-10 border sm:text-sm text-xs border-muted ' name="email" type="text" placeholder="Email" />
                        <Input className='sm:h-12 h-10 border sm:text-sm text-xs border-muted ' name="password" type="text" placeholder="Password" />

                        {error && 
                        <div className='flex gap-2 items-center sm:text-sm text-xs'>
                            <Image className='h-6 w-fit' src={erroricon} alt='error'/>
                            <p className='text-red-600'>{errorMessage}</p>
                        </div>}

                        {success && 
                       <div className='flex gap-2 items-center sm:text-sm text-xs'>
                       <Image className='h-6 w-fit' src={successicon} alt='error'/>
                       <p className='text-green-600'>{successMessage}</p>
                   </div>}
                        <Button className='' type='submit'>Sign up</Button>
                    </form>

                    <p className='text-white'>or</p>
                    <GoogleAuth/>
                </div>
                <p className='text-center mt-4 sm:text-sm text-xs text-muted-foreground'>Already a user? 
                    <Link href='/login' className='pl-1 hover:text-red-500 cursor-pointer'>Login</Link></p>
           </Card>
        </div>
    )
}

export default Signup