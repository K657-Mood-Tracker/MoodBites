import React, { useState, useEffect } from "react";
import { Smile, Meh, Frown, Angry, Heart, TrendingUp, TrendingDown } from "lucide-react";

type Mood = {
  value: number;
  icon: React.ElementType;
  label: string;
};

const moods: Mood[] = [
  { value: 1, icon: Angry, label: "Awful" },
  { value: 2, icon: Frown, label: "Bad" },
  { value: 3, icon: Meh, label: "Okay" },
  { value: 4, icon: Smile, label: "Good" },
  { value: 5, icon: Heart, label: "Great" },
];

type Session = {
  id: number;
  beforeMood: string | null;
  afterMood: string | null;
  focusTime: number;
  improvement: string | null;
};

const getMoodByLabel = (label: string) => moods.find((m) => m.label === label);

const getImprovement = (improvement: string | null) => {
  return improvement === 'improved' ? 'positive' : improvement === 'declined' ? 'negative' : 'neutral';
};

const SessionMood: React.FC = () => {
  console.log("SessionMood component rendering");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("SessionMood component mounted, starting fetch...");
    const fetchSessionMoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        
        console.log("Token found:", !!token);
        console.log("API URL:", apiUrl);
        
        if (!token) {
          console.warn("No authentication token found");
          setSessions([]);
          return;
        }

        console.log("Making API call to:", `${apiUrl}/api/session-mood/sessions`);
        const res = await fetch(`${apiUrl}/api/session-mood/sessions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("API response status:", res.status);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch session moods: ${res.status}`);
        }

        const data = await res.json();
        console.log("Session mood data:", data);

        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          console.error("API did not return an array:", data);
          setSessions([]);
        }

      } catch (err) {
        console.error("Failed to fetch session moods:", err);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionMoods();
  }, []);

  const totalMinutes = sessions.reduce((sum, session) => sum + session.focusTime, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const improvedSessions = sessions.filter((session) => session.improvement === 'improved').length;

  if (loading) {
    return <div className="text-center py-8">Loading session moods...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Today's Focus Summary</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-indigo-600">{totalHours}h {remainingMinutes}m</span>
              <span className="text-sm text-slate-500">focus time</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Mood Lifts</p>
            <p className="text-2xl font-bold text-slate-900">{improvedSessions}/{sessions.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const beforeMood = getMoodByLabel(session.beforeMood || '');
          const afterMood = getMoodByLabel(session.afterMood || '');
          const improvement = getImprovement(session.improvement);
          const improvementText = improvement === 'positive' ? 'Improved' : improvement === 'negative' ? 'Decreased' : 'Same';
          const improvementColor = improvement === 'positive' ? 'text-emerald-600 bg-emerald-100' : improvement === 'negative' ? 'text-rose-600 bg-rose-100' : 'text-slate-600 bg-slate-100';

          return (
            <div key={session.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-3xl bg-slate-100 grid place-items-center text-sm font-semibold text-slate-700">#{session.id}</div>
                <div className="flex items-center gap-2 text-sm">
                  {beforeMood ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 flex items-center gap-2">
                      <beforeMood.icon size={14} />
                      {beforeMood.label}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
                      No data
                    </div>
                  )}
                  <span className="text-slate-300 text-lg">→</span>
                  {afterMood ? (
                    <div className="rounded-3xl border border-emerald-200 bg-emerald-100 px-3 py-2 text-emerald-700 flex items-center gap-2 text-sm">
                      <afterMood.icon size={14} />
                      {afterMood.label}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
                      No data
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className={`rounded-full px-3 py-2 font-semibold ${improvementColor} flex items-center gap-2`}>
                  {improvement === 'positive' && <TrendingUp size={14} />}
                  {improvement === 'negative' && <TrendingDown size={14} />}
                  <span>{improvementText}</span>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
                  {session.focusTime} min
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionMood;