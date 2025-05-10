import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCategoriesLogic = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useAuth();
  const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}categories`, {
      cache: "no-cache",
    });
    const data = await res.json();
    if (res.ok) {
      setCategories(data?.categories);
    }
  };
  const categoriesCount = categories?.length;
  const createNewCategory = async (data) => {
    try {
      setIsLoading(true);
      if (data?.parent === "") {
        data.parent = null;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },

          body: JSON.stringify({
            name: data?.name,
            parent: data?.parent,
          }),
        }
      );
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error :", err);
      toast.error("Failed to create new category. Please try again later.");
    }
  };
  const deleteCategory = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}categories/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      fetchCategories().then();
      setIsLoading(false);
      toast.success("Category deleted successfully.");
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error :", err);
    }
  };
  useEffect(() => {
    fetchCategories().then();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category created successfully.");
    }
    if (isError) {
      toast.error("Failed to create category. Please try again later.");
    }
    return () => {
      setIsError(false);
      setIsSuccess(false);
    };
  }, [isSuccess, isError]);
  return {
    categories,
    categoriesCount,
    isLoading,
    isError,
    createNewCategory,
    isSuccess,
    deleteCategory,
  };
};
export default useCategoriesLogic;