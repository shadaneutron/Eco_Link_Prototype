import { deliveries } from '@/data/mockData';
import { MapPin, Truck, Clock, CheckCircle2, Route as RouteIcon, Navigation } from 'lucide-react';
import type { DeliveryStatus } from '@/types';

const statusConfig: Record<DeliveryStatus, { color: string; label: string }> = {
  assigned: { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Assigned' },
  accepted: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'Accepted' },
  in_transit: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'In Transit' },
  delivered: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Delivered' },
};

export default function RoutesPage() {
  const activeRoutes = deliveries.filter(d => d.status === 'in_transit' || d.status === 'accepted' || d.status === 'assigned');
  const completedRoutes = deliveries.filter(d => d.status === 'delivered');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Map placeholder */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="relative h-72 bg-gradient-to-br from-teal-50 via-slate-50 to-navy-50 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, #0aad9e 1px, transparent 1px), radial-gradient(circle at 75% 70%, #1a3a5c 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-3">
              <Navigation size={28} className="text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Live Route Map</p>
            <p className="text-xs text-slate-500">{activeRoutes.length} active routes in progress</p>
          </div>
        </div>
      </div>

      {/* Active routes */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <RouteIcon size={20} className="text-teal-600" />
          Active Routes
        </h2>
        <div className="space-y-3">
          {activeRoutes.map(d => {
            const status = statusConfig[d.status];
            return (
              <div key={d.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{d.wasteType}</h3>
                      <p className="text-xs text-slate-500">{d.vehicleNumber} · {d.driverName}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin size={13} className="text-teal-500" />
                      <span>{d.pickupFactory}</span>
                    </div>
                    <div className="ml-1 my-1 border-l-2 border-dashed border-slate-200 h-6" />
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin size={13} className="text-navy-500" />
                      <span>{d.destinationRecycler}</span>
                    </div>
                  </div>
                  <div className="text-center px-4 py-2 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400">Distance</p>
                    <p className="text-sm font-bold text-slate-800">{d.distance}</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400 flex items-center gap-1 justify-center"><Clock size={11} /> ETA</p>
                    <p className="text-sm font-bold text-slate-800">{new Date(d.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed routes */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-600" />
          Completed Routes
        </h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {completedRoutes.map(d => (
            <div key={d.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{d.wasteType} · {d.weight.toLocaleString()} kg</p>
                  <p className="text-xs text-slate-500">{d.pickupFactory} → {d.destinationRecycler}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{d.distance}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">Delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
