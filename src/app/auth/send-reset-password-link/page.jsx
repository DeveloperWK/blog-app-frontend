"use client"
import {useForm} from "react-hook-form";
import {useState} from "react";
import { GoMoveToBottom } from "react-icons/go";
const SendResetPasswordLink = ()=>{
    const {handleSubmit,register,formState:{errors}} = useForm()
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    const onSubmit = async (data)=>{
        try {
            setIsLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}auth/reset-password-link`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            if(!res.ok){
                setIsError(true);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
        }catch(err){
            setIsError(true);
            setIsLoading(false);
            throw err;
        }
        console.log("send reset password",data)
    }
    return(
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-4xl font-bold text-white mb-2">-CodeVerse-</h1>
            <section className='flex  '>
                <h2 className='text-white'>Enter Your Account Email </h2>
                <GoMoveToBottom className='text-white' size='25'/>
            </section>

            <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-200">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.email ? 'border border-red-500' : 'border border-gray-700'
                    }`}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
            {isError && (
                <p className="mt-1 text-sm text-red-400"> Failed to send Reset Link </p>
            )}
        </form>
        </main>
    )
}
export default SendResetPasswordLink