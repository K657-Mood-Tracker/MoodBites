import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";
import { useEffect, useState, type FC } from "react";

import angryImage from "../images/angry.png";
import calmImage from "../images/calm.png";
import excitedImage from "../images/excited.png";
import sadImage from "../images/sad.png";
import stressedImage from "../images/stressed.png";

type MoodData = {
  day: string;
  value: number;
  mood: string;
  date: string;
};

type ApiMoodEntry = {
  date: string;
  mood: string | null;
};

const moodScale: Record<string, number> = {
  stressed: 1,
  angry: 2,
  sad: 3,
  calm: 4,
  happy: 5
};

const moodLabels: Record<number, string> = {
  1: "Stressed",
  2: "Angry",
  3: "Sad",
  4: "Calm",
  5: "Happy"
};

const moodPointColor: Record<string, string> = {
  stressed: "#f97316",
  angry: "#ef4444",
  sad: "#3b82f6",
  calm: "#22c55e",
  happy: "#fde047"
};

const moodImages: Record<string, string> = {
  stressed: stressedImage,
  angry: angryImage,
  sad: sadImage,
  calm: calmImage,
  happy: excitedImage
};

const getLast7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push({
      date,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      key: date.toISOString().split("T")[0]
    });
  }

  return days;
};

const getMoodDot = (props: any) => {
  const { cx, cy, payload } = props;
  const mood = String(payload.mood ?? "").toLowerCase();
  const imageUrl = moodImages[mood];

  if (imageUrl) {
    return (
      <foreignObject x={cx - 16} y={cy - 16} width={32} height={32} style={{ overflow: "visible" }}>
        <img
          src={imageUrl}
          alt={mood}
          width={32}
          height={32}
          style={{ display: "block", objectFit: "contain", backgroundColor: "white", borderRadius: 9999 }}
        />
      </foreignObject>
    );
  }

  const fill = moodPointColor[mood] || "#4f46e5";
  return <circle cx={cx} cy={cy} r={6} fill={fill} stroke="#ffffff" strokeWidth={2} />;
};

const WeeklyMood: FC = () => {
  const [weeklyMoodData, setWeeklyMoodData] = useState<MoodData[]>([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_BACKEND_URL;

        if (!token) {
          console.warn("No authentication token found for weekly mood chart");
          return;
        }

        const res = await fetch(`${apiUrl}/api/mood/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch mood history: ${res.status}`);
        }

        const rawData: ApiMoodEntry[] = await res.json();

        const dayMap = rawData.reduce<Record<string, ApiMoodEntry>>((acc, entry) => {
          const dateKey = entry.date.split("T")[0];
          if (!acc[dateKey]) {
            acc[dateKey] = entry;
          }
          return acc;
        }, {});

        const chartData = getLast7Days().map((day) => {
          const entry = dayMap[day.key];
          const mood = entry?.mood ?? "No mood";
          const moodKey = String(mood).toLowerCase();
          const value = moodScale[moodKey] ?? 0;

          return {
            day: day.label,
            date: day.key,
            mood,
            value
          };
        });

        setWeeklyMoodData(chartData);
      } catch (error) {
        console.error("Failed to fetch weekly mood chart data:", error);
      }
    };

    fetchMoodHistory();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={weeklyMoodData}
          margin={{ top: 12, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="rgb(226, 232, 240)" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            stroke="rgb(148, 163, 184)"
            style={{ fontSize: "12px", fontWeight: 500 }}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => moodLabels[value] ?? ""}
            stroke="rgb(148, 163, 184)"
            style={{ fontSize: "12px", fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid rgb(226, 232, 240)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "12px"
            }}
            labelFormatter={(label) => `Day: ${label}`}
            formatter={(value: number, name: string, props: any) => {
              const mood = props.payload.mood as string;
              return [mood, "Mood"];
            }}
            content={(props: any) => {
              if (!props.payload || props.payload.length === 0) {
                return null;
              }

              const data = props.payload[0].payload;
              const moodKey = String(data.mood ?? "").toLowerCase();
              const imageUrl = moodImages[moodKey];

              return (
                <div style={{ padding: 12, width: 180 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    {imageUrl ? (
                      <img src={imageUrl} alt={data.mood} style={{ width: 40, height: 40, borderRadius: 10 }} />
                    ) : null}
                    <div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>Day</div>
                      <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 600 }}>{props.label}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginBottom: 4 }}>
                    Mood: <strong>{data.mood}</strong>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569" }}>
                    Score: <strong>{data.value}</strong>
                  </div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="rgb(79, 70, 229)"
            strokeWidth={3}
            dot={getMoodDot}
            activeDot={{ r: 8, fill: "rgb(79, 70, 229)" }}
          >
            <LabelList dataKey="mood" position="top" style={{ fontSize: "10px", fill: "#475569" }} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeeklyMood;