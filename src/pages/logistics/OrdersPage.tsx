import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { deliveries } from '@/data/mockData';
import { ArrowLeft, MapPin, Package, Truck, User, Calendar, FileText, CheckCircle2, Clock } from 'lucide-react';
import type { Delivery, DeliveryStatus } from '@/types';

const statusConfig: Record<DeliveryStatus, { color: string; label: string }> = {
  assigned: { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Assigned' },
  accepted: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'Accepted' },
  in_transit: { color: 'bg-sky-50 text-sky-700 border-sky-200', label: 'In Transit' },
  delivered: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Delivered' },
};

export default function OrdersPage() {
  const { selectedDeliveryId, navigate, openDelivery } = useApp();
  const [deliveryStatuses, setDeliveryStatuses] = useState<Record<string, DeliveryStatus>>({});
  const [showManifest, setShowManifest] = useState(false);

  const selectedDelivery = deliveries.find(d => d.id === selectedDeliveryId);

  const getCurrentStatus = (d: Delivery): DeliveryStatus => deliveryStatuses[d.id] ?? d.status;

  const advanceStatus = (delivery: Delivery, action: 'accept' | 'start' | 'deliver') => {
    const next: DeliveryStatus = action === 'accept' ? 'accepted' : action === 'start' ? 'in_transit' : 'delivered';
    setDeliveryStatuses(prev => ({ ...prev, [delivery.id]: next }));
    if (action === 'deliver') {
      setShowManifest(true);
    }
  };

  // Detail view
  if (selectedDelivery) {
    const status = statusConfig[getCurrentStatus(selectedDelivery)];
    const currentStatus = getCurrentStatus(selectedDelivery);

    return (
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <button
          onClick={() => { navigate('orders'); setShowManifest(false); }}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Orders
        </button>

        {showManifest ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={24} />
                <h2 className="text-xl font-bold">Digital Waste Manifest</h2>
              </div>
              <p className="text-emerald-50 text-sm">Shipment Completed Successfully</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Manifest ID</p>
                  <p className="text-sm font-bold text-slate-800">DWM-{selectedDelivery.id.toUpperCase()}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Transaction ID</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.transactionId.toUpperCase()}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Pickup Factory</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.pickupFactory}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Destination Recycler</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.destinationRecycler}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Waste Type</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.wasteType}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Weight</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.weight.toLocaleString()} kg</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Driver</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.driverName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Vehicle</p>
                  <p className="text-sm font-bold text-slate-800">{selectedDelivery.vehicleNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-xl px-4 py-3">
                <CheckCircle2 size={18} />
                <span className="text-sm font-semibold">Shipment verified and completed</span>
              </div>
              <button
                onClick={() => alert('Downloading manifest PDF... (demo)')}
                className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg"
              >
                <FileText size={18} />
                Download Manifest PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Route info */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-slate-800">Delivery Details</h3>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Pickup */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                        <MapPin size={18} />
                      </div>
                      <div className="w-0.5 h-12 bg-slate-200 my-1" />
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
                        <MapPin size={18} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Pickup Factory</p>
                        <p className="text-sm font-bold text-slate-800">{selectedDelivery.pickupFactory}</p>
                        <p className="text-xs text-slate-500">{selectedDelivery.pickupAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Destination Recycler</p>
                        <p className="text-sm font-bold text-slate-800">{selectedDelivery.destinationRecycler}</p>
                        <p className="text-xs text-slate-500">{selectedDelivery.destinationAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cargo info */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Cargo Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-teal-500" />
                    <div>
                      <p className="text-xs text-slate-400">Waste Type</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedDelivery.wasteType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-teal-500" />
                    <div>
                      <p className="text-xs text-slate-400">Weight</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedDelivery.weight.toLocaleString()} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-teal-500" />
                    <div>
                      <p className="text-xs text-slate-400">Vehicle</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedDelivery.vehicleNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-teal-500" />
                    <div>
                      <p className="text-xs text-slate-400">Driver</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedDelivery.driverName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action panel */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Delivery Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStatus !== 'assigned' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm text-slate-600">Assigned</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['accepted', 'in_transit', 'delivered'].includes(currentStatus) ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm text-slate-600">Accepted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['in_transit', 'delivered'].includes(currentStatus) ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Truck size={16} />
                    </div>
                    <span className="text-sm text-slate-600">In Transit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStatus === 'delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm text-slate-600">Delivered</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
                {currentStatus === 'assigned' && (
                  <button
                    onClick={() => advanceStatus(selectedDelivery, 'accept')}
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                  >
                    <CheckCircle2 size={18} />
                    Accept Delivery
                  </button>
                )}
                {currentStatus === 'accepted' && (
                  <button
                    onClick={() => advanceStatus(selectedDelivery, 'start')}
                    className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                  >
                    <Truck size={18} />
                    Start Trip
                  </button>
                )}
                {currentStatus === 'in_transit' && (
                  <button
                    onClick={() => advanceStatus(selectedDelivery, 'deliver')}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                  >
                    <CheckCircle2 size={18} />
                    Mark as Delivered
                  </button>
                )}
                {currentStatus === 'delivered' && (
                  <button
                    onClick={() => setShowManifest(true)}
                    className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
                  >
                    <FileText size={18} />
                    View Manifest
                  </button>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2.5">
                  <Calendar size={14} />
                  Est. delivery: {new Date(selectedDelivery.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All' },
          { id: 'assigned', label: 'Assigned' },
          { id: 'in_transit', label: 'In Transit' },
          { id: 'delivered', label: 'Delivered' },
        ].map(t => (
          <button
            key={t.id}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all bg-teal-600 text-white shadow-md"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {deliveries.map(d => {
          const status = statusConfig[getCurrentStatus(d)];
          return (
            <div
              key={d.id}
              onClick={() => { setShowManifest(false); openDelivery(d.id); }}
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
  );
}
