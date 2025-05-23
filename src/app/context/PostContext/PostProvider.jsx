"use client";
import PostContext from "@/app/context/PostContext/PostContext";
import { useContext, useState } from "react";

export const PostProvider = ({ children }) => {
  const [postsFeed, setPostsFeed] = useState([]);
  const [hasSearched, setIsHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const value = {
    postsFeed,
    setPostsFeed,
    hasSearched,
    setIsHasSearched,
    searchResults,
    setSearchResults,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
export const usePostFeed = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostFeed must be used within an AuthProvider");
  }
  return context;
};
