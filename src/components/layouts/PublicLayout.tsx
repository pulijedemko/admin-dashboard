import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 ">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
