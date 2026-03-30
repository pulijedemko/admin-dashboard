import ProfitChart from "../../components/ui/ProfitChart";
import RoleDistributionChart from "../../components/ui/RoleDistributionChart";
import { useAuth } from "../../context/AuthContext";
import { useAllUsers } from "../../hooks/user/useAllUser";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: totalUsers } = useAllUsers();

  const adminCount = totalUsers?.filter((u) => u.role === "admin").length || 0;
  const userCount = totalUsers?.filter((u) => u.role === "user").length || 0;

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
            <h3 className="text-lg font-semibold">Admin</h3>
            <p className="text-2xl font-bold">{adminCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Users</h3>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>
        <div className="bg-white my-6 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">User Profits</h2>
          <ProfitChart totalUsers={totalUsers || []} />
        </div>
        <div className="md:flex justify-between  items-center bg-white my-6 p-6 rounded-xl shadow">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold ">Role Distribution</h2>
            <RoleDistributionChart
              isAnimationActive={true}
              adminCount={adminCount}
              userCount={userCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
