export type SkillCategory = 'Programming' | 'Development' | 'Emerging Technology' | 'Other';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentSkill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export type CareerGoalType = 
  | 'Internship'
  | 'Placement'
  | 'Higher Studies'
  | 'Research'
  | 'Startup'
  | 'Still Exploring';

export type PreferredLearningMethod = 
  | 'Video'
  | 'Reading'
  | 'Practical Coding'
  | 'Projects'
  | 'Quizzes'
  | 'Group Study'
  | 'Instructor-led Learning';

export type PreferredStudyTime = 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'Flexible';
export type AvailableStudyTime = '<30 minutes/day' | '30–60 minutes/day' | '1–2 hours/day' | '2+ hours/day';

export interface LearningProfile {
  preferredMethods: PreferredLearningMethod[];
  preferredTime: PreferredStudyTime;
  availableTime: AvailableStudyTime;
}

export interface AttendedExperienceGrowth {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organizer: string;
  dateAttended: string;
  roleOrTeam?: string;
  learningsSummary: string;
  builtProject?: string;
  hadCertificate: boolean;
  metMentor: boolean;
  resumeBullet: string;
  linkedInPost: string;
  portfolioEntry: {
    title: string;
    summary: string;
    techStack: string[];
    impact: string;
  };
  skillsGained: string[];
}

export interface QuestStep {
  id: string;
  stepNumber: number;
  title: string;
  category: 'Skill Building' | 'Workshop' | 'Club' | 'Project' | 'Hackathon' | 'Research/Competition' | 'Portfolio' | 'Internship Preparation';
  description: string;
  status: 'completed' | 'in_progress' | 'locked';
  xp: number;
  badge?: string;
  recommendedOpportunityId?: string;
}

export interface AcademicCourse {
  code: string;
  name: string;
  credits: number;
  instructor: string;
  currentAttendancePercent: number;
  totalClassesHeld: number;
  classesAttended: number;
  currentGradeEstimate: string;
  isWeakSubject: boolean;
  weakTopics: string[];
}

export interface AcademicReminder {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: 'Assignment' | 'Lab Submission' | 'Mid-Term Exam' | 'Project Phase';
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  university: string;
  branch: string;
  year: string;
  semester: string;
  cgpa: number;
  attendancePercentage: number;
  
  skills: StudentSkill[];
  interestsIn: string[];
  careerGoal: CareerGoalType;
  
  learningProfile: LearningProfile;
  interests: string[];
  
  // Computed / dynamic student DNA
  strengths: string[];
  areasToImprove: string[];
  currentFocus: string;
  topSkills: string[];
  skillsToDevelop: string[];
  
  // Activities and milestones
  campusQuests: QuestStep[];
  attendedExperiences: AttendedExperienceGrowth[];
  bookmarkedOpportunityIds: string[];
  
  // Peer matching preferences
  peerMatchingOptIn: boolean;
  peerMatchingIntent: 'Looking for project partners' | 'Looking for hackathon teammates' | 'Looking for study partners' | 'Looking for club/community';
  privacyAnonymized: boolean;
  
  // Academic tracker
  courses: AcademicCourse[];
  reminders: AcademicReminder[];
  
  // Gamification
  xp: number;
  level: number;
}

export type EventType = 
  | 'Hackathon'
  | 'Workshop'
  | 'Seminar'
  | 'Club'
  | 'Competition'
  | 'Research Presentation'
  | 'Conference'
  | 'Certification'
  | 'Sports'
  | 'Entrepreneurship Event'
  | 'Technical Event';

export interface CampusOpportunity {
  id: string;
  eventName: string;
  eventType: EventType;
  date: string;
  registrationDeadline: string;
  description: string;
  organizer: string;
  skillsDeveloped: string[];
  relatedCareerPaths: string[];
  eligibility: string;
  locationMode: 'On Campus' | 'Virtual' | 'Hybrid';
  locationDetail: string;
  certificateAvailable: boolean;
  participationType: 'Individual' | 'Team' | 'Both';
  registrationLink: string;
  resumeValue: number; // 1 - 10
  skillGrowthValue: number; // 1 - 10
  networkingValue: number; // 1 - 10
  isDemoData: boolean;
}

export interface MatchFactor {
  factor: string;
  weightPercent: number;
  score: number;
  studentScore: number;
  opportunityScore: number;
  explanation: string;
}

export interface OpportunityMatchBreakdown {
  overallMatch: number;
  skillMatch: number;
  careerMatch: number;
  interestMatch: number;
  academicRelevance: number;
  experienceLevel: number;
  learningModeMatch: number;
  networkingValueScore: number;
  factors: MatchFactor[];
  reasons: string[];
  whyAttend: {
    whatIsIt: string;
    whyDoesItMatter: string;
    whatWillILearn: string[];
    whatItAddsToResume: string;
    whoShouldAttend: string;
    recommendedNextStep: string;
  };
}

export interface CampusResource {
  id: string;
  name: string;
  type: 'Faculty Mentor' | 'Lab' | 'Research Group' | 'Student Club' | 'Specialized Facility';
  areaOfExpertise: string;
  relatedSkills: string[];
  relatedCareerPaths: string[];
  description: string;
  roomOrBuilding: string;
  contactOrLink: string;
  mentorName?: string;
  relevanceExplanation?: string;
}

export interface PeerProfile {
  id: string;
  name: string;
  avatarSeed: string;
  department: string;
  year: string;
  careerGoal: string;
  primarySkills: { name: string; level: SkillLevel }[];
  lookingFor: 'Looking for project partners' | 'Looking for hackathon teammates' | 'Looking for study partners' | 'Looking for club/community';
  interests: string[];
  bio: string;
  portfolioHighlight?: string;
  complementaryExplanation?: string;
}

export interface FutureSelfScenario {
  id: string;
  name: string;
  description: string;
  badge: string;
  color: string;
  metrics: {
    estimatedPlacementLpaMin: number;
    estimatedPlacementLpaMax: number;
    internshipProbability: number; // percentage
    topTierAdmissionIndex: number; // percentage
    skillReadinessScore: number; // out of 100
  };
  keyMilestones: string[];
  digitalTwinMessage: string;
}
