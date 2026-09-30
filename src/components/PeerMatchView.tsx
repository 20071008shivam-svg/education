import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  UserPlus, 
  Send, 
  Search, 
  Filter, 
  Check, 
  Lock, 
  Flame, 
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PeerProfile, StudentProfile } from '../types';

interface PeerMatchViewProps {
  student: StudentProfile;
  peerProfiles: PeerProfile[];
  onToggleOptIn: (optIn: boolean) => void;
  onUpdateIntent: (intent: any) => void;
  onToggleAnonymity: (anonymized: boolean) => void;
}

export const PeerMatchView: React.FC<PeerMatchViewProps> = ({
  student,
  peerProfiles,
  onToggleOptIn,
  onUpdateIntent,
  onToggleAnonymity,
}) => {
  const [selectedIntent, setSelectedIntent] = useState<'All' | 'Looking for project partners' | 'Looking for hackathon teammates' | 'Looking for study partners' | 'Looking for club/community'>('All');
  const [connectModalPeer, setConnectModalPeer] = useState<PeerProfile | null>(null);
  const [inviteMessage, setInviteMessage] = useState('');
  const [sentInvites, setSentInvites] = useState<string[]>([]);

  const filteredPeers = peerProfiles.filter(peer => {
    if (selectedIntent === 'All') return true;
    return peer.lookingFor === selectedIntent;
  });

  const handleOpenConnect = (peer: PeerProfile) => {
    setConnectModalPeer(peer);
    setInviteMessage(`Greetings ${peer.name}! I detected on EduTwin Sorcerer Alliance that you specialize in ${peer.primarySkills.map(s => s.name).join(', ')}. My technique is in ${student.currentFocus}. Complementary techniques detected—want to form an alliance for upcoming campus missions like the National Hackathon?`);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectModalPeer) return;

    setSentInvites([...sentInvites, connectModalPeer.id]);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    setConnectModalPeer(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Gojo Pose Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_gojo_pose_1790758369395.jpg"
            alt="Alliance Squad Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a]/90 via-[#120c24]/85 to-[#0a1020]/90" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>SORCERER ALLIANCE</span>
              </span>
              <span className="text-xs text-purple-300/80 font-mono-tech">
                Complementary Cursed Technique Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              Assemble High-Resonance Squads
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Great teams aren't clones—they possess complementary techniques. EduTwin matches your <span className="text-cyan-300 font-semibold">{student.currentFocus}</span> abilities with frontend artisans, UI designers, and systems engineers to form formidable mission alliances.
            </p>
          </div>

          {/* Privacy & Opt-in Toggle */}
          <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-800/40 flex flex-col gap-2 shrink-0 text-xs font-mono-tech shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-300">Alliance Discovery:</span>
              <button
                onClick={() => onToggleOptIn(!student.peerMatchingOptIn)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  student.peerMatchingOptIn
                    ? 'bg-gradient-to-r from-purple-700 to-cyan-500 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'bg-[#161624] text-slate-500 border border-purple-950'
                }`}
              >
                {student.peerMatchingOptIn ? 'Active (Opted In)' : 'Concealed (Paused)'}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-[11px]">Identity Veil:</span>
              <button
                onClick={() => onToggleAnonymity(!student.privacyAnonymized)}
                className="text-[11px] text-cyan-400 underline"
              >
                {student.privacyAnonymized ? 'Showing Alias Only' : 'Real Name Visible'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Squad Concept Teaser */}
      <div className="p-5 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-900/30">
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>POTENTIAL ALLIANCE SYNERGY DETECTED</span>
          </span>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/40">
            96% TRIAD RESONANCE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3 font-mono-tech">
          <div className="p-3 rounded-2xl bg-[#07070d] border border-cyan-700/40">
            <span className="text-[10px] text-cyan-400 font-bold block">YOU</span>
            <span className="font-bold text-white text-sm">{student.fullName}</span>
            <p className="text-[11px] text-slate-400 mt-1">Python + AI & Algorithms</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#07070d] border border-purple-700/40">
            <span className="text-[10px] text-purple-300 font-bold block">SORCERER B</span>
            <span className="font-bold text-white text-sm">Meera Patel</span>
            <p className="text-[11px] text-slate-400 mt-1">React + Full Stack Dev</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#07070d] border border-indigo-700/40">
            <span className="text-[10px] text-indigo-300 font-bold block">SORCERER C</span>
            <span className="font-bold text-white text-sm">Rohan Verma</span>
            <p className="text-[11px] text-slate-400 mt-1">Figma UI/UX & Design</p>
          </div>
        </div>

        <p className="text-xs text-purple-200/90 leading-relaxed font-mono-tech bg-purple-950/20 p-2.5 rounded-xl border border-purple-900/30">
          ⚡ <em>"Complementary techniques detected. This group could form a balanced hackathon squad with end-to-end full stack, AI modeling, and interface polish."</em>
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {([
          'All',
          'Looking for hackathon teammates',
          'Looking for project partners',
          'Looking for study partners',
          'Looking for club/community'
        ] as const).map(intent => (
          <button
            key={intent}
            onClick={() => setSelectedIntent(intent as any)}
            className={`px-3 py-1.5 rounded-xl font-mono-tech font-bold whitespace-nowrap transition ${
              selectedIntent === intent
                ? 'bg-purple-900 text-cyan-300 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-[#0b0b14] text-slate-400 hover:text-white border border-purple-950'
            }`}
          >
            {intent}
          </button>
        ))}
      </div>

      {/* Peer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPeers.map(peer => {
          const hasInvited = sentInvites.includes(peer.id);

          return (
            <div
              key={peer.id}
              className="p-5 rounded-3xl bg-[#0b0b14] border border-purple-800/40 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center text-white text-sm font-bold border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.4)] font-mono-tech">
                      {peer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white font-space group-hover:text-purple-200 transition-colors">
                        {peer.name}
                      </h3>
                      <p className="text-[11px] text-purple-300/80 font-mono-tech">
                        {peer.department} • {peer.year}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono-tech font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                    {peer.lookingFor.replace('Looking for ', '')}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 mb-3 leading-relaxed">
                  {peer.bio}
                </p>

                {/* Primary Techniques */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] text-purple-400 font-mono-tech uppercase font-bold block">
                    TECHNIQUES DEPLOYED:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {peer.primarySkills.map(skill => (
                      <span
                        key={skill.name}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono-tech font-bold bg-purple-950/70 text-purple-200 border border-purple-800/40"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Complementary Match Reason */}
                <div className="p-3 rounded-2xl bg-[#07070d] border border-purple-900/30 text-xs">
                  <span className="text-[10px] font-mono-tech font-bold uppercase text-cyan-400 block mb-0.5">
                    ALLIANCE RESONANCE NOTE:
                  </span>
                  <p className="text-[11px] text-purple-200/90 leading-relaxed">
                    {peer.complementaryExplanation || 'Complementary techniques detected. This group could form a balanced project team.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between">
                <button
                  onClick={() => handleOpenConnect(peer)}
                  className="text-xs font-mono-tech font-bold text-slate-400 hover:text-white"
                >
                  View Profile
                </button>

                {hasInvited ? (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono-tech font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-700/40">
                    <Check className="w-3.5 h-3.5" />
                    <span>Alliance Dispatched</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenConnect(peer)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-purple-400/40 transition transform hover:scale-[1.02]"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-cyan-200" />
                    <span>INVITE TO ALLIANCE</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Modal */}
      {connectModalPeer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#0b0b14] border border-purple-800/50 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white font-space">
              Transmit Alliance Pitch to {connectModalPeer.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono-tech">
              Send a personalized mission pitch highlighting complementary techniques:
            </p>

            <form onSubmit={handleSendInvite} className="space-y-3">
              <textarea
                value={inviteMessage}
                onChange={e => setInviteMessage(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConnectModalPeer(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono-tech text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-cyan-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                >
                  <span>Transmit Invitation</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
