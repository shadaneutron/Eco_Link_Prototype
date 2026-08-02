import { useState } from 'react';
import { myBids } from '@/data/mockData';
import { Gavel, Clock, CheckCircle2, XCircle, Trophy, Calendar, DollarSign, Package } from 'lucide-react';
import type { BidStatus } from '@/types';

const tabs: Array<{ id: 'all' | BidStatus; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'won', label: 'Won' },
  { id: 'rejected', label: 'Rejected' },
];

const statusConfig: Record<BidStatus, { color: string; icon: React.ReactNode; label: string }> = {
  pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock size={13} />, label: 'Waiting Factory Approval' },
  approved: { color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <CheckCircle2 size={13} />, label: 'Approved' },
  won: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <Trophy size={13} />, label: 'Auction Won' },
  rejected: { color: 'bg-rose-50 text-rose-700 border-rose-200', icon: <XCircle size={13} />, label: 'Rejected' },
};

export default function MyBidsPage() {
  const [tab, setTab] = useState<'all' | BidStatus>('all');

  const filtered = tab === 'all' ? myBids : myBids.filter(b => b.status === tab);

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
              {t.id === 'all' ? myBids.length : myBids.filter(x => x.status === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Bid cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(bid => {
          const status = statusConfig[bid.status];
          return (
            <div key={bid.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Gavel size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{bid.wasteType}</h3>
                    <p className="text-xs text-slate-500">{bid.factoryName}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
                  {status.icon}
                  {status.label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <DollarSign size={12} /> Offer
                  </div>
                  <p className="font-bold text-teal-700">${bid.offerPrice.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <Package size={12} /> Weight
                  </div>
                  <p className="font-bold text-slate-700">{bid.weight.toLocaleString()} kg</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <Calendar size={12} /> Pickup
                  </div>
                  <p className="font-bold text-slate-700 text-xs">{bid.estimatedPickupDate}</p>
                </div>
              </div>

              {bid.status === 'pending' && (
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
                  <Clock size={14} />
                  Waiting for factory to review your bid
                </div>
              )}
              {bid.status === 'won' && (
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 rounded-xl px-3 py-2">
                  <Trophy size={14} />
                  Congratulations! You won this auction.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Gavel size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No bids in this category.</p>
        </div>
      )}
    </div>
  );
}
