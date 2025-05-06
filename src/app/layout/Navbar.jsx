import LabelText from "@/app/components/LabelText";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import user_logo from "../../assets/user_logo.png";
import Flex from "../components/Flex";
import SearchBox from "./SearchBox";

export default function Navbar({ bar }) {
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
            <SearchBox className='hidden' />
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

            <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
              <TfiWrite className="text-primary text-lg" />
              <LabelText className="hidden md:block" children={"write"} />
            </Flex>

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
