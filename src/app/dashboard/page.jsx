"use client"
import { MdDelete } from "react-icons/md";
import Flex from "../components/Flex";
import HeadingH2 from "../components/HeadingH2";
import HeadingH3 from "../components/HeadingH3";
import LabelText from "../components/LabelText";
import Paragraph from "../components/Paragraph";
import QuoteText from "../components/QuoteText";
import DashBoardRoot from "./DashBoard_layout/DashBoardRoot";
import usePostLogic from "@/app/hooks/usePostLogic";
import useCategoriesLogic from "@/app/hooks/useCategoriesLogic";
import useUsersLogic from "@/app/hooks/useUsersLogic";

function DashBoardPage() {
  const {error,loading,posts,deletePost,postsCount} = usePostLogic()
  const {categoriesCount} = useCategoriesLogic()
const {usersCount}=useUsersLogic()

  return (
    <DashBoardRoot>
      <main className="flex-1 px-6 space-y-6 py-20">
        {/*  Stats  */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Posts</LabelText>
            <HeadingH2>{postsCount}</HeadingH2>
          </div>
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Users</LabelText>
            <HeadingH2>{usersCount}</HeadingH2>
          </div>
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Categories</LabelText>
            <HeadingH2>{categoriesCount}</HeadingH2>
          </div>
        </section>

        {/* Posts Table */}
        <section className="glass p-6 rounded-xl shadow-xl">
          <HeadingH3>Posts</HeadingH3>
          <ul className="space-y-4 mt-4">
            {/* Post Item  */}
            {loading && <Paragraph>Loading...</Paragraph>}
            {!loading && postsCount === 0 && <Paragraph>No posts found</Paragraph>}
            {!loading && posts?.posts?.map((post) => (
                <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6" key={post._id}>
                  <div>
                    <QuoteText>{post?.title}</QuoteText>
                    <Paragraph className="mt-2">
                      Published on {post?.updatedAt?.slice(0, 10)}
                    </Paragraph>
                  </div>
                  <button className="text-red-500 hover:text-red-700 hover:scale-105 transition" disabled={loading}
                  onClick={()=>deletePost(post._id)}
                  >
                    <Flex className="gap-x-1 cursor-pointer">
                      <MdDelete /> <span>Delete</span>
                    </Flex>
                  </button>
                </li>
            ))}
          </ul>
        </section>
        {error && <Paragraph className="text-red-500">{error}</Paragraph>}
      </main>
    </DashBoardRoot>
  );
}
export default DashBoardPage