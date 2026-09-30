import React from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Flame, 
  Compass, 
  Trophy, 
  Zap,
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuestStep, StudentProfile } from '../types';

interface CampusQuestViewProps {
  student: StudentProfile;
  onCompleteQuestStep: (stepId: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const CampusQuestView: React.FC<CampusQuestViewProps> = ({
  student,
  onCompleteQuestStep,
  onNavigateToTab,
}) => {
  const quests = student.campusQuests;
  const completedCount = quests.filter(q => q.status === 'completed').length;
  const totalXp = quests.reduce((acc, q) => q.status === 'completed' ? acc + q.xp : acc, 0);
  const progressPercent = Math.round((completedCount / quests.length) * 100);

  const handleComplete = (stepId: string) => {
    onCompleteQuestStep(stepId);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Gojo Hero Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_gojo_hero_1790757333394.jpg"
            alt="Quest Ascension Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a]/90 via-[#120c24]/85 to-[#0a1020]/90" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Milestone className="w-3.5 h-3.5 text-cyan-400" />
                <span>SORCERER PROGRESSION</span>
              </span>
              <span className="text-xs text-purple-300/80 font-mono-tech">
                Ascension Track: {student.currentFocus}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              Sequential Milestone Ascension
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Unlike static curricula, this dynamic progression tree adapts continuously as you conquer campus missions, hackathons, and foundational lab milestones.
            </p>
          </div>

          <div className="bg-[#07070d] p-4 rounded-2xl border border-purple-800/40 flex items-center gap-4 text-xs shadow-xl font-mono-tech">
            <div className="text-center">
              <span className="text-purple-400 block text-[10px] uppercase">Cursed Energy</span>
              <span className="text-amber-400 font-extrabold text-base flex items-center gap-1 justify-center">
                <Zap className="w-3.5 h-3.5 fill-current" />
                {totalXp} CE
              </span>
            </div>
            <div className="w-px h-8 bg-purple-900/40" />
            <div className="text-center">
              <span className="text-purple-400 block text-[10px] uppercase">Mastery</span>
              <span className="text-cyan-300 font-extrabold text-base">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#161624] mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-700 rounded-full shadow-[0_0_10px_#22d3ee]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quest Steps Glowing Timeline */}
      <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
        <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2 mb-6 pb-3 border-b border-purple-900/30">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Ascension Milestones ({completedCount}/{quests.length} Conquered)</span>
        </h2>

        <div className="space-y-4">
          {quests.map((quest, index) => {
            const isCompleted = quest.status === 'completed';
            const isInProgress = quest.status === 'in_progress';
            const isLocked = quest.status === 'locked';

            return (
              <div
                key={quest.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#07070d] border-purple-700/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : isInProgress
                    ? 'bg-purple-950/30 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-1 ring-purple-500/40'
                    : 'bg-[#050508]/60 border-purple-950/40 opacity-55'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Glowing Node Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-purple-800 to-indigo-900 text-cyan-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                        : isInProgress
                        ? 'bg-gradient-to-br from-purple-700 to-cyan-500 text-white animate-pulse shadow-[0_0_20px_#a855f7]'
                        : 'bg-[#0d0d18] text-slate-500 border border-purple-950'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                    ) : isInProgress ? (
                      <Clock className="w-5 h-5 text-white" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono-tech font-bold uppercase text-purple-400">
                        STAGE {index + 1}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-purple-950 text-cyan-300 border border-purple-800/40">
                        +{quest.xp} CE
                      </span>
                      {isInProgress && (
                        <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50 animate-pulse">
                          CURRENT OBJECTIVE
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white font-space">
                      {quest.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xl">
                      {quest.description}
                    </p>
                  </div>
                </div>

                {/* Node Action */}
                <div className="shrink-0 w-full sm:w-auto flex justify-end">
                  {isCompleted ? (
                    <span className="text-xs font-mono-tech font-bold text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conquered</span>
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={() => handleComplete(quest.id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition"
                    >
                      Complete & Claim CE
                    </button>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono-tech flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
