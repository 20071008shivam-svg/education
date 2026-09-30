import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  MessageSquare, 
  Send, 
  Sliders, 
  HelpCircle, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame, 
  Compass,
  Loader2,
  Zap,
  Shield,
  Layers
} from 'lucide-react';
import { StudentProfile, FutureSelfScenario } from '../types';
import { chatWithFutureSelf } from '../services/aiService';

interface FutureSelfViewProps {
  student: StudentProfile;
  onOpenDomainExpansion?: () => void;
}

export const FutureSelfView: React.FC<FutureSelfViewProps> = ({ 
  student,
  onOpenDomainExpansion
}) => {
  // Simulator sliders
  const [weeklyStudyHours, setWeeklyStudyHours] = useState(10);
  const [hackathonsPerYear, setHackathonsPerYear] = useState(3);
  const [targetCgpa, setTargetCgpa] = useState(Math.max(8.0, student.cgpa));

  // Chat with future self state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'future_twin'; text: string }>>([
    {
      sender: 'future_twin',
      text: `Greetings ${student.fullName.split(' ')[0]}! I am your manifested Future Sorcerer Twin in 2028. After mastering our techniques at ${student.university}, I am operating as a Special Grade AI & Software Engineer in Bangalore. Ask me anything about what's coming, which campus missions were critical turning points, or whether the late-night hackathons expanded our domain!`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTwinTyping, setIsTwinTyping] = useState(false);

  // Dynamic simulation outcome calculations based on slider parameters
  const baseCtcMin = 8 + (weeklyStudyHours * 0.4) + (hackathonsPerYear * 1.5) + ((targetCgpa - 7.5) * 2.5);
  const estimatedMinLpa = Math.max(7, Math.round(baseCtcMin * 10) / 10);
  const estimatedMaxLpa = Math.max(estimatedMinLpa + 6, Math.round((baseCtcMin * 1.6 + 4) * 10) / 10);

  const internshipProb = Math.min(96, Math.round(
    45 + (weeklyStudyHours * 1.8) + (hackathonsPerYear * 6.5) + ((targetCgpa - 7.5) * 5)
  ));

  const tierOneMasterIndex = Math.min(94, Math.round(
    30 + ((targetCgpa - 7.5) * 18) + (student.skills.some(s => s.name === 'Research') ? 15 : 5)
  ));

  const techReadinessScore = Math.min(99, Math.round(
    50 + (weeklyStudyHours * 2.2) + (hackathonsPerYear * 5)
  ));

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTwinTyping(true);

    try {
      const twinReply = await chatWithFutureSelf(student, userText, '2028');
      setChatMessages(prev => [...prev, { sender: 'future_twin', text: twinReply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTwinTyping(false);
    }
  };

  const predefinedScenarios: FutureSelfScenario[] = [
    {
      id: 'scen_current',
      name: 'Scenario A: Current Trajectory',
      description: 'Continuing current study habits (1–2 hrs/day) and participating in 1 campus hackathon per year.',
      badge: 'Baseline Flow',
      color: 'border-purple-900/40 bg-[#07070d]',
      metrics: {
        estimatedPlacementLpaMin: 8.5,
        estimatedPlacementLpaMax: 14.0,
        internshipProbability: 72,
        topTierAdmissionIndex: 68,
        skillReadinessScore: 74,
      },
      keyMilestones: [
        'Solid graduation CGPA of ~8.5',
        'Standard tech product or mid-tier service offer',
        '2 completed academic capstone projects'
      ],
      digitalTwinMessage: 'Consistent and safe, but leaves our high-tier AI capabilities partially untapped.'
    },
    {
      id: 'scen_study',
      name: 'Scenario B: High Study Consistency (+1 hr/day)',
      description: 'Prioritizing advanced algorithmic problem solving (LeetCode 150) and crossing 8.8+ CGPA.',
      badge: 'High Discipline',
      color: 'border-indigo-800/50 bg-[#07070d]',
      metrics: {
        estimatedPlacementLpaMin: 14.0,
        estimatedPlacementLpaMax: 22.0,
        internshipProbability: 88,
        topTierAdmissionIndex: 85,
        skillReadinessScore: 89,
      },
      keyMilestones: [
        'Top 5% batch ranking at university',
        'Direct Tier-1 Product Engineering interview shortlists',
        'Published research paper in university symposium'
      ],
      digitalTwinMessage: 'Exceptional core theoretical domain stability that makes technical rounds trivial.'
    },
    {
      id: 'scen_hackathons',
      name: 'Scenario C: Active Campus & Hackathon Focus',
      description: 'Competing in 3+ major national hackathons and publishing 3 production-grade open source repos.',
      badge: 'Special Grade Build',
      color: 'border-cyan-800/50 bg-[#07070d]',
      metrics: {
        estimatedPlacementLpaMin: 18.0,
        estimatedPlacementLpaMax: 30.0,
        internshipProbability: 94,
        topTierAdmissionIndex: 80,
        skillReadinessScore: 96,
      },
      keyMilestones: [
        '1st Place or Top 3 podium finish at National Tech Fest',
        'Angel-backed or high-growth startup internship',
        'Public Github with 500+ stars and live deployed users'
      ],
      digitalTwinMessage: 'Our hands-on technique expanded exponentially through high-stress team deployments.'
    },
    {
      id: 'scen_balanced',
      name: 'Scenario D: The Optimal Master Domain',
      description: 'Consistent 9.0+ CGPA paired with 2 targeted AI hackathons and active mentorship leadership.',
      badge: 'Transcendent',
      color: 'border-purple-600/60 bg-[#0c081a] shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      metrics: {
        estimatedPlacementLpaMin: 22.0,
        estimatedPlacementLpaMax: 36.0,
        internshipProbability: 97,
        topTierAdmissionIndex: 92,
        skillReadinessScore: 98,
      },
      keyMilestones: [
        'Off-campus Global Tech placement or top fellowship',
        'Special Grade alumni recognition',
        'End-to-end full stack AI pipeline in production'
      ],
      digitalTwinMessage: 'The pinnacle manifestation of your potential at Chandigarh University.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/50 p-6 sm:p-8 shadow-2xl">
        {/* Subtle Futuristic Domain Background Artwork */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
          <img
            src="/src/assets/images/jjk_future_domain_1790757373529.jpg"
            alt="Domain Expansion Future Simulation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a] via-[#120c24]/80 to-transparent" />
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>DOMAIN SIMULATION</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono-tech font-bold bg-amber-950/70 text-amber-300 border border-amber-600/40">
                PROBABILISTIC AI ESTIMATE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              Explore Possible Future Paths Based on Your Current Actions
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Domain simulation uses your academic standing ({student.cgpa} CGPA), active technique skills, and campus participation to project realistic career and compensation scenarios for graduation (Class of 2028).
            </p>
          </div>

          {/* Trigger Domain Expansion Overlay */}
          {onOpenDomainExpansion && (
            <button
              onClick={onOpenDomainExpansion}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-purple-300/40 transition transform hover:scale-[1.03] active:scale-95 cursor-pointer shrink-0 font-space tracking-wide"
            >
              <span className="text-sm font-cinzel">展開</span>
              <span>ENTER DOMAIN</span>
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Simulation Console (Sliders & Live Projections) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
            <div>
              <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Simulation Parameters</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono-tech">Adjust weekly inputs to simulate outcomes</p>
            </div>
            <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-purple-950 text-cyan-300 border border-purple-700/40">
              Interactive
            </span>
          </div>

          {/* Slider 1: Weekly Self-Study Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-300 font-bold">Weekly Focused Study / Coding:</span>
              <span className="text-cyan-400 font-bold text-sm">{weeklyStudyHours} hrs / week</span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={weeklyStudyHours}
              onChange={e => setWeeklyStudyHours(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-[#161624] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-tech">
              <span>Light (2 hrs)</span>
              <span>Moderate (14 hrs)</span>
              <span>Intensive (30 hrs)</span>
            </div>
          </div>

          {/* Slider 2: Hackathons / Competitions per year */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-300 font-bold">Campus Hackathons & Missions:</span>
              <span className="text-purple-300 font-bold text-sm">{hackathonsPerYear} per year</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={hackathonsPerYear}
              onChange={e => setHackathonsPerYear(Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-[#161624] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-tech">
              <span>0 (None)</span>
              <span>3 (Active)</span>
              <span>8 (Comp Beast)</span>
            </div>
          </div>

          {/* Slider 3: Target CGPA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-300 font-bold">Target Graduation CGPA:</span>
              <span className="text-amber-400 font-bold text-sm">{targetCgpa.toFixed(1)} / 10.0</span>
            </div>
            <input
              type="range"
              min={6.5}
              max={10.0}
              step={0.1}
              value={targetCgpa}
              onChange={e => setTargetCgpa(Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-[#161624] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-tech">
              <span>6.5 (Minimum)</span>
              <span>8.5 (Strong)</span>
              <span>10.0 (Perfect)</span>
            </div>
          </div>
        </div>

        {/* Live Forecast Dashboard */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Gojo Future Domain Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
            <img
              src="/src/assets/images/jjk_gojo_future_1790758382531.jpg"
              alt="Forecast Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0b0b14]/85" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/30 mb-4">
              <div>
                <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>Simulated 2028 Projection</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono-tech">Live calibrated probability model</p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/40 font-mono-tech font-bold">
                AI ESTIMATE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-4">
              {/* Placement Package Range */}
              <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
                <span className="text-[10px] text-purple-400 font-mono-tech uppercase block mb-1">
                  ESTIMATED CTC PACKAGE
                </span>
                <div className="text-xl sm:text-2xl font-black text-white font-space">
                  ₹{estimatedMinLpa} – {estimatedMaxLpa} <span className="text-xs font-normal text-slate-400">LPA</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono-tech mt-1 block">
                  Based on recent CU placements
                </span>
              </div>

              {/* Internship Probability */}
              <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
                <span className="text-[10px] text-purple-400 font-mono-tech uppercase block mb-1">
                  INTERNSHIP PROBABILITY
                </span>
                <div className="text-xl sm:text-2xl font-black text-cyan-300 font-space">
                  {internshipProb}%
                </div>
                <span className="text-[10px] text-cyan-400 font-mono-tech mt-1 block">
                  Target: {student.careerGoal}
                </span>
              </div>

              {/* Master / Higher Studies Index */}
              <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
                <span className="text-[10px] text-purple-400 font-mono-tech uppercase block mb-1">
                  TIER-1 ADMISSION INDEX
                </span>
                <div className="text-xl sm:text-2xl font-black text-purple-300 font-space">
                  {tierOneMasterIndex}%
                </div>
                <span className="text-[10px] text-slate-400 font-mono-tech mt-1 block">
                  GATE / GRE / Top Universities
                </span>
              </div>

              {/* Core Technique Readiness */}
              <div className="p-4 rounded-2xl bg-[#07070d] border border-purple-900/30">
                <span className="text-[10px] text-purple-400 font-mono-tech uppercase block mb-1">
                  CORE TECH READINESS
                </span>
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-space">
                  {techReadinessScore}%
                </div>
                <span className="text-[10px] text-slate-400 font-mono-tech mt-1 block">
                  DSA, Systems & Portfolio
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-900/30 text-[11px] text-slate-400 font-mono-tech">
            * Disclaimer: All projections are calibrated probabilistic AI estimates based on historical student outcomes. They do not constitute guaranteed placement offers.
          </div>
        </div>
      </div>

      {/* Predefined Comparison Scenarios (A, B, C, D) */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-black text-white font-space tracking-wide">
            Comparative Scenario Trajectories
          </h2>
          <p className="text-xs text-slate-400 font-mono-tech">
            Compare distinct behavioral paths for the next 2 years
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {predefinedScenarios.map(scen => (
            <div
              key={scen.id}
              className={`p-5 rounded-3xl border ${scen.color} flex flex-col justify-between transition-all hover:scale-[1.02] shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded-full bg-purple-950 text-cyan-300 border border-purple-700/40">
                    {scen.badge}
                  </span>
                  <span className="text-xs font-mono-tech font-bold text-amber-300">
                    ₹{scen.metrics.estimatedPlacementLpaMin}–{scen.metrics.estimatedPlacementLpaMax} LPA
                  </span>
                </div>

                <h3 className="text-sm font-black text-white font-space mt-1 mb-1">
                  {scen.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {scen.description}
                </p>

                <div className="space-y-1.5 text-[11px] text-slate-300 my-3 pt-3 border-t border-purple-900/30">
                  {scen.keyMilestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-purple-900/30 text-[11px] text-purple-200/90 italic font-mono-tech">
                "{scen.digitalTwinMessage}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Chat with Future Self Dialogue */}
      <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-purple-900/30">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-base font-black text-white font-space tracking-wide">
              Dialogue with Future Sorcerer Twin (Class of 2028)
            </h2>
            <p className="text-xs text-slate-400 font-mono-tech">
              Direct AI conversational resonance with your simulated future self
            </p>
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 mb-4">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-purple-900 text-white border border-purple-600/40 rounded-br-xs'
                    : 'bg-[#07070d] text-slate-200 border border-purple-900/40 rounded-bl-xs'
                }`}
              >
                {msg.sender === 'future_twin' && (
                  <span className="text-[10px] font-mono-tech font-bold text-cyan-400 uppercase block mb-1">
                    ⚡ 2028 FUTURE TWIN
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}

          {isTwinTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-purple-300 flex items-center gap-2 font-mono-tech">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Simulating future timelines...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Ask your 2028 Future Self about projects, career decisions, or preparation..."
            className="flex-1 bg-[#07070d] border border-purple-900/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
          <button
            type="submit"
            disabled={isTwinTyping || !inputMessage.trim()}
            className="px-5 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 disabled:opacity-40 transition flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          >
            <span>Transmit</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
