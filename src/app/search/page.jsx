import SearchBox from "@/app/layout/SearchBox";
import Image from "next/image";
import { SiDatefns } from "react-icons/si";
import user_logo from "../../../public/images/user_logo.png";
import Flex from "../components/Flex";
import Paragraph from "../components/Paragraph";
import SmallText from "../components/SmallText";
import Root from "../home_layout/Root";

function Search() {
  return (
    <Root>
      <div className="bg-bg w-[90%] mx-auto pt-10 pb-10 px-2 md:pt-16 h-screen">
        <SearchBox className="w-full mt-5" />
        <div className="mt-6">
          <div className="w-full rounded-2xl shadow-md p-4 flex items-center gap-x-4 border border-solid border-border_color">
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
                <Flex className="gap-x-2">
                  <SiDatefns className="text-primary text-10" />
                  <SmallText>12 April 2013</SmallText>
                </Flex>
              </div>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                RAG in Action: Build your Own Local PDF Chatbot as a Beginner
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}
export default Search