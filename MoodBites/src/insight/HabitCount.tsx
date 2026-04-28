import React from "react";
import { CheckSquare, Droplets, Dumbbell, Book, Brain } from 'lucide-react';
import "./styles.css";


const habitIconMap = {
  Droplets,
  Dumbbell,
  Book,
  Brain,
  CheckSquare
};

const initialHabits = [
  { name: 'Drink Water', days: [false, false, false, false, false, false, false], icon: 'Droplets' },
  { name: 'Exercise', days: [false, false, false, false, false, false, false], icon: 'Dumbbell' },
  { name: 'Read', days: [false, false, false, false, false, false, false], icon: 'Book' },
  { name: 'Meditate', days: [false, false, false, false, false, false, false], icon: 'Brain' }
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-indigo-600" />
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Habit Tracker</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{completion}% done</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="p-2">Habit</th>
                        {daysOfWeek.map((day) => (
                          <th key={day} className="p-2 text-center">{day}</th>
                        ))}
                        <th className="p-2 text-center">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {habitList.map((habit, hIndex) => {
                        const completedCount = habit.days.filter(Boolean).length;
                        const face = completedCount === 0 ? '😞' : completedCount <= 2 ? '😐' : completedCount <= 4 ? '🙂' : completedCount <= 6 ? '😄' : '🏆';

                        return (
                          <tr key={`${habit.name}-${hIndex}`} className="border-t border-slate-100 hover:bg-slate-50">
                           <td className="p-2 align-middle">
                             {habitIconMap[habit.icon] && React.createElement(habitIconMap[habit.icon], { className: 'h-4 w-4 text-slate-500' })}
                           </td>
                            {habit.days.map((done, dayIndex) => (
                              <td key={dayIndex} className="p-2 text-center">
                                <button
                                  onClick={() => toggleHabit(hIndex, dayIndex)}
                                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                                >
                                  {done ? '✓' : ''}
                                </button>
                              </td>
                            ))}
    
                            <td className="p-2 text-center">{face}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
  );
}