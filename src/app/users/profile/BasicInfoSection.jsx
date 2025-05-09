import ProfileField from "@/app/users/profile/ProfileField";
import { User, Mail, Key, Shield } from "lucide-react";
import Link from "next/link";
const BasicInfoSection = ({ profile, tempProfile, isEditing, onInputChange }) => {
    return (
        <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Basic Information</h2>
            <div className="space-y-4">
                {/* Name */}
                <ProfileField
                    icon={User}
                    label="Name"
                    value={`${profile?.firstName} ${profile?.lastName || ""}`}
                    isEditing={isEditing}
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="firstName"
                            value={tempProfile?.firstName}
                            onChange={onInputChange}
                            className="w-1/2 bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={tempProfile?.lastName}
                            onChange={onInputChange}
                            className="w-1/2 bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
                            placeholder="Last Name"
                        />
                    </div>
                </ProfileField>

                {/* Email */}
                <ProfileField
                    icon={Mail}
                    label="Email"
                    value={profile?.email}
                    isEditing={isEditing}
                >
                    <input
                        type="email"
                        name="email"
                        disabled={isEditing}
                        value={profile?.email}
                        onChange={onInputChange}
                        className="w-full bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
                        placeholder="Email"
                    />
                </ProfileField>

                {/* Password */}
                <ProfileField
                    icon={Key}
                    label="Password"
                    value={profile?.password}
                    isEditing={isEditing}
                >
                    <Link href={`/auth/change-password?email=${encodeURIComponent(profile?.email)}`} className="text-blue-600 hover:underline">Change Password</Link>
                </ProfileField>

                {/* 2FA */}
                <ProfileField
                    icon={Shield}
                    label="2FA Authentication"
                    value={profile?.is2FAEnabled ? "Enabled" : "Disabled"}
                    isEditing={isEditing}
                >
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is2FAEnabled"
                            name="is2FAEnabled"
                            checked={tempProfile?.is2FAEnabled}
                            onChange={onInputChange}
                            className="mr-2 h-4 w-4 accent-blue-500"
                        />
                        <label htmlFor="is2FAEnabled" className="text-gray-200">
                            {tempProfile?.is2FAEnabled ? "Enabled" : "Disabled"}
                        </label>
                    </div>
                </ProfileField>
            </div>
        </section>
    );
};
export default BasicInfoSection;