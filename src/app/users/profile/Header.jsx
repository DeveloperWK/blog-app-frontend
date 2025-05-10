import { Edit, Trash2, X } from "lucide-react";
<<<<<<< HEAD
=======

>>>>>>> refactor/check
const Header = ({ isEditing, onEdit, onDelete, onCancel }) => {
  return (
    <div className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Profile</h1>
      <div className="flex space-x-2">
        {!isEditing ? (
          <>
            <button
              onClick={onEdit}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onCancel}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <X size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
