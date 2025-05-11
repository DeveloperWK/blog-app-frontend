"use client";
import OTP from "@/app/components/OTP";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import useOtpLogic from "@/app/hooks/useOtpLogic";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
const Confirm2fa = () => {
  const {
    otp,
    handleChange,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    setIsSuccess,
    isSuccess,
    email,
  } = useOtpLogic();
  const router = useRouter();
  const path = usePathname();
  const { signIn } = useAuth();
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
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}auth/two-factor-auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: enteredOtp,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }
      signIn({
        token: result?.token,
        role: result?.role,
        userId: result?.userId,
      });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("2FA verified successfully!");
      router.push("/");
    }
  }, [isSuccess, router]);
  return (
    <OTP
      otp={otp}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isError={isError}
      isLoading={isLoading}
      headingText="Verify 2FA"
      path={path}
    />
  );
};
const TwoFaPageWithSuspense = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed min-h-full inset-0 bg-black text-white flex justify-center items-center z-50">
          Loading...
        </div>
      }
    >
      <Confirm2fa />
    </Suspense>
  );
};
export default TwoFaPageWithSuspense;
