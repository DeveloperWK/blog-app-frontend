"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ btnText }) => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {pending ? "Loading..." : `${btnText}`}
        </button>
    );
};

export default SubmitButton;