"use client";
import Flex from "@/app/components/Flex";
import LabelText from "@/app/components/LabelText";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import user_logo from "../../../public/images/user_logo.png";
import Image from "next/image";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { FiLogIn,FiLogOut } from 'react-icons/fi'
const AuthNav = () => {
  const { isAuthenticated,signOut } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          {" "}
          <Link href={"/users/post/write-post"}>
            <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
              <TfiWrite className="text-primary text-lg" />
              <LabelText className="hidden md:block" children={"write"} />
            </Flex>
          </Link>
          <div
            className={
              "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
            }
          >
            <Image src={user_logo} alt={"logo"} />
          </div>
          <button onClick={signOut}>
   <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
              <FiLogOut className="text-primary text-lg" />
              <LabelText className="hidden md:block" children={"Sign Out"} />
            </Flex>
          </button>
        </>
      ) : (
        <Link href={"/auth/sign-in"}>
          <Flex className="gap-x-1 cursor-pointer border border-solid border-border_color w-10 h-10 rounded-full justify-center md:border-none md:w-auto md:h-auto md:rounded-none hover:bg-border_color">
            <FiLogIn className="text-primary text-lg" />
            <LabelText className="hidden md:block" children={"Sign In"} />
          </Flex>
        </Link>
      )}
    </>
  );
};
export default AuthNav;
