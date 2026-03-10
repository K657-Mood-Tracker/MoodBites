import React, { useState } from "react";
import { Plus, Check, Trash2, ListCheck, Target, StickyNote } from "lucide-react";

const ProductivityTools: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [sessionGoals, setSessionGoals] = useState("");
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"tasks" | "goals" | "notes">("tasks");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg h-full flex flex-col overflow-hidden border border-slate-100">
      <div className="flex border-b border-slate-50">
        <button 
          onClick={() => setActiveTab("tasks")}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${activeTab === "tasks" ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <ListCheck size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Tasks</span>
        </button>
        <button 
          onClick={() => setActiveTab("goals")}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${activeTab === "goals" ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Target size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Goals</span>
        </button>
        <button 
          onClick={() => setActiveTab("notes")}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${activeTab === "notes" ? 'text-amber-600 bg-amber-50/50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <StickyNote size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Notes</span>
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "tasks" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs doing?"
                className="flex-1 px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button 
                onClick={addTask}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <ul className="space-y-2">
              {tasks.length === 0 && (
                <li className="text-center py-8 text-slate-400 text-sm italic">No tasks yet. Ready to start?</li>
              )}
              {tasks.map(task => (
                <li key={task.id} className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                    >
                      {task.done && <Check size={12} strokeWidth={4} />}
                    </button>
                    <span className={`text-sm ${task.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.text}</span>
                  </div>
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="h-full flex flex-col gap-4">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Session Objectives</p>
            <textarea 
              value={sessionGoals}
              onChange={(e) => setSessionGoals(e.target.value)}
              placeholder="What is your main objective for this session?"
              className="flex-1 w-full p-4 bg-emerald-50/30 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 outline-none resize-none leading-relaxed"
            />
          </div>
        )}

        {activeTab === "notes" && (
          <div className="h-full flex flex-col gap-4">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Quick Brain Dump</p>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write down any thoughts or ideas that pop up..."
              className="flex-1 w-full p-4 bg-amber-50/30 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-200 outline-none resize-none leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductivityTools;
