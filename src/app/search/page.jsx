import PostGrid from "@/app/components/PostGrid";
import SearchBox from "@/app/layout/SearchBox";
import { Suspense } from "react";
import Root from "../home_layout/Root";

function Search() {
  return (
    <Root>
      <div className="bg-bg w-[90%] mx-auto pt-10 pb-10 px-2 md:pt-16 h-screen">
        <SearchBox className="w-full mt-5" />
        <section className="mt-5 w-full h-[calc(100vh-150px)]  overflow-y-scroll">
          <PostGrid />
        </section>
      </div>
    </Root>
  );
}
const SearchWithSuspense = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed min-h-full inset-0 bg-black text-white flex justify-center items-center z-50">
          Loading...
        </div>
      }
    >
      <Search />
    </Suspense>
  );
};
export default SearchWithSuspense;
