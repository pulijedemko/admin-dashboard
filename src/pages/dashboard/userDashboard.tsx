import { useAuth } from "../../context/AuthContext";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";

export const UserDashboard = () => {
  const { user } = useAuth();
  const { data: userData } = useCurrentUser(user?.id);

  const actual = userData?.current_profit || 0;
  const old = userData?.old_profit || 0;

  const change = actual - old;
  const percent = old !== 0 ? (change / old) * 100 : 0;
  const isPositive = change >= 0;

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome back {userData?.full_name} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here’s your profit overview
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Profit */}
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Current Profit</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            {formatMoney(actual)}
          </h2>
        </div>

        {/* Previous Profit */}
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Previous Profit</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            {formatMoney(old)}
          </h2>
        </div>

        {/* Change */}
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Change</p>

          <div className="flex items-center gap-2 mt-2">
            <h2
              className={`text-3xl font-bold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "▲" : "▼"} {percent.toFixed(2)}%
            </h2>
          </div>

          <p className="text-sm text-gray-400 mt-1">
            {isPositive ? "Growth" : "Decrease"} compared to previous period
          </p>
        </div>
      </div>

      {/* Optional extra section */}
      <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Insight
        </h3>

        <p className="text-gray-500 mt-2">
          {isPositive
            ? "Your profit is growing steadily 🚀 Keep going!"
            : "Your profit has dropped. Consider reviewing recent activity."}
        </p>
      </div>
    </div>
  );
};
