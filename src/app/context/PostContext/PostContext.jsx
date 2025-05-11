"use client";
import { createContext } from "react";
const PostContext = createContext({
  postsFeed: [],
  searchResults: [],
  isSearching: false,
  hasSearched: false,
  setSearchResults: () => {},
  setIsHasSearched: () => {},
  setPostsFeed: () => {},
});
export default PostContext;
