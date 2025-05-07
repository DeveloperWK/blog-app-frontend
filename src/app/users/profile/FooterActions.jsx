const FooterActions = ({ isEditing, onCancel, onSave,isLoading }) => {
    if (!isEditing) return null;

    return (
        <div className="p-4 bg-gray-800 flex justify-end space-x-2">
            <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-700 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                {isLoading ? "Saving..." : "  Save Changes"}
            </button>
        </div>
    );
};
export default FooterActions;