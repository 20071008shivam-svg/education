import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  Users, 
  TrendingUp, 
  Sparkles, 
  LogOut,
  Zap,
  Shield,
  ChevronDown,
  Check,
  FileJson
} from 'lucide-react';
import { StudentProfile } from '../types';
import { PRESET_STUDENT_PROFILES } from '../data/mockData';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile;
  onSwitchProfile?: (newProfile: StudentProfile) => void;
  onResetProfile?: () => void;
  onOpenDataPortability?: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const navigationItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    sublabel: 'Your Domain Overview', 
    icon: LayoutDashboard,
  },
  { 
    id: 'edutwin', 
    label: 'My Sorcerer Profile', 
    sublabel: 'Know Your Technique', 
    icon: UserCheck, 
  },
  { 
    id: 'learn', 
    label: 'Learning & Performance', 
    sublabel: 'Train Your Mind', 
    icon: GraduationCap, 
  },
  { 
    id: 'campus', 
    label: 'My Campus Domain', 
    sublabel: 'Missions & Opportunities', 
    icon: Building2, 
    badge: '5' 
  },
  { 
    id: 'peers', 
    label: 'Sorcerer Alliance', 
    sublabel: 'Peers & Mentors', 
    icon: Users, 
  },
  { 
    id: 'quest', 
    label: 'Sorcerer Progression', 
    sublabel: 'Career & Resume', 
    icon: TrendingUp, 
  },
  { 
    id: 'futureself', 
    label: 'Future Self', 
    sublabel: 'Domain Simulation', 
    icon: Sparkles, 
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  student,
  onSwitchProfile,
  onResetProfile,
  onOpenDataPortability,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_STUDENT_PROFILES[0]) => {
    if (onSwitchProfile) {
      onSwitchProfile(preset.profile);
    }
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    if (onResetProfile) {
      onResetProfile();
    }
    setShowLogoutConfirm(false);
    setActiveTab('dashboard');
  };

  return (
    <aside className={`select-none ${
      isMobileDrawer 
        ? 'w-full flex flex-col p-4 bg-[#080812] text-slate-100 min-h-screen' 
        : 'w-64 lg:w-[17%] shrink-0 hidden md:flex flex-col'
    }`}>
      <div className="sticky top-0 h-screen flex flex-col justify-between p-4 bg-[#070710]/95 border-r border-purple-900/40 backdrop-blur-2xl shadow-[4px_0_30px_rgba(0,0,0,0.85)] overflow-y-auto">
        {/* Top: EDUTWIN AI & PERSONALIZED DOMAIN INTERFACE */}
        <div className="shrink-0 mb-3 pb-3 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] border border-purple-400/50 shrink-0">
              <Zap className="w-5 h-5 fill-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 opacity-40 blur-xs -z-10 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-wider text-white font-space">
                  EDUTWIN<span className="text-cyan-400 font-mono-tech text-sm ml-0.5">AI</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-tech font-bold bg-purple-950/80 text-purple-300 border border-purple-600/40 shrink-0">
                  V3
                </span>
              </div>
              <p className="text-[10px] text-purple-300/80 font-mono-tech tracking-widest uppercase font-bold truncate">
                PERSONALIZED DOMAIN INTERFACE
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items (Middle) */}
        <div className="flex-1 space-y-1.5 py-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full relative flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/95 via-purple-800/85 to-indigo-950 text-white border border-purple-500/80 shadow-[0_0_22px_-3px_rgba(168,85,247,0.7)]'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/30 hover:border-purple-800/30 border border-transparent'
                }`}
              >
                {/* Active Indicator Electric Cyan Line */}
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-1.5 rounded-r-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                )}

                <div className="flex items-center gap-3 pl-1 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-cyan-300 drop-shadow-[0_0_6px_#22d3ee]' : 'text-purple-400/80 group-hover:text-purple-300'
                  }`} />
                  <div className="min-w-0">
                    <div className={`text-xs font-bold tracking-wide font-space transition-colors truncate ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {item.label}
                    </div>
                    <div className={`text-[10px] truncate ${
                      isActive ? 'text-purple-200' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>
                
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono-tech text-[10px] font-bold flex items-center justify-center shrink-0 border border-rose-400 shadow-[0_0_8px_#f43f5e]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* BOTTOM SECTION */}
        <div className="shrink-0 mt-3 pt-3 border-t border-purple-900/40 space-y-2.5">
          {/* Satoru Gojo Quote */}
          <div className="px-2.5 py-2 text-center bg-[#05050e] rounded-xl border border-purple-900/30">
            <p className="text-[10.5px] italic text-slate-300 leading-tight">
              "Your potential is limitless, keep evolving."
            </p>
            <span className="text-[9px] text-purple-400 font-mono-tech block mt-0.5">
              — Satoru Gojo
            </span>
          </div>

          {/* Explore as Demo */}
          <div className="p-2 rounded-xl bg-[#0c0c18] border border-purple-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <span className="text-[11px] font-mono-tech font-bold text-slate-200">
                Explore as Demo
              </span>
            </div>
            <button
              onClick={() => setIsDemoActive(!isDemoActive)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold transition cursor-pointer ${
                isDemoActive 
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {isDemoActive ? 'ACTIVE' : 'OFF'}
            </button>
          </div>

          {/* Profile Selector: Anmol Sharma, Priya Sharma, Rohan Kapoor */}
          <div className="relative">
            <div className="text-[9px] text-slate-400 font-mono-tech uppercase font-bold px-1 mb-1 flex items-center justify-between">
              <span>Profile Selector</span>
              <span className="text-cyan-400">3 Profiles</span>
            </div>

            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-full p-2 rounded-xl bg-[#0c0c18] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-600/50 flex items-center justify-between transition cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shrink-0 ring-1 ring-purple-400/50 overflow-hidden">
                  <img
                    src="/src/assets/images/jjk_megumi_avatar_1790758357670.jpg"
                    alt={student.fullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white font-space truncate group-hover:text-cyan-300">
                    {student.fullName || 'Anmol Sharma'}
                  </div>
                  <div className="text-[9px] text-purple-400 font-mono-tech truncate">
                    Switch Profile
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1.5 p-2 rounded-xl bg-[#0e0e1c] border border-purple-600/70 shadow-[0_0_35px_rgba(0,0,0,0.95)] z-50 space-y-1">
                <div className="text-[9px] font-mono-tech font-bold text-purple-300 px-2 py-1 uppercase tracking-wider flex items-center gap-1 border-b border-purple-900/40">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>PRESET SORCERER PROFILES</span>
                </div>
                {PRESET_STUDENT_PROFILES.map((preset) => {
                  const isCurrent = student.id === preset.id || student.fullName === preset.name;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full p-2 rounded-lg flex items-center justify-between text-left transition cursor-pointer ${
                        isCurrent 
                          ? 'bg-purple-900/70 border border-cyan-400/40 text-white' 
                          : 'hover:bg-purple-950/40 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold font-space truncate">{preset.name}</div>
                        <div className="text-[9px] text-cyan-400 font-mono-tech">{preset.grade} · {preset.branch}</div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Data Portability (Export & Import) Button */}
          {onOpenDataPortability && (
            <button
              type="button"
              onClick={onOpenDataPortability}
              className="w-full py-1.5 px-3 rounded-xl bg-[#090914] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-600/50 text-cyan-300 hover:text-white text-xs font-mono-tech flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export / Import State</span>
            </button>
          )}

          {/* Log Out Button */}
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-2 px-3 rounded-xl bg-[#090912] hover:bg-rose-950/40 border border-purple-900/30 hover:border-rose-800/50 text-rose-400 hover:text-rose-300 text-xs font-bold font-mono-tech flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Logout / Reset Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0c0c1a] border border-rose-600/50 p-5 shadow-[0_0_30px_rgba(244,63,94,0.3)] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 mx-auto flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-space">
                End Sorcerer Session?
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Logging out resets your active domain session and restores default Sorcerer calibrators.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2 px-3 rounded-xl text-xs font-bold text-slate-300 bg-[#141424] hover:bg-[#1a1a30] border border-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)] transition cursor-pointer"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
