'use client';

import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthContext/AuthProvider"
function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [quote, setQuote] = useState(null);
    const router = useRouter();
    const {signIn,user} = useAuth()
    console.log("signInPage",user)
    console.log(quote)
    const onSubmit = async (data) => {
       try {
           setIsLoading(true);
           const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}auth/login`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
           })
           const result = await response.json();
           if (!response.ok) {
              setIsError(true);
               setIsSuccess(false);
               setIsLoading(false);
               return
           }
           if(result.is2FAEnabled){
               router.push(`/auth/confirm-2fa?email=${encodeURIComponent(data?.email)}`)
               return
           }
           signIn({
               token: result?.token,
               role: result?.role,
               userId: result?.userId,
           });
           router.push('/');
           setIsSuccess(true);
           setIsError(false);
           setIsLoading(false);
       }catch (err){
           setIsError(true)
           console.error("Sign-in Error :", err);
           toast.error("Failed to Sign-in. Please try again later.");
       }
    };
useEffect(() => {
    const fetchQuote = async () => {
       try {
           const res = await fetch ('https://dummyjson.com/quotes/random')
          const data =  await res.json()
           setQuote({
               quote: data.quote,
               author: data.author,
           })
       }catch (err){
           console.error("Quote Error :", err)
       }
    }
     fetchQuote()
},[])
    return (
        <main className="min-h-screen flex dark bg-gray-900 text-white">
            {/* Left Section: Sign In Form */}
            <section className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">-CodeVerse-</h1>
                        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Sign in to your blog dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
                        >
                            {isLoading ? 'Loading...' : 'Sign In'}
                        </button>
                    </form>
                    {isSuccess && (
                        <div className="bg-green-500 text-white p-3 rounded mb-4">
                            Sign-in successful. Redirecting...
                        </div>
                    )}
                    {isError && (
                        <div className="bg-red-500 text-white p-3 rounded mb-4">
                            Sign-in failed. Please try again later.
                        </div>
                    )}
                </div>
            </section>

            {/* Right Section: Quote */}
            <section className="hidden md:flex w-1/2 items-center justify-center bg-gray-800 p-12">
                <blockquote className="text-xl italic font-light text-gray-300 max-w-md">
                    {quote ?
                        quote?.quote :  `“Writing is the painting of the voice.”`
                    }<br />
                    <span className="block mt-4 text-sm font-semibold text-gray-400">– {quote ? quote?.author : "Voltaire"}</span>
                </blockquote>
            </section>
        </main>
    );
}
export default SignInPage