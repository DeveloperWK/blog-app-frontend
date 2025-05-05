'use client';

import { useForm } from 'react-hook-form';
import SubmitButton from "@/app/components/SubmitButton";


function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle sign-in logic
    };

    return (
        <main className="min-h-screen flex dark bg-gray-900 text-white">
            {/* Left Section: Sign In Form */}
            <section className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
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

                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"*/}
                        {/*>*/}
                        {/*    Sign In*/}
                        {/*</button>*/}
                        <SubmitButton btnText='Sign In' />
                    </form>
                </div>
            </section>

            {/* Right Section: Quote */}
            <section className="hidden md:flex w-1/2 items-center justify-center bg-gray-800 p-12">
                <blockquote className="text-xl italic font-light text-gray-300 max-w-md">
                    “Writing is the painting of the voice.” <br />
                    <span className="block mt-4 text-sm font-semibold text-gray-400">– Voltaire</span>
                </blockquote>
            </section>
        </main>
    );
}
export default SignInPage