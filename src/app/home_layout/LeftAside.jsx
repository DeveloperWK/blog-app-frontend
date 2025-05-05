import Image from "next/image";
import { FaBookBookmark } from "react-icons/fa6";
import user_logo from "../../assets/user_logo.png";
import Flex from "../components/Flex";
import LabelText from "../components/LabelText";

export default function LeftAside({ ...rest }) {
  return (
    <div className="md:w-[40%] md:h-screen bg-bg">
      <div
        {...rest}
        className="w-[200px] h-[calc(100vh-145px)] bg-bg border border-solid border-border_color fixed top-16 -left-56 py-5 px-4 md:block md:h-screen md:fixed md:top- md:left-0 md:pt-10 lg:w-[300px] xl:w-[400px] duration-200 transition-all"
      >
        <ul>
          <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
            <Flex className="gap-x-1">
              <div
                className={
                  "w-[20px] h-[20px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                }
              >
                <Image src={user_logo} alt={"logo"} />
              </div>
              <LabelText children="My feed" />
            </Flex>
          </li>

          <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
            <Flex className="gap-x-1">
              <FaBookBookmark className="text-xl text-primary mr-3" />
              <LabelText children="Bookmarks" />
            </Flex>
          </li>
        </ul>
      </div>
    </div>
  );
}
