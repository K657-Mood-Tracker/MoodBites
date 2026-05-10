import React, { useEffect, useState } from "react";
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
  const [currentSession, setCurrentSession] = useState<{
    startTime: Date | null;
    isActive: boolean;
  }>({ startTime: null, isActive: false });
  const [pendingSession, setPendingSession] = useState<{
    startTime: string;
    endTime: string;
    durationMinutes: number;
    deepFocus: boolean;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSessionStart = () => {
    setCurrentSession({
      startTime: new Date(),
      isActive: true
    });
  };

  const handleSessionComplete = (duration: number) => {
    const endTime = new Date();
    const startTime = currentSession.startTime || new Date(endTime.getTime() - duration * 60000);

    setTotalMinutes(prev => prev + duration);
    if (isDeepWork) {
      setDeepWorkMinutes(prev => prev + duration);
    }

    const durationMinutes = Math.max(1, Math.round(duration));

    setPendingSession({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMinutes,
      deepFocus: isDeepWork,
    });

    setCurrentSession({ startTime: null, isActive: false });
  };

  useEffect(() => {
    if (!pendingSession || moodAfter === null) {
      return;
    }

    const saveSession = async () => {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const moodLabels = {
        1: 'Awful',
        2: 'Bad',
        3: 'Okay',
        4: 'Good',
        5: 'Great'
      };

      setIsSaving(true);
      setSaveError(null);

      try {
        const response = await fetch(`${apiUrl}/api/focus-sessions/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            startTime: pendingSession.startTime,
            endTime: pendingSession.endTime,
            focusTime: pendingSession.durationMinutes,
            restTime: 0,
            totalFocus: pendingSession.durationMinutes,
            deepFocus: pendingSession.deepFocus,
            beforeMood: moodBefore ? moodLabels[moodBefore as keyof typeof moodLabels] : null,
            afterMood: moodLabels[moodAfter as keyof typeof moodLabels]
          })
        });

        const responseData = await response.json();
        console.log('Save session response:', response.status, responseData);

        if (response.ok) {
          setPendingSession(null);
          setMoodBefore(null);
          setMoodAfter(null);
        } else {
          setSaveError(responseData.error || 'Failed to save session.');
        }
      } catch (error) {
        setSaveError((error as Error).message || 'Error saving session.');
      } finally {
        setIsSaving(false);
      }
    };

    saveSession();
  }, [pendingSession, moodAfter]);

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
            {pendingSession && (
              <div className={`rounded-3xl p-4 text-sm ${isDeepWork ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                {isSaving ? 'Saving session after mood selection...' : saveError ? `Save failed: ${saveError}` : 'Session finished. Select your after-session mood to save this session.'}
              </div>
            )}
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
              onSessionStart={handleSessionStart}
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
