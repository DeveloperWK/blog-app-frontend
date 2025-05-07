"use client";

import useClick from "@/app/hooks/useClick";
import LeftAside from "./LeftAside";
import DashBoardNavbar from "@/app/dashboard/DashBoard_layout/Navbar";

export default function DashBoardRoot({ children }) {
  const { bar, content } = useClick();


  return (
    <>
      <DashBoardNavbar bar={bar} />
      <div className="relative pt-10 pb-16 md:pb-0 md:pt-15 bg-bg flex">
        <LeftAside ref={content} />
        <main className="w-full bg-bg overflow-hidden">{children}</main>
      </div>
    </>
  );
}
