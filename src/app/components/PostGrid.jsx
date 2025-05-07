"use client"
import Flex from "@/app/components/Flex";
import Image from "next/image";
import LabelText from "@/app/components/LabelText";
import Paragraph from "@/app/components/Paragraph";
import MutedText from "@/app/components/MutedText";
import {SiDatefns} from "react-icons/si";
import { FaHandshakeSimple} from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { FaHeart  } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import usePostLogic from "@/app/hooks/usePostLogic";


const PostGrid = () => {
    const {posts,loading,error} =usePostLogic()
    console.log(posts)
    return(
        <>
        {
            posts?.posts?.map((post) => {
                const totalReaction = Object.values(post?.reactionCounts).reduce((sum,value)=> sum+value,0)
          return(
            <div className="border border-solid border-border_color rounded-lg p-5 mt-4" key={post?._id}>
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
                    <Flex className="gap-x-1">
                        <FaHandshakeSimple className="text-primary text-10" />
                        <BiLike className="text-primary text-10" />
                        <FaHeart className="text-primary text-10" />
                        <FaRegLightbulb className="text-primary text-10" />
                        <LabelText>{totalReaction}</LabelText>
                    </Flex>
                </Flex>
            </div>
         )})
        }
        </>
    )
}
export default PostGrid;