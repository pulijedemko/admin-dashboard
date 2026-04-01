import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

interface SimpleBarChartProps {
  data: any[];
}

const SimpleBarChart = ({ data }: SimpleBarChartProps) => {
  const { darkMode } = useTheme();

  const dataChart = data.map((user, index) => ({
    name: user.full_name || `User ${index + 1}`,
    current_profit: user?.current_profit,
    old_profit: user?.old_profit,
  }));

  return (
    <BarChart
      style={{
        width: "100%",
        maxHeight: "50vh",
        aspectRatio: 1.618,
      }}
      data={dataChart}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke={darkMode ? "#555" : "#ccc"}
      />
      <XAxis dataKey="name" tick={{ fill: darkMode ? "#fff" : "#000" }} />
      <YAxis width={60} tick={{ fill: darkMode ? "#fff" : "#000" }} />
      <Tooltip
        cursor={false}
        contentStyle={{
          backgroundColor: darkMode ? "#fff" : "#e5e7eb",
          border: "none",
          boxShadow: "none",
          color: "#000",
        }}
      />
      <Legend
        wrapperStyle={{
          color: darkMode ? "#fff" : "#000",
        }}
      />
      <Bar
        dataKey="current_profit"
        fill={darkMode ? "#a78bfa" : "#8884d8"}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="old_profit"
        fill={darkMode ? "#34d399" : "#82ca9d"}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default SimpleBarChart;
