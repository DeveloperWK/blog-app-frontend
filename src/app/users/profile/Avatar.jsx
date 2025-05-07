import {User} from "lucide-react";
const Avatar = ({ profile }) => {
    return (
        <div className="flex justify-center mb-4">
            <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-white bg-gray-600 flex items-center justify-center overflow-hidden">
                    {profile ? (
                        <img src={profile} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <User size={40} className="text-gray-400" />
                    )}
                </div>
                )
            </div>
        </div>
    );
};
export default Avatar;