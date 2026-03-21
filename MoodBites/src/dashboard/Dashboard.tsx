import React from 'react';
import { Smile, Zap, Coffee, AlertTriangle, Heart, CheckSquare, BookOpen, Quote, Droplets, Dumbbell, Book, Brain } from 'lucide-react';

const moods = [
  { name: 'Happy', color: 'from-emerald-100 to-emerald-200 text-emerald-900', icon: Smile },
  { name: 'Excited', color: 'from-amber-100 to-amber-200 text-amber-900', icon: Zap },
  { name: 'Calm', color: 'from-orange-100 to-orange-200 text-orange-900', icon: Coffee },
  { name: 'Stressed', color: 'from-rose-100 to-rose-200 text-rose-900', icon: AlertTriangle },
  { name: 'Sad', color: 'from-fuchsia-100 to-fuchsia-200 text-fuchsia-900', icon: Heart }
];

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

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "You miss 100% of the shots you don't take. – Wayne Gretzky"
];

type Habit = {
  name: string;
  days: boolean[];
  icon: keyof typeof habitIconMap;
};

const Dashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(() => localStorage.getItem('selectedMood'));
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

  const [journalEntries, setJournalEntries] = React.useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [journalText, setJournalText] = React.useState('');
  const [newHabitName, setNewHabitName] = React.useState('');
  const [editHabitIndex, setEditHabitIndex] = React.useState<number | null>(null);
  const [editHabitName, setEditHabitName] = React.useState('');
  const [currentQuote, setCurrentQuote] = React.useState(quotes[0]);

  const today = new Date().toLocaleDateString();
  const journalKey = selectedMood ? `${selectedMood}-${today}` : null;

  const moodEmojiMap: { [mood: string]: string } = {
    Happy: '😊',
    Excited: '🔥',
    Calm: '😌',
    Stressed: '😣',
    Sad: '😢'
  };
  const journalMoodEmoji = selectedMood ? moodEmojiMap[selectedMood] || '📝' : '📝';

  React.useEffect(() => {
    if (journalKey) {
      setJournalText(journalEntries[journalKey] || '');
    } else {
      setJournalText('');
    }
  }, [journalKey, journalEntries]);

  React.useEffect(() => {
    localStorage.setItem('habitList', JSON.stringify(habitList));
  }, [habitList]);

  React.useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  React.useEffect(() => {
    if (selectedMood) {
      localStorage.setItem('selectedMood', selectedMood);
    } else {
      localStorage.removeItem('selectedMood');
    }
  }, [selectedMood]);

  const toggleHabit = (habitIndex: number, dayIndex: number) => {
    setHabitList((prev) => {
      const next = [...prev];
      const days = [...next[habitIndex].days];
      days[dayIndex] = !days[dayIndex];
      next[habitIndex] = { ...next[habitIndex], days };
      return next;
    });
  };

  const addHabit = () => {
    const name = newHabitName.trim();
    if (!name) return;
    if (habitList.some((h) => h.name.toLowerCase() === name.toLowerCase())) return;
    setHabitList((prev) => [...prev, { name, days: [false, false, false, false, false, false, false], icon: 'CheckSquare' }] as Habit[]);
    setNewHabitName('');
  };

  const startEditingHabit = (index: number) => {
    setEditHabitIndex(index);
    setEditHabitName(habitList[index].name);
  };

  const saveHabitEdit = (index: number) => {
    const trimmed = editHabitName.trim();
    if (!trimmed) return;
    setHabitList((prev) => prev.map((h, i) => (i === index ? { ...h, name: trimmed } : h)));
    setEditHabitIndex(null);
    setEditHabitName('');
  };

  const cancelHabitEdit = () => {
    setEditHabitIndex(null);
    setEditHabitName('');
  };

  const saveJournal = () => {
    if (!journalKey) return;
    setJournalEntries((prev) => ({ ...prev, [journalKey]: journalText }));
  };

  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const totalDone = habitList.reduce((acc, habit) => acc + habit.days.filter(Boolean).length, 0);
  const completion = habitList.length ? Math.round((totalDone / (habitList.length * 7)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-800">
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 text-left">Heyy, Alex! How are you feeling today?</h1>
              <p className="mt-2 text-lg text-left font-medium text-slate-500">Pick a flavor that matches your mood</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2 shadow-sm">
              <span className="text-xs uppercase tracking-widest text-slate-400">Overall completion</span>
              <span className="text-lg font-bold text-indigo-600">{completion}%</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {moods.map((mood) => {
              const active = selectedMood === mood.name;
              const Icon = mood.icon;
              return (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-lg font-bold transition ${active ? 'border-indigo-500 bg-indigo-100 text-indigo-900 shadow-lg' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'}`}
                >
                  <Icon className="w-5 h-5" />
                  {mood.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-50 via-white to-emerald-50 rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Motivational Quote</p>
                <p className="mt-2 text-lg font-medium text-indigo-800 italic leading-relaxed max-w-3xl">
                  "{currentQuote}"
                </p>
              </div>
            </div>
            <button
              onClick={changeQuote}
              className="mt-2 rounded-lg border border-indigo-200 bg-indigo-100 px-3 py-2 text-xs font-semibold text-indigo-700 shadow-sm hover:bg-indigo-200 hover:shadow-md transition sm:mt-0"
            >
              Next Quote
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="New habit name"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={addHabit}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Add
              </button>
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
                                  onChange={(e) => setEditHabitName(e.target.value)}
                                  className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                                />
                                <button onClick={() => saveHabitEdit(hIndex)} className="text-xs text-indigo-600 hover:text-indigo-800">
                                  Save
                                </button>
                                <button onClick={cancelHabitEdit} className="text-xs text-slate-400 hover:text-slate-600">
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-700">{habit.name}</span>
                                <button onClick={() => startEditingHabit(hIndex)} className="text-xs text-indigo-600 hover:text-indigo-800">
                                  Edit
                                </button>
                              </div>
                            )}
                          </div>
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

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Journal Log</p>
                <span className="text-base">{journalMoodEmoji}</span>
                {selectedMood && (
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                    {selectedMood}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-500">{today}</span>
            </div>

            {selectedMood ? (
              <>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Write your reflection for today..."
                  className="h-36 w-full rounded-xl border border-slate-200 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={saveJournal}
                  className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Save Entry
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-500">Select your mood first to log a journal entry.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
