'use client';

import Flex from '../components/Flex';
import LabelText from '../components/LabelText';
import user_logo from '../../assets/user_logo.png';
import Image from 'next/image';
import { TiGroup } from 'react-icons/ti';
import { IoEye } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { CiHashtag } from 'react-icons/ci';
import { GiWorld } from 'react-icons/gi';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { GiDiscussion } from 'react-icons/gi';
import { FaBookBookmark } from "react-icons/fa6";

export default function LeftAside({ ...rest }) {
    return (
        <div className='md:w-[30%] md:h-screen bg-bg'>
            <div
                {...rest}
                className="w-[200px] h-[calc(100vh-145px)] bg-bg border border-solid border-border_color fixed top-16 left-5 py-5 px-4 hidden md:block md:h-screen md:fixed md:top- md:left-0 md:pt-10"
            >
                <ul className="">
                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <div
                                className={
                                    'w-[20px] h-[20px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3'
                                }
                            >
                                <Image src={user_logo} alt={'logo'} />
                            </div>
                            <LabelText children="My feed" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <TiGroup className="text-xl text-primary mr-3" />
                            <LabelText children="Following" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <IoEye className="text-xl text-primary mr-3" />
                            <LabelText children="History" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <IoIosSettings className="text-xl text-primary mr-3" />
                            <LabelText children="Settings" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <CiHashtag className="text-xl text-primary mr-3" />
                            <LabelText children="Tags" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <GiWorld className="text-xl text-primary mr-3" />
                            <LabelText children="Sources" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <FaUsersBetweenLines className="text-xl text-primary mr-3" />
                            <LabelText children="Leaderboard" />
                        </Flex>
                    </li>

                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <GiDiscussion className="text-xl text-primary mr-3" />
                            <LabelText children="Discussions" />
                        </Flex>
                    </li>
                    <li className="cursor-pointer hover:bg-border_color px-3 py-2 rounded-md">
                        <Flex className="gap-x-1">
                            <FaBookBookmark className="text-xl text-primary mr-3" />
                            <LabelText children="Bookmarks" />
                        </Flex>
                    </li>
                </ul>
            </div>
        </div>
    );
}
