"use client";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import useComments from "@/app/hooks/useComments";
import { useEffect, useState } from "react";

function CommentSection({ postId }) {
  const { isAuthenticated } = useAuth();
  const [currentUserId, setCurrentUserId] = useState(null);
  const {
    fetchComments,
    newComment,
    setNewComment,
    error,
    isLoading,
    comments,
    handleEdit,
    handleDelete,
    handleUpdate,
    editingCommentId,
    editedComment,
    setEditedComment,
    cancelEdit,
    setIsLoading,
    setError,
  } = useComments();
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Please enter your comment");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")} `,
        },
        body: JSON.stringify({
          blogPost: postId,
          comment: newComment,
          user: localStorage.getItem("userId"),
        }),
      });
      if (!res.ok) {
        setError("Failed to post comment.");
        setIsLoading(false);
        return;
      }
      setNewComment("");
      fetchComments(postId).then();
      setIsLoading(false);
    } catch (err) {
      setError("Failed to post comment.");
      console.error(err);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCurrentUserId(userId);
    fetchComments(postId).then();
  }, [postId]);
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg- shadow-sm w-full">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4 text-white">Comments</h3>

        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ask a question or leave a comment about this post"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isAuthenticated}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Post Comment"}
          </button>
        </form>

        <div className="space-y-6">
          {comments?.comments?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No comments yet. Be the first to start the commenting!
            </div>
          ) : (
            comments?.comments?.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-white">
                      {comment?.user?.firstName}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {comment?.updatedAt
                        ? new Date(comment?.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: false,
                            }
                          )
                        : "Date Not Available"}
                    </span>
                  </div>
                  {comment.user._id === currentUserId && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(comment)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id, postId)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment._id ? (
                  <div className="mb-3">
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      rows={3}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleUpdate(comment._id, postId)}
                        disabled={!editedComment.trim() || isLoading}
                        type="submit"
                        className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => cancelEdit()}
                        className="px-4 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-white mb-3">{comment?.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default CommentSection;
