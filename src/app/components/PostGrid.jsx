"use client";
import Flex from "@/app/components/Flex";
import LabelText from "@/app/components/LabelText";
import MutedText from "@/app/components/MutedText";
import Pagination from "@/app/components/Pagination";
import Paragraph from "@/app/components/Paragraph";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import { usePostFeed } from "@/app/context/PostContext/PostProvider";
import useGiveReact from "@/app/hooks/useGiveReact";
import usePostFilter from "@/app/hooks/usePostFilter";
import Image from "next/image";
import Link from "next/link";
import { SiDatefns } from "react-icons/si";
const PostGrid = () => {
  const { postsFeed, hasSearched, searchResults } = usePostFeed();
  const { handlePageChange, isLoading } = usePostFilter();
  const {
    selectedReaction,
    setSelectedReaction,
    reactionTypes,
    isReacted,
    getReactionIcon,
    userReactions,
  } = useGiveReact();
  const { isAuthenticated } = useAuth();
  const postsToRender = hasSearched ? searchResults : postsFeed?.posts || [];
  return (
    <>
      {isLoading ? (
        <>
          <Paragraph>Loading...</Paragraph>
        </>
      ) : postsToRender.length === 0 ? (
        <Paragraph className="text-white h-screen w-full flex justify-center items-center pt-5">
          No posts found
        </Paragraph>
      ) : (
        postsToRender.map((post) => {
          const totalReaction = Object.values(
            post?.reactionCounts || {}
          ).reduce((sum, value) => sum + value, 0);

          return (
            <div
              className="border border-solid border-border_color rounded-lg p-5 mt-4"
              key={post?._id}
            >
              <Flex className="bg-card_bg py-5 px-4 gap-x-4 rounded-lg">
                <div className="w-[70%]">
                  <Flex>
                    <div className="w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3">
                      <Image
                        src={post?.author?.avatar}
                        width={36}
                        height={36}
                        alt="avatar"
                      />
                    </div>
                    <LabelText>@{post?.author?.firstName}</LabelText>
                  </Flex>
                  <Paragraph className="mt-4">{post?.title}</Paragraph>
                  <MutedText className="mt-4">
                    {post?.body?.length > 100
                      ? post.body.slice(0, 100) + "..."
                      : post.body}
                  </MutedText>
                </div>
                <div className="w-[30%]">
                  <Image
                    src={post?.image}
                    width={300}
                    height={300}
                    alt="post-image"
                    className="w-full"
                    quality={100}
                  />
                </div>
              </Flex>

              <Flex className="mt-4 gap-x-3">
                <Flex className="gap-x-2">
                  <SiDatefns className="text-primary text-10" />
                  <LabelText className="text-sm text-gray-400">
                    {post?.updatedAt
                      ? new Date(post?.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Date Not Available"}
                  </LabelText>
                </Flex>

                <Flex className="gap-x-3 items-center flex-wrap">
                  {reactionTypes.map((type) => {
                    const isDisabled = !isAuthenticated || isReacted;
                    return (
                      <button
                        key={type}
                        title={!isAuthenticated ? "Sign in to react" : type}
                        disabled={isDisabled}
                        onClick={() => {
                          setSelectedReaction({
                            reactionType: type,
                            blogId: post?._id,
                          });
                        }}
                        className="hover:scale-110 transition-transform duration-150 cursor-pointer"
                      >
                        {getReactionIcon(
                          type,
                          userReactions[post?._id] === type &&
                            selectedReaction?.blogId === post?._id
                        )}
                      </button>
                    );
                  })}
                  <LabelText>{totalReaction}</LabelText>
                </Flex>
                <Flex className="gap-x-2">
                  <Link href={`/users/post/${post?._id}`}>
                    <span className="text-blue-600 hover:underline">
                      Read More...
                    </span>
                  </Link>
                </Flex>
              </Flex>
            </div>
          );
        })
      )}
      <Pagination
        currentPage={postsFeed?.currentPage}
        totalPages={postsFeed?.totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};
export default PostGrid;
