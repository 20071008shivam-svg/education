import React from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  UserCheck, 
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
  Zap,
  Shield,
  Target
} from 'lucide-react';
import { CampusOpportunity, OpportunityMatchBreakdown, StudentProfile } from '../types';

interface WhyAttendModalProps {
  opportunity: CampusOpportunity | null;
  match: OpportunityMatchBreakdown | null;
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (opp: CampusOpportunity) => void;
  onMarkAttended: (opp: CampusOpportunity) => void;
  onOpenBreakdown?: () => void;
}

export const WhyAttendModal: React.FC<WhyAttendModalProps> = ({
  opportunity,
  match,
  student,
  isOpen,
  onClose,
  onRegister,
  onMarkAttended,
  onOpenBreakdown,
}) => {
  if (!isOpen || !opportunity || !match) return null;

  const { whyAttend } = match;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0b0b14] border border-purple-800/50 shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[90vh] overflow-y-auto transition-all">
        {/* Header: MISSION BRIEFING */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-900/40">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                MISSION BRIEFING • {match.overallMatch}% COMPATIBILITY
              </span>
              <span className="text-xs text-purple-400 font-mono-tech uppercase">
                {opportunity.eventType}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white font-space tracking-tight">
              {opportunity.eventName}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap font-mono-tech">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                {opportunity.organizer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                {opportunity.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {opportunity.locationMode}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-950/40 border border-transparent hover:border-purple-800/40 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Structured 6-Point Mission Briefing */}
        <div className="space-y-4 my-6">
          {/* 1. OBJECTIVE */}
          <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
            <h4 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>OBJECTIVE (What is this event?)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {whyAttend.whatIsIt}
            </p>
          </div>

          {/* 2. WHY THIS MISSION? */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <h4 className="text-xs font-mono-tech font-bold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>WHY THIS MISSION? (Personalized Domain Resonance)</span>
            </h4>
            <p className="text-xs text-purple-200/90 leading-relaxed">
              {whyAttend.whyDoesItMatter}
            </p>
          </div>

          {/* 3. TECHNIQUES DEVELOPED */}
          <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
            <h4 className="text-xs font-mono-tech font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>TECHNIQUES DEVELOPED (Skills & Knowledge)</span>
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed space-y-1 mb-2">
              {Array.isArray(whyAttend.whatWillILearn) ? (
                whyAttend.whatWillILearn.map((point, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{point}</span>
                  </div>
                ))
              ) : (
                <p>{String(whyAttend.whatWillILearn)}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {opportunity.skillsDeveloped.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-mono-tech font-bold bg-purple-950 text-purple-200 border border-purple-700/40"
                >
                  +{skill}
                </span>
              ))}
            </div>
          </div>

          {/* 4. CAREER & RESUME IMPACT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
              <h4 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>CAREER IMPACT</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects directly to your target <strong>{student.careerGoal}</strong> trajectory and expands your professional network among industry sponsors.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
              <h4 className="text-xs font-mono-tech font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>RESUME IMPACT</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {whyAttend.whatItAddsToResume}
              </p>
            </div>
          </div>

          {/* 5. RECOMMENDATION SCORE BREAKDOWN */}
          <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono-tech font-bold text-purple-300 uppercase tracking-wider">
                RECOMMENDATION SCORE: {match.overallMatch}%
              </h4>
              {onOpenBreakdown && (
                <button
                  type="button"
                  onClick={onOpenBreakdown}
                  className="text-[10px] font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                >
                  Inspect 6-Factor Formula →
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono-tech">
              <div className="p-2 rounded-xl bg-[#0b0b14] border border-purple-900/30">
                <span className="text-[10px] text-slate-400 block">Skill (30%)</span>
                <span className="text-cyan-400 font-bold">{match.skillMatch}%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0b0b14] border border-purple-900/30">
                <span className="text-[10px] text-slate-400 block">Interest (25%)</span>
                <span className="text-indigo-300 font-bold">{match.interestMatch}%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0b0b14] border border-purple-900/30">
                <span className="text-[10px] text-slate-400 block">Career (20%)</span>
                <span className="text-purple-300 font-bold">{match.careerMatch}%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0b0b14] border border-purple-900/30">
                <span className="text-[10px] text-slate-400 block">Acad. (10%)</span>
                <span className="text-amber-300 font-bold">{match.academicRelevance}%</span>
              </div>
            </div>
          </div>

          {/* 6. RECOMMENDED NEXT STEP */}
          <div className="p-4 rounded-2xl bg-[#120f22] border border-purple-700/40">
            <h4 className="text-xs font-mono-tech font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>RECOMMENDED NEXT STEP</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {whyAttend.recommendedNextStep}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onMarkAttended(opportunity)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono-tech font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/40 transition"
          >
            Mark Attended & Forge Growth
          </button>

          <button
            onClick={() => onRegister(opportunity)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/40 transition transform hover:scale-[1.02] active:scale-95 font-space tracking-wide"
          >
            <span>ACCEPT MISSION</span>
            <ExternalLink className="w-4 h-4 text-cyan-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
