"use client";
import useCategoriesLogic from "@/app/hooks/useCategoriesLogic";
import usePostLogic from "@/app/hooks/usePostLogic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const EditPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const { fetchPost, updatePost, updatePostImage } = usePostLogic();
  const { id } = params;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
  });

  // Original data to track changes
  const [originalData, setOriginalData] = useState({
    title: "",
    body: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);
  const { categories } = useCategoriesLogic();

  // Fetch post data and populate form
  useEffect(() => {
    const getPostData = async () => {
      try {
        setIsLoading(true);
        const postData = await fetchPost(id);

        // Save original data for comparison
        const originalValues = {
          title: postData.title || "",
          body: postData.body || "",
          category: postData.category || "",
        };

        // Set both current and original data
        setFormData(originalValues);
        setOriginalData(originalValues);

        // Set preview and original image if exists
        if (postData.image) {
          setPreview(postData.image);
          setOriginalImageUrl(postData.image);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setIsError(true);
        setErrorMessage("Failed to load post data");
        setIsLoading(false);
      }
    };

    if (id) {
      getPostData().then();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if text content has changed
  const hasTextContentChanged = () => {
    return (
      formData.title !== originalData.title ||
      formData.body !== originalData.body ||
      formData.category !== originalData.category
    );
  };

  // Check if image has changed
  const hasImageChanged = () => {
    return image !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setIsError(false);

      const textChanged = hasTextContentChanged();
      const imageChanged = hasImageChanged();

      if (!textChanged && !imageChanged) {
        toast.info("No changes detected");
        setIsSubmitting(false);
        return;
      }

      // Track success of operations
      let success = true;

      // Update image if changed
      if (imageChanged) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        try {
          await updatePostImage(id, imageFormData);
          toast.success("Image updated successfully");
        } catch (error) {
          success = false;
          console.error("Error updating image:", error);
          toast.error("Failed to update image");
        }
      }

      // Update text content if changed
      if (textChanged) {
        try {
          await updatePost(id, formData);
          toast.success("Post content updated successfully");
        } catch (error) {
          success = false;
          console.error("Error updating post content:", error);
          toast.error("Failed to update post content");
        }
      }

      setIsSubmitting(false);

      if (success) {
        router.push(`/`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setIsError(true);
      setErrorMessage("Failed to update post. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setPreview(originalImageUrl);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading post data...</div>;
  }

  return (
<main className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
  <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

  {isError && (
    <div className="bg-red-500/10 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
      {errorMessage}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="body" className="block text-sm font-medium text-gray-300 mb-1">
        Content
      </label>
      <textarea
        id="body"
        name="body"
        value={formData.body}
        onChange={handleInputChange}
        required
        rows={10}
        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Image</label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
        >
          Choose File
        </button>

        {image && (
          <button
            type="button"
            onClick={handleCancelImage}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Cancel Image Change
          </button>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-auto object-cover border border-gray-700 rounded"
          />
        </div>
      )}
    </div>

    <div className="flex items-center space-x-4">
      <button
        type="submit"
        disabled={
          isSubmitting || (!hasTextContentChanged() && !hasImageChanged())
        }
        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
          isSubmitting || (!hasTextContentChanged() && !hasImageChanged())
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isSubmitting ? "Updating..." : "Update Post"}
      </button>

      <button
        type="button"
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        Cancel
      </button>
    </div>
  </form>
</main>

  );
};

export default EditPostPage;
