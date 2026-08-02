import Logo from '@/components/Logo';
import type { UserRole } from '@/types';
import { Mail, MapPin, Building2, Calendar, Shield, Bell, Globe, CheckCircle2 } from 'lucide-react';

const profileData: Record<UserRole, {
  company: string;
  email: string;
  location: string;
  memberSince: string;
  verified: boolean;
  bio: string;
}> = {
  factory: {
    company: 'GreenTex Manufacturing',
    email: 'operations@greentex.com',
    location: 'Dubai Industrial City, UAE',
    memberSince: 'January 2024',
    verified: true,
    bio: 'Textile manufacturing company committed to zero-waste production. We generate post-industrial plastic and cardboard waste, available for recycling partnerships.',
  },
  recycler: {
    company: 'EcoRecycle Solutions',
    email: 'procurement@ecorecycle.com',
    location: 'Abu Dhabi, UAE',
    memberSince: 'March 2024',
    verified: true,
    bio: 'Leading recycling facility specializing in plastics, metals, and paper. We process over 500 tons of industrial waste monthly into reusable raw materials.',
  },
  logistics: {
    company: 'SwiftHaul Logistics',
    email: 'dispatch@swifthaul.com',
    location: 'Dubai, UAE',
    memberSince: 'February 2024',
    verified: true,
    bio: 'Specialized freight company for industrial waste transport. GPS-tracked fleet with certified drivers for safe and compliant waste hauling.',
  },
};

interface ProfilePageProps {
  role: UserRole;
}

export default function ProfilePage({ role }: ProfilePageProps) {
  const data = profileData[role];

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-navy-700 to-teal-600 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <Logo size="md" variant="icon" />
              </div>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-800">{data.company}</h2>
                  {data.verified && (
                    <CheckCircle2 size={18} className="text-teal-500" />
                  )}
                </div>
                <p className="text-sm text-slate-500 capitalize">{role} Partner</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed max-w-2xl">{data.bio}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Company</p>
                <p className="text-sm font-semibold text-slate-800">{data.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-semibold text-slate-800">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-semibold text-slate-800">{data.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Member Since</p>
                <p className="text-sm font-semibold text-slate-800">{data.memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification & settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">Identity Verified</span>
                </div>
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">Business License</span>
                </div>
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">Compliance Certified</span>
                </div>
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Email Notifications</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Marketplace Alerts</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
