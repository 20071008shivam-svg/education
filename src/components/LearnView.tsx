import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Send, 
  Sparkles, 
  Clock, 
  Calendar, 
  Award, 
  RefreshCw, 
  ShieldAlert, 
  BrainCircuit, 
  ChevronRight,
  ListTodo,
  Loader2,
  Check,
  XCircle
} from 'lucide-react';
import { StudentProfile, AcademicCourse, AcademicReminder } from '../types';
import { askAiDoubtSolver, generateAiQuiz, QuizQuestion } from '../services/aiService';

interface LearnViewProps {
  student: StudentProfile;
  onUpdateAttendance: (courseCode: string, attended: number, total: number) => void;
  onToggleReminder: (reminderId: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  student,
  onUpdateAttendance,
  onToggleReminder,
}) => {
  const [subTab, setSubTab] = useState<'study_plan' | 'courses' | 'doubt_solver' | 'quiz'>('study_plan');

  // Doubt solver state
  const [selectedSubject, setSelectedSubject] = useState(student.courses[0]?.name || 'Data Structures & Algorithms');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [isSolvingDoubt, setIsSolvingDoubt] = useState(false);
  const [doubtResponse, setDoubtResponse] = useState<string | null>(null);

  // Quiz state
  const [quizTopic, setQuizTopic] = useState('Data Structures & Algorithms');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    setIsSolvingDoubt(true);
    setDoubtResponse(null);
    try {
      const response = await askAiDoubtSolver(selectedSubject, doubtQuestion.trim(), student);
      setDoubtResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSolvingDoubt(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    setQuizQuestions(null);
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    try {
      const questions = await generateAiQuiz(quizTopic);
      setQuizQuestions(questions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  // Quick attendance calculation: how many classes needed to reach 75%?
  const calculateClassesNeeded = (attended: number, total: number) => {
    // We want (attended + x) / (total + x) >= 0.75
    // attended + x >= 0.75 * total + 0.75 * x
    // 0.25 * x >= 0.75 * total - attended
    // x >= (0.75 * total - attended) / 0.25
    const needed = Math.ceil((0.75 * total - attended) / 0.25);
    return Math.max(0, needed);
  };

  const calculateCanMiss = (attended: number, total: number) => {
    // attended / (total + x) >= 0.75
    // attended >= 0.75 * total + 0.75 * x
    // 0.75 * x <= attended - 0.75 * total
    const canMiss = Math.floor((attended - 0.75 * total) / 0.75);
    return Math.max(0, canMiss);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0a1020] border border-purple-800/40 p-6 sm:p-8 shadow-2xl group">
        {/* Subtle Yuji Academic Energy Watermark like Future Self */}
        <div className="absolute inset-0 pointer-events-none opacity-20 filter contrast-125">
          <img
            src="/src/assets/images/jjk_yuji_academic_1790759031288.jpg"
            alt="Academic Energy Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d091a]/90 via-[#120c24]/85 to-[#0a1020]/90" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono-tech font-bold bg-purple-950 text-cyan-300 border border-purple-600/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>TRAINING & ACADEMIC ENERGY</span>
              </span>
              <span className="text-xs text-purple-300/80 font-mono-tech">
                Barrier Target: 75% Required
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-space tracking-tight">
              Training Grounds & Academic Energy Protocols
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Tailored study sessions aligned with your <span className="text-cyan-300 font-semibold">{student.learningProfile.preferredTime}</span> rhythm ({student.learningProfile.availableTime}), real-time 75% attendance barrier safeguard, and AI Technique Tutor.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-purple-900/40">
        {[
          { id: 'study_plan', label: "Daily Training Plan & Reminders", icon: ListTodo },
          { id: 'courses', label: 'Courses & 75% Barrier Guard', icon: ShieldAlert },
          { id: 'doubt_solver', label: 'AI Technique Tutor (Doubt Solver)', icon: BrainCircuit },
          { id: 'quiz', label: 'AI Adaptive Technique Quiz', icon: Award },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-tech font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40'
                  : 'bg-[#0b0b14] text-slate-400 hover:text-white border border-purple-950'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. STUDY PLAN & DEADLINES */}
      {subTab === 'study_plan' && (
        <div className="space-y-6">
          {/* Personalized Schedule Routine */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Personalized Daily Study Block ({student.learningProfile.preferredTime})</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Engineered around your preferred learning style: {student.learningProfile.preferredMethods.join(', ')}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Pace: {student.learningProfile.availableTime}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">DSA: Dynamic Programming & Trees (Priority 1)</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Review weak topics flagged in CS301 syllabus: Tree DP memoization and boundary constraints.
                    </p>
                    <span className="text-[10px] text-indigo-400 font-medium mt-1 inline-block">
                      Recommended Method: Practical Coding (30 mins)
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">30 mins</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Operating Systems: Banker's Algorithm</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Mid-term quiz preparation. Verify safe-state allocation matrices and POSIX mutex threads.
                    </p>
                    <span className="text-[10px] text-indigo-400 font-medium mt-1 inline-block">
                      Recommended Method: Quizzes & Reading (25 mins)
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">25 mins</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Campus Hackathon Prep: Model Architecture</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Draft FastAPI inference wrapper for CU HackFest submission demo.
                    </p>
                    <span className="text-[10px] text-emerald-400 font-medium mt-1 inline-block">
                      Recommended Method: Projects (35 mins)
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">35 mins</span>
              </div>
            </div>
          </div>

          {/* Academic Deadlines / Reminders */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Upcoming Academic Submissions & Exams</span>
            </h3>

            <div className="space-y-3">
              {student.reminders.map(rem => (
                <div
                  key={rem.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition ${
                    rem.isCompleted
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleReminder(rem.id)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                        rem.isCompleted
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {rem.isCompleted && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <p className={`text-xs font-bold text-white ${rem.isCompleted ? 'line-through text-slate-400' : ''}`}>
                        {rem.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{rem.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      rem.priority === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {rem.priority} Priority
                    </span>
                    <span className="text-xs font-mono text-slate-300 font-medium">
                      {rem.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. COURSES & 75% ATTENDANCE GUARD */}
      {subTab === 'courses' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 font-mono-tech flex items-center gap-3">
            <span className="text-base">🛡️</span>
            <div>
              <strong className="text-white">Chandigarh University 75% Attendance Barrier Rule:</strong> Maintaining at least 75% attendance is mandatory to appear for end-semester exams and placement drive eligibility. EduTwin calculates the exact lectures you must attend to stay safe.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {student.courses.map(course => {
              const isBelow75 = course.currentAttendancePercent < 75;
              const classesNeeded = calculateClassesNeeded(course.classesAttended, course.totalClassesHeld);
              const canMiss = calculateCanMiss(course.classesAttended, course.totalClassesHeld);

              return (
                <div
                  key={course.code}
                  className={`p-6 rounded-3xl border transition shadow-xl ${
                    isBelow75
                      ? 'bg-[#0f070e] border-rose-800/60 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                      : 'bg-[#0b0b14] border-purple-800/40 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">
                        {course.code} • {course.credits} Credits
                      </span>
                      <h4 className="text-base font-black text-white font-space mt-0.5">
                        {course.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono-tech">
                        Sensei / Instructor: {course.instructor}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-xl font-black font-space ${isBelow75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {course.currentAttendancePercent}%
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono-tech">
                        {course.classesAttended}/{course.totalClassesHeld} Classes
                      </span>
                    </div>
                  </div>

                  {/* Attendance Advice Box */}
                  <div className={`p-3 rounded-2xl text-xs my-3 font-mono-tech ${
                    isBelow75
                      ? 'bg-rose-950/60 text-rose-200 border border-rose-800/60'
                      : 'bg-[#07070d] text-slate-300 border border-purple-900/30'
                  }`}>
                    {isBelow75 ? (
                      <p className="flex items-center gap-1.5 font-bold text-rose-300">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Action Required: Attend the next {classesNeeded} consecutive lectures to breach 75%.</span>
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Safe buffer: You can miss up to {canMiss} classes while staying above 75%.</span>
                      </p>
                    )}
                  </div>

                  {/* Weak topics diagnosis */}
                  {course.weakTopics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-purple-900/30 text-xs">
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                        Flagged Technique Concepts to Revise:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.weakTopics.map(topic => (
                          <span
                            key={topic}
                            className="px-2.5 py-0.5 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-600/40 text-[10px] font-mono-tech font-bold"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Attendance update button */}
                  <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-slate-400">Mark today's attendance:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateAttendance(course.code, course.classesAttended + 1, course.totalClassesHeld + 1)}
                        className="px-3 py-1 rounded-xl text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/50 font-bold transition cursor-pointer"
                      >
                        + Attended
                      </button>
                      <button
                        onClick={() => onUpdateAttendance(course.code, course.classesAttended, course.totalClassesHeld + 1)}
                        className="px-3 py-1 rounded-xl text-rose-300 bg-rose-950/70 hover:bg-rose-900/80 border border-rose-700/50 font-bold transition cursor-pointer"
                      >
                        + Missed
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. AI ACADEMIC DOUBT SOLVER */}
      {subTab === 'doubt_solver' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
            <h3 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2 mb-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <span>AI Technique Tutor & Concept Mastery Solver</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono-tech">
              Get rigorous, step-by-step conceptual breakdowns, math proofs, code snippets, and common examination traps tailored to your curriculum.
            </p>

            <form onSubmit={handleAskDoubt} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                    Select Subject Domain
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white focus:outline-none focus:border-cyan-400 transition font-mono-tech"
                  >
                    {student.courses.map(c => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Machine Learning & Deep Learning">Machine Learning & Deep Learning</option>
                    <option value="System Design & Cloud">System Design & Cloud</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-mono-tech font-bold text-slate-300 mb-1">
                    Ask your doubt or paste algorithmic code
                  </label>
                  <input
                    type="text"
                    value={doubtQuestion}
                    onChange={e => setDoubtQuestion(e.target.value)}
                    placeholder="e.g. Explain how to detect cycles in directed graphs using Tarjan's algorithm..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    required
                  />
                </div>
              </div>

              {/* Sample prompt pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-[11px] text-purple-400/80 font-mono-tech self-center">Try asking:</span>
                {[
                  "Explain Banker's Algorithm with a 3-process example",
                  "Why is Quicksort average O(N log N) but worst-case O(N^2)?",
                  "How does Backpropagation calculate weight gradients?",
                  "Explain 3NF vs BCNF database normalization rules"
                ].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setDoubtQuestion(sample)}
                    className="px-2.5 py-1 rounded-xl bg-[#07070d] text-cyan-300 border border-purple-900/40 hover:border-cyan-400/50 text-[11px] font-mono-tech transition cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSolvingDoubt}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSolvingDoubt ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>Analyzing Concept...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      <span>Solve Academic Doubt</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Answer Display */}
            {doubtResponse && (
              <div className="mt-6 p-6 rounded-2xl bg-[#07070d] border border-purple-800/50 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 pb-3 border-b border-purple-900/40 text-xs font-mono-tech font-bold text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>EduTwin Technique Sensei Breakdown</span>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans space-y-2">
                  {doubtResponse}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. AI ADAPTIVE PRACTICE QUIZ */}
      {subTab === 'quiz' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0b0b14] border border-purple-800/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-purple-900/30">
              <div>
                <h3 className="text-base font-black text-white font-space tracking-wide flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>AI Adaptive Technique Evaluation Quiz</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono-tech">
                  Test your understanding with instant, exam-calibrated conceptual challenge questions.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={quizTopic}
                  onChange={e => setQuizTopic(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-[#07070d] border border-purple-900/40 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono-tech"
                >
                  <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Database Management Systems">Database Management Systems</option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>

                <button
                  onClick={handleGenerateQuiz}
                  disabled={isGeneratingQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 transition disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {isGeneratingQuiz ? <Loader2 className="w-4 h-4 animate-spin text-cyan-300" /> : <RefreshCw className="w-4 h-4 text-cyan-300" />}
                  <span>Generate Quiz</span>
                </button>
              </div>
            </div>

            {/* Questions list */}
            {quizQuestions ? (
              <div className="space-y-6 mt-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-[#07070d] border border-purple-900/40 space-y-3">
                    <p className="text-xs font-bold text-white font-space">
                      <span className="text-cyan-400 font-mono-tech mr-1">Q{qIdx + 1}.</span> {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let optionStyle = 'bg-[#0b0b14] border-purple-950 text-slate-300 hover:border-purple-700/50';

                        if (submittedQuiz) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                          } else if (isSelected) {
                            optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-purple-900/50 border-purple-500 text-cyan-300 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                            className={`p-3.5 rounded-2xl text-xs text-left border transition font-mono-tech cursor-pointer ${optionStyle}`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200 font-mono-tech">
                        <strong className="text-cyan-300">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-end pt-3">
                  {!submittedQuiz ? (
                    <button
                      onClick={() => setSubmittedQuiz(true)}
                      className="px-6 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400/40 transition cursor-pointer"
                    >
                      Submit & Evaluate Answers
                    </button>
                  ) : (
                    <button
                      onClick={handleGenerateQuiz}
                      className="px-6 py-2.5 rounded-2xl text-xs font-mono-tech font-bold text-white bg-gradient-to-r from-purple-700 to-cyan-500 hover:opacity-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 transition cursor-pointer"
                    >
                      Practice Another Topic
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400 font-mono-tech">
                Select a topic above and click <span className="text-cyan-300 font-bold">"Generate Quiz"</span> to summon AI practice questions.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
