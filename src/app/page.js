import PostGrid from "@/app/components/PostGrid";
import { Suspense } from "react";
import Root from "./home_layout/Root";

function Home() {
  return (
    <Root>
      <div className="mt-10 h-full bg-bg w-[90%] mx-auto pt-10 pb-10 px-2  md:mt-0">
        <PostGrid />
      </div>
    </Root>
  );
}
const HomeWithSuspense = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 min-h-full bg-black text-white flex justify-center items-center z-50">
          Loading...
        </div>
      }
    >
      <Home />
    </Suspense>
  );
};
export default HomeWithSuspense;
