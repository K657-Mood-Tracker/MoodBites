import React from "react";
import { Droplets, Dumbbell, Book, Brain } from 'lucide-react';

const habitIconMap = {
  Droplets,
  Dumbbell,
  Book,
  Brain
};

type Habit = {
  name: string;
  days: boolean[];
  icon: keyof typeof habitIconMap;
};
 
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function HabitTable() {
  const [habitList, setHabitList] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        
        if (!token) {
          console.warn("No authentication token found");
          setHabitList([]);
          return;
        }

        const res = await fetch(`${apiUrl}/api/habits/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch habits: ${res.status}`);
        }

        const data = await res.json();

        console.log("Habit data:", data);

        if (Array.isArray(data)) {
          setHabitList(data);
        } else {
          console.error("API did not return an array:", data);
          setHabitList([]);
        }

      } catch (err) {
        console.error("Failed to fetch habits:", err);
        setHabitList([]);
      }
    };

    fetchHabits();
  }, []);

  const toggleHabit = (habitIndex: number, dayIndex: number) => {
    // Habits should only be toggled from the dashboard, not from insights
    console.warn('Habit toggling is disabled in insights view. Please use the dashboard to manage habits.');
  };

  const totalDone = Array.isArray(habitList) ? habitList.reduce((acc, habit) => acc + habit.days.filter(Boolean).length, 0) : 0;
  const completion = Array.isArray(habitList) && habitList.length ? Math.round((totalDone / (habitList.length * 7)) * 100) : 0;

  return (
    <div className="habit-insights-container">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">This Week Performance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-600">{completion}%</span>
            <span className="text-sm text-slate-500">habit completion</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Done</p>
          <p className="text-2xl font-bold text-slate-900">{totalDone}/{Array.isArray(habitList) ? habitList.length * 7 : 0}</p>
        </div>
      </div>

      <div className="space-y-2">
        {Array.isArray(habitList) && habitList.map((habit, hIndex) => {
          const completedCount = habit.days.filter(Boolean).length;
          const completionPct = Math.round((completedCount / 7) * 100);

          return (
            <div key={`${habit.name}-${hIndex}`} className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 mb-2">
                {habitIconMap[habit.icon] && React.createElement(habitIconMap[habit.icon], { className: 'w-5 h-5 text-indigo-600' })}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{habit.name}</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{completionPct}%</span>
              </div>
              
              <div className="flex gap-1.5">
                {habit.days.map((done, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`flex-1 h-8 rounded-md text-xs font-semibold flex items-center justify-center ${
                      done 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-200 text-slate-400'
                    }`}
                    title={`${daysOfWeek[dayIndex]}: ${done ? 'Completed' : 'Not completed'}`}
                  >
                    {daysOfWeek[dayIndex]}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}