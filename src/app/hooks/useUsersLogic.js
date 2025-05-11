import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext/AuthProvider";
const useUsersLogic = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { hasRole } = useAuth();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}admin/users`,
        {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      setUsers(result?.users);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("Error :", err);
      toast.error("Failed to fetch users. Please try again later.");
    }
  };
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}users/${localStorage.getItem(
          "userId"
        )}`,
        {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      return result?.user;
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("Error :", err);
      toast.error("Failed to fetch user. Please try again later.");
    }
  };
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      fetchUsers();
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("Error :", err);
      toast.error("Failed to delete user. Please try again later.");
    }
  };
  const usersCount = users?.length;
  useEffect(() => {
    if (!hasRole("admin")) return;
    fetchUsers();
  }, [hasRole]);
  return {
    users,
    loading,
    error,
    deleteUser,
    usersCount,
    fetchUser,
  };
};
export default useUsersLogic;
