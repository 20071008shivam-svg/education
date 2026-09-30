import React from 'react';
import { X, Shield, Sparkles, Target, Award, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { CampusOpportunity, OpportunityMatchBreakdown, StudentProfile } from '../types';

interface MatchBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: CampusOpportunity | null;
  match: OpportunityMatchBreakdown | null;
  student: StudentProfile;
  onOpenWhyAttend?: (opp: CampusOpportunity) => void;
}

export const MatchBreakdownModal: React.FC<MatchBreakdownModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  match,
  student,
  onOpenWhyAttend,
}) => {
  if (!isOpen || !opportunity || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#090916] border border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glowing ambient neon line */}
        <div className="h-1.5 bg-gradient-to-r from-purple-600 via-cyan-400 to-rose-500 shadow-[0_0_12px_#22d3ee]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-purple-900/40 bg-[#070712] flex items-start justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-purple-950/80 text-purple-300 border border-purple-700/50">
                EXPLAINABLE AI ENGINE
              </span>
              <span className="text-[11px] text-cyan-400 font-mono-tech">
                6-Factor Calibration
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white font-space">
              Domain Match Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {opportunity.eventName} · {opportunity.organizer}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-[#121224] hover:bg-purple-950/50 border border-purple-900/40 transition cursor-pointer shrink-0"
            aria-label="Close match breakdown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Top Score Banner */}
          <div className="p-4 rounded-xl bg-[#06060e] border border-purple-800/40 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400 block">
                OVERALL DOMAIN COMPATIBILITY
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-cyan-300 font-space drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
                  {match.overallMatch}%
                </span>
                <span className="text-xs text-purple-300 font-mono-tech font-semibold">
                  HIGH AFFINITY
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Calibrated for {student.fullName} ({student.branch}, {student.year}) targeting {student.careerGoal}.
              </p>
            </div>

            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1c1936"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                  strokeDasharray={`${match.overallMatch}, 100`}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_#22d3ee]"
                />
              </svg>
              <div className="absolute text-xs font-bold text-white font-mono-tech">
                {match.overallMatch}%
              </div>
            </div>
          </div>

          {/* 6 Scoring Factors List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-slate-300 px-1">
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                <span>SCORING FACTORS & WEIGHT DISTRIBUTION</span>
              </span>
              <span className="text-slate-400 text-[10px]">Total: 100%</span>
            </div>

            <div className="space-y-2">
              {match.factors?.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#080816] border border-purple-900/40 hover:border-purple-600/50 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-space">
                        {f.factor}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-tech font-bold bg-purple-950/70 text-cyan-300 border border-purple-700/40">
                        Weight: {f.weightPercent}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-cyan-400 font-mono-tech">
                        {f.score}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono-tech">
                        (+{Math.round(f.score * (f.weightPercent / 100))} pts)
                      </span>
                    </div>
                  </div>

                  {/* Dual comparison bar */}
                  <div className="space-y-1 text-[10px] font-mono-tech">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Student Alignment ({f.studentScore}%)</span>
                      <span>Opportunity Yield ({f.opportunityScore}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#141426] rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_6px_#22d3ee]"
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {f.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-purple-900/40 bg-[#070712] flex items-center justify-between gap-3 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono-tech hidden sm:block">
            Strict Multi-Objective Ranking
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3 rounded-xl text-xs font-bold text-slate-300 bg-[#121224] hover:bg-[#1a1a32] border border-slate-700 transition cursor-pointer"
            >
              Close
            </button>
            {onOpenWhyAttend && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWhyAttend(opportunity);
                }}
                className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] transition flex items-center gap-1.5 cursor-pointer font-space"
              >
                <span>View Full Why Attend Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
