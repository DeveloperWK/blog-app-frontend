import { Edit, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
const PostCard = ({ post, onDelete, totalReact }) => {
  return (
    <div
      className={"bg-gray-800 border-gray-700 border rounded-lg p-4 shadow-sm"}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg text-gray-200">{post.title}</h3>
        <div className="flex space-x-1">
          <Link
            href={`/users/post/edit-post/${post._id}`}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Edit size={14} className="text-gray-400" />
          </Link>
          <button
            onClick={() => onDelete(post?._id)}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Trash2 size={14} className="text-gray-400" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-200 mb-3">{post.body}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {post?.updatedAt?.slice(0, 10)}
        </span>
        <div className="flex items-center space-x-3">
          <span className="text-xs flex items-center text-gray-400">
            <MessageSquare size={12} className="mr-1" />
            {post.comments}
          </span>
          <span className="text-xs text-gray-400">{totalReact} Reaction</span>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
