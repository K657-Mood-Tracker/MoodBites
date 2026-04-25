import React from 'react';
import { CheckSquare, Droplets, Dumbbell, Book, Brain } from 'lucide-react';

const habitIconMap = {
  Droplets,
  Dumbbell,
  Book,
  Brain,
  CheckSquare
};

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type Habit = {
  id: number;
  name: string;
  days: boolean[];
  icon: keyof typeof habitIconMap;
};

interface HabitsTrackerProps {
  habitList: Habit[];
  onToggleHabit: (habitIndex: number, dayIndex: number) => void;
  onAddHabit: () => void;
  newHabitName: string;
  onNewHabitNameChange: (name: string) => void;
  editHabitIndex: number | null;
  editHabitName: string;
  onStartEdit: (index: number) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
  onEditHabitNameChange: (name: string) => void;
  completion: number;
  currentDayIndex: number;
}

const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  habitList,
  onToggleHabit,
  onAddHabit,
  newHabitName,
  onNewHabitNameChange,
  editHabitIndex,
  editHabitName,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditHabitNameChange,
  completion,
  currentDayIndex
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-indigo-600" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Habit Tracker</p>
        </div>
        <span className="text-xs font-semibold text-slate-500">{completion}% done</span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => onNewHabitNameChange(e.target.value)}
          placeholder="New habit name"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="button"
          onClick={onAddHabit}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        {habitList.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            No habits yet — add one above to start tracking today.
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-2">Habit</th>
                {daysOfWeek.map((day, index) => (
                  <th key={`day-${index}`} className={`p-2 text-center ${index === currentDayIndex ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}>{day}</th>
                ))}
                <th className="p-2 text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {habitList.map((habit, hIndex) => {
              const completedCount = habit.days.filter(Boolean).length;
              const face = completedCount === 0 ? '😞' : completedCount <= 2 ? '😐' : completedCount <= 4 ? '🙂' : completedCount <= 6 ? '😄' : '🏆';
              const isEditing = editHabitIndex === hIndex;
              return (
                <tr key={`${habit.name}-${hIndex}`} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-2 align-middle">
                    <div className="flex items-center gap-2">
                      {habitIconMap[habit.icon] && React.createElement(habitIconMap[habit.icon], { className: 'h-4 w-4 text-slate-500' })}
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={editHabitName}
                            onChange={(e) => onEditHabitNameChange(e.target.value)}
                            className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                          />
                          <button type="button" onClick={() => onSaveEdit(hIndex)} className="text-xs text-indigo-600 hover:text-indigo-800">
                            Save
                          </button>
                          <button type="button" onClick={onCancelEdit} className="text-xs text-slate-400 hover:text-slate-600">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-700">{habit.name}</span>
                          <button onClick={() => onStartEdit(hIndex)} className="text-xs text-indigo-600 hover:text-indigo-800">
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {habit.days.map((done, dayIndex) => (
                    <td key={dayIndex} className="p-2 text-center">
                      <button
                        onClick={() => dayIndex === currentDayIndex && onToggleHabit(hIndex, dayIndex)}
                        disabled={dayIndex !== currentDayIndex}
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${done ? 'bg-emerald-500 text-white' : dayIndex === currentDayIndex ? 'bg-slate-200 text-slate-500 hover:bg-slate-300 cursor-pointer' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
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
          )}
      </div>
    </div>
  );
};

export default HabitsTracker;