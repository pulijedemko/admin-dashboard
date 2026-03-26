interface UserTableProps {
  filteredUsers: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  }[];
  setOpenModalType: (type: "add" | "edit") => void;
  setSelectedUserId: (id: string) => void;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
}

const UserTable = ({
  filteredUsers,
  setOpenModalType,
  setSelectedUserId,
  setIsOpenDeleteModal,
}: UserTableProps) => {
  return (
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
          {filteredUsers?.map((user) => (
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

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setOpenModalType("edit");
                      setSelectedUserId(user.id);
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsOpenDeleteModal(true);
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
