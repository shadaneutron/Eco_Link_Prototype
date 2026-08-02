import { Leaf, RefreshCw } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const sizes = {
  sm: { icon: 28, eco: 'text-xl', link: 'text-xl' },
  md: { icon: 40, eco: 'text-3xl', link: 'text-3xl' },
  lg: { icon: 56, eco: 'text-5xl', link: 'text-5xl' },
};

export default function Logo({ size = 'md', variant = 'full' }: LogoProps) {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative flex items-center justify-center" style={{ width: s.icon, height: s.icon }}>
        <RefreshCw
          size={s.icon}
          strokeWidth={2.5}
          className="text-navy-700 absolute"
          style={{ transform: 'scaleX(-1)' }}
        />
        <Leaf
          size={s.icon * 0.45}
          strokeWidth={2}
          className="text-teal-600 relative z-10"
        />
      </div>

      {variant === 'full' && (
        <div className="flex items-baseline leading-none">
          <span className={`font-extrabold ${s.eco} tracking-tight text-navy-700`}>
            Eco
          </span>
          <span className={`font-extrabold ${s.link} tracking-tight text-teal-600`}>
            Link
          </span>
        </div>
      )}
    </div>
  );
}
