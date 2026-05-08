import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface JournalLogProps {
  selectedMood: string | null;
  journalText: string;
  onJournalTextChange: (text: string) => void;
  onSaveJournal: () => Promise<void>;
  today: string;
  journalMoodEmoji: string;
}

const JournalLog: React.FC<JournalLogProps> = ({
  selectedMood,
  journalText,
  onJournalTextChange,
  onSaveJournal,
  today,
  journalMoodEmoji
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async () => {
    await onSaveJournal();
    setSuccessMessage('Journal entry saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Journal Log</p>
          <span className="text-base">{journalMoodEmoji}</span>
          {selectedMood && (
            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
              {selectedMood}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-slate-500">{today}</span>
      </div>

      {selectedMood ? (
        <>
          <textarea
            value={journalText}
            onChange={(e) => onJournalTextChange(e.target.value)}
            placeholder="Write your reflection for today..."
            className="h-36 w-full rounded-xl border border-slate-200 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleSave}
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Save Entry
          </button>
          {successMessage && (
            <p className="mt-2 text-sm text-green-600 font-semibold">{successMessage}</p>
          )}
        </>
      ) : (
        <p className="text-sm text-slate-500">Select your mood first to log a journal entry.</p>
      )}
    </div>
  );
};

export default JournalLog;