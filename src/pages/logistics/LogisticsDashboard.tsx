import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import { deliveries } from '@/data/mockData';
import { PackageCheck, CheckCircle2, Truck, ArrowRight, MapPin } from 'lucide-react';
import type { DeliveryStatus } from '@/types';

const statusConfig: Record<DeliveryStatus, { color: string; label: string }> = {
  assigned: { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Assigned' },
  accepted: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'Accepted' },
  in_transit: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'In Transit' },
  delivered: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Delivered' },
};

export default function LogisticsDashboard() {
  const { navigate, openDelivery } = useApp();
  const assigned = deliveries.filter(d => d.status === 'assigned' || d.status === 'accepted' || d.status === 'in_transit').length;
  const completed = deliveries.filter(d => d.status === 'delivered').length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard title="Assigned Deliveries" value={assigned} icon={<PackageCheck size={22} />} change="2 active" changeType="up" accent="amber" />
        <StatCard title="Completed Deliveries" value={completed} icon={<CheckCircle2 size={22} />} change="+1" changeType="up" accent="green" />
      </div>

      {/* Active deliveries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Active Deliveries</h2>
          <button
            onClick={() => navigate('orders')}
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-semibold"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {deliveries.filter(d => d.status !== 'delivered').map(d => {
            const status = statusConfig[d.status];
            return (
              <div
                key={d.id}
                onClick={() => openDelivery(d.id)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{d.wasteType}</h3>
                      <p className="text-xs text-slate-500">{d.weight.toLocaleString()} kg · {d.distance}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-teal-500" />
                    <span>From: {d.pickupFactory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-navy-500" />
                    <span>To: {d.destinationRecycler}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed deliveries */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recently Completed</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {deliveries.filter(d => d.status === 'delivered').map(d => (
            <div
              key={d.id}
              onClick={() => openDelivery(d.id)}
              className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{d.wasteType} · {d.weight.toLocaleString()} kg</p>
                  <p className="text-xs text-slate-500">{d.pickupFactory} → {d.destinationRecycler}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">Delivered</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
