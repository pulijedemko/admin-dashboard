import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useAuth } from "../../context/AuthContext";
import userLogo from "../../assets/icons/user.png";

const Sidebar = () => {
  const { user } = useAuth();
  const { data: userProfile } = useCurrentUser(user.id);

  const isAdmin = userProfile?.role === "admin";

  return (
    <div className="w-64 h-screen bg-[#24344f] text-white p-6 hidden md:flex flex-col justify-between">
      {/* TOP SECTION */}
      <div>
        <h2 className="text-xl font-bold mb-8">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h2>

        <nav className="flex flex-col gap-4">
          <Link to="">Dashboard</Link>
          {isAdmin && <Link to="users">Users</Link>}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mb-10">
        <Link to="profile" className="block">
          <div className="flex gap-2 items-center">
            <img src={userLogo} alt="user" className="h-6 w-6" />
            Profile
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
