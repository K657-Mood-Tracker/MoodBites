import "./styles.css";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

import angryImage from "../images/angry.png";
import calmImage from "../images/calm.png";
import excitedImage from "../images/excited.png";
import sadImage from "../images/sad.png";
import stressedImage from "../images/stressed.png";

type MoodEntry = {
  mood: "Happy" | "Calm" | "Sad" | "Angry" | "Stressed";
  date: string;
};

type MoodItem = {
  key: string;
  label: string;
  image: string;
  color: string;
  borderColor: string;
};

const moodTips: Record<string, string> = {
  Happy: "Great energy — keep the good habits going.",
  Calm: "Your calm rhythm is balanced today.",
  Sad: "Try a short break or gratitude note.",
  Angry: "A little breathing can help reset your day.",
  Stressed: "Rest sharper focus with a lighter schedule."
};

const moodImages: Record<string, string> = {
  Happy: excitedImage,
  Calm: calmImage,
  Sad: sadImage,
  Angry: angryImage,
  Stressed: stressedImage
};

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
  const [moodLog, setMoodLog] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetch("/api/mood/history")
      .then((res) => res.json())
      .then((data) => {
        setMoodLog(data);
      })
      .catch((err) => {
        console.error("Failed to fetch mood history:", err);
      });
  }, []);

  const { weekCounts, monthCounts } = countMoods(moodLog);

  const moods: MoodItem[] = [
    {
      key: "Happy",
      label: "Happy",
      image: moodImages.Happy,
      color: "bg-yellow-100",
      borderColor: "border-yellow-300"
    },
    {
      key: "Calm",
      label: "Calm",
      image: moodImages.Calm,
      color: "bg-emerald-100",
      borderColor: "border-emerald-300"
    },
    {
      key: "Sad",
      label: "Sad",
      image: moodImages.Sad,
      color: "bg-blue-100",
      borderColor: "border-blue-300"
    },
    {
      key: "Angry",
      label: "Angry",
      image: moodImages.Angry,
      color: "bg-red-100",
      borderColor: "border-red-300"
    },
    {
      key: "Stressed",
      label: "Stressed",
      image: moodImages.Stressed,
      color: "bg-slate-100",
      borderColor: "border-slate-300"
    }
  ];

  const sortedMoods = [...moods].sort(
    (a, b) => (weekCounts[b.key] || 0) - (weekCounts[a.key] || 0)
  );

  const totalWeek = Object.values(weekCounts).reduce(
    (sum, value) => sum + value,
    0
  );

  const primaryMood = sortedMoods[0];

  const primaryText =
    totalWeek > 0
      ? `Most frequent this week: ${primaryMood.label}`
      : "No mood data yet.";

  const getDaysTrend = (key: string) => {
    const week = weekCounts[key] || 0;
    const month = monthCounts[key] || 0;

    return month > 0
      ? ((week - month / 4) / (month / 4)) * 100
      : 0;
  };

  return (
    <div className="mood-stats-container">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 mb-4">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
          Mood insight
        </p>

        <p className="text-sm text-slate-900 font-semibold">
          {primaryText}
        </p>

        <p className="text-xs text-slate-500">
          Total mood entries tracked this week: {totalWeek}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {sortedMoods.map((m) => {
          const week = weekCounts[m.key] || 0;

          const trend = getDaysTrend(m.key);

          const isPositive = trend >= 0;

          return (
            <div
              key={m.key}
              className="group flex items-center justify-between gap-4 p-4 rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`${m.color} ${m.borderColor} border rounded-3xl w-14 h-14 flex items-center justify-center overflow-hidden shrink-0`}
                >
                  <img
                    src={m.image}
                    alt={m.label}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {m.label}
                  </p>

                  <p className="text-xs text-slate-500 truncate">
                    {moodTips[m.key]}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">This week</p>

                <p className="text-lg font-bold text-slate-900">
                  {week}
                </p>
              </div>

              <div
                className={`text-xs font-semibold flex items-center gap-1 ${
                  isPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}

                {Math.abs(Math.round(trend))}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}