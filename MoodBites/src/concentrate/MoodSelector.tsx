import React from "react";
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react";

interface MoodSelectorProps {
  label: string;
  selectedMood: number | null;
  onSelect: (mood: number) => void;
  isDeepWork?: boolean;
}

const moods = [
  { value: 1, icon: Angry, label: "Awful", color: "bg-mood-1 text-pink-500" },
  { value: 2, icon: Frown, label: "Bad", color: "bg-mood-2 text-rose-500" },
  { value: 3, icon: Meh, label: "Okay", color: "bg-mood-3 text-orange-500" },
  { value: 4, icon: Smile, label: "Good", color: "bg-mood-4 text-indigo-500" },
  { value: 5, icon: Heart, label: "Great", color: "bg-mood-6 text-emerald-500" },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ label, selectedMood, onSelect, isDeepWork }) => {
  return (
    <div className={`p-6 rounded-3xl ${
      isDeepWork ? 'bg-slate-900 border border-slate-800 shadow-none' : 'bg-white border border-slate-50 shadow-sm'
    }`}>
      <h3 className={`text-xs font-black uppercase tracking-widest mb-6 ${
        isDeepWork ? 'text-slate-500' : 'text-slate-400'
      }`}>{label}</h3>
      <div className="flex justify-between items-center gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood.value)}
            className={`group relative flex flex-col items-center gap-2 ${
              selectedMood === mood.value ? 'scale-110 z-10' : 'opacity-60 hover:opacity-100 hover:scale-105'
            }`}
          >
            <div className={`p-4 rounded-[2rem] flex items-center justify-center ${
              selectedMood === mood.value 
                ? `${mood.color} shadow-lg ring-4 ${isDeepWork ? 'ring-slate-950' : 'ring-white'}` 
                : (isDeepWork ? 'bg-slate-800' : 'bg-slate-50')
            }`}>
              <mood.icon 
                size={28} 
                className={selectedMood === mood.value ? 'currentColor' : (isDeepWork ? 'text-slate-600' : 'text-slate-300')} 
                strokeWidth={3}
              />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${
              selectedMood === mood.value 
                ? (isDeepWork ? 'text-slate-200' : 'text-slate-800') 
                : (isDeepWork ? 'text-slate-700' : 'text-slate-300 group-hover:text-slate-400')
            }`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
