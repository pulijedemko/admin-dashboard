import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import IntroPage from "./pages/dashboard/IntroPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./pages/dashboard/adminDashboard";
import UserPage from "./pages/user/UserPage";
import ProfilePage from "./pages/user/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import { UserDashboard } from "./pages/dashboard/userDashboard";
import RootLayout from "./components/layouts/RootLayout";
import MainPageLayout from "./components/layouts/MainPageLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 🌐 EVERYTHING GOES THROUGH ROOT LAYOUT (Navbar always visible) */}
          <Route element={<RootLayout />}>
            {/* 🌍 Public */}
            <Route>
              <Route path="/" element={<IntroPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>

            {/* 🧠 ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <MainPageLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* 👤 USER */}
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <MainPageLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
