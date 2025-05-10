const ProfileField = ({ icon: Icon, label, value, isEditing, children }) => {
  return (
    <div className="flex items-center">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <div className="flex-grow">
        <p className="text-sm text-gray-400">{label}</p>
        {!isEditing ? (
          <p className="font-medium text-gray-200">{value}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
export default ProfileField;
