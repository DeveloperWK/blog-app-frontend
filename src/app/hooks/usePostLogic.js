import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const usePostLogic = () => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [writerPosts, setWriterPosts] = useState([]);
    const [error, setIsError] = useState(null);
    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post`,{
                cache: 'no-cache',
            })
            const result = await response.json();
            if(!response.ok){
                setIsError(true);
                setIsLoading(false);
                return
            }
            setPosts(result)
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
            toast.error("Failed to fetch posts. Please try again later.");
        }
    }
    const fetchPostsByWriter = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/writer/${localStorage.getItem('userId')}`,{
                cache: 'no-cache',
            })
            const result = await response.json();
            if(!response.ok){
                setIsError(true);
                setIsLoading(false);
                return
            }
            setWriterPosts(result?.posts)
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
            toast.error("Failed to fetch writer posts. Please try again later.");
        }
    }
    const deletePost = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            fetchPosts().then();
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
            toast.error("Failed to delete post. Please try again later.");
        }
    }
    const fetchPost = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (!response.ok) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            const result = await response.json();
            setPost(result?.post)
            setIsLoading(false);
            return result?.post
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
            toast.error("Failed to delete post. Please try again later.");
        }
    }
    const updatePost = async (id, data) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/${id}`,{
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...data
                }),
            })
            if (!response.ok) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            // fetchPosts().then();
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
            toast.error("Failed to update post. Please try again later.");
        }
    }
    const updatePostImage = async (id, data) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post/update-image/${id}`,{
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body:data,

            })
            if (!response.ok) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            setIsLoading(false);
        }catch (err){
            setIsError(true)
            setIsLoading(false)
            console.error("Error :", err);
        }
    }
    const postsCount = posts?.posts?.length
    useEffect(() => {
        fetchPosts().then()
        fetchPostsByWriter().then()
    },[])
    return {
        posts,
        loading: isLoading,
        error,
        deletePost,
        postsCount,
        writerPosts,
        fetchPost,
        post,
        updatePost,
        updatePostImage
    }
}
export default usePostLogic;