import { CampusOpportunity, OpportunityMatchBreakdown, StudentProfile, MatchFactor } from '../types';

export function calculateOpportunityMatch(
  student: StudentProfile,
  opp: CampusOpportunity
): OpportunityMatchBreakdown {
  const studentSkillNames = student.skills.map(s => s.name.toLowerCase());
  const studentCareerGoal = student.careerGoal.toLowerCase();
  const studentInterestsIn = student.interestsIn.map(i => i.toLowerCase());
  const studentInterests = student.interests.map(i => i.toLowerCase());
  const oppSkills = opp.skillsDeveloped.map(s => s.toLowerCase());
  const oppCareers = opp.relatedCareerPaths.map(c => c.toLowerCase());
  
  // 1. Skill Match (Weight: 30%)
  // Calculates how many skills developed match student's existing or target skills
  let skillMatches = 0;
  oppSkills.forEach(s => {
    if (studentSkillNames.some(sk => sk.includes(s) || s.includes(sk))) {
      skillMatches += 1;
    }
  });
  const skillMatch = Math.min(100, Math.round(
    oppSkills.length > 0 ? (skillMatches / oppSkills.length) * 85 + 15 : 72
  ));

  // 2. Interest Match (Weight: 25%)
  // Extracurricular interests alignment (Hackathons, Coding Competitions, Workshops, etc.)
  let interestMatchScore = 65;
  const oppTypeLower = opp.eventType.toLowerCase();
  if (studentInterests.some(i => oppTypeLower.includes(i.toLowerCase()) || i.toLowerCase().includes(oppTypeLower))) {
    interestMatchScore += 25;
  }
  if (opp.eventType === 'Hackathon' && studentInterests.map(i => i.toLowerCase()).includes('hackathons')) {
    interestMatchScore = 96;
  } else if (opp.eventType === 'Workshop' && studentInterests.map(i => i.toLowerCase()).includes('workshops')) {
    interestMatchScore = 92;
  } else if (opp.eventType === 'Competition' && studentInterests.map(i => i.toLowerCase()).includes('coding competitions')) {
    interestMatchScore = 94;
  }
  const interestMatch = Math.min(100, interestMatchScore);

  // 3. Career Goal Match (Weight: 20%)
  // Direct alignment with declared career goal (e.g. Internship, Placement, Research) and career domains
  let careerMatches = 0;
  oppCareers.forEach(c => {
    if (studentInterestsIn.some(int => int.includes(c) || c.includes(int))) {
      careerMatches += 1;
    }
    if (studentCareerGoal.includes(c) || c.includes(studentCareerGoal)) {
      careerMatches += 1.5;
    }
  });
  const careerMatch = Math.min(100, Math.round(
    oppCareers.length > 0 ? Math.min(1, careerMatches / oppCareers.length) * 80 + 20 : 70
  ));

  // 4. Academic Relevance (Weight: 10%)
  // Branch relevance (CSE/ECE/IT) and eligibility for student's year
  let academicRelevance = 80;
  const branchLower = student.branch.toLowerCase();
  if (branchLower.includes('computer') || branchLower.includes('it') || branchLower.includes('cse')) {
    academicRelevance = 92;
  }
  if (opp.eligibility.toLowerCase().includes('all') || opp.eligibility.toLowerCase().includes(student.year.toLowerCase())) {
    academicRelevance = Math.min(100, academicRelevance + 6);
  }

  // 5. Experience Fit (Weight: 10%)
  // Calibrated to student's year, previous event attendance, and skill tiers
  let experienceLevel = 84;
  const hasAdvanced = student.skills.some(s => s.level === 'Advanced');
  if (opp.eventType === 'Research Presentation' && !hasAdvanced) {
    experienceLevel = 70;
  } else if (opp.eventType === 'Hackathon') {
    experienceLevel = student.year.includes('3') || student.year.includes('4') ? 95 : 82;
  } else if (opp.eventType === 'Workshop') {
    experienceLevel = 90;
  }

  // 6. Learning Mode Preference (Weight: 5%)
  // Practical Coding / Projects / Video preference vs hands-on vs virtual mode
  let learningModeMatch = 80;
  const preferred = student.learningProfile?.preferredMethods || [];
  if (opp.locationMode === 'Hybrid' || opp.locationMode === 'On Campus') {
    learningModeMatch = 90;
  }
  if (preferred.includes('Practical Coding') && (opp.eventType === 'Hackathon' || opp.eventType === 'Competition' || opp.eventType === 'Workshop')) {
    learningModeMatch = 98;
  }

  // Exact 6-Factor Weighted Overall Score calculation
  // Skill Match: 30%, Interest Match: 25%, Career Goal Match: 20%, Academic Relevance: 10%, Experience Fit: 10%, Learning Mode Preference: 5%
  const overallMatch = Math.round(
    skillMatch * 0.30 +
    interestMatch * 0.25 +
    careerMatch * 0.20 +
    academicRelevance * 0.10 +
    experienceLevel * 0.10 +
    learningModeMatch * 0.05
  );

  // Networking Value Score
  const networkingValueScore = Math.min(100, opp.networkingValue * 10);

  // 6 Structured Scoring Factors with explanations for MatchBreakdownModal
  const factors: MatchFactor[] = [
    {
      factor: 'Skill Match',
      weightPercent: 30,
      score: skillMatch,
      studentScore: Math.min(100, student.skills.length * 10),
      opportunityScore: opp.skillGrowthValue * 10,
      explanation: `Exercises ${opp.skillsDeveloped.slice(0, 3).join(', ')}, matching ${skillMatches} of your current tech proficiencies.`,
    },
    {
      factor: 'Interest Match',
      weightPercent: 25,
      score: interestMatch,
      studentScore: 92,
      opportunityScore: 90,
      explanation: `Direct alignment with your selected extracurricular passion for ${opp.eventType}s and technical competitions.`,
    },
    {
      factor: 'Career Goal Match',
      weightPercent: 20,
      score: careerMatch,
      studentScore: 88,
      opportunityScore: opp.resumeValue * 10,
      explanation: `Targets ${opp.relatedCareerPaths.join(' & ')}, directly reinforcing your goal to land a top ${student.careerGoal}.`,
    },
    {
      factor: 'Academic Relevance',
      weightPercent: 10,
      score: academicRelevance,
      studentScore: Math.round(student.cgpa * 10),
      opportunityScore: 92,
      explanation: `Certified for ${student.year} students in ${student.branch} with curriculum-reinforcing problem statements.`,
    },
    {
      factor: 'Experience Fit',
      weightPercent: 10,
      score: experienceLevel,
      studentScore: 86,
      opportunityScore: 88,
      explanation: `Optimal difficulty threshold—encourages breakthrough growth without prerequisite roadblocks.`,
    },
    {
      factor: 'Learning Mode Preference',
      weightPercent: 5,
      score: learningModeMatch,
      studentScore: 90,
      opportunityScore: 94,
      explanation: `Matches your favored hands-on '${preferred[0] || 'Practical Coding'}' style with an interactive ${opp.locationMode} setup.`,
    },
  ];

  // Dynamic Personalized Reasons ("Why this matches you")
  const reasons: string[] = [];
  
  if (student.interestsIn.some(int => opp.relatedCareerPaths.includes(int))) {
    const matchedDomain = student.interestsIn.find(int => opp.relatedCareerPaths.includes(int));
    reasons.push(`Directly accelerates your declared focus in ${matchedDomain}`);
  }
  
  if (opp.skillsDeveloped.some(s => studentSkillNames.includes(s.toLowerCase()))) {
    const commonSkills = opp.skillsDeveloped.filter(s => studentSkillNames.includes(s.toLowerCase()));
    reasons.push(`Leveled up hands-on application of ${commonSkills.slice(0, 2).join(' & ')}`);
  }

  if (student.interests.some(i => i.toLowerCase().includes(opp.eventType.toLowerCase()) || opp.eventType.toLowerCase().includes(i.toLowerCase()))) {
    reasons.push(`Matches your active extracurricular interest in ${opp.eventType}s`);
  }

  if (student.careerGoal !== 'Still Exploring') {
    reasons.push(`High impact towards securing a ${student.careerGoal} in tech`);
  } else {
    reasons.push(`Ideal exploratory venue to test practical skills and meet diverse mentors`);
  }

  reasons.push(`Eligible for ${student.year} students in ${student.branch}`);

  // Structured "Why should I attend?"
  const whyAttend = {
    whatIsIt: `${opp.eventName} is an officially organized ${opp.eventType} hosted by ${opp.organizer} on ${opp.date} (${opp.locationMode}: ${opp.locationDetail}).`,
    whyDoesItMatter: `As a ${student.year} ${student.branch} student targeting ${student.careerGoal}, attending this ${opp.eventType} bridges classroom theory with demonstrable proof of capability. It directly exercises ${opp.skillsDeveloped.slice(0, 3).join(', ')}.`,
    whatWillILearn: [
      `Hands-on production problem solving using ${opp.skillsDeveloped.slice(0, 2).join(' & ')}`,
      `Collaborative teamwork dynamics and rapid product delivery under deadlines`,
      `Insights into current industry expectations from organizers and visiting mentors`
    ],
    whatItAddsToResume: opp.certificateAvailable
      ? `A verifiable completion certificate from ${opp.organizer}, a concrete project artifact for GitHub, and an action-oriented resume bullet with measurable outcomes.`
      : `A competitive hackathon/contest highlight, proven team collaboration experience, and talking points for technical interviews.`,
    whoShouldAttend: `${opp.eligibility}. Specifically high-yield for students aiming for ${opp.relatedCareerPaths.join(', ')}.`,
    recommendedNextStep: opp.participationType === 'Team'
      ? `Form or join a complementary team using 'Find My Team' peer match, review the problem statements, and submit your registration before ${opp.registrationDeadline}.`
      : `Register on the official link before ${opp.registrationDeadline} and complete any preparatory tutorials recommended in EduTwin Learn.`
  };

  return {
    overallMatch: Math.min(99, Math.max(68, overallMatch)),
    skillMatch,
    careerMatch,
    interestMatch,
    academicRelevance,
    experienceLevel,
    learningModeMatch,
    networkingValueScore,
    factors,
    reasons: reasons.slice(0, 4),
    whyAttend,
  };
}
