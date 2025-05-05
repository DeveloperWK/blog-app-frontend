"use client";
import Flex from "@/app/components/Flex";
import Navbar from "@/app/home_layout/Navbar";
import useClick from "@/app/hooks/useClick";
import LeftAside from "./LeftAside";

export default function Root({ children }) {
  const { bar, content } = useClick();

  return (
    <>
      <Navbar bar={bar} />
      <Flex className="relative pt-10 pb-16 md:pb-0 md:pt-15 bg-bg">
        <LeftAside ref={content} />
        <main className="w-full bg-bg overflow-hidden">{children}</main>
      </Flex>
    </>
  );
}
