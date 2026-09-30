import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Flame, 
  Building2, 
  GraduationCap, 
  Users, 
  Sparkles, 
  LayoutDashboard, 
  Compass, 
  Cpu, 
  BookOpen,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { CampusOpportunity, CampusResource } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: CampusOpportunity[];
  resources: CampusResource[];
  onNavigateToTab: (tab: string) => void;
  onOpenOpportunity?: (opp: CampusOpportunity) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  opportunities,
  resources,
  onNavigateToTab,
  onOpenOpportunity,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const pages = [
    { id: 'dashboard', name: 'Dashboard — My Domain Overview', icon: LayoutDashboard, category: 'Navigation' },
    { id: 'edutwin', name: 'My Sorcerer Profile — Know Your Technique', icon: Sparkles, category: 'Navigation' },
    { id: 'learn', name: 'Learning & Performance — Train Your Mind', icon: GraduationCap, category: 'Navigation' },
    { id: 'campus', name: 'My Campus Domain — Missions & Opportunities', icon: Building2, category: 'Navigation' },
    { id: 'peers', name: 'Sorcerer Alliance — Peers & Mentors', icon: Users, category: 'Navigation' },
    { id: 'quest', name: 'Sorcerer Progression — Career & Resume', icon: TrendingUp, category: 'Navigation' },
    { id: 'futureself', name: 'Future Self — Domain Simulation', icon: Compass, category: 'Navigation' },
  ];

  const matchedPages = trimmed
    ? pages.filter(p => p.name.toLowerCase().includes(trimmed))
    : pages.slice(0, 4);

  const matchedMissions = trimmed
    ? opportunities.filter(o => 
        o.eventName.toLowerCase().includes(trimmed) || 
        o.description.toLowerCase().includes(trimmed) ||
        o.skillsDeveloped.some(s => s.toLowerCase().includes(trimmed))
      ).slice(0, 4)
    : opportunities.slice(0, 3);

  const matchedResources = trimmed
    ? resources.filter(r => 
        r.name.toLowerCase().includes(trimmed) || 
        r.areaOfExpertise.toLowerCase().includes(trimmed) ||
        r.type.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : resources.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#090914] border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient header strip */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-rose-500 shadow-[0_0_12px_#22d3ee]" />

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-purple-900/40 bg-[#07070f]">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search missions, clubs, mentors, courses..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-[#141424] text-slate-300 border border-purple-800/40">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Nav Section */}
          {matchedPages.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-tech uppercase font-bold text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>DOMAIN NAVIGATION</span>
              </div>
              <div className="space-y-1">
                {matchedPages.map(page => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        onNavigateToTab(page.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-950/40 border border-transparent hover:border-purple-800/40 text-left transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-300 group-hover:text-cyan-300">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                          {page.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Missions Section */}
          {matchedMissions.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-tech uppercase font-bold text-rose-400 px-2 mb-1.5 flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-rose-400" />
                <span>MISSIONS & OPPORTUNITIES</span>
              </div>
              <div className="space-y-1">
                {matchedMissions.map(opp => (
                  <button
                    key={opp.id}
                    onClick={() => {
                      if (onOpenOpportunity) {
                        onOpenOpportunity(opp);
                      } else {
                        onNavigateToTab('campus');
                      }
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 text-left transition group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-space truncate">
                          {opp.eventName}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-purple-950/70 text-purple-300 border border-purple-800/40 shrink-0">
                          {opp.eventType}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {opp.organizer} · Deadline: {opp.registrationDeadline}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono-tech font-bold text-cyan-400 shrink-0">
                      Open →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mentors, Clubs & Labs */}
          {matchedResources.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-tech uppercase font-bold text-amber-400 px-2 mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>FACULTY, CLUBS & RESEARCH LABS</span>
              </div>
              <div className="space-y-1">
                {matchedResources.map(res => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onNavigateToTab('campus');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-950/30 border border-transparent hover:border-purple-900/40 text-left transition group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-space truncate">
                          {res.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-amber-950/60 text-amber-300 border border-amber-800/40 shrink-0">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {res.areaOfExpertise} · {res.roomOrBuilding}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono-tech font-bold text-purple-300 shrink-0">
                      View →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedPages.length === 0 && matchedMissions.length === 0 && matchedResources.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching missions, clubs, or mentors found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2 bg-[#06060c] border-t border-purple-900/40 flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
          <span>Navigate with arrows or mouse</span>
          <span className="text-cyan-400">EDUTWIN AI DOMAIN SEARCH</span>
        </div>
      </div>
    </div>
  );
};
