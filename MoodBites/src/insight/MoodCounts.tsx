import React from "react";
import "./styles.css";
import { Smile, Zap, Coffee, AlertTriangle, Heart} from 'lucide-react';


type MoodEntry = {
  mood: "happy" | "calm" | "neutral" | "sad" | "tired" | "angry";
  date: string;
};

const moodLog: MoodEntry[] = [
  { mood: "happy", date: "2026-03-10" },
  { mood: "happy", date: "2026-03-11" },
  { mood: "sad", date: "2026-03-09" },
  { mood: "calm", date: "2026-03-08" },
  { mood: "tired", date: "2026-03-07" },
  { mood: "happy", date: "2026-03-01" }
];

function countMoods(moods: MoodEntry[]) {
  const today = new Date();

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const monthAgo = new Date();
  monthAgo.setMonth(today.getMonth() - 1);

  const weekCounts: Record<string, number> = {};
  const monthCounts: Record<string, number> = {};

  moods.forEach((entry) => {
    const date = new Date(entry.date);

    if (date >= weekAgo) {
      weekCounts[entry.mood] = (weekCounts[entry.mood] || 0) + 1;
    }

    if (date >= monthAgo) {
      monthCounts[entry.mood] = (monthCounts[entry.mood] || 0) + 1;
    }
  });

  return { weekCounts, monthCounts };
}

export default function MoodStatsTable() {
  const { weekCounts, monthCounts } = countMoods(moodLog);

  const moods = [
    // { key:"happy", name: 'Happy', color: 'from-emerald-100 to-emerald-200 text-emerald-900', icon: Smile },
    // { key: "Excited", name: 'Excited', color: 'from-amber-100 to-amber-200 text-amber-900', icon: Zap },
    // { key: "calm", name: 'Calm', color: 'from-orange-100 to-orange-200 text-orange-900', icon: Coffee },
    // { key: "Stressed", name: 'Stressed', color: 'from-rose-100 to-rose-200 text-rose-900', icon: AlertTriangle },
    // { key: "sad", name: 'Sad', color: 'from-fuchsia-100 to-fuchsia-200 text-fuchsia-900', icon: Heart }
    { key: "happy", label: "😊 Happy", class: "mood-1" },
    { key: "Excited", label: "😐 Excited", class: "mood-3" },
    { key: "calm", label: "😌 Calm", class: "mood-6" },
    { key: "Stressed", label: "😠 Stressed", class: "mood-2" },
    { key: "sad", label: "😢 Sad", class: "mood-4" }
    //{ key: "tired", label: "😴 Tired", class: "mood-5" },
    //{ key: "angry", label: "😠 Angry", class: "mood-2" }
  ];

  return (
    <div className="mood-table-wrapper">
      <h2>Mood Statistics</h2>

      <table className="mood-table">
        <thead>
          <tr>
            <th>Mood</th>
            <th>This Week</th>
            <th>This Month</th>
          </tr>
        </thead>

        <tbody>
          {moods.map((m) => (
            <tr key={m.key}>
              <td className={`mood ${m.class}`}>{m.label}</td>
              <td>{weekCounts[m.key] || 0}</td>
              <td>{monthCounts[m.key] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}