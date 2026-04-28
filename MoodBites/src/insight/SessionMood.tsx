import React from "react";
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react";

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
  before: number;
  after: number;
};

// poto pakeisti 
const sessions: Session[] = [
  { id: 1, before: 2, after: 4 },
  { id: 2, before: 3, after: 5 },
  { id: 3, before: 1, after: 3 },
];

const getMood = (value: number) => moods.find((m) => m.value === value);

const SessionMood: React.FC = () => {
  return (
    <div className="mood-table-wrapper">
      <h2 className="text-xl font-bold mb-6">
        Emotions during focus session
      </h2>

      <table className="mood-table">
        <thead>
          <tr className="border-b">
            <th className="py-3">Session</th>
            <th className="py-3">Before</th>
            <th className="py-3"></th>
            <th className="py-3">Adter</th>
          </tr>
        </thead>

        <tbody>
            {sessions.map((session) => {
                const beforeMood = getMood(session.before);
                const afterMood = getMood(session.after);

                return (
                <tr key={session.id}>
                    <td>{session.id}</td>

                    {/* PRIEŠ */}
                    <td>
                    <div className={`mood mood-${session.before}`}>
                        {beforeMood && (
                        <div className="flex items-center gap-2">
                            <beforeMood.icon size={18} />
                            <span>{beforeMood.label}</span>
                        </div>
                        )}
                    </div>
                    </td>

                    {/* RODYKLĖ */}
                    <td style={{ textAlign: "center", color: "#aaa" }}>
                    →
                    </td>

                    {/* PO */}
                    <td>
                    <div className={`mood mood-${session.after}`}>
                        {afterMood && (
                        <div className="flex items-center gap-2">
                            <afterMood.icon size={18} />
                            <span>{afterMood.label}</span>
                        </div>
                        )}
                    </div>
                    </td>
                </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SessionMood;