import React from 'react';
import { Smile, Zap, Coffee, AlertTriangle, Heart } from 'lucide-react';

const moods = [
  { name: 'Happy', color: 'from-emerald-100 to-emerald-200 text-emerald-900', icon: Smile },
  { name: 'Excited', color: 'from-amber-100 to-amber-200 text-amber-900', icon: Zap },
  { name: 'Calm', color: 'from-orange-100 to-orange-200 text-orange-900', icon: Coffee },
  { name: 'Stressed', color: 'from-rose-100 to-rose-200 text-rose-900', icon: AlertTriangle },
  { name: 'Sad', color: 'from-fuchsia-100 to-fuchsia-200 text-fuchsia-900', icon: Heart }
];

interface MoodLogProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
  completion: number;
}

const MoodLog: React.FC<MoodLogProps> = ({ selectedMood, onSelectMood, completion }) => {
  return (
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
              onClick={() => onSelectMood(mood.name)}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-lg font-bold transition ${active ? 'border-indigo-500 bg-indigo-100 text-indigo-900 shadow-lg' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'}`}
            >
              <Icon className="w-5 h-5" />
              {mood.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MoodLog;