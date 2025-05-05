'use client';

import {useEffect, useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify";

 function BlogPostForm() {
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
     const fileInputRef = useRef(null);
    useEffect(() => {
        const fetchSubcategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}categories`);
            const data = await res.json();
            if (res.ok) {
                setCategories(data?.categories)
            }
        }
        fetchSubcategories();
    }, []);

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
    //todo useAuth Hook Have to implement here
    formData.append('author', );
    if (data.image instanceof File) {
        formData.append('image', data.image);
    }
    console.dir(data);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}blog-post`, {
        method: 'POST',
        body:formData
    });
    const result = await res.json();
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none"
                    placeholder="Enter your title"
                />
                {errors.title && (
                    <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
                )}
            </div>

            {/* Content */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    {...register('body', { required: 'Content is required' })}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none"
                    placeholder="Write your blog content..."
                ></textarea>
                {errors.content && (
                    <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
                )}
            </div>

            {/* Parent Category (Optional) */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="category">
                     Category
                </label>
                <select
                    id="category"
                    {...register('category',{required: 'Category is required'})}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none"
                >

                    <option value="" disabled>Select a category</option>
                    { categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Subcategory (Conditional + Optional) */}
            {subcategories.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="subcategory">
                        Subcategory
                    </label>
                    <select
                        id="subcategory"
                        {...register('subcategory')}
                        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none"
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map((subcat, idx) => (
                            <option key={idx} value={subcat}>
                                {subcat}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="image">
                    Featured Image
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none"
                />
                {errors.image && (
                    <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>
                )}

                {/* Image Preview */}
                {preview && (
                    <div className="mt-3">
                        <img src={preview} alt="Preview" className="max-h-40 rounded" />
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
                {isLoading ? 'Publishing...' : "Publish Post"}
            </button>
            {!!isError && (
                <div className="bg-red-500 text-white p-3 rounded mb-4 mt-4">
                    An error occurred while publishing your post. Please try again later.
                </div>
            )}
        </form>
    );
}

export default BlogPostForm;