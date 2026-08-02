import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { transactions } from '@/data/mockData';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';
import type { TransactionStatus } from '@/types';

const tabs: Array<{ id: 'all' | TransactionStatus; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock size={13} /> },
  approved: { color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <CheckCircle2 size={13} /> },
  in_transit: { color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <Truck size={13} /> },
  completed: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={13} /> },
  cancelled: { color: 'bg-rose-50 text-rose-700 border-rose-200', icon: <XCircle size={13} /> },
};

export default function TransactionsPage() {
  const { openTransaction, selectedTransactionId, navigate } = useApp();
  const [tab, setTab] = useState<'all' | TransactionStatus>('all');

  const filtered = tab === 'all' ? transactions : transactions.filter(t => t.status === tab);

  // If a transaction is selected, show details
  if (selectedTransactionId) {
    return null; // handled by App router
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              tab === t.id
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs ${tab === t.id ? 'text-teal-100' : 'text-slate-400'}`}>
              {t.id === 'all' ? transactions.length : transactions.filter(x => x.status === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Transaction cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(tx => {
          const status = statusConfig[tx.status];
          return (
            <div
              key={tx.id}
              onClick={() => openTransaction(tx.id)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <img src={tx.imageUrl} alt={tx.wasteType} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800">{tx.wasteType}</h3>
                      <p className="text-xs text-slate-500">{tx.recycler}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${status.color}`}>
                      {status.icon}
                      {tx.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span><span className="font-semibold text-slate-700">{tx.weight.toLocaleString()}</span> kg</span>
                    <span className="font-semibold text-teal-700">${tx.finalPrice.toLocaleString()}</span>
                    <span className="text-emerald-600 font-semibold">{tx.carbonSaved} kg CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-sm">No transactions in this category.</p>
        </div>
      )}
    </div>
  );
}
