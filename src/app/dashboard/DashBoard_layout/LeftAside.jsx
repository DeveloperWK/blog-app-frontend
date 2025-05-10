import Flex from '../../components/Flex';
import LabelText from '../../components/LabelText';
import { MdDashboard } from 'react-icons/md';
import { FaUsersViewfinder } from 'react-icons/fa6';
import Link from 'next/link';
import { FaFileCircleCheck } from "react-icons/fa6";

 function LeftAside({ ...rest }) {
    return (
        <div className="md:w-[40%] md:h-screen bg-bg ">
            <div
                {...rest}
                className="w-[200px] h-[calc(100vh-130px)] bg-bg border border-solid border-border_color fixed top-16 -left-56 py-5 px-4  md:block md:h-screen md:fixed md:top- md:left-0 md:pt-10 lg:w-[300px] xl:w-[400px] duration-200 transition-all"
            >
                <ul className="mt-5 md:mt-0">
                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Link href="/dashboard">
                            <Flex className="gap-x-1">
                                <MdDashboard className="text-xl text-primary mr-3" />
                                <LabelText children="Posts" />
                            </Flex>
                        </Link>
                    </li>
                        <Link href="/dashboard/all-users">
                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                            <Flex className="gap-x-1">
                                <FaUsersViewfinder className="text-xl text-primary mr-3" />
                                <LabelText children="Users" />
                            </Flex>
                    </li>
                        </Link>
                    <Link href="/dashboard/categories">
                        <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                            <Flex className="gap-x-1">
                                <FaFileCircleCheck className="text-xl text-primary mr-3" />
                                <LabelText children="Categories" />
                            </Flex>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
export default LeftAside;