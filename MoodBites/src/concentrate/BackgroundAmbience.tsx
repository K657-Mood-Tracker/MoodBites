import React, { useState } from "react";
import { Music, Volume2, Waves, Coffee, Trees, Wind } from "lucide-react";

const sounds = [
  { id: "rain", icon: Waves, label: "Rain" },
  { id: "cafe", icon: Coffee, label: "Cafe" },
  { id: "forest", icon: Trees, label: "Forest" },
  { id: "wind", icon: Wind, label: "Wind" },
];

interface BackgroundAmbienceProps {
  isDeepWork?: boolean;
}

const BackgroundAmbience: React.FC<BackgroundAmbienceProps> = ({ isDeepWork }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);

  const toggleSound = (id: string) => {
    setActiveSound(activeSound === id ? null : id);
  };

  return (
    <div className={`backdrop-blur-sm p-6 rounded-3xl shadow-sm border mt-6 ${
      isDeepWork ? 'bg-slate-900 border-slate-800' : 'bg-white/80 border-slate-100'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Music size={18} className={isDeepWork ? 'text-purple-400' : 'text-indigo-500'} />
        <h3 className={`text-sm font-bold uppercase tracking-wider ${isDeepWork ? 'text-slate-400' : 'text-slate-700'}`}>Ambience</h3>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${
              activeSound === sound.id 
                ? (isDeepWork ? 'bg-purple-600 text-white shadow-lg shadow-purple-950 scale-105' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105') 
                : (isDeepWork ? 'bg-slate-800 text-slate-500 hover:bg-slate-700' : 'bg-slate-50 text-slate-400 hover:bg-white hover:shadow-sm')
            }`}
          >
            <sound.icon size={20} />
            <span className="text-[10px] font-bold uppercase">{sound.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Volume2 size={16} className={isDeepWork ? 'text-slate-600' : 'text-slate-400'} />
        <input 
          type="range" 
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className={`flex-1 h-1.5 rounded-full appearance-none cursor-pointer ${
            isDeepWork ? 'bg-slate-800 accent-purple-600' : 'bg-slate-100 accent-indigo-600'
          }`}
        />
        <span className={`text-[10px] font-mono font-bold ${isDeepWork ? 'text-slate-600' : 'text-slate-400'}`}>{volume}%</span>
      </div>
    </div>
  );
};

export default BackgroundAmbience;
