import PostCard from "@/app/users/profile/PostCard";
import Link from "next/link";
import {useAuth} from "@/app/context/AuthContext/AuthProvider";

const PostsSection = ({
                          posts,
                          onPostDelete,
                      }) => {

    const {hasRole} = useAuth()
    return (
        <section className="mb-6" >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-200">Posts</h2>
                {hasRole("writer") &&
                    <Link href="/users/post/write-post"

                       className="px-3 py-1 bg-blue-800 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Post
                </Link>
                }
            </div>

            <div className="space-y-4 overflow-y-scroll h-96">
                {posts?.length === 0 && <p className="text-gray-200">No posts yet</p>}
                {posts?.map(post => {
                    const totalReaction = Object.values(post?.reactionCounts).reduce((sum,value)=> sum+value,0)
                    return(
                    <PostCard
                        key={post._id}
                        post={post}
                        onDelete={onPostDelete}
                        totalReact={totalReaction}
                    />
                    )})}
            </div>
        </section>
    );
};



export default PostsSection;