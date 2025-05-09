"use client"
import LivePasswordRuleFeedback from "@/app/components/LivePasswordRuleFeedback";
import {useForm} from "react-hook-form";
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";

const ResetPassField = ({token}) => {
    const {handleSubmit,watch,register,formState:{errors}} = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const password = watch('password');
    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}auth/forgot-password?token=${token}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if(!res.ok){
                setIsError(true);
                setIsSubmitting(false);
                return;
            }
            setIsError(false);
            setIsSubmitting(false);
            router.push('/auth/sign-in');
        }catch (err){
            setIsError(true);
            setIsSubmitting(false);
            throw err;
        }
    }
    return(
        <>
            <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md bg-gray-900 shadow-lg rounded-2xl px-6 py-8"
                >
                    <h1 className="text-2xl font-semibold text-center text-white mb-8">
                        Reset Password
                    </h1>

                    <section className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            New Password
                        </label>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Password is required',
                                validate: {
                                    length: (v) => v.length >= 8 || 'Minimum 8 characters',
                                    upper: (v) => /[A-Z]/.test(v) || 'One uppercase required',
                                    lower: (v) => /[a-z]/.test(v) || 'One lowercase required',
                                    digit: (v) => /\d/.test(v) || 'One number required',
                                    symbol: (v) => /[^A-Za-z0-9]/.test(v) || 'One symbol required',
                                },
                            })}
                            placeholder="Enter your password"
                            id="password"
                            className="w-full p-3 pr-10 border border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:outline-none text-sm bg-gray-800 text-white placeholder-gray-400"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                        )}

                       <section className="mb-6 pt-5 relative">
                           <LivePasswordRuleFeedback password={password} />
                       </section>
                    </section>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:bg-blue-400"
                    >
                        {isSubmitting ? 'Loading...' : 'Reset Password'}
                    </button>
                    {isError && (
                        <p className="mt-5 text-sm text-red-400"> Failed to reset password,Try again later</p>
                    )}
                </form>

            </main>


        </>

    )
}
export default ResetPassField