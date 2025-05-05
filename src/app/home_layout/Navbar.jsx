"use client";

import LabelText from "@/app/components/LabelText";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import user_logo from "../../../public/images/user_logo.png";
import Flex from "../components/Flex";

function Navbar({ bar }) {
  return (
    <nav className="bg-bg fixed top-0 w-full z-10">
      <div className="border-b border-solid border-border_color rounded-bl-2xl rounded-br-2xl">
        <Flex className="w-[95%] mx-auto justify-between py-5 md:py-2">
          <Flex className="justify-between w-[80%] relative md:w-[50%]">
            <h3
              className={`text-md font-bold text-primary select-none pointer-events-none md:text-xl lg:text-2xl`}
            >
              CodeVerse — A Developer's Diary
            </h3>
            <Flex
              className={
                "w-[300px] border border-solid border-border_color px-5 py-2 rounded-2xl hidden lg:flex"
              }
            >
              <CiSearch className="text-primary text-lg mr-3" />
              <input
                type="text"
                className="w-full text-md text-secondary focus:border-none outline-none"
                placeholder="Search here >>>>>"
              />
            </Flex>
          </Flex>

          <div ref={bar} className={"cursor-pointer md:hidden"}>
            <FaBarsProgress className={"text-primary"} size={25} />
          </div>

          <Flex
            className={
              "rounded-tl-2xl rounded-tr-2xl justify-around fixed border border-solid border-border_color bottom-0 left-0 bg-card_bg w-full py-6 md:relative md:bg-bg md:w-[200px] md:border-none z-10"
            }
          >
            <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
              <CiSearch className="text-primary text-lg lg:hidden" />
            </Flex>
            <Link href={"/user/post/write-post"}>
              <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
                <TfiWrite className="text-primary text-lg" />
                <LabelText className="hidden md:block" children={"write"} />
              </Flex>
            </Link>
            <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
              <IoMdNotificationsOutline className="text-primary text-2xl" />
            </Flex>

            <div
              className={
                "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
              }
            >
              <Image src={user_logo} alt={"logo"} />
            </div>
          </Flex>
        </Flex>
      </div>
    </nav>
  );
}
export default Navbar;
