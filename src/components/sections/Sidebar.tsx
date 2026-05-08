import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const { data: userProfile } = useCurrentUser(user?.id);

  const isAdmin = userProfile?.role === "admin";

  const linkStyle = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  if (!user) return null;

  return (
    <div
      className="w-64 h-screen hidden md:flex flex-col justify-between p-6
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-700
      transition-colors duration-300"
    >
      {/* TOP */}
      <div>
        <h2 className="text-xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h2>

        <nav className="flex flex-col gap-2">
          {/* Dashboard */}
          <Link
            to={isAdmin ? "/admin" : "/user"}
            className={linkStyle(isAdmin ? "/admin" : "/user")}
          >
            Dashboard
          </Link>

          {/* Admin-only links */}
          {isAdmin && (
            <Link to="/admin/users" className={linkStyle("/admin/users")}>
              Users
            </Link>
          )}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={isAdmin ? "/admin/profile" : "/user/profile"}
          className="flex items-center gap-3"
        >
          <img
            src={userProfile?.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
