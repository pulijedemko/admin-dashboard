import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IntroPage from "./pages/dashboard/IntroPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./pages/dashboard/adminDashboard";
import AdminLayout from "./components/layouts/AdminLayout";
import UserPage from "./pages/user/UserPage";
import PublicLayout from "./components/layouts/PublicLayout";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<IntroPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 🧠 Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
