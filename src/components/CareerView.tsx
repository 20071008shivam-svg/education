import React, { useState } from 'react';
import { 
  Briefcase, 
  Copy, 
  Check, 
  Sparkles, 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Download, 
  Award,
  ChevronRight,
  TrendingUp,
  Flame,
  Shield,
  Zap,
  Share2
} from 'lucide-react';
import { StudentProfile } from '../types';

interface CareerViewProps {
  student: StudentProfile;
  onNavigateToTab: (tab: string) => void;
}

export const CareerView: React.FC<CareerViewProps> = ({
  student,
  onNavigateToTab,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null);

  const experiences = student.attendedExperiences;

  const handleCopyAllResumeBullets = () => {
    const text = experiences
      .map(exp => `• ${exp.resumeBullet} (${exp.opportunityTitle}, ${exp.organizer})`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleCopySingle = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletId(id);
    setTimeout(() => setCopiedBulletId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Gojo Future Domain Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_gojo_future_1790758382531.jpg"
            alt="Career Progression Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a]/90 via-[#120c24]/85 to-[#0a1020]/90" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>SORCERER RECORD</span>
              </span>
              <span className="text-xs text-purple-300/80 font-mono-tech">
                Domain Goal: {student.careerGoal} in {student.currentFocus}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              Professional Achievement Archive & Experience Forge
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every completed campus mission, hackathon, and technical workshop is permanently archived here into ATS-compliant STAR resume bullet points, verified portfolio artifacts, and LinkedIn announcement dispatches.
            </p>
          </div>

          {experiences.length > 0 && (
            <button
              onClick={handleCopyAllResumeBullets}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 transition shrink-0"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'Copied Full Vault!' : 'Copy Formatted Bullets'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Verified Resume Bullets Vault */}
      <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-900/30">
          <div>
            <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Verified Campus Resume Proofs ({experiences.length})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono-tech">
              Action-oriented, quantified STAR statements formulated by After-Mission AI
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('campus')}
            className="text-xs font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>+ Debrief Attended Mission</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
            <Briefcase className="w-10 h-10 text-purple-400/50 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white font-space">
              No Attended Missions Archived Yet
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Mark any campus event as attended in the Missions tab to activate the AI Experience Forge and synthesize instant resume proof.
            </p>
            <button
              onClick={() => onNavigateToTab('campus')}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold text-white bg-purple-900 hover:bg-purple-800 border border-purple-600/40 transition"
            >
              Browse Campus Missions
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map(exp => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-[#07070d] border border-purple-900/30 hover:border-purple-600/40 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm text-white font-space">
                        {exp.opportunityTitle}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-700/40">
                        {exp.organizer}
                      </span>
                      <span className="text-xs text-slate-500 font-mono-tech">
                        • {exp.dateAttended}
                      </span>
                    </div>
                    {exp.roleOrTeam && (
                      <p className="text-xs text-purple-300/80 font-mono-tech">
                        Role: {exp.roleOrTeam}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopySingle(exp.resumeBullet, exp.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-tech font-bold text-slate-300 hover:text-white bg-[#0f0f1c] hover:bg-purple-950 border border-purple-900/40 transition shrink-0"
                    title="Copy this bullet point"
                  >
                    {copiedBulletId === exp.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bullet</span>
                      </>
                    )}
                  </button>
                </div>

                {/* STAR Bullet Point */}
                <div className="p-3.5 rounded-xl bg-[#0d0d18] border border-purple-800/30 text-xs text-slate-200 leading-relaxed font-mono-tech">
                  • {exp.resumeBullet}
                </div>

                {/* Skills Gained & Proof Chips */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-mono-tech uppercase">Skills:</span>
                    {exp.skillsGained.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-700/40"
                      >
                        +{skill}
                      </span>
                    ))}
                  </div>

                  {exp.hadCertificate && (
                    <span className="text-[11px] text-amber-300 flex items-center gap-1 font-mono-tech">
                      <Award className="w-3.5 h-3.5" />
                      <span>Verified Certificate</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Portfolio & LinkedIn Artifacts */}
      {experiences.some(e => e.portfolioEntry || e.linkedInPost) && (
        <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
          <div className="mb-4 pb-3 border-b border-purple-900/30">
            <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Synthesized Portfolio & LinkedIn Dispatches</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono-tech">
              Full-context project summaries and social launch announcements ready for publishing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.filter(e => e.portfolioEntry).map(exp => (
              <div
                key={`port_${exp.id}`}
                className="p-5 rounded-2xl bg-[#07070d] border border-purple-900/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech font-bold uppercase text-purple-400">
                      Portfolio Milestone
                    </span>
                    <span className="text-xs text-slate-500 font-mono-tech">
                      {exp.opportunityTitle}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-space mb-1">
                    {exp.portfolioEntry?.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {exp.portfolioEntry?.summary}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono-tech">
                    Impact: {exp.portfolioEntry?.impact}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {exp.portfolioEntry?.techStack.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-cyan-300 font-mono-tech">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleCopySingle(exp.portfolioEntry!.summary, `port_${exp.id}`)}
                    className="text-xs font-mono-tech font-bold text-purple-400 hover:text-cyan-300"
                  >
                    Copy Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
