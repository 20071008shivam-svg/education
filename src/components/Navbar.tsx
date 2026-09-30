import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Monitor, 
  UserCheck, 
  Compass, 
  FileJson,
  Zap
} from 'lucide-react';
import { StudentProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  student: StudentProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOnboarding: () => void;
  onOpenDomainExpansion?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenDataPortability?: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  activeTab: _activeTab,
  setActiveTab,
  onOpenOnboarding,
  onOpenDomainExpansion,
  onOpenCommandPalette,
  onOpenDataPortability,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { theme, setTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute Sorcerer Grade based on progress or student level
  const getSorcererGrade = () => {
    if (student.level >= 4 || student.cgpa >= 9.2) return 'SPECIAL GRADE SORCERER';
    if (student.level >= 3 || student.cgpa >= 8.5) return 'GRADE 1 SORCERER';
    if (student.level >= 2 || student.cgpa >= 7.5) return 'GRADE 2 SORCERER';
    return 'SEMI-GRADE 2 SORCERER';
  };

  const sorcererGrade = getSorcererGrade();

  const notifications = [
    {
      id: 1,
      type: 'mission',
      title: 'National AI Innovation Hackathon',
      desc: 'Registration deadline in 3 days. Domain compatibility: 94%.',
      time: '1h ago',
      tab: 'campus'
    },
    {
      id: 2,
      type: 'academic',
      title: 'Operating Systems Attendance Alert',
      desc: 'Attendance at 73.3% (min 75% required). Attend next 2 classes.',
      time: '3h ago',
      tab: 'learn'
    },
    {
      id: 3,
      type: 'alliance',
      title: 'Squad Invite: Team Apex Domain',
      desc: 'Seeking your Python & Deep Learning technique for 36hr hackathon.',
      time: '5h ago',
      tab: 'peers'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07070e]/95 backdrop-blur-xl border-b border-purple-900/40 shadow-[0_4px_30px_rgba(0,0,0,0.8)] px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
      {/* Mobile Branding & Hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0d0d1a] border border-purple-900/40 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
        </button>

        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-700 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            <Zap className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="font-black text-sm text-white font-space tracking-wide">
            EDUTWIN<span className="text-cyan-400 font-mono-tech text-xs ml-0.5">AI</span>
          </span>
        </div>
      </div>

      {/* TOP SEARCH BAR (Command Palette Trigger) */}
      <div className="flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0b0b16] hover:bg-[#101022] border border-purple-900/40 hover:border-purple-500/60 shadow-inner transition-all duration-200 group cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Search className="w-4 h-4 text-purple-400 group-hover:text-cyan-300 transition-colors shrink-0" />
            <span className="text-xs text-slate-400 group-hover:text-slate-200 font-sans truncate">
              Search missions, clubs, mentors...
            </span>
          </div>

          <div className="flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-[#141426] text-purple-300 border border-purple-800/40 shadow-sm">
              Ctrl + K
            </kbd>
          </div>
        </button>
      </div>

      {/* RIGHT SIDE: Notification, Theme, Profile/Avatar with Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell Icon */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-[#0b0b16] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-600/50 transition cursor-pointer"
            title="Sorcerer Intel & Alerts"
          >
            <Bell className="w-4 h-4 text-purple-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono-tech text-[9px] font-bold flex items-center justify-center border border-[#07070e] shadow-[0_0_8px_#f43f5e]">
              3
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0c0c1a] border border-purple-700/60 shadow-[0_10px_40px_rgba(0,0,0,0.9)] p-3.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-purple-900/40 mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-white font-mono-tech text-xs">DOMAIN INTEL</span>
                </div>
                <span className="text-[10px] text-purple-400 font-mono-tech">3 Unread Alerts</span>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setActiveTab(n.tab);
                      setNotificationsOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-[#070712] hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-600/40 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-xs">{n.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono-tech shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme / Settings Toggle */}
        <div className="relative" ref={themeRef}>
          <button
            type="button"
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0b0b16] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-600/50 transition cursor-pointer"
            title="Theme & Settings"
          >
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : theme === 'dark' ? (
              <Moon className="w-4 h-4 text-purple-400" />
            ) : (
              <Monitor className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Theme Dropdown */}
          {themeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0c0c1a] border border-purple-700/60 shadow-[0_10px_30px_rgba(0,0,0,0.9)] p-1.5 z-50 text-xs animate-in fade-in duration-150">
              <div className="px-2 py-1 text-[10px] font-mono-tech text-purple-400 font-bold uppercase tracking-wider">
                Visual Barrier
              </div>
              <button
                type="button"
                onClick={() => {
                  setTheme('dark');
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition cursor-pointer ${
                  theme === 'dark' ? 'bg-purple-900/60 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-purple-950/40'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-purple-400" />
                <span>Dark Domain</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme('light');
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition cursor-pointer ${
                  theme === 'light' ? 'bg-purple-900/60 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-purple-950/40'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Domain</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme('system');
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition cursor-pointer ${
                  theme === 'system' ? 'bg-purple-900/60 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-purple-950/40'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span>System Auto</span>
              </button>
            </div>
          )}
        </div>

        {/* Student Profile / Avatar + Name + Sorcerer Level + Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 sm:gap-2.5 pl-1.5 sm:pl-2 py-1 pr-2 rounded-xl bg-[#0b0b16] hover:bg-[#121226] border border-purple-900/40 hover:border-purple-600/50 transition cursor-pointer group text-left"
          >
            {/* Avatar with glowing ring */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 p-0.5 ring-2 ring-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.5)] overflow-hidden shrink-0 group-hover:ring-cyan-400 transition">
              <img
                src="/src/assets/images/jjk_megumi_avatar_1790758357670.jpg"
                alt={student.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Name and Level */}
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white font-space leading-tight group-hover:text-cyan-300 transition flex items-center gap-1">
                <span>{student.fullName || 'Anmol Sharma'}</span>
              </div>
              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono-tech font-extrabold bg-rose-600/90 text-white shadow-[0_0_8px_rgba(244,63,94,0.5)]">
                {sorcererGrade}
              </span>
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
          </button>

          {/* User Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0c0c1a] border border-purple-700/60 shadow-[0_10px_40px_rgba(0,0,0,0.95)] p-2 z-50 text-xs space-y-1 animate-in fade-in duration-150">
              <div className="px-2 py-1.5 border-b border-purple-900/40 mb-1">
                <div className="font-bold text-white font-space truncate">{student.fullName}</div>
                <div className="text-[10px] text-cyan-400 font-mono-tech truncate">{student.branch} · {student.year}</div>
                <div className="text-[9px] text-purple-300 font-mono-tech mt-0.5">{student.university}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('edutwin');
                  setUserDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-slate-200 hover:text-white hover:bg-purple-950/40 transition cursor-pointer text-left"
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>My Sorcerer Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenOnboarding();
                  setUserDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-slate-200 hover:text-white hover:bg-purple-950/40 transition cursor-pointer text-left"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit Technique & DNA</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenDomainExpansion) {
                    onOpenDomainExpansion();
                  } else {
                    setActiveTab('futureself');
                  }
                  setUserDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-slate-200 hover:text-white hover:bg-purple-950/40 transition cursor-pointer text-left"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Domain Simulation</span>
              </button>

              {onOpenDataPortability && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenDataPortability();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-cyan-300 hover:text-white hover:bg-purple-950/40 transition cursor-pointer text-left"
                >
                  <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export / Import State</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Far right: "Better Skills. Stronger Domain." */}
        <div className="hidden xl:block pl-2 border-l border-purple-900/40 text-right select-none">
          <p className="text-[10px] text-slate-300 italic leading-tight font-sans">
            "Better Skills.
          </p>
          <p className="text-[10px] text-cyan-400 font-mono-tech font-bold leading-tight">
            Stronger Domain."
          </p>
        </div>

        {/* Vertical Red Japanese Kanji for Jujutsu Kaisen on large screens */}
        <div className="hidden lg:flex items-center justify-center pl-2 select-none border-l border-purple-900/40" title="Jujutsu Kaisen">
          <span className="text-rose-500 font-cinzel text-xs font-black tracking-widest drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] [writing-mode:vertical-rl]">
            呪術廻戦
          </span>
        </div>
      </div>
    </header>
  );
};
