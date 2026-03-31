import { useEffect, useState } from "react";

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
  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || "", // ✅ ensure string
        full_name: initialData.full_name,
        email: initialData.email,
        role: initialData.role,
      });
    } else {
      setForm({
        id: "",
        full_name: "",
        email: "",
        role: "user",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-full p-6">
        <h2 className="text-2xl font-semibold mb-5">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              name="full_name"
              placeholder="Full name"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.full_name}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.email}
              required
            />

            <select
              name="role"
              className="border rounded-lg p-3"
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
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
              disabled={!form.full_name || !form.email}
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
