"use client"
import BlogPostForm from "@/app/components/BlogPostForm";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import useCategoriesLogic from "@/app/hooks/useCategoriesLogic";
import {useAuth} from "@/app/context/AuthContext/AuthProvider";
import {toast} from "react-toastify";
const WritePost = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            body: '',
            category: '',
            subcategory: '',
            image: null,
        }
    });

    const [preview, setPreview] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fileInputRef = useRef(null);
    const {categories} = useCategoriesLogic()
    const {user} = useAuth()
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const onSubmit = async (data) => {

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('body', data.body);
            formData.append('category', selectedCategory);
            formData.append('author',user.userId);
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                },
                body:formData
            });
            if (!res.ok) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            setIsError(false);
            setIsLoading(false);
            reset();
            setPreview(null);
            setSelectedCategory('');
            setSubcategories([]);
            toast.success("Blog post published successfully");
        }catch (err) {
            console.error('Error:', err);
            setIsError(true);
            setIsLoading(false);

        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {

                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return(
        <main className="min-h-screen bg-gray-950 p-6">
            <BlogPostForm
                           onSubmit={handleSubmit(onSubmit)}
                           preview={preview}
                           categories={categories}
                           subcategories={subcategories}
                           selectedCategory={selectedCategory}
                           handleCategoryChange={handleCategoryChange}
                           handleImageChange={handleImageChange}
                           fileInputRef={fileInputRef}
                           isLoading={isLoading}
                           register={register}
                           errors={errors}
                           isError={isError}/>
        </main>
    )
}
export default WritePost;