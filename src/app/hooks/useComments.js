import { useState } from "react";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const fetchComments = async (postId) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}comments/${postId}`,
        {
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        setError("Failed to load comments.");
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError("Failed to load comments.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12">Loading comments...</div>;
  }
  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditedComment(comment.comment);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleUpdate = async (commentId, postId) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            comment: editedComment,
          }),
        }
      );
      if (!res.ok) {
        setError("Failed to update comment.");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      refreshComments(postId);
      cancelEdit();
    } catch (err) {
      console.error("Failed to update comment", err);
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId, postId) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        setError("Failed to Delete comment.");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      refreshComments(postId);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };
  const refreshComments = (postId) => {
    fetchComments(postId).then();
  };
  return {
    comments,
    newComment,
    userName,
    isLoading,
    error,
    handleEdit,
    cancelEdit,
    handleUpdate,
    handleDelete,
    fetchComments,
    setNewComment,
    editingCommentId,
    editedComment,
    setEditedComment,
    setError,
    setIsLoading,
  };
};
export default useComments;
