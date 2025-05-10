const BioSection = ({ profile, isEditing, onInputChange, tempProfile }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-100 mb-5 border-b border-gray-700 pb-2">
        About
      </h2>

      <div className="w-full">
        <label className="block text-sm text-gray-400 mb-2">Bio</label>

        {!isEditing ? (
          <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
            {profile || "No bio available."}
          </p>
        ) : (
          <textarea
            name="bio"
            value={tempProfile?.bio}
            onChange={onInputChange}
            className="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none rounded-lg p-3 text-sm text-gray-200 min-h-[120px] resize-none transition"
            placeholder="Write something about yourself..."
          />
        )}
      </div>
    </section>
  );
};
export default BioSection;
