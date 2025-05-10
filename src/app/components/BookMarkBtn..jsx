"use client";
import {useEffect, useState} from "react";

const BookMarkBtn = ({postId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const createBookmark = async (postId) => {
      try {
          setIsLoading(true);
          const res = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URI}bookmark`,
              {
                  method: "POST",
                  headers: {
                      "content-type": "application/json",
                      "Authorization": "Bearer " + localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                      post: postId,
                      user: localStorage.getItem("userId"),
                  })
              }
          )
          if (!res.ok) {
              setIsError(true);
              setIsLoading(false);
              return;
          }
          setIsLoading(false);
          console.log("Bookmark created successfully");
      }catch (err) {
          setIsError(true);
          setIsLoading(false);
          throw err;
      }
    }
    return(
        <>
            <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow"
                onClick={()=>
                    createBookmark(postId)
            } // Replace with actual logic
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                    />
                </svg>
                Bookmark
            </button>
            {isError && (
                <p className="mt-1 text-sm text-red-400">
                    {" "}
                    Failed to create bookmark,Try again later
                </p>
            )}
            {isLoading && (
                <p className="mt-1 text-sm text-red-400">
                    {" "}
                </p>
            )}

        </>
    )
}
export default BookMarkBtn;