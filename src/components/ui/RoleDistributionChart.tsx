import {
  Pie,
  PieChart,
  Sector,
  Legend,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
} from "recharts";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function RoleDistributionChart({
  isAnimationActive = true,
  adminCount = 0,
  userCount = 0,
}: {
  isAnimationActive?: boolean;
  adminCount?: number;
  userCount?: number;
}) {
  const chartData = [
    { name: "Admin", value: adminCount, color: "#00C49F" }, // green
    { name: "User", value: userCount, color: "#0088FE" }, // blue
  ];

  const MyCustomPie = (props: PieSectorShapeProps) => {
    return <Sector {...props} fill={(props.payload as any).color} />;
  };

  // Custom legend to color both bullet and text
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-1">
            {/* colored bullet */}
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: entry.payload.color }}
            />
            {/* text */}
            <span style={{ color: entry.payload.color }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={chartData}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        shape={MyCustomPie}
        isAnimationActive={isAnimationActive}
      />

      <Legend content={renderLegend} />
    </PieChart>
  );
}
