import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Logo from '@/components/Logo';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState('demo@ecolink.com');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-navy-800 via-navy-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2 text-white">
            <Logo size="md" variant="icon" />
            <div className="flex items-baseline leading-none">
              <span className="font-extrabold text-3xl tracking-tight">Eco</span>
              <span className="font-extrabold text-3xl tracking-tight text-teal-300">Link</span>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Turning Industrial Waste into Valuable Resources
            </h2>
            <p className="text-teal-100/80 text-lg leading-relaxed">
              The B2B platform connecting factories, recyclers, and logistics companies for a circular economy.
            </p>
            <div className="space-y-3 pt-4">
              {[
                'AI-powered waste classification',
                'Real-time marketplace & auctions',
                'Digital product passports',
                'End-to-end logistics tracking',
              ].map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-teal-300" />
                  </div>
                  <span className="text-teal-50/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-teal-200/60 text-xs">
            © 2026 EcoLink. Building a circular future together.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="lg" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
              <p className="text-sm text-slate-500 mt-1">Sign in to your EcoLink account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" defaultChecked />
                  Remember me
                </label>
                <button type="button" className="text-teal-600 hover:text-teal-700 font-medium">Forgot password?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-60 active:scale-[0.98]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Demo credentials are pre-filled. Just click Sign In.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
