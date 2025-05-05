import { MdDelete } from "react-icons/md";
import Flex from "../components/Flex";
import HeadingH2 from "../components/HeadingH2";
import HeadingH3 from "../components/HeadingH3";
import LabelText from "../components/LabelText";
import Paragraph from "../components/Paragraph";
import QuoteText from "../components/QuoteText";
import DashBoardRoot from "./DashBoard_layout/DashBoardRoot";

export default function Home() {
  return (
    <DashBoardRoot>
      <main className="flex-1 px-6 space-y-6 py-20">
        {/*  <!-- Stats --> */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Posts</LabelText>
            <HeadingH2>124</HeadingH2>
          </div>
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Views</LabelText>
            <HeadingH2>8.4K</HeadingH2>
          </div>
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Comments</LabelText>
            <HeadingH2>298</HeadingH2>
          </div>
        </section>

        {/* <!-- Posts Table --> */}
        <section className="glass p-6 rounded-xl shadow-xl">
          <HeadingH3>Posts</HeadingH3>
          <ul className="space-y-4 mt-4">
            {/* <!-- Post Item --> */}
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:scale-105 transition">
                <Flex className="gap-x-1 cursor-pointer">
                  <MdDelete /> <span>Delete</span>
                </Flex>
              </button>
            </li>
            <li className="flex justify-between items-center p-4 bg-opacity-10 rounded-lg border border-solid border-border_color py-4 px-6">
              <div>
                <QuoteText>Mastering Tailwind CSS</QuoteText>
                <Paragraph className="mt-2">
                  Published on Apr 20, 2025
                </Paragraph>
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
