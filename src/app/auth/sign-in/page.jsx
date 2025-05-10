'use client';
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import useSignInLogic from "@/app/hooks/useSignInLogic";
import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";
function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {
        onSubmit,
        isSuccess,
        isLoading,
        isError,loginAttempts} = useSignInLogic()
    const [quote, setQuote] = useState(null);

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
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
                <SignInForm
                    errors={errors}
                    isError={isError}
                    isSuccess={isSuccess}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                    register={register}
                    handleSubmit={handleSubmit}
                    text="Sign in to your Blog dashboard"
                />
                <span className="text-sm text-gray-400">
                    Have an account? <Link href="/auth/sign-up"><span className='hover:underline text-blue-600 '>Sign up</span></Link>
                </span>
                {loginAttempts >= 3 && (
                    <div className=" text-sm text-red-400">
                        <p>Are you forgot your password?</p>
                        <Link href="/auth/send-reset-password-link" className="underline text-blue-400">Forgot password?</Link>
                    </div>
                )}
            </div>
            <section className="hidden md:flex w-1/2 items-center justify-center bg-gray-800 p-12">
                <blockquote className="text-xl italic font-light text-gray-300 max-w-md">
                    {quote ? quote.quote : `“Writing is the painting of the voice.”`}
                    <br />
                    <span className="block mt-4 text-sm font-semibold text-gray-400">
                        – {quote ? quote.author : "Voltaire"}
                    </span>
                </blockquote>
            </section>
        </main>

    );
}
export default SignInPage