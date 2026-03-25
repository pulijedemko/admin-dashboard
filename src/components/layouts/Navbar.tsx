import Logo from "../../assets/react.svg";
import userLogo from "../../assets/user.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabaseClient";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center p-4 md:px-16 bg-slate-800 w-full">
      {/* Logo */}
      <Link to={user ? "/dashboard" : "/"}>
        <img src={Logo} alt="logo" className="h-14 w-14" />
      </Link>

      {/* Right side */}
      {user ? (
        <div className="flex items-center gap-4">
          <img src={userLogo} alt="user" className="h-10 w-10" />
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/signin" className="text-white hover:underline">
            Sign In
          </Link>
          <Link to="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
