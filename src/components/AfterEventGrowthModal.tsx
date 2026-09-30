import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Briefcase, 
  Share2, 
  Layers, 
  Check, 
  Copy, 
  ArrowRight, 
  Flame, 
  FileCheck,
  Loader2,
  FolderGit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CampusOpportunity, StudentProfile, AttendedExperienceGrowth } from '../types';
import { generateTurnExperienceIntoGrowth, DebriefOutput } from '../services/aiService';

interface AfterEventGrowthModalProps {
  opportunity: CampusOpportunity | null;
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onApplyGrowth: (growth: AttendedExperienceGrowth) => void;
}

export const AfterEventGrowthModal: React.FC<AfterEventGrowthModalProps> = ({
  opportunity,
  student,
  isOpen,
  onClose,
  onApplyGrowth,
}) => {
  if (!isOpen || !opportunity) return null;

  // Questionnaire state
  const [learnings, setLearnings] = useState('Gained deep hands-on proficiency in building rapid prototypes under competition constraints and presenting to evaluators.');
  const [projectBuilt, setProjectBuilt] = useState('');
  const [certificateEarned, setCertificateEarned] = useState(opportunity.certificateAvailable);
  const [teamRole, setTeamRole] = useState(opportunity.participationType === 'Team' ? 'Led AI logic & model pipeline' : 'Individual contributor');
  const [mentorMet, setMentorMet] = useState(true);
  const [proofUrl, setProofUrl] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGrowth, setGeneratedGrowth] = useState<DebriefOutput | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const result = await generateTurnExperienceIntoGrowth({
        eventName: opportunity.eventName,
        organizer: opportunity.organizer,
        eventType: opportunity.eventType,
        learnings,
        projectBuilt,
        teamRole,
        certificateEarned,
        mentorMet,
        student,
      });
      setGeneratedGrowth(result);
    } catch (err) {
      console.error('Error generating growth outputs:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleApplyToProfile = () => {
    if (!generatedGrowth) return;

    const experienceEntry: AttendedExperienceGrowth = {
      id: `exp_${Date.now()}`,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.eventName,
      organizer: opportunity.organizer,
      dateAttended: new Date().toISOString().split('T')[0],
      roleOrTeam: teamRole,
      learningsSummary: learnings,
      builtProject: projectBuilt || undefined,
      hadCertificate: certificateEarned,
      metMentor: mentorMet,
      resumeBullet: generatedGrowth.resumeBullet,
      linkedInPost: generatedGrowth.linkedInPost,
      portfolioEntry: generatedGrowth.portfolioEntry,
      skillsGained: generatedGrowth.skillsGained,
    };

    onApplyGrowth(experienceEntry);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0b0b14] border border-purple-800/50 shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[90vh] overflow-y-auto transition-all">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-800 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/40">
              <Flame className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white font-space tracking-tight">AI EXPERIENCE FORGE</h2>
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40">
                  GROWTH ENGINE
                </span>
              </div>
              <p className="text-xs text-purple-300/80 font-mono-tech">
                Mission Debrief: <span className="text-white font-bold">{opportunity.eventName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-950/40 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form vs Result */}
        {!generatedGrowth ? (
          <form onSubmit={handleGenerate} className="space-y-4 my-6">
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 font-mono-tech">
              ⚡ Debrief your mission experience. The AI Forge transforms your actions into STAR resume bullets, LinkedIn posts, and permanent Technique upgrades.
            </div>

            {/* 1. What did you learn? */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                1. What techniques did you learn or practice during this mission? <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={learnings}
                onChange={e => setLearnings(e.target.value)}
                rows={2}
                placeholder="e.g. Mastered fine-tuning lightweight vision transformers and setting up high-concurrency FastAPI servers."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* 2. Did you build something? */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                2. Did you build something or write code? <span className="text-slate-500">(Optional project title & core idea)</span>
              </label>
              <input
                type="text"
                value={projectBuilt}
                onChange={e => setProjectBuilt(e.target.value)}
                placeholder="e.g. SmartCampus-AI: Real-time room occupancy and lecture transcription service"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 3. Team role */}
              <div>
                <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                  3. Team Role / Contribution
                </label>
                <input
                  type="text"
                  value={teamRole}
                  onChange={e => setTeamRole(e.target.value)}
                  placeholder="e.g. Team Lead & Backend Developer"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* 4. Certificate / Proof URL */}
              <div>
                <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                  4. GitHub / Project / Certificate Link <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={proofUrl}
                  onChange={e => setProofUrl(e.target.value)}
                  placeholder="https://github.com/... or drive link"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            {/* Checkboxes: Certificate & Met Mentor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#07070d] border border-purple-900/40 cursor-pointer hover:border-purple-600/50 transition">
                <input
                  type="checkbox"
                  checked={certificateEarned}
                  onChange={e => setCertificateEarned(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-0 bg-[#0b0b14] border-purple-800"
                />
                <div className="text-xs">
                  <p className="font-bold text-white font-mono-tech">Received Certificate</p>
                  <p className="text-[10px] text-slate-400">Verifiable campus credential</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#07070d] border border-purple-900/40 cursor-pointer hover:border-purple-600/50 transition">
                <input
                  type="checkbox"
                  checked={mentorMet}
                  onChange={e => setMentorMet(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-0 bg-[#0b0b14] border-purple-800"
                />
                <div className="text-xs">
                  <p className="font-bold text-white font-mono-tech">Met Industry / Faculty Mentor</p>
                  <p className="text-[10px] text-slate-400">Received constructive feedback</p>
                </div>
              </label>
            </div>

            {/* Submit generate button */}
            <div className="pt-4 border-t border-purple-900/40 flex justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 transition disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Transmuting Mission Experience...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Synthesize Sorcerer Proofs & Artifacts</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Result View */
          <div className="space-y-4 my-6">
            {/* 1. Resume Bullet */}
            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-cyan-300 uppercase tracking-wider">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>1. Generated Resume Bullet (STAR Format)</span>
                </div>
                <button
                  onClick={() => handleCopy(generatedGrowth.resumeBullet, 'resume')}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-950/70 hover:bg-purple-900 text-xs font-mono-tech text-cyan-300 border border-purple-700/40 transition cursor-pointer"
                >
                  {copiedType === 'resume' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'resume' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-200 font-mono-tech bg-[#0b0b14] p-3 rounded-xl border border-purple-900/30 leading-relaxed">
                • {generatedGrowth.resumeBullet}
              </p>
            </div>

            {/* 2. LinkedIn Description */}
            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-purple-300 uppercase tracking-wider">
                  <Share2 className="w-4 h-4 text-purple-400" />
                  <span>2. LinkedIn Announcement Dispatch</span>
                </div>
                <button
                  onClick={() => handleCopy(generatedGrowth.linkedInPost, 'linkedin')}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-950/70 hover:bg-purple-900 text-xs font-mono-tech text-cyan-300 border border-purple-700/40 transition cursor-pointer"
                >
                  {copiedType === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'linkedin' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-xs text-slate-300 whitespace-pre-line bg-[#0b0b14] p-3 rounded-xl border border-purple-900/30 leading-relaxed max-h-36 overflow-y-auto font-mono-tech">
                {generatedGrowth.linkedInPost}
              </div>
            </div>

            {/* 3. Portfolio Entry */}
            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/40">
              <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-amber-400 uppercase tracking-wider mb-2">
                <FolderGit2 className="w-4 h-4 text-amber-400" />
                <span>3. Portfolio Artifact Entry</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b14] border border-purple-900/30 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-white text-sm font-space">
                    {generatedGrowth.portfolioEntry.title}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {generatedGrowth.portfolioEntry.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-lg bg-purple-950 text-[10px] text-cyan-300 font-mono-tech border border-purple-800/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-xs">
                  {generatedGrowth.portfolioEntry.summary}
                </p>
                <p className="text-emerald-400 text-[11px] font-mono-tech font-bold">
                  Impact: {generatedGrowth.portfolioEntry.impact}
                </p>
              </div>
            </div>

            {/* 4. Skills Added / Leveled Up */}
            <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/40">
              <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-cyan-300 uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>4. Techniques Added to Your Cursed Technique Profile</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedGrowth.skillsGained.map(sk => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  >
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>+{sk}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action to Apply */}
            <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
              <button
                onClick={() => setGeneratedGrowth(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono-tech font-medium text-slate-400 hover:text-white bg-[#07070d] hover:bg-purple-950/50 border border-purple-900/40 transition cursor-pointer"
              >
                Re-edit Answers
              </button>

              <button
                onClick={handleApplyToProfile}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/40 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Apply to Cursed Technique DNA & Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
