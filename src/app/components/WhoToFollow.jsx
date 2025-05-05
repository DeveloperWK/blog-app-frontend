import Image from 'next/image';
import user_logo from '../../assets/user_logo.png';

export default function WhoToFollow() {
    return (
        <div className="flex items-center justify-between hover:bg-card_bg rounded-xl p-3 transition cursor-help">
            <div className="flex items-center space-x-4">
                <div
                    className={
                        'w-[24px] h-[24px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3'
                    }
                >
                    <Image src={user_logo} alt={'logo'} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        Henry
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        @henry
                    </p>
                </div>
            </div>
            <button className="px-4 py-1.5 border border-solid border-border_color text-white text-sm rounded-full hover:bg-border_color transition shadow-md cursor-pointer">
                Follow
            </button>
        </div>
    );
}
