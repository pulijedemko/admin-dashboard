import Logo from "../../assets/react.svg";
import userLogo from "../../assets/user.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabaseClient";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 md:px-16 bg-slate-800 w-full ">
      <Link to="/">
        {" "}
        <img src={Logo} alt="logo" className="h-14 w-14" />{" "}
      </Link>

      <div className="hidden">
        <input type="text" placeholder="Search..." className="text-white" />
      </div>
      {user ? (
        <div className="flex items-center justify-between gap-4">
          <img src={userLogo} alt="logo" className="h-10 w-10" />
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <Link to="/signin">
            <button className="text-white">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="text-white">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};
