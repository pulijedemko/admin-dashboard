import { useAuth } from "../../context/AuthContext";
import { useAllUsers } from "../../hooks/user/useAllUser";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: totalUsers } = useAllUsers();
  console.log("Total Users:", totalUsers);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome {user?.user_metadata?.full_name}
        </h1>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers?.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Active Sessions</h3>
            <p className="text-2xl font-bold">34</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">$2,340</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
