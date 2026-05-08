import React, { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import ProductivityTools from "./ProductivityTools";
import BackgroundAmbience from "./BackgroundAmbience";
import SessionStats from "./SessionStats";
import MoodSelector from "./MoodSelector";
import { Brain } from "lucide-react";

/**
 * FocusHub is the main container for the concentration session.
 * It integrates the Pomodoro timer, deep work mode, productivity tools,
 * background sounds, and mood tracking.
 */
const FocusHub: React.FC = () => {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [deepWorkMinutes, setDeepWorkMinutes] = useState(0);
  const [isDeepWork, setIsDeepWork] = useState(false);
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);

  const handleSessionComplete = (duration: number) => {
    setTotalMinutes(prev => prev + duration);
    if (isDeepWork) {
      setDeepWorkMinutes(prev => prev + duration);
    }
  };

  return (
    <div className={`min-h-screen ${isDeepWork ? 'bg-slate-950 text-slate-100' : 'bg-indigo-50/30'}`}>
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hub Header Section */}
        <section className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDeepWork ? 'bg-purple-600' : 'bg-indigo-600'} text-white shadow-xl shadow-indigo-200`}>
                <Brain size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                Focus <span className={isDeepWork ? "text-purple-600" : "text-indigo-600"}>Hub</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium">Step away from the noise and find your productive rhythm.</p>
          </div>
        </section>

        {/* Focus & Productivity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* LEFT Sidebar - Feelings & Ambience */}
          <div className="space-y-6">
            <MoodSelector 
              label="Pre-Session State"
              selectedMood={moodBefore}
              onSelect={setMoodBefore}
              isDeepWork={isDeepWork}
            />
            <MoodSelector 
              label="After Session Feeling"
              selectedMood={moodAfter}
              onSelect={setMoodAfter}
              isDeepWork={isDeepWork}
            />
            <BackgroundAmbience isDeepWork={isDeepWork} />
          </div>

          {/* CENTER - Primary Focus Control */}
          <div className="space-y-6">
            <div className={`flex gap-4 p-4 backdrop-blur-md rounded-3xl border shadow-sm justify-center ${isDeepWork ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
               <div className={`px-6 py-2 border-r flex flex-col items-center ${isDeepWork ? 'border-slate-800' : 'border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-black tracking-widest leading-tight ${isDeepWork ? 'text-slate-500' : 'text-slate-400'}`}>Today's Focus</span>
                  <span className={`text-2xl font-black leading-tight ${isDeepWork ? 'text-purple-400' : 'text-indigo-600'}`}>{totalMinutes}m</span>
               </div>
               <div className="px-6 py-2 flex flex-col items-center">
                  <span className={`text-[10px] uppercase font-black tracking-widest leading-tight ${isDeepWork ? 'text-slate-500' : 'text-slate-400'}`}>Current Mode</span>
                  <span className={`text-2xl font-black leading-tight ${isDeepWork ? 'text-purple-600' : 'text-emerald-500'}`}>{isDeepWork ? 'Deep Work' : 'Balanced'}</span>
               </div>
            </div>

            <PomodoroTimer 
              onSessionComplete={handleSessionComplete}
              isDeepWork={isDeepWork}
              setIsDeepWork={setIsDeepWork}
            />
          </div>

          {/* RIGHT Sidebar - Tasks & Performance */}
          <div className="flex flex-col gap-6">
            <ProductivityTools isDeepWork={isDeepWork} />
            <SessionStats 
              totalMinutes={totalMinutes} 
              deepWorkMinutes={deepWorkMinutes} 
              tasksCompleted={0} 
              isDeepWork={isDeepWork}
            />
          </div>
        </div>

      </main>
    </div>
  );
};

export default FocusHub;
