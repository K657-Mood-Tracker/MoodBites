import React, { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import ProductivityTools from "./ProductivityTools";
import BackgroundAmbience from "./BackgroundAmbience";
import SessionStats from "./SessionStats";
import MoodSelector from "./MoodSelector";
import { Coffee, Brain, Timer, LayoutDashboard, ChevronRight } from "lucide-react";

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
    // Potential for post-session notification/action here
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isDeepWork ? 'bg-slate-950 text-slate-100' : 'bg-indigo-50/30'}`}>
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hub Header Section */}
        <section className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDeepWork ? 'bg-purple-600' : 'bg-indigo-600'} text-white shadow-xl shadow-indigo-200`}>
                <Brain size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                Focus <span className={isDeepWork ? "text-purple-600" : "text-indigo-600"}>Flow</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium">Step away from the noise and find your productive rhythm.</p>
          </div>

          <div className="flex gap-4 p-2 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm">
             <div className="px-4 py-2 border-r border-slate-200 flex flex-col items-center">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Today's Focus</span>
                <span className="text-lg font-black text-indigo-600">{totalMinutes}m</span>
             </div>
             <div className="px-4 py-2 flex flex-col items-center">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Current Mode</span>
                <span className={`text-lg font-black ${isDeepWork ? 'text-purple-600' : 'text-emerald-500'}`}>{isDeepWork ? 'Deep Ultra' : 'Balanced'}</span>
             </div>
          </div>
        </section>

        {/* Focus & Productivity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Focus Control - LEFT */}
          <div className="lg:col-span-4 space-y-6">
            <PomodoroTimer 
              onSessionComplete={handleSessionComplete}
              isDeepWork={isDeepWork}
              setIsDeepWork={setIsDeepWork}
            />
            
            <BackgroundAmbience />
            
            <MoodSelector 
              label="Pre-Session State"
              selectedMood={moodBefore}
              onSelect={setMoodBefore}
            />
          </div>

          {/* Tools & Insights - RIGHT */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[450px]">
              <ProductivityTools />
              <SessionStats 
                totalMinutes={totalMinutes} 
                deepWorkMinutes={deepWorkMinutes} 
                tasksCompleted={0} // Placeholder for integration
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
               <MoodSelector 
                  label="After Session Feeling"
                  selectedMood={moodAfter}
                  onSelect={setMoodAfter}
                />
                
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Self-Reflection</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">How effective was your concentration today? Your post-session mood builds your long-term focus insights.</p>
                  </div>
                  <button className="flex items-center justify-between w-full px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all group">
                    View Productivity Heatmap
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FocusHub;
