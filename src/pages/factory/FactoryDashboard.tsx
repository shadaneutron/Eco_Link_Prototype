import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import WasteCard from '@/components/WasteCard';
import { wasteListings, transactions } from '@/data/mockData';
import { Package, Store, DollarSign, ArrowLeftRight, TrendingUp, ArrowRight } from 'lucide-react';

export default function FactoryDashboard() {
  const { navigate, openListing, openTransaction } = useApp();
  const myListings = wasteListings.filter(w => w.factoryName === 'GreenTex Manufacturing');
  const myTx = transactions.filter(t => t.factory === 'GreenTex Manufacturing');
  const revenue = myTx.filter(t => t.status === 'completed').reduce((s, t) => s + t.finalPrice, 0);
  const completed = myTx.filter(t => t.status === 'completed').length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Waste" value="6,500 kg" icon={<Package size={22} />} change="+12%" changeType="up" accent="teal" />
        <StatCard title="Active Listings" value={myListings.length} icon={<Store size={22} />} change="+2 new" changeType="up" accent="navy" />
        <StatCard title="Revenue" value={`$${revenue.toLocaleString()}`} icon={<DollarSign size={22} />} change="+8%" changeType="up" accent="green" />
        <StatCard title="Completed Transactions" value={completed} icon={<ArrowLeftRight size={22} />} changeType="neutral" accent="sky" />
      </div>

      {/* Recent listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Your Active Listings</h2>
          <button
            onClick={() => navigate('marketplace')}
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-semibold"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myListings.slice(0, 3).map(l => (
            <WasteCard key={l.id} listing={l} onView={openListing} />
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
          <button
            onClick={() => navigate('transactions')}
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-semibold"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Waste Type</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Recycler</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Price</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {myTx.slice(0, 4).map(t => (
                <tr key={t.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => openTransaction(t.id)}>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{t.wasteType}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{t.recycler}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-teal-700">${t.finalPrice.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{t.status.replace('_', ' ')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Environmental impact */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <TrendingUp size={26} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-700 font-medium">Total Carbon Saved</p>
            <p className="text-2xl font-bold text-emerald-800">
              {myTx.reduce((s, t) => s + t.carbonSaved, 0).toFixed(2)} kg CO₂
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('add-waste')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-md"
        >
          Add New Waste
        </button>
      </div>
    </div>
  );
}
