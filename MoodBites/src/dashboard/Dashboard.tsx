import React from 'react';
import { CheckSquare, Droplets, Dumbbell, Book, Brain } from 'lucide-react';
import MotivationalQuote from './MotivationalQuote';
import MoodLog from './MoodLog';
import HabitsTracker from './HabitsTracker';
import JournalLog from './JournalLog';

const habitIconMap = {
  Droplets,
  Dumbbell,
  Book,
  Brain,
  CheckSquare
};

const initialHabits = [
  { name: 'Drink Water', days: [false, false, false, false, false, false, false], icon: 'Droplets' },
  { name: 'Exercise', days: [false, false, false, false, false, false, false], icon: 'Dumbbell' },
  { name: 'Read', days: [false, false, false, false, false, false, false], icon: 'Book' },
  { name: 'Meditate', days: [false, false, false, false, false, false, false], icon: 'Brain' }
];

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "You miss 100% of the shots you don't take. – Wayne Gretzky"
];

type Habit = {
  id: number;
  name: string;
  days: boolean[];
  icon: keyof typeof habitIconMap;
};

const Dashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  const [habitList, setHabitList] = React.useState<Habit[]>([]);

  const [journalEntries, setJournalEntries] = React.useState<{ [key: string]: string }>({});
  const [journalText, setJournalText] = React.useState('');
  const [newHabitName, setNewHabitName] = React.useState('');
  const [editHabitIndex, setEditHabitIndex] = React.useState<number | null>(null);
  const [editHabitName, setEditHabitName] = React.useState('');
  const [currentQuote, setCurrentQuote] = React.useState(quotes[0]);

  const today = new Date().toLocaleDateString();
  const currentDayIndex = (() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // 0=Monday, 6=Sunday
  })();
  const journalKey = selectedMood ? `${selectedMood}-${today}` : null;

  const moodEmojiMap: { [mood: string]: string } = {
    Happy: '😊',
    Excited: '🔥',
    Calm: '😌',
    Stressed: '😣',
    Sad: '😢'
  };
  const journalMoodEmoji = selectedMood ? moodEmojiMap[selectedMood] || '📝' : '📝';

  React.useEffect(() => {
    if (journalKey) {
      setJournalText(journalEntries[journalKey] || '');
    } else {
      setJournalText('');
    }
  }, [journalKey, journalEntries]);

  React.useEffect(() => {
    loadMoodFromDB();
    loadHabitsFromDB();
    loadJournalFromDB();
  }, []);

  const toggleHabit = async (habitIndex: number, dayIndex: number) => {
    if (dayIndex !== currentDayIndex) return; // Only allow today
    const habit = habitList[habitIndex];
    try {
      const response = await fetch('http://localhost:3000/api/habits/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId: habit.id }),
      });
      if (response.ok) {
        const data = await response.json();
        setHabitList((prev) => {
          const next = [...prev];
          const days = [...next[habitIndex].days];
          days[dayIndex] = data.status === 'completed';
          next[habitIndex] = { ...next[habitIndex], days };
          return next;
        });
      }
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const addHabit = async () => {
    const name = newHabitName.trim();
    if (!name) return;
    if (habitList.some((h) => h.name.toLowerCase() === name.toLowerCase())) return;
    try {
      const response = await fetch('http://localhost:3000/api/habits/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const newHabit = await response.json();
        setHabitList((prev) => [...prev, newHabit]);
        setNewHabitName('');
      }
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const startEditingHabit = (index: number) => {
    setEditHabitIndex(index);
    setEditHabitName(habitList[index].name);
  };

  const saveHabitEdit = async (index: number) => {
    const trimmed = editHabitName.trim();
    if (!trimmed) return;
    const habit = habitList[index];
    try {
      const response = await fetch('http://localhost:3000/api/habits/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId: habit.id, name: trimmed }),
      });
      if (response.ok) {
        setHabitList((prev) => prev.map((h, i) => (i === index ? { ...h, name: trimmed } : h)));
        setEditHabitIndex(null);
        setEditHabitName('');
      }
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const cancelHabitEdit = () => {
    setEditHabitIndex(null);
    setEditHabitName('');
  };

  const deleteHabit = async (index: number) => {
    const habit = habitList[index];
    try {
      const response = await fetch('http://localhost:3000/api/habits/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId: habit.id }),
      });
      if (response.ok) {
        setHabitList((prev) => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const saveJournal = async () => {
    if (!selectedMood || !journalText.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/api/journal/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: journalText, mood: selectedMood }),
      });
      if (response.ok) {
        // Update local state
        const journalKey = `${selectedMood}-${today}`;
        setJournalEntries((prev) => ({ ...prev, [journalKey]: journalText }));
      }
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const totalDone = habitList.reduce((acc, habit) => acc + habit.days.filter(Boolean).length, 0);
  const completion = habitList.length ? Math.round((totalDone / (habitList.length * 7)) * 100) : 0;

  const saveMoodToDB = async (mood: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/mood/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });
      if (!response.ok) {
        throw new Error('Failed to save mood');
      }
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const loadMoodFromDB = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood/current');
      if (response.ok) {
        const data = await response.json();
        if (data.mood) {
          setSelectedMood(data.mood);
        }
      }
    } catch (error) {
      console.error('Error loading mood:', error);
    }
  };

  const seedHabitsToDB = async () => {
    try {
      for (const habit of initialHabits) {
        await fetch('http://localhost:3000/api/habits/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: habit.name }),
        });
      }
    } catch (error) {
      console.error('Error seeding habits:', error);
    }
  };

  const loadHabitsFromDB = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/habits');
      if (response.ok) {
        const habits = await response.json();
        if (habits.length === 0) {
          await seedHabitsToDB();
          return loadHabitsFromDB();
        }
        setHabitList(habits);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  const loadJournalFromDB = async () => {
    try {
      // First load the current mood
      const moodResponse = await fetch('http://localhost:3000/api/mood/current');
      if (moodResponse.ok) {
        const moodData = await moodResponse.json();
        if (moodData.mood) {
          // Then load the journal for that mood
          const response = await fetch(`http://localhost:3000/api/journal/current?mood=${encodeURIComponent(moodData.mood)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.content) {
              const journalKey = `${moodData.mood}-${today}`;
              setJournalEntries({ [journalKey]: data.content });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading journal:', error);
    }
  };

  const handleSelectMood = async (mood: string) => {
    setSelectedMood(mood);
    await saveMoodToDB(mood);
    // Load journal for this mood if it exists
    await loadJournalFromDB();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-800">
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <MoodLog selectedMood={selectedMood} onSelectMood={handleSelectMood} completion={completion} />

        <MotivationalQuote currentQuote={currentQuote} onChangeQuote={changeQuote} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HabitsTracker
            habitList={habitList}
            onToggleHabit={toggleHabit}
            onAddHabit={addHabit}
            newHabitName={newHabitName}
            onNewHabitNameChange={setNewHabitName}
            editHabitIndex={editHabitIndex}
            editHabitName={editHabitName}
            onStartEdit={startEditingHabit}
            onSaveEdit={saveHabitEdit}
            onCancelEdit={cancelHabitEdit}
            onEditHabitNameChange={setEditHabitName}
            onDeleteHabit={deleteHabit}
            completion={completion}
            currentDayIndex={currentDayIndex}
          />

          <JournalLog
            selectedMood={selectedMood}
            journalText={journalText}
            onJournalTextChange={setJournalText}
            onSaveJournal={saveJournal}
            today={today}
            journalMoodEmoji={journalMoodEmoji}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
