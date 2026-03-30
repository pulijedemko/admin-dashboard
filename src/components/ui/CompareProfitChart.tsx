import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface SimpleBarChartProps {
  data: any[];
}

const SimpleBarChart = ({ data }: SimpleBarChartProps) => {
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
      responsive
      data={dataChart}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="current_profit"
        fill="#8884d8"
        activeBar={{ fill: "pink", stroke: "blue" }}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="old_profit"
        fill="#82ca9d"
        activeBar={{ fill: "gold", stroke: "purple" }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default SimpleBarChart;
