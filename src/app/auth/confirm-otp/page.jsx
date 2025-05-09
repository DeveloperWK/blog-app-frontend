"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import OTP from "@/app/components/OTP";
import useOtpLogic from "@/app/hooks/useOtpLogic";
const OTPPage = () => {
const {otp,handleChange,handleResendOTP,isResendDisabled,formatTime,timer,isError,setIsError,isLoading,setIsLoading,setIsSuccess,isSuccess,email} = useOtpLogic()
const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!enteredOtp) {
      toast.error("OTP is required");
      return;
    }
    try {
      setIsLoading(true)
const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}auth/verify`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    otp: enteredOtp,
  }),
})
      const result = await response.json();
      if(!response.ok){
          setIsError(true);
          setIsSuccess(false);
          setIsLoading(false);
          return
      }
      setIsLoading(false)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP verified successfully!");
      router.push("/auth/sign-in");
    }
  }, [isSuccess, router]);
  return (
      <OTP otp={otp} handleChange={handleChange} handleSubmit={handleSubmit} handleResendOTP={handleResendOTP}
           isResendDisabled={isResendDisabled} timer={timer} formatTime={formatTime } isError={isError} isLoading={isLoading} headingText="Verify OTP"/>

  );
};

const OtpPageWithSuspense = () => {
  return (
      <Suspense fallback={ <div className="fixed inset-0 bg-black text-white flex justify-center items-center z-50">
          Loading...
      </div>}>
        <OTPPage/>
      </Suspense>
  );
};

export default OtpPageWithSuspense;
