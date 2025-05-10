"use client"
import {useContext, useState} from "react";
import PostContext from "@/app/context/PostContext/PostContext";


export const PostProvider = ({children}) => {
    const [postsFeed, setPostsFeed] = useState([]);

    const value = {
       postsFeed,
        setPostsFeed,
    }
    return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
export const usePostFeed = () => {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error("usePostFeed must be used within an AuthProvider");
    }
    return context;
}