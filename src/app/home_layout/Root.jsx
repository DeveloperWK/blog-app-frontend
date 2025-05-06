"use client";
import useClick from "@/app/hooks/useClick";
import Navbar from "@/app/layout/Navbar";
import LeftAside from "./LeftAside";

export default function Root({ children }) {
  const { bar, content } = useClick();

  return (
    <>
      <Navbar bar={bar} />
      <div className="relative pt-10 pb-16 md:pb-0 md:pt-15 bg-bg flex">
        <LeftAside ref={content} />
        <main className="w-full bg-bg overflow-hidden">{children}</main>
      </div>
    </>
  );
}
