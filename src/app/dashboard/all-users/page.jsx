import Flex from "@/app/components/Flex";
import HeadingH2 from "@/app/components/HeadingH2";
import HeadingH3 from "@/app/components/HeadingH3";
import LabelText from "@/app/components/LabelText";
import Paragraph from "@/app/components/Paragraph";
import SmallText from "@/app/components/SmallText";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import user_logo from "../../../../public/images/user_logo.png";
import DashBoardRoot from "../DashBoard_layout/DashBoardRoot";

export default function page() {
  return (
    <DashBoardRoot>
      <main className="flex-1 px-6 space-y-6 py-20">
        {/*  Stats  */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Users</LabelText>
            <HeadingH2>8.4K</HeadingH2>
          </div>
        </section>

        {/* Posts Table */}
        <section className="glass p-6 rounded-xl shadow-xl">
          <HeadingH3>Users</HeadingH3>
          <ul className="space-y-4 mt-4">
            {/* Post Item  */}

            <li className="flex justify-between items-center bg-opacity-10 rounded-lg border border-solid border-border_color py-3 px-6">
              <div className="w-full rounded-2xl shadow-md flex items-center gap-x-4">
                {/* <!-- Avatar --> */}
                <div>
                  <Image
                    src={user_logo}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {/* <!-- Online Status Dot --> */}
                </div>

                {/* <!-- Info --> */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <SmallText>@henry</SmallText>
                  </div>
                  <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    henry@example.com
                  </Paragraph>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center bg-opacity-10 rounded-lg border border-solid border-border_color py-3 px-6">
              <div className="w-full rounded-2xl shadow-md flex items-center gap-x-4">
                {/* <!-- Avatar --> */}
                <div>
                  <Image
                    src={user_logo}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {/* <!-- Online Status Dot --> */}
                </div>

                {/* <!-- Info --> */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <SmallText>@henry</SmallText>
                  </div>
                  <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    henry@example.com
                  </Paragraph>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center bg-opacity-10 rounded-lg border border-solid border-border_color py-3 px-6">
              <div className="w-full rounded-2xl shadow-md flex items-center gap-x-4">
                {/* <!-- Avatar --> */}
                <div>
                  <Image
                    src={user_logo}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {/* <!-- Online Status Dot --> */}
                </div>

                {/* <!-- Info --> */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <SmallText>@henry</SmallText>
                  </div>
                  <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    henry@example.com
                  </Paragraph>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
          </ul>
        </section>
      </main>
    </DashBoardRoot>
  );
}
