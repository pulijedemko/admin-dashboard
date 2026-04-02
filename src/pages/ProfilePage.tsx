import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCurrentUser } from "../hooks/user/useCurrentUser";
import { useEditUser } from "../hooks/user/useEditUser";
import { useUploadAvatar } from "../hooks/user/useUploadAvatar";

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: getProfile, isLoading } = useCurrentUser(user?.id);
  const editMutation = useEditUser();
  const uploadAvatar = useUploadAvatar();

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (getProfile) {
      setForm({
        id: getProfile.id || "",
        full_name: getProfile.full_name,
        email: getProfile.email,
        role: getProfile.role,
      });
    }
  }, [getProfile]);

  if (!user || isLoading || !getProfile) {
    return (
      <div className="w-full flex justify-center mt-10">
        <p className="text-gray-500 dark:text-gray-400">Loading user...</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isChanged =
    form.full_name !== getProfile.full_name || form.email !== getProfile.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    editMutation.mutate(
      {
        id: form.id,
        full_name: form.full_name,
        email: form.email,
        role: form.role,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Profile updated successfully!");
        },
      },
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      id: getProfile.id,
      full_name: getProfile.full_name,
      email: getProfile.email,
      role: getProfile.role,
    });
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Show preview instantly
    setPreview(URL.createObjectURL(file));

    // Upload to Supabase
    uploadAvatar.mutate({
      file,
      userId: user.id,
    });
  };

  return (
    <div className="w-full md:w-1/2 mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="p-6 flex flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-md gap-6 transition-colors duration-300"
      >
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview || getProfile?.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />

          <label className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 mt-2">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Full Name
          </h3>
          {isEditing ? (
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          ) : (
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {getProfile.full_name}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Email
          </h3>
          {isEditing ? (
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          ) : (
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {getProfile.email}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Role
          </h3>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {getProfile.role}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isChanged || editMutation.isPending}
                className={`px-5 py-2 rounded-lg text-white transition-colors ${
                  isChanged
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {editMutation.isPending ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
