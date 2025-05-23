import CategoryFilter from "@/app/components/CategoryFilter";
import Image from "next/image";
import Link from "next/link";
import userLogo from "../../../public/images/programmer.png";
import Flex from "../components/Flex";
import LabelText from "../components/LabelText";
function LeftAside({ ...rest }) {
  return (
    <div className="md:w-[40%] md:h-screen bg-bg">
      <div
        {...rest}
        className="w-[200px] h-[calc(100vh-130px)] bg-bg border border-solid border-border_color fixed top-16 -left-56 py-5 px-4  md:block md:h-screen md:fixed md:top- md:left-0 md:pt-10 lg:w-[300px] xl:w-[400px] duration-200 transition-all overflow-hidden"
      >
        <ul className="mt-5 md:mt-0">
          <Link href={"/"}>
            <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
              <Flex className="gap-x-1">
                <div
                  className={
                    "w-[20px] h-[20px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                  }
                >
                  <Image src={userLogo} alt={"logo"} />
                </div>
                <LabelText children="My feed" />
              </Flex>
            </li>
          </Link>
          {/*
              <Link href={'/users/post/book-mark'}>
          <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
            <Flex className="gap-x-1">
              <FaBookBookmark className="text-xl text-primary mr-3" />
              <LabelText children="Bookmarks" />
            </Flex>
          </li>
            </Link >

          */}
        </ul>
        <hr className="my-5 text-border_color" />
        <CategoryFilter />
      </div>
    </div>
  );
}
export default LeftAside;
