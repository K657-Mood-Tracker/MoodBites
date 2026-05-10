import "./styles.css";
import { useState, useEffect } from "react";

type Mood = "happy" | "calm" | "neutral" | "sad" | "tired" | "angry";

type MoodEntry = {
  date: string;
  mood: string;
};

const moodColors: Record<string, string> = {
  happy: "#fef3c7", // yellow-100
  calm: "#d1fae5", // emerald-100
  neutral: "#dbeafe", // blue-100
  sad: "#dbeafe", // blue-100
  tired: "#f1f5f9", // slate-100
  angry: "#fee2e2", // red-100
  stressed: "#f1f5f9" // slate-100
};

export default function MoodCalendar() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        
        if (!token) {
          console.warn("No authentication token found");
          setMoodData([]);
          return;
        }

        const res = await fetch(`${apiUrl}/api/mood/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch mood history: ${res.status}`);
        }

        const data = await res.json();

        console.log("Mood history data:", data);

        if (Array.isArray(data)) {
          setMoodData(data.map((entry) => ({
            ...entry,
            mood: String(entry.mood ?? '').toLowerCase()
          })));
        } else {
          console.error("API did not return an array:", data);
          setMoodData([]);
        }

      } catch (err) {
        console.error("Failed to fetch mood history:", err);
        setMoodData([]);
      }
    };

    fetchMoodHistory();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getMood = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const moodEntry = moodData.find(m => m.date === dateStr);
    return moodEntry?.mood;
  };

  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDay = new Date(year, month, 1).getDay();

  // Add empty slots for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day-empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const mood = getMood(i);
    const moodKey = mood?.toLowerCase();

    days.push(
      <div
        key={i}
        className="calendar-day"
        style={{
          background: moodKey ? moodColors[moodKey] || "rgb(241, 245, 249)" : "rgb(241, 245, 249)",
          border: moodKey ? '2px solid rgba(0,0,0,0.05)' : '1px solid rgb(226, 232, 240)'
        }}
        title={mood || 'No mood recorded'}
      >
        <span className="text-xs">{i}</span>
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Mood Calendar - {monthName}</p>
      </div>
      
      <div className="mb-3">
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-grid">
        {days}
      </div>

      
    </div>
  );
}