"use client";
import WriterCard from "@/app/components/WriterCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WriterGrid = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWriter = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}users/writers`,
        {
          cache: "no-cache",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.message);
        setError(true);
        setLoading(false);
        return;
      }
      setWriters(data?.writers);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("Error :", err);
      toast.error("Failed to fetch writers. Please try again later.");
    }
  };
  useEffect(() => {
    fetchWriter().then();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {writers?.length === 0 && loading && (
        <div className="text-center text-white text-xl">Loading...</div>
      )}
      {errorMsg && !loading && (
        <div className="text-center text-white text-xl">{errorMsg}</div>
      )}
      {writers?.length > 0 &&
        !loading &&
        writers?.map((writer) => <WriterCard key={writer?._id} {...writer} />)}
      {error && !loading && (
        <div className="text-center text-white text-xl">
          Failed to fetch writers. Please try again later.
        </div>
      )}
    </div>
  );
};
export default WriterGrid;
