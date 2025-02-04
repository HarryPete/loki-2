'use client'

import logo from '../../assets/logo.png'
import Image from 'next/image';
import successicon from '../../assets/success-icon.png'
import erroricon from '../../assets/error-icon.png'
// import { credentialLogin, googleLogin } from '@/app/action';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import GoogleAuth from '../components/GoogleAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loading from '../components/Loading';
import { signIn } from 'next-auth/react';
import { Card } from '@/components/ui/card';

export default function Page() {
    return (
      <Suspense fallback={<Loading/>}>
        <Login />
      </Suspense>
    );
}

const Login = () =>
{   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ isError, setError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('')
    const [ success, setSuccess ] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    const error = searchParams.get('error');

    useEffect(() => 
    {
        if (error) 
        {
            setError(true)
            switch (error) 
            {
                case "CredentialsSignin":
                setErrorMessage("Invalid username or password");
                break;
                case "Something went wrong!":
                setErrorMessage("Something went wrong! Please try again.");
                break;
                default:
                setErrorMessage("An unexpected error occurred");
            }
        }
    }, [error]);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSuccess(false)
        setSuccessMessage('')

        const formData = new FormData(e.currentTarget);

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

        setError(false)
        setErrorMessage('');

        signIn('credentials', 
        {
            email : formData.get('email'), 
            password: formData.get('password'),
            callbackUrl
        })
    }

    return(
        <div className='h-[100vh] flex items-center justify-center'>
            <Image className='object-cover h-[100%]' src='https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='FINTS AML' layout='fill' priority={true}/>
            
            <Card className='sm:p-8 p-4 sm:w-96 w-[85%] z-10'> 
                <div className='flex justify-center mb-10'>
                    <Image className='h-7 w-fit cursor-pointer' src={logo} alt='logo' onClick={()=> router.push('/')}/>
                </div>
                <div className='w-full flex flex-col gap-4 items-center'>
                    <form className='flex flex-col w-full gap-4 text-white'onSubmit={handleSubmit}>
                        <Input className='sm:h-12 h-10 sm:text-sm text-xs border-muted' name="email" type="text" placeholder="Email" />
                        <Input className='sm:h-12 h-10 sm:text-sm text-xs border-muted' name="password" type="text" placeholder="Password" />

                        {isError && 
                        <div className='flex gap-2 items-center sm:text-sm text-xs'>
                            <Image className='h-6 w-fit' src={erroricon} alt='error'/>
                            <p className='text-red-600'>{errorMessage}</p>
                        </div>}

                        {success && 
                       <div className='flex gap-2 items-center sm:text-sm text-xs'>
                       <Image className='h-6 w-fit' src={successicon} alt='error'/>
                       <p className='text-green-600'>{successMessage}</p>
                   </div>}
                        <Button type='submit' className='h-10'>Login</Button>
                    </form>

                    <p className='text-white'>or</p>
                    <GoogleAuth/>
                </div>
                <div className='text-center mt-4 text-muted-foreground sm:text-sm text-xs'>Don't have an account?
                    <Link href='/signup' className='pl-1 hover:text-red-500 cursor-pointer'>Signup</Link>
                </div>
                {/* <div className='text-center'>
                    <Link href='/reset-password' className='mt-2 text-sm text-blue-900 hover:underline'>Forgot password</Link>
                </div> */}
            </Card>
        </div>
    )
}