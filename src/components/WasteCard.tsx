import { Clock, MapPin, Package, TrendingUp } from 'lucide-react';
import type { WasteListing } from '@/types';

interface WasteCardProps {
  listing: WasteListing;
  onView: (id: string) => void;
}

function getTimeLeft(endsAt: string): string {
  const now = new Date();
  const end = new Date(endsAt);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return 'Ended';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  auction: 'bg-amber-50 text-amber-700 border-amber-200',
  sold: 'bg-slate-100 text-slate-500 border-slate-200',
  in_transit: 'bg-sky-50 text-sky-700 border-sky-200',
  completed: 'bg-teal-50 text-teal-700 border-teal-200',
};

export default function WasteCard({ listing, onView }: WasteCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group animate-slide-up">
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.wasteType}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {listing.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full border border-white/60">
              {tag}
            </span>
          ))}
        </div>
        <div className={`absolute top-3 right-3 px-2.5 py-0.5 text-xs font-bold rounded-full border capitalize ${statusStyles[listing.status] || statusStyles.available}`}>
          {listing.status === 'auction' ? 'Live Auction' : listing.status}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight">{listing.wasteType}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{listing.factoryName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Package size={13} className="text-teal-500" />
            <span><span className="font-semibold">{listing.weight.toLocaleString()}</span> kg</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <TrendingUp size={13} className="text-teal-500" />
            <span><span className="font-semibold">{listing.quantity}</span> units</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 col-span-2">
            <MapPin size={13} className="text-teal-500 shrink-0" />
            <span className="truncate">{listing.factoryLocation}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">
              {listing.currentBid ? 'Current Bid' : 'Starting Price'}
            </p>
            <p className="text-lg font-bold text-teal-700">
              ${(listing.currentBid ?? listing.startingPrice).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {listing.status === 'auction' && (
              <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                <Clock size={12} />
                <span>{getTimeLeft(listing.auctionEndsAt)}</span>
              </div>
            )}
            <button
              onClick={() => onView(listing.id)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
