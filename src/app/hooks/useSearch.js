import {useEffect, useState} from "react";
import useDebounce from "@/app/hooks/useDebounce";
import {toast} from "react-toastify";
import {usePostFeed} from "@/app/context/PostContext/PostProvider";

const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    const {setIsHasSearched,setSearchResults} = usePostFeed()

    const handleQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }
    const search = async () => {
        try {
setIsLoading(true);
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/search-posts?q=${debouncedQuery}`,{
cache: 'no-cache',

})
            if(!res.ok){
            setIsError(true);
            setIsLoading(false);
                toast.error("No results found. Please try again later.");
            return;
            }
            const result = await res.json();
setSearchResults(result?.blogPosts)
            setIsLoading(false);
            setIsError(false);
        }catch (err){
            setIsError(true);
            setIsLoading(false);
            console.error("Error :", err);
             toast.error("No results found. Please try again later.");
        }

    }
    useEffect(()=>{
        if(debouncedQuery?.length > 0){
            search().then();
            setIsHasSearched(true);
        }
    },[debouncedQuery])
    useEffect(()=>{
        if(debouncedQuery?.length === 0){
            setIsHasSearched(false);
            setSearchResults([]);
        }
    },[debouncedQuery])
return{
    searchQuery,
    setSearchQuery,
    handleQueryChange

}
}
export default useSearch;