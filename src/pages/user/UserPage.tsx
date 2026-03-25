import { useState } from "react";
import { useAllUsers } from "../../hooks/user/useAllUser";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import Modal from "../../components/ui/DeleteModal";
import { useAddUser } from "../../hooks/user/useAddUser";
import { useEditUser } from "../../hooks/user/useEditUser";
import CreateUpdateModal from "../../components/ui/CreateUpdateModal";

const UserPage = () => {
  const { data: users } = useAllUsers();
  const deleteMutation = useDeleteUser();
  const editMutation = useEditUser();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModalType, setOpenModalType] = useState<"add" | "edit" | null>(
    null,
  );

  const createMutation = useAddUser();

  const handleAddUser = (data: any) => {
    const { id, ...userData } = data; // remove id

    createMutation.mutate(userData, {
      onSuccess: () => {
        setOpenModalType(null);
      },
    });
  };

  const handleDelete = () => {
    if (!selectedUserId) return;

    deleteMutation.mutate(selectedUserId, {
      onSuccess: () => {
        setIsOpenDeleteModal(false); // close modal
        setSelectedUserId(null); // reset
      },
    });
  };

  const handleEditUser = (data: {
    id?: string;
    full_name: string;
    email: string;
    role: string;
  }) => {
    if (!data.id) {
      console.error("User ID is required for editing!");
      return;
    }

    const { id, full_name, email, role } = data;

    editMutation.mutate(
      { id: id, full_name: full_name, email, role }, // map to mutation
      {
        onSuccess: () => setOpenModalType(null),
        onError: (error) => console.error("Failed to update user:", error),
      },
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Users</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setOpenModalType("add")}
          >
            + Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.full_name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setOpenModalType("edit");
                        setSelectedUserId(user.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsOpenDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openModalType && (
        <CreateUpdateModal
          setIsOpen={() => setOpenModalType(null)}
          onSubmit={openModalType === "edit" ? handleEditUser : handleAddUser}
          initialData={
            openModalType === "edit"
              ? {
                  id: selectedUserId!,
                  full_name:
                    users?.find((u) => u.id === selectedUserId)?.full_name ||
                    "",
                  email:
                    users?.find((u) => u.id === selectedUserId)?.email || "",
                  role:
                    users?.find((u) => u.id === selectedUserId)?.role || "user",
                }
              : undefined
          }
          isEdit={openModalType === "edit"}
        />
      )}

      {isOpenDeleteModal && (
        <Modal setIsOpen={setIsOpenDeleteModal} onConfirm={handleDelete} />
      )}
    </div>
  );
};

export default UserPage;
