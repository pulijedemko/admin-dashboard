import { useState } from "react";
import { toast } from "react-toastify";

import { useAllUsers } from "../../hooks/user/useAllUser";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import { useAddUser } from "../../hooks/user/useAddUser";
import { useEditUser } from "../../hooks/user/useEditUser";

import Modal from "../../components/ui/DeleteModal";
import CreateUpdateModal from "../../components/ui/CreateUpdateModal";
import FilterInputs from "../../components/ui/FilterInputs";
import UserTable from "../../components/sections/UserTable";
import { useDebounce } from "../../hooks/useDebounce";

const UserPage = () => {
  const { data: users } = useAllUsers();
  const createMutation = useAddUser();
  const editMutation = useEditUser();
  const deleteMutation = useDeleteUser();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModalType, setOpenModalType] = useState<"add" | "edit" | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter users based on search and role
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.full_name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (data: any) => {
    const { id, ...userData } = data;

    createMutation.mutate(userData, {
      onSuccess: () => {
        setOpenModalType(null);
        toast.success("User added successfully!");
      },
    });
  };

  const handleEditUser = (data: {
    id?: string;
    full_name: string;
    email: string;
    role: string;
  }) => {
    if (!data.id) return;

    editMutation.mutate(
      {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        role: data.role,
      },
      {
        onSuccess: () => {
          setOpenModalType(null);
          toast.success("User updated successfully!");
        },
      },
    );
  };

  const handleDelete = () => {
    if (!selectedUserId) return;

    deleteMutation.mutate(selectedUserId, {
      onSuccess: () => {
        setIsOpenDeleteModal(false);
        setSelectedUserId(null);
        toast.success("User deleted successfully!");
      },
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Filter Inputs */}
      <FilterInputs
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Users
          </h2>

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setOpenModalType("add")}
            >
              + Add User
            </button>
          </div>
        </div>

        {/* User Table */}
        <UserTable
          filteredUsers={filteredUsers || []}
          setOpenModalType={setOpenModalType}
          setSelectedUserId={setSelectedUserId}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
        />
      </div>

      {/* Add/Edit Modal */}
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

      {/* Delete Modal */}
      {isOpenDeleteModal && (
        <Modal setIsOpen={setIsOpenDeleteModal} onConfirm={handleDelete} />
      )}
    </div>
  );
};

export default UserPage;
