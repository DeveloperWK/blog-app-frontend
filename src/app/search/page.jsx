import SearchBox from "@/app/layout/SearchBox";
import Image from "next/image";
import { SiDatefns } from "react-icons/si";
import user_logo from "../../../public/images/user_logo.png";
import Flex from "../components/Flex";
import Paragraph from "../components/Paragraph";
import SmallText from "../components/SmallText";
import Root from "../home_layout/Root";
import {Suspense} from "react";
import PostGrid from "@/app/components/PostGrid";

function Search() {
  return (
    <Root>
      <div className="bg-bg w-[90%] mx-auto pt-10 pb-10 px-2 md:pt-16 h-screen">
        <SearchBox className="w-full mt-5" />
        <section className="mt-5 w-full h-[calc(100vh-150px)]  overflow-y-scroll">
<PostGrid/>
        </section>
      </div>
    </Root>
  );
}
const SearchWithSuspense = () => {
  return (
      <Suspense fallback={ <div className="fixed min-h-full inset-0 bg-black text-white flex justify-center items-center z-50">
        Loading...
      </div>}>

   <Search/>
        </Suspense>
  )
}
export default SearchWithSuspense;