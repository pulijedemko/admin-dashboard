import { useState } from "react";

interface AddUserModalProps {
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: { full_name: string; email: string; role: string }) => void;
}

const AddUserModal = ({ setIsOpen, onSubmit }: AddUserModalProps) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-full p-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Add User</h2>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
