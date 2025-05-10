import usePostFilter from "@/app/hooks/usePostFilter";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaHeart, FaRegLaughBeam } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
const useGiveReact = () => {
  const [selectedReaction, setSelectedReaction] = useState({
    reactionType: "",
    blogId: "",
  });
  const [isReacted, setIsReacted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userReactions, setUserReactions] = useState({});
  const { fetchFilterPosts } = usePostFilter();
  const getReactionIcon = (type, isActive) => {
    const baseClass =
      "text-[18px] cursor-pointer transition-transform duration-150";
    const activeClass = isActive ? "scale-110  drop-shadow-md" : "";

    const iconStyles = {
      like: `text-primary ${baseClass} ${activeClass}`,
      love: `text-red-500 ${baseClass} ${activeClass}`,
      funny: `text-yellow-400 ${baseClass} ${activeClass}`,
      insightful: `text-blue-400 ${baseClass} ${activeClass}`,
    };

    const icons = {
      like: <BiLike className={iconStyles.like} />,
      love: <FaHeart className={iconStyles.love} />,
      funny: <FaRegLaughBeam className={iconStyles.funny} />,
      insightful: <FaRegLightbulb className={iconStyles.insightful} />,
    };

    return icons[type];
  };
  const reactionTypes = ["like", "love", "funny", "insightful"];
  const reactPost = async () => {
    if (!selectedReaction?.reactionType) return;
    const currentReaction = userReactions[selectedReaction?.blogId];
    const isRemoving = currentReaction === selectedReaction?.reactionType;
    try {
      setIsReacted(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}reactions/${selectedReaction?.blogId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reactionType: selectedReaction?.reactionType,
          }),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setIsReacted(false);
        setIsError(true);
        return;
      }
      setIsReacted(false);
      setIsError(false);
      setUserReactions((prev) => ({
        ...prev,
        [selectedReaction.blogId]: isRemoving
          ? null
          : selectedReaction?.reactionType,
      }));
    } catch (err) {
      setIsError(true);
      console.error("Error :", err);
      setIsReacted(false);
    }
  };
  useEffect(() => {
      reactPost().then();
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReaction]);
  useEffect(() => {
    if (userReactions) {
      fetchFilterPosts().then();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReactions]);
  return {
    selectedReaction,
    setSelectedReaction,
    isReacted,
    setIsReacted,
    getReactionIcon,
    reactPost,
    reactionTypes,
    isError,
    setIsError,
    userReactions,
  };
};
export default useGiveReact;
