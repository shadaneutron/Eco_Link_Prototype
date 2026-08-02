import { useApp } from '@/context/AppContext';
import Logo from './Logo';
import {
  LayoutDashboard, PlusCircle, Store, ArrowLeftRight, User as UserIcon,
  Gavel, PackageCheck, Truck, Route as RouteIcon, LogOut,
} from 'lucide-react';
import type { UserRole, AppPage } from '@/types';

interface NavItem {
  id: AppPage;
  label: string;
  icon: React.ReactNode;
}

const navByRole: Record<UserRole, NavItem[]> = {
  factory: [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'add-waste', label: 'Add Waste', icon: <PlusCircle size={18} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Store size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={18} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
  ],
  recycler: [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Store size={18} /> },
    { id: 'my-bids', label: 'My Bids', icon: <Gavel size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={18} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
  ],
  logistics: [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'orders', label: 'Orders', icon: <PackageCheck size={18} /> },
    { id: 'routes', label: 'Routes', icon: <RouteIcon size={18} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
  ],
};

const roleLabels: Record<UserRole, string> = {
  factory: 'Factory',
  recycler: 'Recycler',
  logistics: 'Logistics',
};

export default function Sidebar() {
  const { currentRole, currentPage, navigate, logout } = useApp();

  if (!currentRole) return null;
  const items = navByRole[currentRole];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 border-b border-slate-100">
        <Logo size="md" />
      </div>

      <div className="px-4 py-3 mb-2">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-teal-50 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            {currentRole === 'factory' && <PackageCheck size={16} />}
            {currentRole === 'recycler' && <Gavel size={16} />}
            {currentRole === 'logistics' && <Truck size={16} />}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Signed in as</p>
            <p className="text-sm font-bold text-slate-800">{roleLabels[currentRole]}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {items.map(item => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
