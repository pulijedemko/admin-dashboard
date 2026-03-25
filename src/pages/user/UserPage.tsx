import { useState } from "react";
import { useAllUsers } from "../../hooks/user/useAllUser";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import Modal from "../../components/ui/Modal";

const UserPage = () => {
  const { data: users } = useAllUsers();
  const deleteMutation = useDeleteUser();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!selectedUserId) return;

    deleteMutation.mutate(selectedUserId, {
      onSuccess: () => {
        setIsOpen(false); // close modal
        setSelectedUserId(null); // reset
      },
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Users</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
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
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsOpen(true);
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

      {isOpen && <Modal setIsOpen={setIsOpen} onConfirm={handleDelete} />}
    </div>
  );
};

export default UserPage;
