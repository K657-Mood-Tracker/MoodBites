import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Session = {
  id: number;
  start_time: string;
  focus_time: number;
};

type FocusTimeData = {
  day: string;
  hours: number;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const FocusTimeStatistics: React.FC = () => {
  const [focusTimeData, setFocusTimeData] = useState<FocusTimeData[]>(
    weekDays.map((day) => ({ day, hours: 0 }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFocusSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_BACKEND_URL;

        if (!token) {
          setError('Authentication token missing.');
          setLoading(false);
          return;
        }

        const res = await fetch(`${apiUrl}/api/focus-sessions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Failed to fetch focus sessions: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Unexpected focus session data.');
        }

        const aggregated = weekDays.map((day) => ({ day, hours: 0 }));

        data.forEach((session: Session) => {
          if (!session.start_time || typeof session.focus_time !== 'number') {
            return;
          }

          const date = new Date(session.start_time);
          if (Number.isNaN(date.getTime())) {
            return;
          }

          const weekday = (date.getDay() + 6) % 7;
          aggregated[weekday].hours += session.focus_time;
        });

        // Convert minutes to hours
        const dataInHours = aggregated.map(item => ({
          day: item.day,
          hours: Math.round((item.hours / 60) * 100) / 100 // Convert to hours with 2 decimal places
        }));

        setFocusTimeData(dataInHours);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFocusSessions();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading focus data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-rose-600">{error}</div>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={focusTimeData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="rgb(226, 232, 240)" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="rgb(148, 163, 184)" style={{ fontSize: '12px', fontWeight: 500 }} />
          <YAxis stroke="rgb(148, 163, 184)" style={{ fontSize: '12px', fontWeight: 500 }} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid rgb(226, 232, 240)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
          <Line type="monotone" dataKey="hours" stroke="rgb(168, 85, 247)" strokeWidth={3} dot={{ fill: 'rgb(168, 85, 247)', r: 5 }} activeDot={{ r: 7, fill: 'rgb(147, 51, 234)' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FocusTimeStatistics;