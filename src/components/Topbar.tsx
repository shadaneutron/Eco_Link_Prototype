import type { ReactNode } from 'react';
import { useApp } from '@/context/AppContext';
import Logo from './Logo';
import { Bell, Search } from 'lucide-react';
import type { UserRole } from '@/types';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your activity' },
  'add-waste': { title: 'Add Waste', subtitle: 'List new waste material' },
  marketplace: { title: 'Marketplace', subtitle: 'Browse available waste listings' },
  transactions: { title: 'Transactions', subtitle: 'Track your transaction history' },
  'my-bids': { title: 'My Bids', subtitle: 'Manage your active bids' },
  orders: { title: 'Orders', subtitle: 'Assigned and active deliveries' },
  routes: { title: 'Routes', subtitle: 'Plan and optimize delivery routes' },
  profile: { title: 'Profile', subtitle: 'Manage your account details' },
};

const roleNames: Record<UserRole, string> = {
  factory: 'GreenTex Manufacturing',
  recycler: 'EcoRecycle Solutions',
  logistics: 'SwiftHaul Logistics',
};

interface TopbarProps {
  children?: ReactNode;
}

export default function Topbar({ children }: TopbarProps) {
  const { currentRole, currentPage } = useApp();
  const info = pageTitles[currentPage] || pageTitles.dashboard;

  return (
    <header className="sticky top-0 z-20 bg-white/80 glass border-b border-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <Logo size="sm" variant="icon" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{info.title}</h1>
            <p className="text-xs text-slate-500">{info.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {children}
          <div className="hidden md:flex items-center bg-slate-50 rounded-xl px-3 py-2 w-56 border border-slate-100">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm ml-2 w-full placeholder:text-slate-400"
            />
          </div>
          <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
              {currentRole && roleNames[currentRole].charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {currentRole && roleNames[currentRole]}
              </p>
              <p className="text-xs text-slate-500 capitalize">{currentRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
