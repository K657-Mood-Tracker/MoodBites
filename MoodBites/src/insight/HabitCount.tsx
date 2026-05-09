import React from "react";
import { Droplets, Dumbbell, Book, Brain } from 'lucide-react';

const habitIconMap = {
  Droplets,
  Dumbbell,
  Book,
  Brain
};

const initialHabits = [
  { name: 'Drink Water', days: [true, true, false, true, false, true, false], icon: 'Droplets' },
  { name: 'Exercise', days: [false, true, true, false, true, false, true], icon: 'Dumbbell' },
  { name: 'Read', days: [true, true, true, false, false, true, false], icon: 'Book' },
  { name: 'Meditate', days: [true, false, true, true, true, false, true], icon: 'Brain' }
];

type Habit = {
  name: string;
  days: boolean[];
  icon: keyof typeof habitIconMap;
};
 
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function HabitTable() {
  const [habitList, setHabitList] = React.useState<Habit[]>(() => {
    const saved = localStorage.getItem('habitList');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialHabits;
      }
    }
    return initialHabits;
  });

  React.useEffect(() => {
    localStorage.setItem('habitList', JSON.stringify(habitList));
  }, [habitList]);

  const toggleHabit = (habitIndex: number, dayIndex: number) => {
    setHabitList((prev) => {
      const next = [...prev];
      const days = [...next[habitIndex].days];
      days[dayIndex] = !days[dayIndex];
      next[habitIndex] = { ...next[habitIndex], days };
      return next;
    });
  };

  const totalDone = habitList.reduce((acc, habit) => acc + habit.days.filter(Boolean).length, 0);
  const completion = habitList.length ? Math.round((totalDone / (habitList.length * 7)) * 100) : 0;

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
          <p className="text-2xl font-bold text-slate-900">{totalDone}/{habitList.length * 7}</p>
        </div>
      </div>

      <div className="space-y-2">
        {habitList.map((habit, hIndex) => {
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
                  <button
                    key={dayIndex}
                    onClick={() => toggleHabit(hIndex, dayIndex)}
                    className={`flex-1 h-8 rounded-md text-xs font-semibold transition flex items-center justify-center ${
                      done 
                        ? 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600' 
                        : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                    }`}
                    title={`${daysOfWeek[dayIndex]}: ${done ? 'Completed' : 'Not completed'}`}
                  >
                    {daysOfWeek[dayIndex]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}