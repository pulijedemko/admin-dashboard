import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const { data: userProfile } = useCurrentUser(user.id);

  return (
    <div className="w-64 bg-[#24344f]  text-white p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">
        {userProfile?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="">Dashboard</Link>
        <Link to="users">Users</Link>
        <span>Settings</span>
      </nav>
    </div>
  );
};

export default Sidebar;
