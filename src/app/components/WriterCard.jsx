"use client";
import { useState } from "react";

function WriterCard({ firstName, lastName, role, bio, avatar }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-gray-900 rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto text-white cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      tabIndex="0"
      role="button"
    >
      {/* Header */}
      <div className="p-4 flex items-center space-x-4">
        <img
          className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500"
          src={avatar}
          alt={`${name}'s avatar`}
        />
        <div>
          <h2 className="text-lg font-semibold">{`@ ${firstName} ${
            lastName || ""
          }`}</h2>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 pb-4 text-sm text-gray-300 transition-all duration-300 ease-in-out">
        {isExpanded ? bio : bio.slice(0, 100) + (bio.length > 100 ? "..." : "")}
      </div>
    </div>
  );
}

export default WriterCard;
