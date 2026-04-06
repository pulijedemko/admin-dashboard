import Logo from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabaseClient";
import { DarkModeToggle } from "../ui/DarkMode";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div
      className="flex justify-between items-center p-4 md:px-16 w-full
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      border-b border-gray-200 dark:border-gray-700
      transition-colors duration-300"
    >
      {/* Logo */}
      <Link to={user ? "/dashboard" : "/"}>
        <img src={Logo} alt="logo" className="h-12 w-12" />
      </Link>

      {/* Right side */}
      {user ? (
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md
              text-gray-700 dark:text-gray-300
              hover:text-red-500
              transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            to="/signin"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-3 py-1 rounded-md
              bg-blue-600 text-white
              hover:bg-blue-700
              transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
