'use client';
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import useSignInLogic from "@/app/hooks/useSignInLogic";
import SignInForm from "@/app/components/SignInForm";
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
        isError,} = useSignInLogic()
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
            <SignInForm errors={errors} isError={isError} isSuccess={isSuccess} isLoading={isLoading} onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} text="Sign in to your Blog dashboard" />
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