import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  accent?: string;
}

export default function StatCard({ title, value, icon, change, changeType = 'neutral', accent = 'teal' }: StatCardProps) {
  const accentMap: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-700',
    navy: 'bg-navy-50 text-navy-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
    sky: 'bg-sky-50 text-sky-700',
  };

  const changeColor = changeType === 'up'
    ? 'text-emerald-600'
    : changeType === 'down'
    ? 'text-rose-500'
    : 'text-slate-500';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accentMap[accent] || accentMap.teal}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 ${changeColor}`}>
            {change}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
      </div>
    </div>
  );
}
