import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

const signInUpForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const isSignUp = pathname === "/signup";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // SIGN UP
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      // ⭐ Insert user into your users table
      if (data.user) {
        await supabase.from("users").insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
            role: "user", // default role
          },
        ]);
      }
    }

    // SIGN IN
    else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }
    }

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <label className="text-lg text-gray-800">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-800">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-800">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      {!isSignUp && (
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default signInUpForm;
