"use client";
import { useAuth } from "@/app/context/AuthContext/AuthProvider";
import { techOccupations } from "@/app/data/occupations";
import usePostLogic from "@/app/hooks/usePostLogic";
import useUsersLogic from "@/app/hooks/useUsersLogic";
import Avatar from "@/app/users/profile/Avatar";
import BasicInfoSection from "@/app/users/profile/BasicInfoSection";
import BioSection from "@/app/users/profile/BioSection";
import FooterActions from "@/app/users/profile/FooterActions";
import Header from "@/app/users/profile/Header";
import PostsSection from "@/app/users/profile/PostsSection";
import ProfessionalSection from "@/app/users/profile/ProfessionalSection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProfilePage() {
  const roles = ["writer", "user"];
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { deletePost, writerPosts } = usePostLogic();
  const router = useRouter();
  const { signOut } = useAuth();
  const [tempProfile, setTempProfile] = useState({
    firstName: "",
    lastName: "",
    role: "",
    is2FAEnabled: false,
    bio: "",
    country: "",
    occupation: "",
  });
  const { fetchUser } = useUsersLogic();
  useEffect(() => {
    fetchUser().then((r) => setUser(r));
  }, []);
  useEffect(() => {
    if (user) {
      setTempProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "",
        is2FAEnabled: user.is2FAEnabled ?? false,
        bio: user.bio || "",
        country: user.country || "",
        occupation: user.occupation || "",
      });
    }
  }, [user]);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}users/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...tempProfile }),
        }
      );
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      toast.success("Profile updated successfully.");
      signOut();
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Error :", err);
      setIsError(true);
      setIsLoading(false);
      toast.error("Failed to update profile. Please try again later.");
    }
    setIsEditing(false);
  };

  const handleAccDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmed) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}users/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      signOut();
      router.push("/");
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error :", err);
      toast.error("Failed to delete account. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePostDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;
    await deletePost(postId);
  };
  return (
    <div className="bg-gray-900 min-h-screen px-6 py-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Buttons - visible on mobile only */}
        <div className="flex justify-end gap-3 px-4 py-4 rounded-xl bg-gray-900 border border-gray-700 lg:hidden">
          <Header
            isEditing={isEditing}
            onEdit={handleEdit}
            onDelete={handleAccDelete}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden grid lg:grid-cols-3 lg:gap-8 border border-gray-700">
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-1 p-6 border-r border-gray-700 flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="flex justify-center mt-8 mb-4">
              <div className="relative group w-24 h-24">
                <Avatar profile={user?.avatar} />
                <div className="absolute inset-0 rounded-full ring-2 ring-gray-700 group-hover:ring-blue-500 transition duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Basic Info */}
            <BasicInfoSection
              profile={user}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              tempProfile={tempProfile}
            />

            {/* Bio */}
            <BioSection
              profile={user?.bio}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              tempProfile={tempProfile}
            />
          </div>

          {/* Right Column: Professional & Posts */}
          <div className="lg:col-span-2 p-6 space-y-8 flex flex-col justify-between">
            {/* Header Buttons - visible only on desktop */}
            <div className="hidden lg:flex justify-end gap-3 p-4 border-b border-gray-700 bg-gray-900">
              <Header
                isEditing={isEditing}
                onEdit={handleEdit}
                onDelete={handleAccDelete}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>

            {/* Professional Info */}
            <ProfessionalSection
              profile={user}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              roles={roles}
              occupations={techOccupations?.occupations}
              tempProfile={tempProfile}
            />

            {/* Posts */}
            <PostsSection posts={writerPosts} onPostDelete={handlePostDelete} />

            {/* Footer */}
            <div className="pt-4 border-t border-gray-700">
              <FooterActions
                isEditing={isEditing}
                onCancel={handleCancel}
                onSave={handleSave}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
