'use client';

import { useForm } from 'react-hook-form';
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import LivePasswordRuleFeedback from "@/app/components/LivePasswordRuleFeedback";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const password = watch('password')
    const onSubmit = (data) => {
        console.log('Change password with:', data);
        // Add your password change logic here
    };

    const newPassword = watch('newPassword');

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md mx-auto  bg-bg rounded-lg shadow-md p-10">
            <h1 className="text-xl font-bold mb-4 text-center underline">Change Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-white">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        {...register('currentPassword', { required: 'Current password is required' })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
                    )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1" htmlFor='password'>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
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
                                className="w-full bg-gray-700 p-2 rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-300"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1" htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Confirm your password',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            className="w-full bg-gray-700 p-2 rounded"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Live password rule feedback */}
                <LivePasswordRuleFeedback password={password}/>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Change Password
                </button>
            </form>
        </div>
        </section>
    );
};

export default ChangePassword;
