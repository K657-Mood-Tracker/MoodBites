import React from "react";
import "./styles.css";

type Mood = "happy" | "calm" | "neutral" | "sad" | "tired" | "angry";

type MoodEntry = {
  date: string;
  mood: Mood;
};

const moodData: MoodEntry[] = [
  { date: "2026-03-01", mood: "happy" },
  { date: "2026-03-02", mood: "calm" },
  { date: "2026-03-03", mood: "sad" },
  { date: "2026-03-05", mood: "happy" },
  { date: "2026-03-07", mood: "tired" },
  { date: "2026-03-08", mood: "angry" }
];

const moodColors: Record<Mood, string> = {
  happy: "var(--color-mood-1)",
  calm: "var(--color-mood-6)",
  neutral: "var(--color-mood-3)",
  sad: "var(--color-mood-4)",
  tired: "var(--color-mood-5)",
  angry: "var(--color-mood-2)"
};

export default function MoodCalendar() {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getMood = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return moodData.find(m => m.date === dateStr)?.mood;
  };

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const mood = getMood(i);

    days.push(
      <div
        key={i}
        className="calendar-day"
        style={{
          background: mood ? moodColors[mood] : "#f5f5f5"
        }}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <h2>Mood Calendar</h2>

      <div className="calendar-grid">
        {days}
      </div>
    </div>
  );
}