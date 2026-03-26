import { useState } from "react";
import { useAllUsers } from "../../hooks/user/useAllUser";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import Modal from "../../components/ui/DeleteModal";
import { useAddUser } from "../../hooks/user/useAddUser";
import { useEditUser } from "../../hooks/user/useEditUser";
import CreateUpdateModal from "../../components/ui/CreateUpdateModal";
import FilterInputs from "../../components/ui/FilterInputs";
import UserTable from "../../components/sections/UserTable";

const UserPage = () => {
  const { data: users } = useAllUsers();
  const deleteMutation = useDeleteUser();
  const editMutation = useEditUser();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModalType, setOpenModalType] = useState<"add" | "edit" | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

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
      <FilterInputs
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

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
        <UserTable
          filteredUsers={filteredUsers || []}
          setOpenModalType={setOpenModalType}
          setSelectedUserId={setSelectedUserId}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
        />
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
