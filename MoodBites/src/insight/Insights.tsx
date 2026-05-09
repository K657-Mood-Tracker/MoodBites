import React from "react";
import FocustTimeStatistics from "./FocusTimeStatistics";
import WeeklyMood from "./WeeklyMood";
import MoodCounter from "./MoodCounts";
import HabitCounter from "./HabitCount";
import MoodCalendar from "./MoodCalendar";
import SessionMood from "./SessionMood";
import { TrendingUp } from "lucide-react";

const Insights: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-50/50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                <TrendingUp size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                Insights
              </h1>
            </div>
            <p className="text-slate-500 font-medium">Track your mood patterns, habits, and productivity trends.</p>
          </div>
        </div>

        {/* Top Section - Calendar & Mood Status */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-12">
          
          {/* Calendar - 60% */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-indigo-600 rounded"></div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Mood Calendar</p>
              </div>
              <MoodCalendar />
            </div>
          </div>

          {/* Mood Status - 40% */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-indigo-600 rounded"></div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Mood Stats</p>
              </div>
              <div className="flex-1">
                <MoodCounter />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Session Mood & Habit Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Session Mood */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-600 rounded"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Today's Focus</p>
            </div>
            <SessionMood />
          </div>

          {/* Habit Trends */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-600 rounded"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Habit Trends</p>
            </div>
            <HabitCounter />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-600 rounded"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Weekly Mood Trend</p>
            </div>
            <WeeklyMood />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-600 rounded"></div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Focus Analytics</p>
            </div>
            <FocustTimeStatistics />
          </div>
        </div>

      </div>
    </main>
  );
};

export default Insights;