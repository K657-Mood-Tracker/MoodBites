import React from 'react';
import { Quote } from 'lucide-react';

interface MotivationalQuoteProps {
  currentQuote: string;
  onChangeQuote: () => void;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ currentQuote, onChangeQuote }) => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-emerald-50 rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Motivational Quote</p>
            <p className="mt-2 text-lg font-medium text-indigo-800 italic leading-relaxed max-w-3xl">
              "{currentQuote}"
            </p>
          </div>
        </div>
        <button
          onClick={onChangeQuote}
          className="mt-2 rounded-lg border border-indigo-200 bg-indigo-100 px-3 py-2 text-xs font-semibold text-indigo-700 shadow-sm hover:bg-indigo-200 hover:shadow-md transition sm:mt-0"
        >
          Next Quote
        </button>
      </div>
    </section>
  );
};

export default MotivationalQuote;