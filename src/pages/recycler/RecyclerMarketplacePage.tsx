import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import WasteCard from '@/components/WasteCard';
import { wasteListings } from '@/data/mockData';
import { ArrowLeft, Search, SlidersHorizontal, Gavel, Calendar, CheckCircle2, Clock, MapPin, Package, TrendingUp, DollarSign } from 'lucide-react';

export default function RecyclerMarketplacePage() {
  const { openListing, selectedListingId, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [offerPrice, setOfferPrice] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [bidSubmitted, setBidSubmitted] = useState(false);

  const filtered = useMemo(() => {
    return wasteListings.filter(l => {
      const matchesSearch = l.wasteType.toLowerCase().includes(search.toLowerCase()) ||
        l.factoryName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || l.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const selectedListing = wasteListings.find(l => l.id === selectedListingId);

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSubmitted(true);
  };

  const closeDetail = () => {
    setBidSubmitted(false);
    setOfferPrice('');
    setPickupDate('');
    navigate('marketplace');
  };

  // Detail modal view
  if (selectedListing) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <button
          onClick={closeDetail}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Listing details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <img src={selectedListing.imageUrl} alt={selectedListing.wasteType} className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {selectedListing.tags.map(t => (
                  <span key={t} className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">{t}</span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedListing.wasteType}</h2>
              <p className="text-sm text-slate-500 mb-4">{selectedListing.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Package size={16} className="text-teal-500" />
                  <span><span className="font-semibold">{selectedListing.weight.toLocaleString()}</span> kg</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp size={16} className="text-teal-500" />
                  <span><span className="font-semibold">{selectedListing.quantity}</span> units</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 col-span-2">
                  <MapPin size={16} className="text-teal-500" />
                  <span>{selectedListing.factoryLocation}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 mt-4 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{selectedListing.currentBid ? 'Current Bid' : 'Starting Price'}</p>
                  <p className="text-2xl font-bold text-teal-700">
                    ${(selectedListing.currentBid ?? selectedListing.startingPrice).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Factory</p>
                  <p className="text-sm font-semibold text-slate-700">{selectedListing.factoryName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid form / confirmation */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            {bidSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-slide-up">
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-5">
                  <Clock size={36} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Waiting Factory Approval</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs">
                  Your bid of <span className="font-bold text-teal-700">${Number(offerPrice).toLocaleString()}</span> has been submitted.
                  The factory will review and respond shortly.
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold mb-6">
                  <CheckCircle2 size={16} />
                  Bid submitted successfully
                </div>
                <button
                  onClick={closeDetail}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Back to Marketplace
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Submit a Bid</h3>
                <p className="text-sm text-slate-500 mb-6">Enter your offer and preferred pickup date</p>
                <form onSubmit={handleSubmitBid} className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
                      <DollarSign size={15} className="text-teal-500" /> Offer Price (USD)
                    </label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={e => setOfferPrice(e.target.value)}
                      placeholder={`Min: $${selectedListing.startingPrice.toLocaleString()}`}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
                      <Calendar size={15} className="text-teal-500" /> Estimated Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={e => setPickupDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Starting Price</span>
                      <span className="font-semibold text-slate-700">${selectedListing.startingPrice.toLocaleString()}</span>
                    </div>
                    {selectedListing.currentBid && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Current Bid</span>
                        <span className="font-semibold text-amber-600">${selectedListing.currentBid.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Your Offer</span>
                      <span className="font-bold text-teal-700">${(Number(offerPrice) || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]"
                  >
                    <Gavel size={18} />
                    Submit Bid
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-200 px-4 py-2.5">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by waste type or factory..."
            className="bg-transparent outline-none text-sm ml-3 w-full placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal size={16} className="text-slate-400 shrink-0" />
          {[
            { id: 'all', label: 'All' },
            { id: 'available', label: 'Available' },
            { id: 'auction', label: 'Live Auction' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-sm">No listings match your search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(l => (
            <WasteCard key={l.id} listing={l} onView={openListing} />
          ))}
        </div>
      )}
    </div>
  );
}
