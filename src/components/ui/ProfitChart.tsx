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

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "black",
];

// #endregion
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
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      style={{
        transition: "stroke-width 0.3s ease-out",
      }}
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
  console.log("ProfitChart totalUsers:", totalUsers);

  const data = totalUsers.map((user, index) => ({
    name: user.full_name || `User ${index + 1}`,
    profit: user.current_profit,
    // Just a placeholder value for the bar height
  }));

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "1200px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip cursor={{ fillOpacity: 0.5 }} />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Bar dataKey="profit" fill="#8884d8" shape={TriangleBar} activeBar>
        <LabelList content={CustomColorLabel} position="top" />
      </Bar>
    </BarChart>
  );
}
