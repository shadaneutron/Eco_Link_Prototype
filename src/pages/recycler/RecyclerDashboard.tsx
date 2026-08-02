import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import { wasteListings, myBids, transactions } from '@/data/mockData';
import { Store, Gavel, Trophy, ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function RecyclerDashboard() {
  const { navigate, openListing } = useApp();
  const available = wasteListings.filter(w => w.status === 'available' || w.status === 'auction').length;
  const activeBids = myBids.filter(b => b.status === 'pending' || b.status === 'approved').length;
  const won = myBids.filter(b => b.status === 'won').length;
  const myTx = transactions.filter(t => t.recycler === 'EcoRecycle Solutions');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Available Listings" value={available} icon={<Store size={22} />} change="+3 new" changeType="up" accent="teal" />
        <StatCard title="Active Bids" value={activeBids} icon={<Gavel size={22} />} changeType="neutral" accent="amber" />
        <StatCard title="Won Auctions" value={won} icon={<Trophy size={22} />} change="+1" changeType="up" accent="green" />
      </div>

      {/* Available listings preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Latest Marketplace Listings</h2>
          <button
            onClick={() => navigate('marketplace')}
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-semibold"
          >
            Browse all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wasteListings.slice(0, 3).map(l => (
            <div
              key={l.id}
              onClick={() => openListing(l.id)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={l.imageUrl} alt={l.wasteType} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm">{l.wasteType}</h3>
                  <p className="text-xs text-slate-500 truncate">{l.factoryName}</p>
                  <p className="text-sm font-bold text-teal-700 mt-0.5">
                    ${(l.currentBid ?? l.startingPrice).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My bids summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Bids</h2>
          <button
            onClick={() => navigate('my-bids')}
            className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-semibold"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {myBids.slice(0, 4).map(bid => (
            <div key={bid.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Gavel size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{bid.wasteType}</p>
                  <p className="text-xs text-slate-500">{bid.factoryName} · {bid.weight.toLocaleString()} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-teal-700">${bid.offerPrice.toLocaleString()}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                  bid.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                  bid.status === 'approved' || bid.status === 'won' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-rose-50 text-rose-700'
                }`}>
                  {bid.status === 'pending' && <Clock size={12} />}
                  {(bid.status === 'approved' || bid.status === 'won') && <CheckCircle2 size={12} />}
                  {bid.status === 'rejected' && <XCircle size={12} />}
                  {bid.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental impact */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <Trophy size={26} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-700 font-medium">Total Carbon Saved</p>
            <p className="text-2xl font-bold text-emerald-800">
              {myTx.reduce((s, t) => s + t.carbonSaved, 0).toFixed(2)} kg CO₂
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('marketplace')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-md"
        >
          Browse Marketplace
        </button>
      </div>
    </div>
  );
}
