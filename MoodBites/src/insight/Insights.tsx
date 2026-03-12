import React from "react";
import FocustTimeStatistics from "./FocusTimeStatistics";
import WeeklyMood from "./WeeklyMood";
import MoodCounter from "./MoodCounts";
import HabitCounter from "./HabitCount";
import MoodCalendar from "./MoodCalendar";
import "./styles.css"
//        
const Insights: React.FC = () => {

    

    return (
      <div>
        <main>
        <MoodCalendar />
        <div className="chart-box">
          <WeeklyMood />
        </div>
        <br></br>
        <div className="tables-container">
          <MoodCounter />
          <HabitCounter />
        </div>
        <br></br>
        <div className="chart-box">
          <FocustTimeStatistics />
        </div>
        </main>
      </div>
    );
};

export default Insights;