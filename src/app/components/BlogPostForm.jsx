'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

 function BlogPostForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [preview, setPreview] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Parent → Subcategory Mapping
    const CATEGORY_SUBCATEGORY_MAP = {
        Technology: ['Web Development', 'AI', 'Mobile App'],
        Lifestyle: ['Fitness', 'Fashion', 'Food'],
        Travel: ['Adventure', 'Cultural', 'Solo Travel'],
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSubcategories(category ? CATEGORY_SUBCATEGORY_MAP[category] || [] : []);
    };

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        reset();
        setPreview(null);
        setSelectedCategory('');
        setSubcategories([]);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
                    {...register('content', { required: 'Content is required' })}
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
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Travel">Travel</option>
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
                    onChange={(e) => {
                        handleImageChange(e);
                        register('image').onChange(e); // Register file input
                    }}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
                Publish Post
            </button>
        </form>
    );
}

export default BlogPostForm;