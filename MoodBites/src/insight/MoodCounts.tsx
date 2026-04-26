import "./styles.css";

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
    { key: "happy", label: "😊 Happy", class: "mood-1" },
    { key: "calm", label: "😌 Calm", class: "mood-6" },
    { key: "neutral", label: "😐 Neutral", class: "mood-3" },
    { key: "sad", label: "😢 Sad", class: "mood-4" },
    { key: "tired", label: "😴 Tired", class: "mood-5" },
    { key: "angry", label: "😠 Angry", class: "mood-2" }
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