import {
  type BarShapeProps,
  type LabelProps,
  Label,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  LabelList,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#ef4444",
  "#ec4899",
  "#6366f1",
];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;
  const color = colors[index % colors.length];

  return (
    <path
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      strokeWidth={props.isActive ? 4 : 0}
      style={{ transition: "stroke-width 0.3s ease" }}
    />
  );
};

const CustomColorLabel = (props: LabelProps) => {
  const fill = colors[(props.index ?? 0) % colors.length];
  return <Label {...props} fill={fill} />;
};

interface ProfitChartProps {
  totalUsers: any[];
}

export default function ProfitChart({ totalUsers }: ProfitChartProps) {
  const { darkMode } = useTheme();

  const data = totalUsers.map((user, index) => ({
    name: user.full_name || `User ${index + 1}`,
    current_profit: user.current_profit,
  }));

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        aspectRatio: 1.618,
      }}
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke={darkMode ? "#444" : "#e5e7eb"}
      />

      <Tooltip
        cursor={false}
        contentStyle={{
          backgroundColor: darkMode ? "#fff" : "#e5e7eb",
          border: "none",
          boxShadow: "none",
          color: "#000",
        }}
      />

      <XAxis dataKey="name" tick={{ fill: darkMode ? "#e5e7eb" : "#374151" }} />
      <YAxis width={60} tick={{ fill: darkMode ? "#e5e7eb" : "#374151" }} />

      <Bar dataKey="current_profit" shape={TriangleBar}>
        <LabelList content={CustomColorLabel} position="top" />
      </Bar>
    </BarChart>
  );
}
