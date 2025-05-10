import LabelText from "@/app/components/LabelText";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { FaBarsProgress } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import user_logo from "../../../../public/images/user_logo.png";
import Flex from "../../components/Flex";

function DashBoardNavbar({ bar }) {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="bg-bg fixed top-0 w-full z-10">
      <div className="border-b border-solid border-border_color rounded-bl-2xl rounded-br-2xl">
        <Flex className="w-[95%] mx-auto justify-between items-center py-3 md:py-2">
          {/* Logo Section */}
          <Link href="/" className="block">
            <h3 className="text-md font-bold text-primary select-none md:text-xl lg:text-2xl">
              CodeVerse — A Developer's Diary
            </h3>
          </Link>

          {/* Mobile Menu Toggle */}
          <div ref={bar} className="cursor-pointer ml-16 md:hidden">
            <FaBarsProgress className="text-primary " size={25} />
          </div>

          {/* Extra space to account for fixed bottom nav on mobile */}
          <div className="h-16 block md:hidden"></div>

          {/* Navigation Menu */}
          {/* Mobile bottom navigation bar (fixed on mobile, normal on desktop) */}
          <Flex
            className={
              "rounded-tl-2xl rounded-tr-2xl justify-evenly items-center fixed border border-solid border-border_color bottom-0 left-0 bg-card_bg w-full py-3 md:py-2 md:relative md:bg-bg md:w-auto md:border-none md:gap-4 md:justify-end z-10"
            }
          >
            {/* Conditional Auth Links */}
            {isAuthenticated && (
              <>
                <Link href="/users/profile" className="md:order-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-solid border-border_color hover:border-primary transition-colors duration-200 flex items-center justify-center md:w-8 md:h-8">
                    <Image
                      src={user_logo}
                      alt="User profile"
                      width={32}
                      height={32}
                    />
                  </div>
                </Link>

                <button
                  onClick={signOut}
                  className="flex items-center justify-center gap-1 hover:text-primary transition-colors duration-200 border border-solid border-border_color w-10 h-10 rounded-full md:border-none md:w-auto md:h-auto md:rounded-none md:order-5 cursor-pointer "
                >
                  <FiLogOut className="text-primary text-lg" />
                  <LabelText className="hidden md:block" children="Sign Out" />
                </button>
              </>
            )}
          </Flex>
        </Flex>
      </div>
    </nav>
  );
}
export default DashBoardNavbar;
