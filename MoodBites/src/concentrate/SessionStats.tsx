import React from "react";
import { Clock, Zap, Target, TrendingUp } from "lucide-react";

interface SessionStatsProps {
  totalMinutes: number;
  deepWorkMinutes: number;
  tasksCompleted: number;
  isDeepWork?: boolean;
}

const SessionStats: React.FC<SessionStatsProps> = ({ 
  totalMinutes, 
  deepWorkMinutes, 
  tasksCompleted,
  isDeepWork
}) => {
  const stats = [
    { 
      label: "Focus Work", 
      value: `${totalMinutes}m`, 
      icon: Clock, 
      color: isDeepWork ? "text-purple-400" : "text-indigo-600", 
      bg: isDeepWork ? "bg-slate-800" : "bg-indigo-50" 
    },
    { 
      label: "Deep Session", 
      value: `${totalMinutes > 0 ? Math.round((deepWorkMinutes / totalMinutes) * 100) : 0}%`, 
      icon: Zap, 
      color: isDeepWork ? "text-purple-500" : "text-purple-600", 
      bg: isDeepWork ? "bg-slate-850 bg-slate-800/80" : "bg-purple-50" 
    },
    { 
      label: "Progress", 
      value: tasksCompleted.toString(), 
      icon: Target, 
      color: isDeepWork ? "text-slate-400" : "text-emerald-600", 
      bg: isDeepWork ? "bg-slate-800" : "bg-emerald-50" 
    },
    { 
      label: "Peak State", 
      value: "95%", 
      icon: TrendingUp, 
      color: isDeepWork ? "text-slate-400" : "text-amber-600", 
      bg: isDeepWork ? "bg-slate-800" : "bg-amber-50" 
    },
  ];

  return (
    <div className={`p-8 rounded-3xl shadow-lg border ${
      isDeepWork ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50'
    }`}>
      <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${
        isDeepWork ? 'text-slate-500' : 'text-slate-400'
      }`}>Today's Focus Performance</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 rounded-2xl flex flex-col gap-2 transition-all hover:scale-105 ${stat.bg}`}>
            <div className={`p-2 w-fit rounded-lg shadow-sm transition-colors ${
              isDeepWork ? 'bg-slate-900 text-purple-400' : `bg-white ${stat.color}`
            }`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-tighter ${
                isDeepWork ? 'text-slate-500' : 'text-slate-500'
              }`}>{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionStats;
