import React, { useState } from 'react';
import { 
  Dna, 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Clock, 
  BookOpen, 
  Flame, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  Code,
  Shield,
  Zap,
  Compass
} from 'lucide-react';
import { StudentProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

interface MyEduTwinViewProps {
  student: StudentProfile;
  onEditProfile: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const MyEduTwinView: React.FC<MyEduTwinViewProps> = ({
  student,
  onEditProfile,
  onNavigateToTab,
}) => {
  const { actualTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Programming' | 'Development' | 'Emerging Technology' | 'Other'>('All');

  // Compute Sorcerer Grade
  const getSorcererGrade = () => {
    if (student.level >= 4 || student.cgpa >= 9.2) return 'SPECIAL GRADE';
    if (student.level >= 3 || student.cgpa >= 8.5) return 'GRADE 1';
    if (student.level >= 2 || student.cgpa >= 7.5) return 'GRADE 2';
    return 'SEMI-GRADE 2';
  };
  const sorcererGrade = getSorcererGrade();

  // Compute skill radar coordinates (SVG radar polygon) for the 7 JJK Cursed Technique attributes:
  // Programming, AI/ML, Web Development, Problem Solving, Communication, Leadership, Research
  const getRadarScore = (axis: string): number => {
    switch (axis) {
      case 'Programming': {
        const prog = student.skills.filter(s => s.category === 'Programming');
        if (!prog.length) return 45;
        const adv = prog.filter(s => s.level === 'Advanced').length;
        const int = prog.filter(s => s.level === 'Intermediate').length;
        return Math.min(96, 50 + adv * 18 + int * 10);
      }
      case 'AI/ML': {
        const ai = student.skills.filter(s => s.name.includes('AI') || s.name.includes('ML') || s.name.includes('Data'));
        if (!ai.length) return 35;
        return ai.some(s => s.level === 'Advanced') ? 94 : ai.some(s => s.level === 'Intermediate') ? 80 : 55;
      }
      case 'Web Development': {
        const dev = student.skills.filter(s => s.category === 'Development');
        if (!dev.length) return 40;
        const adv = dev.filter(s => s.level === 'Advanced').length;
        const int = dev.filter(s => s.level === 'Intermediate').length;
        return Math.min(95, 45 + adv * 18 + int * 10);
      }
      case 'Problem Solving': {
        const dsa = student.skills.find(s => s.name.toLowerCase().includes('dsa') || s.name.toLowerCase().includes('c++') || s.name.toLowerCase().includes('java'));
        return dsa?.level === 'Advanced' ? 90 : dsa?.level === 'Intermediate' ? 78 : 65;
      }
      case 'Communication': {
        const comm = student.skills.find(s => s.name.toLowerCase().includes('public') || s.name.toLowerCase().includes('speaking'));
        return comm ? 82 : 68;
      }
      case 'Leadership': {
        const lead = student.skills.find(s => s.name.toLowerCase().includes('leadership') || s.name.toLowerCase().includes('entrepreneurship'));
        return lead ? 88 : 65;
      }
      case 'Research': {
        const res = student.skills.find(s => s.name.toLowerCase().includes('research'));
        return res ? 85 : 55;
      }
      default:
        return 65;
    }
  };

  const radarAxes = [
    { label: 'AI/ML', score: getRadarScore('AI/ML') },
    { label: 'Programming', score: getRadarScore('Programming') },
    { label: 'Web Dev', score: getRadarScore('Web Development') },
    { label: 'Problem Solving', score: getRadarScore('Problem Solving') },
    { label: 'Research', score: getRadarScore('Research') },
    { label: 'Leadership', score: getRadarScore('Leadership') },
    { label: 'Communication', score: getRadarScore('Communication') },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 105;
  const totalAxes = radarAxes.length;

  const getCoordinates = (axisIndex: number, value: number) => {
    const angle = (Math.PI * 2 / totalAxes) * axisIndex - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score);
      return `${x},${y}`;
    })
    .join(' ');

  const filteredSkills = activeCategory === 'All'
    ? student.skills
    : student.skills.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* 1. SORCERER PROFILE CARD HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0b14] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Gojo Hero Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_gojo_hero_1790757333394.jpg"
            alt="Sorcerer Banner Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b14]/90 via-[#0b0b14]/80 to-[#0b0b14]/85" />
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-800 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/40">
              <Dna className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono-tech tracking-wider uppercase text-purple-400 font-bold block">
                  SORCERER PROFILE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40">
                  {sorcererGrade} SORCERER
                </span>
              </div>
              <h1 className="text-2xl font-black text-white font-space tracking-tight mt-0.5">
                {student.fullName}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                {student.branch} • Semester {student.semester} ({student.year}) • {student.university}
              </p>
              
              <div className="flex items-center gap-3 mt-2 text-xs font-mono-tech flex-wrap">
                <span className="text-cyan-400 font-bold">CGPA: {student.cgpa}</span>
                <span className="text-purple-600">•</span>
                <span className={`${student.attendancePercentage < 75 ? 'text-rose-400' : 'text-slate-300'}`}>
                  Attendance: {student.attendancePercentage}%
                </span>
                <span className="text-purple-600">•</span>
                <span className="text-purple-300">Domain: {student.careerGoal}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-600/40 transition shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0 font-mono-tech"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. INNATE FOCUS & TECHNIQUES HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Innate Focus */}
        <div className="p-5 rounded-2xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-cyan-400 mb-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Innate Technique Focus</span>
          </div>
          <h3 className="text-lg font-black text-white font-space">
            {student.currentFocus}
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Primary cursed energy domain driving personalized opportunity matching and project synthesis.
          </p>
        </div>

        {/* Mastered Techniques */}
        <div className="p-5 rounded-2xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-purple-300 mb-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Mastered Techniques</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {student.topSkills.map(skill => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-mono-tech font-bold bg-purple-950/70 text-purple-200 border border-purple-700/40"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Demonstrated at Advanced or Intermediate proficiency in your technique inventory.
          </p>
        </div>

        {/* Techniques to Awaken */}
        <div className="p-5 rounded-2xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-amber-400 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Techniques to Awaken</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {student.skillsToDevelop.map(skill => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-mono-tech font-bold bg-amber-950/60 text-amber-300 border border-amber-700/40"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            High-leverage capabilities required for top-tier Special Grade internship selection.
          </p>
        </div>
      </div>

      {/* 3. CURSED TECHNIQUE PROFILE: Radar Diagram & Talisman Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Skill Radar Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 flex flex-col items-center shadow-xl relative overflow-hidden group">
          {/* Subtle Megumi Shadow Technique Watermark like Future Self */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <img
              src="/src/assets/images/jjk_megumi_technique_1790757358926.jpg"
              alt="Technique Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#0b0b14]/75" />
          </div>

          <div className="w-full flex items-center justify-between mb-4 relative z-10">
            <div>
              <h2 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>CURSED TECHNIQUE PROFILE</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono-tech">
                Dynamic 7-attribute Jujutsu ability radar
              </p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-950 text-cyan-300 border border-purple-700/40 font-mono-tech font-bold">
              LIVE SEAL
            </span>
          </div>

          {/* SVG Radar */}
          <div className="relative flex items-center justify-center my-3">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric grid webs (25%, 50%, 75%, 100%) */}
              {[0.25, 0.5, 0.75, 1.0].map((level, idx) => {
                const r = radius * level;
                const points = radarAxes
                  .map((_, i) => {
                    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={idx}
                    points={points}
                    fill="none"
                    stroke={level === 1 ? '#4c1d95' : '#261b40'}
                    strokeWidth="1.2"
                    strokeDasharray={level === 1 ? 'none' : '3,3'}
                  />
                );
              })}

              {/* Axis Spoke Lines */}
              {radarAxes.map((_, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                const x2 = center + radius * Math.cos(angle);
                const y2 = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke="#261b40"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Filled Polygon Area */}
              <polygon
                points={polygonPoints}
                fill="rgba(168, 85, 247, 0.28)"
                stroke="#a855f7"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
              />

              {/* Data points */}
              {radarAxes.map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.score);
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4.5"
                      fill="#22d3ee"
                      stroke="#07070b"
                      strokeWidth="2"
                      className="shadow-[0_0_8px_#22d3ee]"
                    />
                  </g>
                );
              })}

              {/* Axis Labels */}
              {radarAxes.map((axis, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                const labelRadius = radius + 22;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono-tech font-bold fill-slate-300 drop-shadow-md"
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Quick Stats Grid under radar */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-purple-900/30 text-center">
            <div>
              <span className="text-[10px] text-slate-500 font-mono-tech block">TOP TECHNIQUE</span>
              <span className="text-xs font-bold text-cyan-300 font-mono-tech">AI/ML (94%)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono-tech block">PROBLEM SOLVING</span>
              <span className="text-xs font-bold text-purple-300 font-mono-tech">DSA (90%)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono-tech block">OVERALL HARMONY</span>
              <span className="text-xs font-bold text-emerald-400 font-mono-tech">84.5%</span>
            </div>
          </div>
        </div>

        {/* Technique Inventory & Learning DNA */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          {/* Subtle Cursed Watermark like Future Self */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/src/assets/images/jjk_future_domain_1790757373529.jpg"
              alt="Inventory Watermark"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-[#0b0b14]/85" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-white font-space tracking-wide">
                  TECHNIQUE INVENTORY
                </h3>
                <p className="text-xs text-slate-400 font-mono-tech">
                  Filter by cursed specialization category
                </p>
              </div>
              <span className="text-xs text-cyan-400 font-mono-tech">
                {student.skills.length} Registered
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['All', 'Programming', 'Development', 'Emerging Technology', 'Other'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono-tech font-bold transition ${
                    activeCategory === cat
                      ? 'bg-purple-900 text-cyan-300 border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                      : 'bg-[#07070d] text-slate-400 hover:text-white border border-purple-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {filteredSkills.map(skill => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl bg-[#07070d] border border-purple-900/30 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-tech">
                      {skill.category}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono-tech font-bold ${
                    skill.level === 'Advanced'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50'
                      : skill.level === 'Intermediate'
                      ? 'bg-purple-950 text-purple-300 border border-purple-700/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-700'
                  }`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning DNA summary */}
          <div className="mt-4 pt-4 border-t border-purple-900/30 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#07070d] border border-purple-900/30">
              <span className="text-[10px] text-slate-500 font-mono-tech block">TRAINING RHYTHM</span>
              <span className="font-bold text-white font-mono-tech">{student.learningProfile.preferredTime}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">{student.learningProfile.availableTime}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#07070d] border border-purple-900/30">
              <span className="text-[10px] text-slate-500 font-mono-tech block">CAREER ASPIRATION</span>
              <span className="font-bold text-cyan-300 font-mono-tech">{student.careerGoal}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">{student.currentFocus.split('&')[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
