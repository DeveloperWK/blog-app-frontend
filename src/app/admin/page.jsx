'use client';
import { useForm } from 'react-hook-form';
import useSignInLogic from "@/app/hooks/useSignInLogic";
import SignInForm from "@/app/components/SignInForm";
const AdminPageLogIn = () => {
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
        return (
            <main className="min-h-screen flex dark bg-gray-900 text-white">
            <SignInForm errors={errors} isError={isError} isSuccess={isSuccess} isLoading={isLoading} onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} text="Sign in to your Admin dashboard" />
            </main>
        );
    }

    export default AdminPageLogIn
