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
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getMood = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return moodData.find(m => m.date === dateStr)?.mood;
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

    days.push(
      <div
        key={i}
        className="calendar-day"
        style={{
          background: mood ? moodColors[mood] : "rgb(241, 245, 249)",
          border: mood ? '2px solid rgba(0,0,0,0.05)' : '1px solid rgb(226, 232, 240)'
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