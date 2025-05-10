"use client";
import LivePasswordRuleFeedback from "@/app/components/LivePasswordRuleFeedback";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const newPassword = watch("newPassword");
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}auth/change-password`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            email: email,
          }),
        }
      );
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        reset();
        return;
      }
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      setIsError(true);
      reset();
      setIsLoading(false);
      throw err;
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md mx-auto  bg-bg rounded-lg shadow-md p-10">
        <h1 className="text-xl font-bold mb-4 text-center underline">
          Change Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-white"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1" htmlFor="newPassword">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New Password is required",
                    validate: {
                      length: (v) => v.length >= 8 || "Minimum 8 characters",
                      upper: (v) => /[A-Z]/.test(v) || "One uppercase required",
                      lower: (v) => /[a-z]/.test(v) || "One lowercase required",
                      digit: (v) => /\d/.test(v) || "One number required",
                      symbol: (v) =>
                        /[^A-Za-z0-9]/.test(v) || "One symbol required",
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full bg-gray-700 p-2 rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Live password rule feedback */}
          <LivePasswordRuleFeedback password={newPassword} />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Loading..." : "Change Password"}
          </button>
        </form>
        {isError && (
          <p className="mt-5 text-sm text-red-400">
            {" "}
            Failed to change password,Try again later
          </p>
        )}
      </div>
    </section>
  );
};

const ChangePasswordWithSuspense = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed min-h-full inset-0 bg-black text-white flex justify-center items-center z-50">
          Loading...
        </div>
      }
    >
      <ChangePassword />
    </Suspense>
  );
};
export default ChangePasswordWithSuspense;
