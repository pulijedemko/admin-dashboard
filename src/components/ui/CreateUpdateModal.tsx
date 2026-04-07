import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useAddUser } from "../../hooks/user/useAddUser";

interface ModalTypeProps {
  setIsOpen: () => void;
  onSubmit: (data: {
    id?: string;
    full_name: string;
    email: string;
    role: string;
  }) => void;
  initialData?: { id?: string; full_name: string; email: string; role: string };
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
  const [mode, setMode] = useState<"manual" | "excel">("manual");
  const createMutation = useAddUser();

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || "",
        full_name: initialData.full_name,
        email: initialData.email,
        role: initialData.role,
      });
    } else {
      setForm({ id: "", full_name: "", email: "", role: "user" });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "manual") onSubmit(form);
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    let success = 0;
    let failed: any[] = [];

    for (const row of rows) {
      const { Name, Email, Role } = row as any;

      if (!Name || !Email) {
        failed.push({ row, error: "Missing Name or Email" });
        continue;
      }

      try {
        await createMutation.mutateAsync({
          full_name: Name,
          email: Email,
          role: Role || "user",
        });
        success++;
      } catch (error: any) {
        failed.push({ row, error: error.message });
      }
    }

    toast.success(`Users added: ${success}, Failed: ${failed.length}`);
    console.log("Failed rows:", failed);
    setIsOpen(); // close modal after upload
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-full p-6">
        <h2 className="text-2xl font-semibold mb-5">
          {isEdit ? "Edit User" : "Add Users"}
        </h2>

        {/* Mode Selection */}
        {!isEdit && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("manual")}
              className={`flex-1 py-2 rounded-lg ${
                mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setMode("excel")}
              className={`flex-1 py-2 rounded-lg ${
                mode === "excel" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Import Excel
            </button>
          </div>
        )}

        {/* Manual Form */}
        {mode === "manual" && (
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
                onClick={setIsOpen}
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
        )}

        {/* Excel Import */}
        {mode === "excel" && !isEdit && (
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
              className="px-4 py-2 border rounded-lg cursor-pointer"
            />
            <button
              onClick={setIsOpen}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUpdateModal;
