import { useState } from "react";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 ">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-gray-700 ">Are you sure?</p>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirmation(false)}>
              Cancel
            </button>

            <button
              type="button"
              className="primary"
              onClick={() => {
                onDelete();
                setShowConfirmation(false);
              }}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirmation(true)}>
      {label}
    </button>
  );
};

export default DeleteButton;
