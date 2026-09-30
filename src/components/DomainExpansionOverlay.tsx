import React, { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface DomainExpansionOverlayProps {
  isOpen: boolean;
  onComplete: () => void;
  domainName?: string;
  sorcererName: string;
}

export const DomainExpansionOverlay: React.FC<DomainExpansionOverlayProps> = ({
  isOpen,
  onComplete,
  domainName = 'INFINITE HORIZON: CAREER DOMAIN',
  sorcererName,
}) => {
  const [phase, setPhase] = useState<'charging' | 'expanding' | 'manifesting'>('charging');

  useEffect(() => {
    if (!isOpen) {
      setPhase('charging');
      return;
    }

    setPhase('charging');
    const t1 = setTimeout(() => setPhase('expanding'), 400);
    const t2 = setTimeout(() => setPhase('manifesting'), 1100);
    const t3 = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050508]/95 backdrop-blur-2xl overflow-hidden transition-all duration-300">
      {/* Cursed Energy Background Vignette & Grid */}
      <div className="absolute inset-0 bg-domain-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-purple-900/30 via-[#07070b]/90 to-[#030305] pointer-events-none" />

      {/* Expanding Cursed Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-purple-500/30 animate-domain-ring pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] rounded-full border border-cyan-400/20 animate-domain-ring [animation-delay:250ms] pointer-events-none" />
      <div className="absolute w-[1000px] h-[1000px] rounded-full border border-purple-400/20 animate-domain-ring [animation-delay:500ms] pointer-events-none" />

      {/* Sacred Rotating Domain Geometry (SVG) */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-xl">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-8">
          {/* Outer rotating ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin-slow text-purple-600/50" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" />
            <polygon points="100,5 195,155 5,155" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.75" />
            <polygon points="100,195 5,45 195,45" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="0.75" />
          </svg>

          {/* Inner counter-rotating ring */}
          <svg className="absolute w-44 h-44 sm:w-56 sm:h-56 animate-reverse-spin-slow text-cyan-400/50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,6" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="1" />
            <rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="0.75" transform="rotate(45 50 50)" />
          </svg>

          {/* Center Cursed Core Pulse */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.8)] animate-pulse">
            <Sparkles className="w-12 h-12 text-white animate-spin-slow" />
          </div>
        </div>

        {/* Japanese & Western Domain Expansion Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-widest uppercase">
            <Zap className="w-4 h-4 animate-bounce text-purple-400" />
            <span>CURSED TECHNIQUE MANIFESTATION</span>
            <Zap className="w-4 h-4 animate-bounce text-purple-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-cinzel drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">
            領 域 展 開
          </h2>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 tracking-wider font-space uppercase">
            {domainName}
          </h3>

          <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
            Sorcerer <strong className="text-white">{sorcererName}</strong> awakens their personalized academic sanctuary. Probability projections and future twin outcomes expanding...
          </p>
        </div>

        {/* Phase Indicator */}
        <div className="mt-8 flex items-center gap-2">
          <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${phase === 'charging' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-purple-600'}`} />
          <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${phase === 'expanding' ? 'bg-purple-400 shadow-[0_0_10px_#c084fc]' : 'bg-purple-900'}`} />
          <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${phase === 'manifesting' ? 'bg-cyan-300 shadow-[0_0_15px_#67e8f9]' : 'bg-purple-950'}`} />
        </div>
      </div>
    </div>
  );
};
