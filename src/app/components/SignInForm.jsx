const SignInForm = ({
  register,
  text,
  errors,
  isSuccess,
  isError,
  isLoading,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <>
      <section className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">-CodeVerse-</h1>
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">{text}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
          {isSuccess && (
            <div className="bg-green-500 text-white p-3 rounded mb-4">
              Sign-in successful. Redirecting...
            </div>
          )}
          {isError && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              Sign-in failed. Please try again later.
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SignInForm;
