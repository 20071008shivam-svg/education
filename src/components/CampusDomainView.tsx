import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Bookmark, 
  ExternalLink, 
  HelpCircle, 
  Flame, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Microscope, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';
import { 
  CampusOpportunity, 
  CampusResource, 
  StudentProfile, 
  EventType,
  OpportunityMatchBreakdown 
} from '../types';
import { calculateOpportunityMatch } from '../services/recommendationEngine';
import { WhyAttendModal } from './WhyAttendModal';
import { AfterEventGrowthModal } from './AfterEventGrowthModal';
import { MatchBreakdownModal } from './MatchBreakdownModal';

interface CampusDomainViewProps {
  student: StudentProfile;
  opportunities: CampusOpportunity[];
  resources: CampusResource[];
  onToggleBookmark: (opportunityId: string) => void;
  onApplyGrowth: (growth: any) => void;
}

const EVENT_TYPE_FILTERS: ('All' | EventType)[] = [
  'All',
  'Hackathon',
  'Workshop',
  'Competition',
  'Club',
  'Certification',
  'Entrepreneurship Event',
  'Research Presentation',
  'Seminar',
];

export const CampusDomainView: React.FC<CampusDomainViewProps> = ({
  student,
  opportunities,
  resources,
  onToggleBookmark,
  onApplyGrowth,
}) => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'resources'>('opportunities');
  const [selectedType, setSelectedType] = useState<'All' | EventType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'resume'>('match');

  // Modals state
  const [activeModalOpp, setActiveModalOpp] = useState<CampusOpportunity | null>(null);
  const [activeModalMatch, setActiveModalMatch] = useState<OpportunityMatchBreakdown | null>(null);
  const [isWhyAttendOpen, setIsWhyAttendOpen] = useState(false);
  const [isGrowthOpen, setIsGrowthOpen] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  // Calculate matches for all opportunities
  const opportunitiesWithMatch = useMemo(() => {
    return opportunities.map(opp => ({
      opp,
      match: calculateOpportunityMatch(student, opp),
    }));
  }, [student, opportunities]);

  // Filter & sort
  const filteredOpportunities = useMemo(() => {
    let list = opportunitiesWithMatch.filter(({ opp }) => {
      const matchesType = selectedType === 'All' || opp.eventType === selectedType;
      const matchesQuery = 
        opp.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.skillsDeveloped.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesQuery;
    });

    if (sortBy === 'match') {
      list.sort((a, b) => b.match.overallMatch - a.match.overallMatch);
    } else if (sortBy === 'resume') {
      list.sort((a, b) => b.opp.resumeValue - a.opp.resumeValue);
    }

    return list;
  }, [opportunitiesWithMatch, selectedType, searchQuery, sortBy]);

  const openWhyAttend = (opp: CampusOpportunity, match: OpportunityMatchBreakdown) => {
    setActiveModalOpp(opp);
    setActiveModalMatch(match);
    setIsWhyAttendOpen(true);
  };

  const openGrowthModal = (opp: CampusOpportunity) => {
    setActiveModalOpp(opp);
    setIsGrowthOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Personalized Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Sukuna Flame Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_sukuna_mission_1790757345700.jpg"
            alt="Missions Sanctuary Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a]/90 via-[#120c24]/85 to-[#0a1020]/90" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>DOMAIN SANCTUARY & MISSIONS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono-tech font-bold bg-[#07070d] text-purple-300 border border-purple-900/40">
                {student.university}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              My Campus Domain
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every Mission, Special Grade Mentor, and Technique Facility below is cross-matched against your <span className="text-cyan-300 font-semibold">{student.branch}</span> curriculum, your technique focus in <span className="text-cyan-300 font-semibold">{student.currentFocus}</span>, and your goal for a <span className="text-purple-300 font-semibold">{student.careerGoal}</span>.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col items-center sm:items-end gap-1.5 bg-[#07070d] p-3.5 rounded-2xl border border-purple-800/40 text-xs shadow-xl">
            <span className="text-[10px] text-purple-400 font-mono-tech uppercase">Top Domain Match:</span>
            <span className="text-cyan-300 font-black text-base font-space">
              {opportunitiesWithMatch[0]?.match.overallMatch || 94}% Compatibility
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Missions vs Special Grade Mentors & Labs */}
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition ${
              activeTab === 'opportunities'
                ? 'bg-purple-900/90 text-cyan-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-[#0b0b14] text-slate-400 hover:text-white border border-purple-950'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>MISSIONS ({opportunities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition ${
              activeTab === 'resources'
                ? 'bg-purple-900/90 text-cyan-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-[#0b0b14] text-slate-400 hover:text-white border border-purple-950'
            }`}
          >
            <Microscope className="w-4 h-4 text-purple-400" />
            <span>SPECIAL GRADE MENTORS & LABS ({resources.length})</span>
          </button>
        </div>

        {activeTab === 'opportunities' && (
          <div className="flex items-center gap-2 text-xs font-mono-tech">
            <span className="text-purple-400/80 hidden sm:inline">SORT BY:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#0b0b14] border border-purple-900/40 text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 text-xs"
            >
              <option value="match">Highest Compatibility %</option>
              <option value="resume">Resume Value</option>
            </select>
          </div>
        )}
      </div>

      {/* MISSIONS TAB */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search missions by name, skill, organizer, or topic..."
                className="w-full bg-[#0b0b14] border border-purple-900/40 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {EVENT_TYPE_FILTERS.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-xl font-mono-tech font-bold whitespace-nowrap transition ${
                  selectedType === type
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'bg-[#07070d] text-slate-400 hover:text-white border border-purple-950'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Missions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map(({ opp, match }) => {
              const isBookmarked = student.bookmarkedOpportunityIds.includes(opp.id);
              const hasAttended = student.attendedExperiences.some(e => e.opportunityId === opp.id);

              return (
                <div
                  key={opp.id}
                  className="p-5 rounded-3xl bg-[#0b0b14] border border-purple-800/40 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow-xl group relative overflow-hidden"
                >
                  <div>
                    {/* Top Tag Row */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40">
                          {match.overallMatch}% Match
                        </span>
                        <span className="text-[11px] text-purple-300 font-mono-tech uppercase">
                          {opp.eventType}
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleBookmark(opp.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isBookmarked
                            ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                            : 'bg-[#07070d] border-purple-900/30 text-slate-400 hover:text-white'
                        }`}
                        title="Bookmark Mission"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-black text-white font-space tracking-tight group-hover:text-purple-200 transition-colors">
                      {opp.eventName}
                    </h3>
                    <p className="text-xs text-purple-400/80 font-mono-tech mt-0.5 mb-2">
                      {opp.organizer} • {opp.locationMode} • Deadline: {opp.registrationDeadline}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                      {opp.description}
                    </p>

                    {/* Why Recommended for Your Domain */}
                    <div className="p-3 rounded-2xl bg-[#07070d] border border-purple-900/30 text-xs mb-3">
                      <span className="text-[10px] font-mono-tech font-bold uppercase text-cyan-400 block mb-1">
                        WHY RECOMMENDED FOR YOUR DOMAIN:
                      </span>
                      <p className="text-[11px] text-slate-300">
                        {match.reasons[0] || 'Matches your technical focus and placement objectives.'}
                      </p>
                    </div>

                    {/* Skills Developed Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {opp.skillsDeveloped.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono-tech bg-purple-950/60 text-purple-300 border border-purple-800/30"
                        >
                          +{skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      onClick={() => openWhyAttend(opp, match)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-tech font-bold text-cyan-300 hover:text-white bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/40 transition"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Mission Briefing</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {hasAttended ? (
                        <span className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono-tech font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-700/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Conquered</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => openGrowthModal(opp)}
                          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono-tech font-bold text-purple-200 hover:text-white bg-purple-900/40 hover:bg-purple-800/50 border border-purple-700/40 transition"
                        >
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>Log Growth</span>
                        </button>
                      )}

                      <a
                        href={opp.registrationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-purple-400/40 transition"
                      >
                        <span>Accept</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SPECIAL GRADE MENTORS & TECHNIQUE FACILITIES TAB */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0b0b14] border border-purple-800/40 text-xs text-slate-300 leading-relaxed font-mono-tech shadow-xl">
            Direct access to Special Grade faculty supervisors, academic incubation labs, and high-performance computing clusters curated for <strong className="text-cyan-300">{student.branch}</strong> students.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resources.map(res => (
              <div
                key={res.id}
                className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40">
                      {res.type === 'Lab' || res.type === 'Specialized Facility' || res.type === 'Research Group'
                        ? '🧪 TECHNIQUE FACILITY'
                        : res.type === 'Student Club'
                        ? '🏯 CLUB SANCTUARY'
                        : '🔮 SPECIAL GRADE MENTOR'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono-tech">
                      {res.roomOrBuilding}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white font-space mb-1">
                    {res.name}
                  </h3>
                  {res.mentorName && (
                    <p className="text-xs text-purple-300 font-mono-tech mb-2">
                      Supervisor: {res.mentorName}
                    </p>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {res.description}
                  </p>

                  {/* Why this matches your Domain */}
                  <div className="p-3.5 rounded-2xl bg-[#07070d] border border-purple-900/30 my-3">
                    <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      WHY THIS MATCHES YOUR DOMAIN:
                    </span>
                    <p className="text-xs text-purple-200">
                      "{res.relevanceExplanation}"
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 font-mono-tech">
                    <div>
                      <strong className="text-slate-200">Expertise:</strong> {res.areaOfExpertise}
                    </div>
                    <div>
                      <strong className="text-slate-200">Associated Techniques:</strong> {res.relatedSkills.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/30 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono-tech">
                    Contact: <span className="text-cyan-300">{res.contactOrLink}</span>
                  </span>
                  <a
                    href={`mailto:${res.contactOrLink}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono-tech font-bold text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 transition"
                  >
                    <span>Request Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <WhyAttendModal
        opportunity={activeModalOpp}
        match={activeModalMatch}
        student={student}
        isOpen={isWhyAttendOpen}
        onClose={() => setIsWhyAttendOpen(false)}
        onRegister={opp => window.open(opp.registrationLink, '_blank')}
        onMarkAttended={opp => {
          setIsWhyAttendOpen(false);
          openGrowthModal(opp);
        }}
        onOpenBreakdown={() => {
          setIsWhyAttendOpen(false);
          setIsBreakdownOpen(true);
        }}
      />

      <MatchBreakdownModal
        opportunity={activeModalOpp}
        match={activeModalMatch}
        student={student}
        isOpen={isBreakdownOpen}
        onClose={() => setIsBreakdownOpen(false)}
        onOpenWhyAttend={() => {
          setIsBreakdownOpen(false);
          setIsWhyAttendOpen(true);
        }}
      />

      <AfterEventGrowthModal
        opportunity={activeModalOpp}
        student={student}
        isOpen={isGrowthOpen}
        onClose={() => setIsGrowthOpen(false)}
        onApplyGrowth={onApplyGrowth}
      />
    </div>
  );
};
