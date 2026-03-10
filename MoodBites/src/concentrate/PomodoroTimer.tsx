import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

interface PomodoroTimerProps {
  onSessionComplete: (duration: number) => void;
  isDeepWork: boolean;
  setIsDeepWork: (val: boolean) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ 
  onSessionComplete, 
  isDeepWork, 
  setIsDeepWork 
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSessionEnd = () => {
    setIsActive(false);
    if (mode === "work") {
      onSessionComplete(isDeepWork ? 25 : 25); // Simplified
      setMode("break");
      setTimeLeft(5 * 60);
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`p-8 rounded-3xl shadow-lg text-center transition-all ${isDeepWork ? 'bg-slate-900 text-white border-2 border-purple-500' : 'bg-white text-slate-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider">{mode === "work" ? "Focus" : "Break"}</h2>
        <button 
          onClick={() => setIsDeepWork(!isDeepWork)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-colors ${isDeepWork ? 'bg-purple-600' : 'bg-slate-200 text-slate-600'}`}
        >
          <Zap size={14} fill={isDeepWork ? "currentColor" : "none"} />
          Deep Work {isDeepWork ? "ON" : "OFF"}
        </button>
      </div>

      <div className="text-7xl font-mono font-black mb-8 tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={toggleTimer}
          className={`p-4 rounded-full transition-transform active:scale-95 ${isActive ? 'bg-amber-100 text-amber-600' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'}`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
        </button>
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
