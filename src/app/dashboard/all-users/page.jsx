"use client";
import Flex from "@/app/components/Flex";
import HeadingH2 from "@/app/components/HeadingH2";
import HeadingH3 from "@/app/components/HeadingH3";
import LabelText from "@/app/components/LabelText";
import Paragraph from "@/app/components/Paragraph";
import SmallText from "@/app/components/SmallText";
import useUsersLogic from "@/app/hooks/useUsersLogic";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import userLogo from "../../../../public/images/programmer.png";
import DashBoardRoot from "../DashBoard_layout/DashBoardRoot";

function AllUsers() {
  const { users, error, loading, deleteUser } = useUsersLogic();
  const usersCount = users?.length;
  return (
    <DashBoardRoot>
      <main className="flex-1 px-6 space-y-6 py-20">
        {/*  Stats  */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-solid border-border_color py-4 px-6">
            <LabelText>Total Users</LabelText>
            <HeadingH2>{usersCount}</HeadingH2>
          </div>
        </section>

        {/* Posts Table */}
        <section className="glass p-6 rounded-xl shadow-xl">
          <HeadingH3>Users</HeadingH3>
          <ul className="space-y-4 mt-4">
            {/* Post Item  */}
            {loading && <Paragraph>Loading...</Paragraph>}
            {!loading && usersCount === 0 && (
              <Paragraph>No users found</Paragraph>
            )}
            {!loading &&
              users?.map((user) => (
                <li
                  className="flex justify-between items-center bg-opacity-10 rounded-lg border border-solid border-border_color py-3 px-6"
                  key={user._id}
                >
                  <div className="w-full rounded-2xl shadow-md flex items-center gap-x-4">
                    {/* <!-- Avatar --> */}
                    <div>
                      <Image
                        src={user.avatar ? user.avatar : userLogo}
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    </div>

                    {/* <!-- Info --> */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <SmallText>@{user?.firstName}</SmallText>
                      </div>
                      <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {user?.role.charAt(0).toUpperCase() +
                          user?.role.slice(1)}
                      </Paragraph>
                      <Paragraph className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {user?.email}
                      </Paragraph>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 hover:scale-105 transition"
                    disabled={loading}
                    onClick={() =>
                      user?.role === "admin"
                        ? alert("You will not be able to delete the admin. ")
                        : confirm("Do you want to delete this user ?") &&
                          deleteUser(user._id)
                    }
                  >
                    <Flex className="gap-x-1 cursor-pointer">
                      <MdDelete /> <span>Delete</span>
                    </Flex>
                  </button>
                </li>
              ))}
          </ul>
        </section>
        {error && <Paragraph className="text-red-500">{error}</Paragraph>}
      </main>
    </DashBoardRoot>
  );
}
export default AllUsers;
