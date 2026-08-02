import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import WasteCard from '@/components/WasteCard';
import { wasteListings } from '@/data/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function MarketplacePage() {
  const { openListing } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return wasteListings.filter(l => {
      const matchesSearch = l.wasteType.toLowerCase().includes(search.toLowerCase()) ||
        l.factoryName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || l.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'available', label: 'Available' },
    { id: 'auction', label: 'Live Auction' },
    { id: 'sold', label: 'Sold' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Search & filter bar */}
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
          {filters.map(f => (
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

      {/* Grid */}
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
