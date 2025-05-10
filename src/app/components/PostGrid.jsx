"use client"
import Flex from "@/app/components/Flex";
import Image from "next/image";
import LabelText from "@/app/components/LabelText";
import Paragraph from "@/app/components/Paragraph";
import MutedText from "@/app/components/MutedText";
import {SiDatefns} from "react-icons/si";
import {usePostFeed} from "@/app/context/PostContext/PostProvider";
import useGiveReact from "@/app/hooks/useGiveReact";
const PostGrid = () => {
const {postsFeed} = usePostFeed()
   const {selectedReaction,setSelectedReaction,reactionIcons,reactionTypes,isReacted,getReactionIcon,userReactions} = useGiveReact()


    console.log("reaction",selectedReaction)

    return(
        <>
        {

            postsFeed?.map((post) => {
                    const totalReaction = Object.values(post?.reactionCounts).reduce((sum,value)=> sum+value,0)


            return(
                        <div className="border border-solid border-border_color rounded-lg p-5 mt-4" key={post?._id}>
                            {post.length === 0 && <Paragraph className='text-white'>No posts found</Paragraph>}
                            <Flex className="bg-card_bg py-5 px-4 gap-x-4 rounded-lg">
                                <div className="w-[70%]">
                                    <Flex>
                                        <div
                                            className={
                                                "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                                            }
                                        >
                                            <Image src={post?.author?.avatar} width={36} height={36} alt={"logo"} />
                                        </div>
                                        <LabelText>@{post?.author?.firstName}</LabelText>
                                    </Flex>
                                    <Paragraph className="mt-4">
                                        {post?.title}
                                    </Paragraph>
                                    <MutedText className="mt-4">
                                        {post?.body?.length > 100 ? post?.body?.slice(0, 100) + "..." :
                                            post?.body}
                                    </MutedText>
                                </div>
                                <div className="w-[30%]">
                                    <Image src={post?.image} width={100} height={100} alt="post-image" className="w-full" />
                                </div>
                            </Flex>

                            <Flex className="mt-4 gap-x-3">
                                <Flex className="gap-x-2">
                                    <SiDatefns className="text-primary text-10" />
                                    <LabelText>{post?.updatedAt?.slice(0, 10)}</LabelText>
                                </Flex>
                                <Flex className="gap-x-3 items-center flex-wrap">
                                    {reactionTypes.map(type => (
                                        <div key={type} title={type} aria-disabled={isReacted} onClick={()=>{
                                            setSelectedReaction({
                                                reactionType: type,
                                                blogId: post?._id,
                                            })
                                        }}  className="hover:scale-110 transition-transform duration-150 cursor-pointer">
                                            {/*{reactionIcons[type]}*/}
                                            {getReactionIcon(type, userReactions[post?._id] === type && selectedReaction?.blogId === post?._id )}
                                        </div>
                                    ))}
                                    <LabelText>{totalReaction}</LabelText>
                                </Flex>
                            </Flex>
                        </div>
                    )}
                )


        }
        </>
    )
}
export default PostGrid;