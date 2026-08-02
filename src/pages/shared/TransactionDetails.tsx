import { useApp } from '@/context/AppContext';
import { transactions } from '@/data/mockData';
import { ArrowLeft, Factory, Recycle, Truck, Package, Weight, DollarSign, Leaf, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { TransactionStatus } from '@/types';

const statusConfig: Record<TransactionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending Approval', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock size={14} /> },
  approved: { label: 'Approved', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <CheckCircle2 size={14} /> },
  in_transit: { label: 'In Transit', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <Truck size={14} /> },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={14} /> },
  cancelled: { label: 'Cancelled', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: <XCircle size={14} /> },
};

export default function TransactionDetails() {
  const { selectedTransactionId, navigate } = useApp();
  const tx = transactions.find(t => t.id === selectedTransactionId);

  if (!tx) {
    return (
      <div className="p-6 text-center text-slate-500">
        Transaction not found.
      </div>
    );
  }

  const status = statusConfig[tx.status];

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate('transactions')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Transactions
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-48 relative">
              <img src={tx.imageUrl} alt={tx.wasteType} className="w-full h-full object-cover" />
              <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}>
                {status.icon}
                {status.label}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{tx.wasteType}</h2>
              <p className="text-sm text-slate-500">Transaction ID: {tx.id.toUpperCase()}</p>
            </div>
          </div>

          {/* Parties */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Parties Involved</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Factory size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Factory</p>
                  <p className="text-sm font-semibold text-slate-800">{tx.factory}</p>
                  <p className="text-xs text-slate-500">{tx.factoryLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center shrink-0">
                  <Recycle size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Recycler</p>
                  <p className="text-sm font-semibold text-slate-800">{tx.recycler}</p>
                  <p className="text-xs text-slate-500">{tx.recyclerLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Logistics Company</p>
                  <p className="text-sm font-semibold text-slate-800">{tx.logisticsCompany}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 flex items-center gap-2"><Package size={15} /> Waste Type</span>
                <span className="text-sm font-semibold text-slate-800">{tx.wasteType}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 flex items-center gap-2"><Weight size={15} /> Weight</span>
                <span className="text-sm font-semibold text-slate-800">{tx.weight.toLocaleString()} kg</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 flex items-center gap-2"><DollarSign size={15} /> Final Price</span>
                <span className="text-sm font-bold text-teal-700">${tx.finalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 flex items-center gap-2">Status</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>{status.label}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-500 flex items-center gap-2"><Leaf size={15} /> Carbon Saved</span>
                <span className="text-sm font-bold text-emerald-600">{tx.carbonSaved} kg CO₂</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={20} className="text-emerald-600" />
              <p className="text-sm font-bold text-emerald-800">Environmental Impact</p>
            </div>
            <p className="text-3xl font-bold text-emerald-700 mb-1">{tx.carbonSaved} kg</p>
            <p className="text-xs text-emerald-600">CO₂ emissions saved by recycling this waste</p>
          </div>

          <button
            onClick={() => alert('Generating PDF... (demo)')}
            className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
