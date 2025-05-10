import Root from "./home_layout/Root";
import PostGrid from "@/app/components/PostGrid";
import {Suspense} from "react";

function Home() {
  return (
    <Root>
      <div className="bg-bg w-[90%] mx-auto pt-10 pb-10 px-2 md:pt-16">
<PostGrid/>
      </div>
    </Root>
  );
}
const HomeWithSuspense = () => {
  return (
      <Suspense
          fallback={
              <div className="fixed inset-0 bg-black text-white flex justify-center items-center z-50">
                  Loading...
              </div>
          }
      >
          <Home />
      </Suspense>

  )
}
export default HomeWithSuspense;
