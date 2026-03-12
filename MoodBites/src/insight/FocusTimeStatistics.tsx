import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type MoodData = {
  day: string;
  count: number;
};
const FocusTimeStatistics: React.FC = () => {
// Example data inside the same file
const focusTimeData: MoodData[] = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 5 },
  { day: "Wed", count: 2 },
  { day: "Thu", count: 6 },
  { day: "Fri", count: 4 },
  { day: "Sat", count: 7 },
  { day: "Sun", count: 3 }
];

return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)"
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>Focus time weekly</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={focusTimeData}>
          <CartesianGrid stroke="#f0efeb" strokeDasharray="3 3" />

          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-brand-accent)"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default FocusTimeStatistics;