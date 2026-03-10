import React from "react";
import { Clock, Zap, Target, TrendingUp } from "lucide-react";

interface SessionStatsProps {
  totalMinutes: number;
  deepWorkMinutes: number;
  tasksCompleted: number;
}

const SessionStats: React.FC<SessionStatsProps> = ({ 
  totalMinutes, 
  deepWorkMinutes, 
  tasksCompleted 
}) => {
  const stats = [
    { label: "Focus Work", value: `${totalMinutes}m`, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Deep Session", value: `${Math.round((deepWorkMinutes / totalMinutes) * 100 || 0)}%`, icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Progress", value: tasksCompleted.toString(), icon: Target, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Peak State", value: "95%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Today's Focus Performance</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 rounded-2xl flex flex-col gap-2 transition-transform hover:scale-105 ${stat.bg}`}>
            <div className={`p-2 w-fit rounded-lg bg-white shadow-sm ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionStats;
