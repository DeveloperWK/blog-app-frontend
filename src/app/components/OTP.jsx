const OTP= ({otp,handleChange,handleSubmit,isLoading,handleResendOTP,isResendDisabled,formatTime,timer,isError,headingText,path}) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center dark:text-black underline">
                    {headingText}
                </h1>
                <p className="text-gray-600 mb-6 text-center ">
                    We have sent a 6-digit OTP to your registered email.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-4 mb-6">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !otp.length}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isLoading && <span className="loader"></span>}
                            <span>{isLoading ? "Verifying..." : "Verify OTP"}</span>
                        </div>
                    </button>
                </form>
                {path !== "/auth/confirm-2fa" && (
                <p className="text-gray-600 mt-6 text-center">
                    Didn&apos;t receive OTP?{" "}
                    <button
                        onClick={handleResendOTP}
                        disabled={isResendDisabled}
                        className={`text-blue-600 hover:underline ${
                            isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Resend {isResendDisabled && `(${formatTime(timer)})`}
                    </button>
                </p>
                )}
                {isError && <p className="text-red-500 mt-2">Failed to verify OTP</p>}
            </div>
        </div>
    );
};
export default OTP;
