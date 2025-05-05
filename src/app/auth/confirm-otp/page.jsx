"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import OTP from "@/app/components/OTP";
const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState(null);
const emailRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
useEffect(() => {
    if(!emailRef.current){
      const emailParam =  searchParams.get("email");
      console.log(emailParam);
      if(emailParam){
        setEmail(emailParam);
        emailRef.current = true;
      }
    }
},[searchParams]);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    //
    // if (!email) {
    //   toast.error("Email is required");
    //   return;
    // }
    // if (!enteredOtp) {
    //   toast.error("OTP is required");
    //   return;
    // }
    // try {
    //
    // } catch (error) {
    //   console.error("Error verifying OTP:", error);
    //   toast.error("Failed to verify OTP");
    // }
    console.log(enteredOtp);
  };

  const handleResendOTP = async () => {
    setTimer(600);
    setIsResendDisabled(true);
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      await resendOtp({ email });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    }
  };
  // useEffect(() => {
  //   if (resendSuccess) {
  //     toast.success("OTP resent successfully!");
  //   }
  // }, [resendSuccess]);
  // Countdown timer logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current); // Clear interval when timer reaches 0
          setIsResendDisabled(false); // Enable resend button
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Format timer into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP verified successfully!");
      router.push("/");
    }
  }, [isSuccess, router]);
  return (
      <OTP otp={otp} handleChange={handleChange} handleSubmit={handleSubmit} handleResendOTP={handleResendOTP}
           isResendDisabled={isResendDisabled} timer={timer} formatTime={formatTime } isError={isError} isLoading={isLoading} headingText="Verify OTP"/>

  );
};

const OtpPageWithSuspense = () => {
  return (
      <Suspense fallback={<p>Loading...</p>}>
        <OTPPage/>
      </Suspense>
  );
};

export default OtpPageWithSuspense;
