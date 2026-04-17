import React from "react";
import FocustTimeStatistics from "./FocusTimeStatistics";
import WeeklyMood from "./WeeklyMood";
import MoodCounter from "./MoodCounts";
import HabitCounter from "./HabitCount";
import MoodCalendar from "./MoodCalendar";
import SessionMood from "./SessionMood";
import "./styles.css"
//        
const Insights: React.FC = () => {
  return (
    <main className="insights-layout">

      <div className="top-section">

        {/* LEFT */}
        <div className="left-top">
          <div className="calendar-card">
            <MoodCalendar />
          </div>

          <div className="card">
            <SessionMood />
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-top">
          <div className="card">
            <MoodCounter />
          </div>

          <div className="card">
            <HabitCounter />
          </div>
        </div>

      </div>


      {/* CHARTS */}
      <div className="charts">
        <div className="card">
          <WeeklyMood />
        </div>

        <div className="card">
          <FocustTimeStatistics />
        </div>
      </div>

    </main>
  );
};

export default Insights;