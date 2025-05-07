import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthContext/AuthProvider";
import {toast} from "react-toastify";

const useSignInLogic = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const {signIn} = useAuth()
    const path = usePathname()
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
            if(path==='/admin'){
                router.push("/dashboard");
            }else {
            router.push('/');
            }
            setIsSuccess(true);
            setIsError(false);
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            setIsSuccess(false)
            console.error("Sign-in Error :", err);
            toast.error("Failed to Sign-in. Please try again later.");
        }
    };
    return {
        onSubmit,
        isSuccess,
        isLoading,
        isError,
    };
}
export default useSignInLogic;