import type { Dispatch, SetStateAction } from "react";

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

const Modal = ({ setIsOpen, onConfirm }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
