import React from 'react';
import { useAuth } from '../context/AuthContext';

import angryImg from "../images/angry.png";
import excitedImg from "../images/excited.png";
import calmImg from "../images/calm.png";
import stressedImg from "../images/stressed.png";
import sadImg from "../images/sad.png";

const moods = [

  {
    name: 'Excited',
    color: 'from-amber-100 to-amber-200 text-amber-900',
    image: excitedImg
  },
  {
    name: 'Calm',
    color: 'from-orange-100 to-orange-200 text-orange-900',
    image: calmImg
  },
  {
    name: 'Angry',
    color: 'from-emerald-100 to-emerald-200 text-emerald-900',
    image: angryImg
  },
  {
    name: 'Stressed',
    color: 'from-rose-100 to-rose-200 text-rose-900',
    image: stressedImg
  },
  {
    name: 'Sad',
    color: 'from-fuchsia-100 to-fuchsia-200 text-fuchsia-900',
    image: sadImg
  }
];

interface MoodLogProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
  completion: number;
}

const MoodLog: React.FC<MoodLogProps> = ({ selectedMood, onSelectMood, completion }) => {
  const { user } = useAuth();
  console.log('MoodLog AUTH USER:', user);
  const displayName =
    user?.username ||
    user?.name ||
    user?.email?.split('@')[0] ||
    'there';

  return (
    <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 text-left">
            Heyy, <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{displayName}</span>! How are you feeling today?
          </h1>
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
          //const Icon = mood.icon;
          return (
            <button
              key={mood.name}
              onClick={() => onSelectMood(mood.name)}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-lg font-bold transition ${active ? 'border-indigo-500 bg-indigo-100 text-indigo-900 shadow-lg' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'}`}
            >
              <img
                src={mood.image}
                alt={mood.name}
                className="w-8 h-8 object-contain"
              />

              <span>{mood.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MoodLog;