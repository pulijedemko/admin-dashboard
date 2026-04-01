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
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {filteredUsers?.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                {user.full_name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                {user.email}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsOpenDeleteModal(true);
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-800 hover:border-red-300 dark:hover:border-red-600 transition"
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
