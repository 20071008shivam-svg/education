import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Target, 
  ChevronRight, 
  Flame, 
  Shield, 
  Sparkles, 
  Users, 
  Compass, 
  Cpu, 
  Building2, 
  Clock, 
  CheckCircle, 
  FileText, 
  UserCheck, 
  Edit, 
  BookOpen,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { CampusOpportunity, StudentProfile } from '../types';

interface DashboardViewProps {
  student: StudentProfile;
  opportunities: CampusOpportunity[];
  onNavigateToTab: (tab: string) => void;
  onOpenWhyAttend: (opp: CampusOpportunity) => void;
  onOpenGrowthModal: (opp: CampusOpportunity) => void;
  onOpenMatchBreakdown?: (opp: CampusOpportunity) => void;
  onOpenDomainExpansion?: () => void;
  onOpenOnboarding?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  opportunities,
  onNavigateToTab,
  onOpenWhyAttend,
  onOpenGrowthModal: _onOpenGrowthModal,
  onOpenMatchBreakdown,
  onOpenDomainExpansion,
  onOpenOnboarding,
}) => {
  // Today's focus task items from reference screenshot (interactive check indicators)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'DSA Practice (30 mins)', done: true },
    { id: 2, text: 'DBMS Revision', done: true },
    { id: 3, text: 'Attend AI Hackathon Briefing', done: true },
    { id: 4, text: 'Update Resume', done: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // 6 attributes matching the radar chart in reference screenshot:
  // Programming (92), AI/ML (88), Web Dev (76), Problem Solving (81), Communication (70), Leadership (65)
  const radarAxes = [
    { label: 'Programming', score: 92 },
    { label: 'AI/ML', score: 88 },
    { label: 'Web Dev', score: 76 },
    { label: 'Problem Solving', score: 81 },
    { label: 'Communication', score: 70 },
    { label: 'Leadership', score: 65 },
  ];

  // SVG Radar Polygon calculations
  const radarSize = 210;
  const radarCenter = radarSize / 2;
  const radarRadius = 66;
  const angleStep = (Math.PI * 2) / radarAxes.length;

  const radarPoints = radarAxes.map((axis, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (axis.score / 100) * radarRadius;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Quest Steps matching reference screenshot:
  // 1. AI Workshop (Completed)
  // 2. AI Club (Completed)
  // 3. AI Hackathon (In Progress)
  // 4. ML Project (Upcoming)
  // 5. Research (Planned)
  // 6. Internship (Goal)
  const questSteps = [
    { id: 1, title: 'AI Workshop', status: 'completed' },
    { id: 2, title: 'AI Club', status: 'completed' },
    { id: 3, title: 'AI Hackathon', status: 'in-progress' },
    { id: 4, title: 'ML Project', status: 'upcoming' },
    { id: 5, title: 'Research', status: 'planned' },
    { id: 6, title: 'Internship', status: 'goal' },
  ];

  // Primary featured opportunity (AI Innovation Hackathon)
  const featuredMission = opportunities.find(o => o.eventType === 'Hackathon') || opportunities[0];

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-300">
      {/* 1. TOP ROW: HERO SECTION (8 cols) & SORCERER PROFILE CARD (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* HERO SECTION WITH GOJO ARTWORK & TODAY'S FOCUS (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-5 shadow-[0_4px_35px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between min-h-[290px] group hover:border-purple-500/50 transition-all duration-300">
          {/* Ambient Cursed Glow Backgrounds */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Character / Energy Illustration on the Left (5 cols) */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.35)] border border-purple-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                <img
                  src="/src/assets/images/jjk_gojo_pose_1790758369395.jpg"
                  alt="Limitless Cursed Energy Visual"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-125 transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080814]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080814]/60" />
              </div>
            </div>

            {/* Middle: Domain Interface Text & Quote (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-space tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-300">
                    DOMAIN
                  </span>{' '}
                  <span className="text-purple-400">INTERFACE</span>
                </h2>

                <p className="text-xs text-slate-300 font-mono-tech mt-0.5">
                  Welcome back, Sorcerer!
                </p>

                <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mt-1">
                  {(student.fullName || 'ANMOL SHARMA').toUpperCase()}
                </h1>

                <p className="text-xs text-slate-300/90 italic mt-2 leading-relaxed">
                  "The strongest student isn't the one who studies the most, but the one who uses the right opportunities."
                </p>

                <div className="mt-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold bg-rose-950/70 text-rose-300 border border-rose-700/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                    <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>Jujutsu Kaisen</span>
                  </span>
                </div>
              </div>

              {/* TODAY'S FOCUS Card (Nested inside hero) */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#05050f]/90 border border-purple-900/50 shadow-inner relative overflow-hidden group/focus">
                {/* Subtle Cursed Watermark */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <img
                    src="/src/assets/images/jjk_yuji_academic_1790759031288.jpg"
                    alt="Today's Focus Watermark"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125 brightness-90"
                  />
                  <div className="absolute inset-0 bg-[#05050f]/80" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono-tech font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>TODAY'S FOCUS</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono-tech">
                      {tasks.filter(t => t.done).length}/{tasks.length} Completed
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-2 text-[11px] text-slate-200 cursor-pointer hover:text-white transition group/item"
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          task.done 
                            ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                            : 'border-slate-600 group-hover/item:border-amber-400/60'
                        }`}>
                          {task.done && <CheckCircle className="w-3 h-3 text-amber-300" />}
                        </div>
                        <span className={task.done ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigateToTab('learn')}
                    className="mt-3 w-full py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-800 via-indigo-700 to-rose-700 hover:from-purple-700 hover:to-rose-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer font-space"
                  >
                    <span>VIEW FULL PLAN</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SORCERER PROFILE CARD (Right column 4 cols matching screenshot) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-5 shadow-[0_4px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Megumi Shadow Technique Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_megumi_technique_1790757358926.jpg"
              alt="Sorcerer Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/75" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-2 border-b border-purple-900/40 mb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono-tech font-bold text-white tracking-widest uppercase">
                  SORCERER PROFILE
                </h3>
              </div>
              <button
                onClick={onOpenOnboarding || (() => onNavigateToTab('edutwin'))}
                className="text-[10px] text-slate-400 hover:text-white font-mono-tech flex items-center gap-1 transition cursor-pointer"
              >
                <span>Edit</span>
                <Edit className="w-3 h-3 text-purple-400" />
              </button>
            </div>

            {/* Circular Avatar & Profile Details */}
            <div className="flex items-center gap-4 my-2">
              <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-rose-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#07070d]">
                  <img
                    src="/src/assets/images/jjk_megumi_avatar_1790758357670.jpg"
                    alt={student.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-base font-black text-white font-space leading-tight">
                  {student.fullName || 'Anmol Sharma'}
                </h4>
                <div className="mt-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono-tech font-extrabold bg-rose-600 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                    GRADE 2 SORCERER
                  </span>
                </div>
              </div>
            </div>

            {/* Branch, Semester, Career Domain Table */}
            <div className="mt-4 space-y-2 text-xs pt-3 border-t border-purple-900/30">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono-tech text-[11px]">Branch</span>
                <span className="font-bold text-cyan-300 font-mono-tech text-[11px]">{student.branch || 'CSE'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono-tech text-[11px]">Semester</span>
                <span className="font-bold text-cyan-300 font-mono-tech text-[11px]">{student.year || '3rd Year'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono-tech text-[11px]">Career Domain</span>
                <span className="font-bold text-cyan-300 font-mono-tech text-[11px]">{student.careerGoal || 'Software Development'}</span>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-4 pt-3 border-t border-purple-900/30">
              <div className="flex items-center justify-between text-[11px] font-mono-tech mb-1.5">
                <span className="text-slate-300">Profile Completion</span>
                <span className="font-bold text-cyan-300">85%</span>
              </div>
              <div className="h-2 w-full bg-[#161624] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_10px_#22d3ee]"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 pt-2 text-right">
            <span className="text-[10px] text-purple-400/80 font-mono-tech">Domain Calibration: Optimal</span>
          </div>
        </div>
      </div>

      {/* 2. ROW 2: FOUR ANALYTICS CARDS (TECHNIQUE PROFILE, ACADEMIC ENERGY, CURRENT MISSION, FUTURE SELF) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: CURSED TECHNIQUE PROFILE (Radar Chart) */}
        <div className="rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Megumi Shadow Technique Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_megumi_technique_1790757358926.jpg"
              alt="Cursed Technique Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/75" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-purple-900/30">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <h3 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                CURSED TECHNIQUE PROFILE
              </h3>
            </div>

            {/* Radar Chart SVG matching exact values: 92, 88, 76, 81, 70, 65 */}
            <div className="flex items-center justify-center my-1 relative">
              <svg width={radarSize} height={radarSize} className="overflow-visible">
                {/* Rings */}
                {[0.35, 0.7, 1.0].map((level, ringIdx) => {
                  const ringPoints = radarAxes.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const r = level * radarRadius;
                    const x = radarCenter + r * Math.cos(angle);
                    const y = radarCenter + r * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={ringIdx}
                      points={ringPoints}
                      fill="none"
                      stroke="rgba(168, 85, 247, 0.25)"
                      strokeWidth={1}
                      strokeDasharray={ringIdx < 2 ? '2 2' : 'none'}
                    />
                  );
                })}

                {/* Spoke Axes */}
                {radarAxes.map((_, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const x = radarCenter + radarRadius * Math.cos(angle);
                  const y = radarCenter + radarRadius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={radarCenter}
                      y1={radarCenter}
                      x2={x}
                      y2={y}
                      stroke="rgba(168, 85, 247, 0.25)"
                      strokeWidth={1}
                    />
                  );
                })}

                {/* Skill Polygon */}
                <polygon
                  points={radarPoints}
                  fill="rgba(168, 85, 247, 0.3)"
                  stroke="#c084fc"
                  strokeWidth={2}
                  className="drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                />

                {/* Labels and values around radar */}
                {radarAxes.map((axis, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const r = (axis.score / 100) * radarRadius;
                  const dotX = radarCenter + r * Math.cos(angle);
                  const dotY = radarCenter + r * Math.sin(angle);

                  const labelR = radarRadius + 20;
                  const labelX = radarCenter + labelR * Math.cos(angle);
                  const labelY = radarCenter + labelR * Math.sin(angle);

                  return (
                    <g key={i}>
                      <circle cx={dotX} cy={dotY} r={3} fill="#22d3ee" className="shadow-[0_0_8px_#22d3ee]" />
                      <text
                        x={labelX}
                        y={labelY - 3}
                        textAnchor="middle"
                        className="text-[9px] font-mono-tech fill-slate-300 font-bold"
                      >
                        {axis.label}
                      </text>
                      <text
                        x={labelX}
                        y={labelY + 7}
                        textAnchor="middle"
                        className="text-[10px] font-mono-tech fill-cyan-400 font-extrabold"
                      >
                        {axis.score}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-3 pt-2">
            <button
              onClick={() => onNavigateToTab('edutwin')}
              className="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/50 transition cursor-pointer text-center font-mono-tech"
            >
              View Full Analysis →
            </button>
          </div>
        </div>

        {/* Card 2: ACADEMIC ENERGY (4 Circular Rings & Jan-Jun Curve) */}
        <div className="rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Yuji Black Flash / Energy Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_yuji_academic_1790759031288.jpg"
              alt="Academic Energy Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125 brightness-90"
            />
            <div className="absolute inset-0 bg-[#080814]/75" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-purple-900/30">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <h3 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                ACADEMIC ENERGY
              </h3>
            </div>

            {/* 4 Circular Rings Grid */}
            <div className="grid grid-cols-4 gap-1 text-center my-2">
              {/* Ring 1: CGPA 78% */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-purple-500/70 flex items-center justify-center font-black text-xs text-white shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                  78%
                </div>
                <span className="text-[9px] text-slate-400 font-mono-tech uppercase mt-1">CGPA</span>
                <span className="text-[10px] text-purple-300 font-mono-tech font-bold">78%</span>
              </div>

              {/* Ring 2: Attendance 82% */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400/80 flex items-center justify-center font-black text-xs text-white shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  82%
                </div>
                <span className="text-[9px] text-slate-400 font-mono-tech uppercase mt-1">Attendance</span>
                <span className="text-[10px] text-cyan-400 font-mono-tech font-bold">82%</span>
              </div>

              {/* Ring 3: Assignments 74% */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-400/80 flex items-center justify-center font-black text-xs text-white shadow-[0_0_8px_rgba(129,140,248,0.5)]">
                  74%
                </div>
                <span className="text-[9px] text-slate-400 font-mono-tech uppercase mt-1">Assignments</span>
                <span className="text-[10px] text-indigo-300 font-mono-tech font-bold">74%</span>
              </div>

              {/* Ring 4: Quiz Score 81% */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-300/80 flex items-center justify-center font-black text-xs text-white shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  81%
                </div>
                <span className="text-[9px] text-slate-400 font-mono-tech uppercase mt-1">Quiz Score</span>
                <span className="text-[10px] text-cyan-300 font-mono-tech font-bold">81%</span>
              </div>
            </div>

            {/* Green / Cyan Wave Trendline Chart (Jan - Jun) */}
            <div className="mt-4 pt-3 border-t border-purple-900/30">
              <div className="h-14 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path
                    d="M 0 35 Q 35 40, 70 30 T 130 18 T 200 8"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_8px_#10b981]"
                  />
                  {/* Dots along line */}
                  <circle cx="10" cy="35" r="2.5" fill="#10b981" />
                  <circle cx="50" cy="34" r="2.5" fill="#10b981" />
                  <circle cx="90" cy="27" r="2.5" fill="#10b981" />
                  <circle cx="130" cy="18" r="2.5" fill="#10b981" />
                  <circle cx="170" cy="12" r="2.5" fill="#10b981" />
                  <circle cx="200" cy="8" r="3" fill="#10b981" />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono-tech mt-1 px-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: CURRENT MISSION (AI Innovation Hackathon with Red Fiery Background) */}
        <div className="rounded-2xl bg-[#080814]/95 border border-rose-900/60 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-rose-500/60 transition-all duration-300">
          {/* Subtle Red Sukuna Flame Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_sukuna_mission_1790757345700.jpg"
              alt="Sukuna Cursed Fire"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125 brightness-75"
            />
            <div className="absolute inset-0 bg-[#080814]/75" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-rose-900/30">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <h3 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                  CURRENT MISSION
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-extrabold bg-rose-600 text-white shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                HIGH PRIORITY
              </span>
            </div>

            <h4 className="text-sm font-black text-white font-space tracking-tight mt-1 text-center">
              AI INNOVATION HACKATHON
            </h4>

            {/* Domain Compatibility Ring (94%) */}
            <div className="flex flex-col items-center justify-center my-2">
              <span className="text-[9px] text-slate-400 font-mono-tech uppercase">DOMAIN COMPATIBILITY</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-cyan-300 font-space drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
                  94%
                </span>
                <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>
            </div>

            {/* 4 Factor Stats */}
            <div className="grid grid-cols-4 gap-1 text-center pt-2 border-t border-rose-900/40">
              <div>
                <span className="text-[8px] text-slate-400 font-mono-tech block">Skill Match</span>
                <span className="text-[11px] font-bold text-cyan-400 font-mono-tech">92%</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-400 font-mono-tech block">Career Match</span>
                <span className="text-[11px] font-bold text-cyan-400 font-mono-tech">95%</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-400 font-mono-tech block">Interest Match</span>
                <span className="text-[11px] font-bold text-cyan-400 font-mono-tech">93%</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-400 font-mono-tech block">Experience</span>
                <span className="text-[11px] font-bold text-cyan-400 font-mono-tech">90%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 grid grid-cols-2 gap-2 mt-3 pt-2">
            <button
              onClick={() => onOpenWhyAttend(featuredMission)}
              className="py-1.5 px-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-[0_0_12px_rgba(244,63,94,0.5)] border border-rose-400/40 transition flex items-center justify-center gap-1 cursor-pointer font-space"
            >
              <span>ENTER MISSION</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={() => {
                if (onOpenMatchBreakdown) {
                  onOpenMatchBreakdown(featuredMission);
                } else {
                  onOpenWhyAttend(featuredMission);
                }
              }}
              className="py-1.5 px-2 rounded-xl text-xs font-bold text-slate-300 bg-[#080814] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-600/50 transition cursor-pointer text-center font-mono-tech flex items-center justify-center gap-1"
            >
              <span>View Details</span>
            </button>
          </div>
        </div>

        {/* Card 4: FUTURE SELF (Gojo Looking Back Background) */}
        <div className="rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
          {/* Gojo Looking Back Artwork */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <img
              src="/src/assets/images/jjk_gojo_future_1790758382531.jpg"
              alt="Gojo Future Domain"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/70" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-purple-900/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <h3 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                FUTURE SELF
              </h3>
            </div>

            <h4 className="text-sm font-black text-white font-space tracking-wide mt-2 text-center">
              DOMAIN SIMULATION
            </h4>

            <p className="text-[11px] text-slate-300 text-center mt-2 leading-relaxed">
              Explore possible future paths based on your current actions.
            </p>
          </div>

          <div className="relative z-10 mt-4 pt-2">
            <button
              onClick={onOpenDomainExpansion || (() => onNavigateToTab('futureself'))}
              className="w-full py-2 px-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/40 transition flex items-center justify-center gap-1.5 cursor-pointer font-space"
            >
              <span>ENTER DOMAIN</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ROW 3: DOMAIN RECOMMENDATIONS (4 Cards: Mission, Club, Mentor, Lab) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-extrabold text-white tracking-wider font-space uppercase">
              DOMAIN RECOMMENDATIONS
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab('campus')}
            className="text-xs font-mono-tech font-bold text-purple-400 hover:text-cyan-300 flex items-center gap-1 transition cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* CARD 1: MISSION */}
          <div className="p-4 rounded-2xl bg-[#080814]/95 border border-purple-900/40 hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img
                src="/src/assets/images/jjk_sukuna_mission_1790757345700.jpg"
                alt="Mission Watermark"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-[#080814]/75" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech font-bold text-rose-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>MISSION</span>
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-cyan-400">
                  92% Match
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-space leading-snug">
                Competitive Programming League (CPL) — Round 3
              </h4>
              <div className="flex flex-wrap gap-1 mt-2 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-rose-950/70 text-rose-300 border border-rose-800/40">DSA</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-purple-950/70 text-purple-300 border border-purple-800/40">Coding</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-indigo-950/70 text-indigo-300 border border-indigo-800/40">Competitive</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Perfect for improving your problem-solving skills and increasing your rank.
              </p>
            </div>
            <div className="relative z-10 mt-3 pt-2 border-t border-purple-900/30">
              <button
                onClick={() => onNavigateToTab('campus')}
                className="w-full py-1.5 rounded-lg text-xs font-bold text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 transition text-center font-mono-tech cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* CARD 2: CLUB */}
          <div className="p-4 rounded-2xl bg-[#080814]/95 border border-purple-900/40 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img
                src="/src/assets/images/jjk_megumi_technique_1790757358926.jpg"
                alt="Club Watermark"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-[#080814]/75" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech font-bold text-cyan-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-cyan-400" />
                  <span>CLUB</span>
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-cyan-400">
                  89% Match
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-space leading-snug">
                AI & Deep Tech Society
              </h4>
              <div className="flex flex-wrap gap-1 mt-2 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-cyan-950/70 text-cyan-300 border border-cyan-800/40">AI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-purple-950/70 text-purple-300 border border-purple-800/40">ML</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-indigo-950/70 text-indigo-300 border border-indigo-800/40">Research</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Builds your AI/ML skills and connects you with like-minded students.
              </p>
            </div>
            <div className="relative z-10 mt-3 pt-2 border-t border-purple-900/30">
              <button
                onClick={() => onNavigateToTab('campus')}
                className="w-full py-1.5 rounded-lg text-xs font-bold text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/50 border border-purple-700/40 transition text-center font-mono-tech cursor-pointer"
              >
                Join Club →
              </button>
            </div>
          </div>

          {/* CARD 3: MENTOR */}
          <div className="p-4 rounded-2xl bg-[#080814]/95 border border-purple-900/40 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img
                src="/src/assets/images/jjk_gojo_future_1790758382531.jpg"
                alt="Mentor Watermark"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-[#080814]/75" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>MENTOR</span>
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-cyan-400">
                  96% Match
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-space leading-snug">
                Dr. Rajesh Verma <span className="text-slate-400 text-[11px] font-normal block font-sans">Dept. of CSE</span>
              </h4>
              <div className="flex flex-wrap gap-1 mt-2 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-amber-950/70 text-amber-300 border border-amber-800/40">Research</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-cyan-950/70 text-cyan-300 border border-cyan-800/40">AI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-purple-950/70 text-purple-300 border border-purple-800/40">Guidance</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Expert in AI and Deep Learning. Ideal for your research goals.
              </p>
            </div>
            <div className="relative z-10 mt-3 pt-2 border-t border-purple-900/30">
              <button
                onClick={() => onNavigateToTab('campus')}
                className="w-full py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 transition text-center font-mono-tech shadow-sm cursor-pointer"
              >
                Request Mentorship →
              </button>
            </div>
          </div>

          {/* CARD 4: LAB */}
          <div className="p-4 rounded-2xl bg-[#080814]/95 border border-purple-900/40 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img
                src="/src/assets/images/jjk_future_domain_1790757373529.jpg"
                alt="Lab Watermark"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-[#080814]/75" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech font-bold text-cyan-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>LAB</span>
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-cyan-400">
                  88% Match
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-space leading-snug">
                Computer Vision Lab
              </h4>
              <div className="flex flex-wrap gap-1 mt-2 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-cyan-950/70 text-cyan-300 border border-cyan-800/40">Open Lab</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-purple-950/70 text-purple-300 border border-purple-800/40">Vision AI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-indigo-950/70 text-indigo-300 border border-indigo-800/40">Projects</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Get hands-on experience with advanced computer vision tools and datasets.
              </p>
            </div>
            <div className="relative z-10 mt-3 pt-2 border-t border-purple-900/30">
              <button
                onClick={() => onNavigateToTab('campus')}
                className="w-full py-1.5 rounded-lg text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 transition text-center font-mono-tech cursor-pointer"
              >
                Explore Lab →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ROW 4: BOTTOM SECTION (MY CAMPUS QUEST, PROGRESSION GAUGE, QUICK ACTIONS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* MY CAMPUS QUEST: 6 Step Horizontal Pathway with arrows (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-5 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Panoramic Gojo Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <img
              src="/src/assets/images/jjk_gojo_hero_1790757333394.jpg"
              alt="Quest Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/80" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                MY CAMPUS QUEST <span className="text-slate-400 font-normal font-sans">(Personalized Path)</span>
              </h3>
            </div>

            {/* 6 Connected Nodes with Arrows */}
            <div className="flex items-center justify-between gap-1 text-center overflow-x-auto pb-1">
              {questSteps.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center shrink-0 min-w-[72px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-transform duration-200 group-hover:scale-105 ${
                      step.status === 'completed'
                        ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.6)] ring-1 ring-emerald-300'
                        : step.status === 'in-progress'
                        ? 'bg-purple-600 text-white shadow-[0_0_14px_rgba(168,85,247,0.8)] animate-pulse ring-2 ring-purple-400'
                        : 'bg-[#141424] text-slate-500 border border-purple-900/40 opacity-70'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : step.status === 'in-progress' ? (
                        <Zap className="w-4 h-4 fill-white" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <span className={`text-[10px] font-bold leading-tight font-space truncate w-full ${
                      step.status === 'upcoming' || step.status === 'planned' || step.status === 'goal'
                        ? 'text-slate-400'
                        : 'text-white'
                    }`}>
                      {step.title}
                    </span>

                    <span className={`text-[9px] font-mono-tech mt-0.5 ${
                      step.status === 'completed'
                        ? 'text-emerald-400 font-semibold'
                        : step.status === 'in-progress'
                        ? 'text-rose-400 font-bold'
                        : 'text-slate-500'
                    }`}>
                      {step.status === 'completed' ? 'Completed' : step.status === 'in-progress' ? 'In Progress' : step.status === 'upcoming' ? 'Upcoming' : step.status === 'planned' ? 'Planned' : 'Goal'}
                    </span>
                  </div>

                  {idx < questSteps.length - 1 && (
                    <div className="hidden sm:flex items-center justify-center text-slate-600 px-0.5">
                      <ArrowRight className="w-3 h-3 text-cyan-400/60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESSION (Overall Growth 68%) (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col items-center justify-between text-center relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Yuji Black Flash Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_yuji_academic_1790759031288.jpg"
              alt="Progression Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/80" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center">
            <span className="text-[10px] font-mono-tech font-bold text-purple-300 uppercase tracking-wider block">
              PROGRESSION
            </span>
            <span className="text-[10px] text-slate-400">Overall Growth</span>

            {/* Circular Gauge 68% */}
            <div className="relative w-16 h-16 my-2 mx-auto flex items-center justify-center">
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
                  strokeDasharray="68, 100"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_#22d3ee]"
                />
              </svg>
              <div className="absolute text-sm font-black text-white font-space">
                68%
              </div>
            </div>

            {/* Mini Bar Graphic */}
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 h-3 bg-purple-600 rounded-t" />
              <div className="w-1.5 h-4 bg-purple-500 rounded-t" />
              <div className="w-1.5 h-6 bg-cyan-400 rounded-t shadow-[0_0_8px_#22d3ee]" />
              <div className="w-1.5 h-5 bg-purple-500 rounded-t" />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-[#080814]/95 border border-purple-900/50 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          {/* Subtle Gojo Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_gojo_pose_1790758369395.jpg"
              alt="Quick Actions Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#080814]/75" />
          </div>

          <div className="relative z-10">
            <span className="text-[10px] font-mono-tech font-bold text-white uppercase tracking-wider mb-2 block">
              QUICK ACTIONS
            </span>

            <div className="space-y-1.5">
              <button
                onClick={() => onNavigateToTab('peers')}
                className="w-full p-2 rounded-xl bg-[#05050f] hover:bg-purple-950/40 border border-purple-900/30 hover:border-amber-500/40 flex items-center justify-between text-xs text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Find My Team</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateToTab('campus')}
                className="w-full p-2 rounded-xl bg-[#05050f] hover:bg-purple-950/40 border border-purple-900/30 hover:border-rose-500/40 flex items-center justify-between text-xs text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-rose-400" />
                  <span>Explore Mentors</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateToTab('learn')}
                className="w-full p-2 rounded-xl bg-[#05050f] hover:bg-purple-950/40 border border-purple-900/30 hover:border-cyan-500/40 flex items-center justify-between text-xs text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Get Study Plan</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateToTab('quest')}
                className="w-full p-2 rounded-xl bg-[#05050f] hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-500/40 flex items-center justify-between text-xs text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Generate Resume</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
