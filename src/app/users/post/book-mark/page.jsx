"use client";
import BookmarkList from "@/app/components/BookmarkList";
import { useEffect, useState } from "react";

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}bookmark/${localStorage.getItem(
          "userId"
        )}`,
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setBookmarks(data.bookmarks || []);
    };

    fetchBookmarks().then();
  }, []);

  const handleRemove = async (bookmarkId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}bookmark/${bookmarkId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.ok) {
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    }
  };

  return <BookmarkList bookmarks={bookmarks} onRemoveBookmark={handleRemove} />;
}
export default BookmarksPage;
