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
const WeeklyMood: React.FC = () => {
// Example data inside the same file
const weeklyMoodData: MoodData[] = [
  { day: "Mon", count: 1 },
  { day: "Tue", count: 3 },
  { day: "Wed", count: 2 },
  { day: "Thu", count: 3 },
  { day: "Fri", count: 4 },
  { day: "Sat", count: 7 },
  { day: "Sun", count: 3 }
];

return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyMoodData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="rgb(226, 232, 240)" strokeDasharray="3 3" />

          <XAxis 
            dataKey="day" 
            stroke="rgb(148, 163, 184)"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <YAxis 
            allowDecimals={false}
            stroke="rgb(148, 163, 184)"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />

          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid rgb(226, 232, 240)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="rgb(79, 70, 229)"
            strokeWidth={3}
            dot={{ fill: 'rgb(79, 70, 229)', r: 5 }}
            activeDot={{ r: 7, fill: 'rgb(67, 56, 202)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeeklyMood;