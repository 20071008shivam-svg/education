import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  X, 
  GraduationCap, 
  Code2, 
  Target, 
  Brain, 
  Compass, 
  Plus,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  StudentProfile, 
  StudentSkill, 
  SkillCategory, 
  SkillLevel, 
  CareerGoalType,
  PreferredLearningMethod,
  PreferredStudyTime,
  AvailableStudyTime 
} from '../types';

interface OnboardingWizardProps {
  initialProfile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: StudentProfile) => void;
}

const SKILL_CATEGORIES: { name: SkillCategory; skills: string[] }[] = [
  {
    name: 'Programming',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript']
  },
  {
    name: 'Development',
    skills: ['Frontend', 'Backend', 'Full Stack', 'Mobile Development']
  },
  {
    name: 'Emerging Technology',
    skills: ['AI/ML', 'Data Science', 'Cybersecurity', 'Cloud', 'IoT', 'Blockchain']
  },
  {
    name: 'Other',
    skills: ['UI/UX', 'Research', 'Public Speaking', 'Leadership', 'Entrepreneurship']
  }
];

const CAREER_INTERESTS = [
  'Software Development',
  'AI/ML',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'Research',
  'Entrepreneurship/Startup',
  'UI/UX',
  'Product Management',
  'Other'
];

const CAREER_GOALS: CareerGoalType[] = [
  'Internship',
  'Placement',
  'Higher Studies',
  'Research',
  'Startup',
  'Still Exploring'
];

const LEARNING_METHODS: PreferredLearningMethod[] = [
  'Video',
  'Reading',
  'Practical Coding',
  'Projects',
  'Quizzes',
  'Group Study',
  'Instructor-led Learning'
];

const STUDY_TIMES: PreferredStudyTime[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
  'Flexible'
];

const AVAILABLE_TIMES: AvailableStudyTime[] = [
  '<30 minutes/day',
  '30–60 minutes/day',
  '1–2 hours/day',
  '2+ hours/day'
];

const EXTRACURRICULAR_TAGS = [
  'Hackathons',
  'Coding Competitions',
  'Technical Clubs',
  'Cultural Events',
  'Sports',
  'Research',
  'Volunteering',
  'Entrepreneurship',
  'Design',
  'Public Speaking',
  'Networking',
  'Workshops',
  'Conferences'
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialProfile,
  isOpen,
  onClose,
  onSaveProfile,
}) => {
  const [step, setStep] = useState(1);

  // Step 1: Academic
  const [fullName, setFullName] = useState(initialProfile.fullName);
  const [email, setEmail] = useState(initialProfile.email);
  const [university, setUniversity] = useState(initialProfile.university);
  const [branch, setBranch] = useState(initialProfile.branch);
  const [year, setYear] = useState(initialProfile.year);
  const [semester, setSemester] = useState(initialProfile.semester);
  const [cgpa, setCgpa] = useState(initialProfile.cgpa ? String(initialProfile.cgpa) : '8.5');
  const [attendance, setAttendance] = useState(initialProfile.attendancePercentage ? String(initialProfile.attendancePercentage) : '80');

  // Step 2: Skills
  const [skills, setSkills] = useState<StudentSkill[]>(initialProfile.skills || []);
  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillCategory, setCustomSkillCategory] = useState<SkillCategory>('Programming');
  const [customSkillLevel, setCustomSkillLevel] = useState<SkillLevel>('Intermediate');

  // Step 3: Career Goal
  const [interestsIn, setInterestsIn] = useState<string[]>(initialProfile.interestsIn || ['Software Development']);
  const [careerGoal, setCareerGoal] = useState<CareerGoalType>(initialProfile.careerGoal || 'Internship');

  // Step 4: Learning Profile
  const [learningMethods, setLearningMethods] = useState<PreferredLearningMethod[]>(
    initialProfile.learningProfile?.preferredMethods || ['Practical Coding', 'Projects']
  );
  const [studyTime, setStudyTime] = useState<PreferredStudyTime>(
    initialProfile.learningProfile?.preferredTime || 'Evening'
  );
  const [availableTime, setAvailableTime] = useState<AvailableStudyTime>(
    initialProfile.learningProfile?.availableTime || '1–2 hours/day'
  );

  // Step 5: Interests
  const [interests, setInterests] = useState<string[]>(initialProfile.interests || ['Hackathons', 'Technical Clubs']);
  const [customInterest, setCustomInterest] = useState('');

  if (!isOpen) return null;

  const toggleSkill = (skillName: string, category: SkillCategory) => {
    const existingIndex = skills.findIndex(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (existingIndex >= 0) {
      setSkills(skills.filter((_, i) => i !== existingIndex));
    } else {
      setSkills([...skills, { name: skillName, category, level: 'Intermediate' }]);
    }
  };

  const updateSkillLevel = (skillName: string, level: SkillLevel) => {
    setSkills(skills.map(s => s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level } : s));
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;
    if (skills.some(s => s.name.toLowerCase() === customSkillName.trim().toLowerCase())) return;

    setSkills([...skills, {
      name: customSkillName.trim(),
      category: customSkillCategory,
      level: customSkillLevel,
    }]);
    setCustomSkillName('');
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()));
  };

  const toggleInterestIn = (item: string) => {
    if (interestsIn.includes(item)) {
      setInterestsIn(interestsIn.filter(i => i !== item));
    } else {
      setInterestsIn([...interestsIn, item]);
    }
  };

  const toggleLearningMethod = (method: PreferredLearningMethod) => {
    if (learningMethods.includes(method)) {
      setLearningMethods(learningMethods.filter(m => m !== method));
    } else {
      setLearningMethods([...learningMethods, method]);
    }
  };

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleAddCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInterest.trim()) return;
    if (!interests.includes(customInterest.trim())) {
      setInterests([...interests, customInterest.trim()]);
    }
    setCustomInterest('');
  };

  const handleComplete = () => {
    // Compute dynamic strengths, focus, top skills
    const topSkillsList = skills
      .filter(s => s.level === 'Advanced' || s.level === 'Intermediate')
      .slice(0, 4)
      .map(s => s.name);

    const skillsToDevelopList = [
      'System Design',
      'Production Deployment',
      'Advanced DSA',
      ...skills.filter(s => s.level === 'Beginner').map(s => s.name)
    ].slice(0, 4);

    const updatedProfile: StudentProfile = {
      ...initialProfile,
      fullName: fullName.trim() || 'Aryan Sharma',
      email: email.trim() || 'student@cumail.in',
      university: university.trim() || 'Chandigarh University',
      branch: branch.trim() || 'Computer Science & Engineering',
      year: year || '3rd Year',
      semester: semester || 'Semester 5',
      cgpa: parseFloat(cgpa) || 8.5,
      attendancePercentage: parseFloat(attendance) || 80,
      skills,
      interestsIn,
      careerGoal,
      learningProfile: {
        preferredMethods: learningMethods,
        preferredTime: studyTime,
        availableTime: availableTime,
      },
      interests,
      currentFocus: interestsIn.slice(0, 2).join(' & ') || 'Software Development',
      topSkills: topSkillsList.length > 0 ? topSkillsList : ['Python', 'C++', 'JavaScript'],
      skillsToDevelop: skillsToDevelopList,
      strengths: [
        `${topSkillsList[0] || 'Python'} & Algorithmic Problem Solving`,
        'Rapid Prototyping in Hackathons',
        'Curious and Self-Directed Learning'
      ],
      areasToImprove: [
        'Advanced Concurrency & Operating Systems',
        'Large-scale System Design',
        'Production CI/CD Pipelines'
      ]
    };

    onSaveProfile(updatedProfile);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0b0b14] border border-purple-800/50 shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-800 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/40">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-space tracking-tight">AWAKEN YOUR DOMAIN</h2>
              <p className="text-xs text-purple-300/80 font-mono-tech">
                Step {step} of 5 • Initializing your Cursed Technique Profile & Academic Sanctuary
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

        {/* Stepper tabs */}
        <div className="flex items-center justify-between my-6 px-2">
          {[
            { n: 1, label: 'IDENTITY', icon: GraduationCap },
            { n: 2, label: 'TECHNIQUES', icon: Code2 },
            { n: 3, label: 'ASPIRATION', icon: Target },
            { n: 4, label: 'INTERESTS', icon: Compass },
            { n: 5, label: 'LEARNING STYLE', icon: Brain },
          ].map(s => {
            const Icon = s.icon;
            const isDone = step > s.n;
            const isCurrent = step === s.n;
            return (
              <div key={s.n} className="flex flex-col items-center gap-1.5 flex-1 relative">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-purple-700 to-cyan-500 text-white ring-4 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#07070d] text-slate-500 border border-purple-900/40'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] font-mono-tech font-bold hidden sm:inline ${
                  isCurrent ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-[380px]">
          {/* STEP 1: Basic Academic Profile */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-indigo-950/30 border border-indigo-900/40 rounded-xl p-3 text-xs text-indigo-300">
                Enter your genuine college and department info. EduTwin uses this to filter campus eligibility, research labs, and academic credits.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    University Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. aryan.sharma@cumail.in"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    University / College <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    placeholder="e.g. Chandigarh University"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Branch / Department <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Current Year <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate (M.Tech / MCA / MS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Current Semester <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={semester}
                    onChange={e => setSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    CGPA <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={e => setCgpa(e.target.value)}
                    placeholder="e.g. 8.64"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Attendance Percentage <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={attendance}
                    onChange={e => setAttendance(e.target.value)}
                    placeholder="e.g. 81.5"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills Profile */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <p className="text-xs text-slate-300">
                Select your skills and indicate your current proficiency (<strong className="text-indigo-300">Beginner / Intermediate / Advanced</strong>). You can also add custom skills.
              </p>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {SKILL_CATEGORIES.map(category => (
                  <div key={category.name} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-2">
                      {category.name}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skName => {
                        const selectedSkill = skills.find(s => s.name.toLowerCase() === skName.toLowerCase());
                        const isSelected = !!selectedSkill;

                        return (
                          <div
                            key={skName}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              isSelected
                                ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/50'
                                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleSkill(skName, category.name)}
                              className="hover:underline flex items-center gap-1"
                            >
                              {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                              <span>{skName}</span>
                            </button>

                            {isSelected && (
                              <select
                                value={selectedSkill.level}
                                onChange={e => updateSkillLevel(skName, e.target.value as SkillLevel)}
                                className="ml-1 text-[10px] bg-slate-900 text-indigo-300 rounded border border-indigo-500/30 px-1 py-0.5 focus:outline-none"
                              >
                                <option value="Beginner">Beg</option>
                                <option value="Intermediate">Int</option>
                                <option value="Advanced">Adv</option>
                              </select>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Skill */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Add Custom Skill
                </span>
                <form onSubmit={handleAddCustomSkill} className="flex flex-wrap gap-2 items-center">
                  <input
                    type="text"
                    value={customSkillName}
                    onChange={e => setCustomSkillName(e.target.value)}
                    placeholder="e.g. Rust, PyTorch, Docker"
                    className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={customSkillCategory}
                    onChange={e => setCustomSkillCategory(e.target.value as SkillCategory)}
                    className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Development">Development</option>
                    <option value="Emerging Technology">Emerging Tech</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    value={customSkillLevel}
                    onChange={e => setCustomSkillLevel(e.target.value as SkillLevel)}
                    className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* Currently Selected Summary */}
              <div className="text-xs text-slate-400">
                Selected {skills.length} skills. You can review and edit proficiency anytime in My EduTwin.
              </div>
            </div>
          )}

          {/* STEP 3: Career Goal */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Question 1 */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  What are you currently interested in? <span className="text-slate-400 font-normal text-xs">(Select multiple)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAREER_INTERESTS.map(item => {
                    const isSelected = interestsIn.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterestIn(item)}
                        className={`p-3 rounded-xl text-xs font-medium text-left border transition ${
                          isSelected
                            ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/60 shadow-sm'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  What is your current career goal?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAREER_GOALS.map(goal => {
                    const isSelected = careerGoal === goal;
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setCareerGoal(goal)}
                        className={`p-3 rounded-xl text-xs font-medium text-left border transition ${
                          isSelected
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-transparent shadow-md shadow-indigo-600/30'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={isSelected ? 'font-semibold' : ''}>{goal}</span>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        {goal === 'Still Exploring' && (
                          <span className="text-[10px] text-indigo-300 block mt-1">
                            No pressure! We'll provide diverse opportunities.
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Learning Profile (Learning DNA) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Preferred Learning Methods */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Preferred Learning Methods <span className="text-slate-400 font-normal text-xs">(Select multiple)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LEARNING_METHODS.map(method => {
                    const isSelected = learningMethods.includes(method);
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => toggleLearningMethod(method)}
                        className={`p-3 rounded-xl text-xs font-medium text-left border transition ${
                          isSelected
                            ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/60'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{method}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Study Time */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Preferred Study Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {STUDY_TIMES.map(time => {
                    const isSelected = studyTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setStudyTime(time)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-center border transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-transparent'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Available Study Time */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Available Study Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_TIMES.map(time => {
                    const isSelected = availableTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setAvailableTime(time)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-center border transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-transparent'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Interests & Extracurricular Profile */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <p className="text-xs text-slate-300">
                Select extracurricular interests to power your personalized Campus Domain matches:
              </p>

              <div className="flex flex-wrap gap-2 max-h-[220px] overflow-y-auto pr-2">
                {EXTRACURRICULAR_TAGS.map(tag => {
                  const isSelected = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleInterest(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Custom interest */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Add Custom Interest / Club
                </span>
                <form onSubmit={handleAddCustomInterest} className="flex gap-2">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={e => setCustomInterest(e.target.value)}
                    placeholder="e.g. Drone Racing, Open Source, Quantum Computing"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300">
                ✨ Ready to construct your Digital Twin! Click "Generate My EduTwin" below.
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-lg shadow-indigo-600/30 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My EduTwin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
