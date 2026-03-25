import { useState } from "react";

interface ModalTypeProps {
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: {
    id?: string;
    full_name: string;
    email: string;
    role: string;
  }) => void;
  initialData?: {
    id?: string;
    full_name: string;
    email: string;
    role: string;
  };
  isEdit?: boolean;
}

const CreateUpdateModal = ({
  setIsOpen,
  onSubmit,
  initialData,
  isEdit,
}: ModalTypeProps) => {
  initialData = initialData || {
    full_name: "",
    email: "",
    role: "user",
  };
  const [form, setForm] = useState({
    id: initialData?.id,
    full_name: initialData?.full_name || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("Updated form state:", {
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-full p-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              name="full_name"
              placeholder="Full name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              value={form.full_name}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              value={form.email}
              required
            />
            <select
              name="role"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              value={form.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateModal;
