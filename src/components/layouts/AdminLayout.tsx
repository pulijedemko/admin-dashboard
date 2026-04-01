import { Outlet } from "react-router-dom";
import Sidebar from "../sections/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
      </div>
    </div>
  );
}
