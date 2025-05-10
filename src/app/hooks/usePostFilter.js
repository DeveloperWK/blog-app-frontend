import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {usePostFeed} from "@/app/context/PostContext/PostProvider";

const usePostFilter = () => {
    const [filterPosts, setFilterPosts] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(initialPage);
const {setPostsFeed}=usePostFeed()
    const fetchFilterPosts = async (category, page = 1, ) => {
        try {
            // Build the query parameters
            const params = new URLSearchParams();
            if (category) params.set("category", category);
            params.set("page", page.toString());
            let url = `${process.env.NEXT_PUBLIC_SERVER_URI}blog-post?page=${page}`;
            if (category) url += `&category=${encodeURIComponent(category)}`;
            setIsLoading(true);
            const response = await fetch(url, { cache: "no-cache" });
            const result = await response.json();

            if (!response.ok) {
                setError(result.message || "Failed to fetch posts");
                setIsLoading(false);
                toast.error("Failed to fetch posts. No posts found for this category. Please try again later.");
                return;
            }

            setIsFilter(!!category);
            setPostsFeed(result || []);
            setTotalPages(result?.totalPages || 1);
            setIsLoading(false);
        } catch (err) {
            setError(err.message || "An error occurred");
            setIsLoading(false);
            console.error("Error fetching posts:", err);
            toast.error("Failed to fetch posts. Please try again later.");
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };



    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when changing category
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedCategory("");
        setCurrentPage(1);
    };
    useEffect(() => {
        fetchFilterPosts().then()
    }, []);

    // Update URL and fetch posts when parameters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set("category", selectedCategory);
        params.set("page", currentPage.toString());
        const newUrl = `?${params.toString()}`;
        router.push(newUrl);
        fetchFilterPosts(selectedCategory, currentPage).then()
    }, [selectedCategory, currentPage]);

    return {
        filterPosts,
        isFilter,
        isLoading,
        error,
        fetchFilterPosts,
        setIsFilter,
        setFilterPosts,
        selectedCategory,
        handleCategoryChange,
        currentPage,
        totalPages,
        handlePageChange,
        resetFilters
    };
};

export default usePostFilter;