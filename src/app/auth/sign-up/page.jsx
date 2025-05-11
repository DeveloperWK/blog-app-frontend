"use client";
import LivePasswordRuleFeedback from "@/app/components/LivePasswordRuleFeedback";
import { techOccupations } from "@/app/data/occupations";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      occupation: "",
      bio: "",
      avatar: null,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const password = watch("password");
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("occupation", data.occupation);
      formData.append("bio", data.bio || "");
      formData.append("country", data.country || "Bangladesh");

      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      } else {
        router.push(
          `/auth/confirm-otp?email=${encodeURIComponent(data?.email)}`
        );
      }
      setPreview(null);
    } catch (err) {
      console.error("Registration error:", err);
      setSubmitError(err?.error || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold">Register</h2>
        {submitError && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {submitError}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full bg-gray-700 p-2 rounded"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full bg-gray-700 p-2 rounded"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-gray-700 p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password & Confirm */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
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
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
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
          <LivePasswordRuleFeedback password={password} />

          {/* Country & Role */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Country</label>
              <input
                type="text"
                defaultValue="Bangladesh"
                {...register("country", { required: "Country is required" })}
                className="w-full bg-gray-700 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full bg-gray-700 p-2 rounded"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="writer">Writer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label className="block mb-1">Occupation</label>
            <select
              {...register("occupation", {
                required: "Occupation is required",
              })}
              className="w-full bg-gray-700 p-2 rounded"
            >
              <option value="" disabled>
                Select Occupation
              </option>
              {techOccupations?.occupations?.map((occupation, idx) => (
                <option value={occupation} key={idx}>
                  {occupation}
                </option>
              ))}
            </select>
            {errors.occupation && (
              <p className="text-red-500 text-sm">
                {errors.occupation.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              {...register("bio")}
              rows={3}
              className="w-full bg-gray-700 p-2 rounded resize-none"
            ></textarea>
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block mb-1">Avatar</label>
            <div className="flex flex-col space-y-3">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm">{errors.avatar.message}</p>
              )}

              {/* Preview */}
              {preview && (
                <div className="flex items-center space-x-4">
                  <img
                    src={preview}
                    alt="Avatar preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setValue("avatar", null);
                      // Reset file input
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
