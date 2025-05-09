import {useEffect, useRef, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {toast} from "react-toastify";
const useOtpLogic = ()=> {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [email, setEmail] = useState(null);
    const emailRef = useRef(false);
    const searchParams = useSearchParams();
    const path = usePathname()
    useEffect(() => {
        if (!emailRef.current) {
            const emailParam = searchParams.get("email");
            if (emailParam) {
                setEmail(emailParam);
                emailRef.current = true;
            }
        }
    }, [searchParams]);
    const intervalRef = useRef(null);

    const handleChange = (element, index) => {
        if (isNaN(Number(element.value))) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value) {
            (element.nextSibling).focus();
        }
    };


    const handleResendOTP = async () => {
        setTimer(600);
        setIsResendDisabled(true);
        if (!email) {
            toast.error("Email is required");
            return;
        }
        try {
           setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}auth/resend-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            })
            const result = await response.json();
            if(!response.ok){
                setIsError(true)
                setIsResendDisabled(false);
                setResendSuccess(false);
                setIsLoading(false);
                return
            }
            setIsLoading(false)
            setResendSuccess(true);
            setOtp(new Array(6).fill(""));
            setTimer(600);
        } catch (error) {
            setIsError(true)
            setIsResendDisabled(false);
            console.error("Error resending OTP:", error);
            toast.error("Failed to resend OTP");
        }
    };
    useEffect(() => {
        if (resendSuccess) {
            toast.success("OTP resent successfully!");
        }
    }, [resendSuccess]);
// Countdown timer logic
    useEffect(() => {
        if(path==='/auth/confirm-2fa')return
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalRef.current);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    return {
        otp,
        handleChange,
        handleResendOTP,
        isResendDisabled,
        timer,
        formatTime,
        isError,
        isLoading,
        isSuccess,
        email,
        setIsError,
        setIsLoading,
        setIsSuccess,
    }
}
export default useOtpLogic;