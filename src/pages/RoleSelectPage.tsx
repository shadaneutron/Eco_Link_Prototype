import { useApp } from '@/context/AppContext';
import Logo from '@/components/Logo';
import { Factory, Recycle, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '@/types';

const roles: Array<{
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  iconBg: string;
}> = [
  {
    id: 'factory',
    title: 'Factory',
    description: 'List waste, run auctions, and connect with recyclers.',
    icon: <Factory size={28} />,
    features: ['List waste materials', 'AI waste analysis', 'Auction marketplace'],
    gradient: 'from-teal-500 to-teal-700',
    iconBg: 'bg-teal-50 text-teal-700',
  },
  {
    id: 'recycler',
    title: 'Recycler',
    description: 'Browse listings, place bids, and schedule pickups.',
    icon: <Recycle size={28} />,
    features: ['Browse marketplace', 'Place competitive bids', 'Track won auctions'],
    gradient: 'from-navy-500 to-navy-700',
    iconBg: 'bg-navy-50 text-navy-700',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Manage deliveries, routes, and digital manifests.',
    icon: <Truck size={28} />,
    features: ['Accept deliveries', 'Track shipments', 'Generate manifests'],
    gradient: 'from-amber-500 to-amber-700',
    iconBg: 'bg-amber-50 text-amber-700',
  },
];

export default function RoleSelectPage() {
  const { selectRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="mb-10 text-center animate-slide-up">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Choose Your Role</h1>
        <p className="text-slate-500 max-w-md">
          Select how you'd like to participate in the EcoLink circular economy platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role, idx) => (
          <button
            key={role.id}
            onClick={() => selectRole(role.id)}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl p-7 text-left transition-all duration-300 hover:-translate-y-1 animate-slide-up"
          >
            <div className={`w-16 h-16 rounded-2xl ${role.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
              {role.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{role.title}</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">{role.description}</p>
            <ul className="space-y-2 mb-6">
              {role.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="text-teal-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
              Continue as {role.title}
              <ArrowRight size={16} className="text-teal-600" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
