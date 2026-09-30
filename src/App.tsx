import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { DashboardView } from './components/DashboardView';
import { MyEduTwinView } from './components/MyEduTwinView';
import { CampusDomainView } from './components/CampusDomainView';
import { LearnView } from './components/LearnView';
import { CampusQuestView } from './components/CampusQuestView';
import { PeerMatchView } from './components/PeerMatchView';
import { FutureSelfView } from './components/FutureSelfView';
import { CareerView } from './components/CareerView';
import { OnboardingWizard } from './components/OnboardingWizard';
import { WhyAttendModal } from './components/WhyAttendModal';
import { AfterEventGrowthModal } from './components/AfterEventGrowthModal';
import { MatchBreakdownModal } from './components/MatchBreakdownModal';
import { DataPortabilityModal } from './components/DataPortabilityModal';
import { DomainExpansionOverlay } from './components/DomainExpansionOverlay';
import { calculateOpportunityMatch } from './services/recommendationEngine';
import { 
  INITIAL_STUDENT_PROFILE, 
  CAMPUS_OPPORTUNITIES, 
  CAMPUS_RESOURCES, 
  PEER_PROFILES
} from './data/mockData';
import { 
  CampusOpportunity, 
  StudentProfile, 
  AttendedExperienceGrowth, 
  OpportunityMatchBreakdown,
  StudentSkill
} from './types';

const STORAGE_KEY = 'edutwin_student_profile_v2';

export default function App() {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage:', e);
    }
    return INITIAL_STUDENT_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDataPortabilityOpen, setIsDataPortabilityOpen] = useState(false);

  // Global modals for opportunities
  const [activeWhyAttendOpp, setActiveWhyAttendOpp] = useState<CampusOpportunity | null>(null);
  const [activeWhyAttendMatch, setActiveWhyAttendMatch] = useState<OpportunityMatchBreakdown | null>(null);
  const [isWhyAttendOpen, setIsWhyAttendOpen] = useState(false);

  const [activeMatchBreakdownOpp, setActiveMatchBreakdownOpp] = useState<CampusOpportunity | null>(null);
  const [activeMatchBreakdownMatch, setActiveMatchBreakdownMatch] = useState<OpportunityMatchBreakdown | null>(null);
  const [isMatchBreakdownOpen, setIsMatchBreakdownOpen] = useState(false);

  const [activeGrowthOpp, setActiveGrowthOpp] = useState<CampusOpportunity | null>(null);
  const [isGrowthOpen, setIsGrowthOpen] = useState(false);

  // Cinematic Domain Expansion
  const [isDomainExpansionOpen, setIsDomainExpansionOpen] = useState(false);

  const handleOpenDomainExpansion = () => {
    setIsDomainExpansionOpen(true);
  };

  const handleCompleteDomainExpansion = () => {
    setIsDomainExpansionOpen(false);
    setActiveTab('futureself');
  };

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [student]);

  // Profile Save
  const handleSaveProfile = (newProfile: StudentProfile) => {
    setStudent(newProfile);
  };

  // Switch Profile among presets
  const handleSwitchProfile = (newProfile: StudentProfile) => {
    setStudent(newProfile);
  };

  // Reset Profile to default
  const handleResetProfile = () => {
    setStudent(INITIAL_STUDENT_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
  };

  // Import State from JSON file
  const handleImportState = (importedStudent: StudentProfile) => {
    setStudent(importedStudent);
  };

  // Bookmark toggle
  const handleToggleBookmark = (oppId: string) => {
    setStudent(prev => {
      const isBookmarked = prev.bookmarkedOpportunityIds.includes(oppId);
      const updatedBookmarks = isBookmarked
        ? prev.bookmarkedOpportunityIds.filter(id => id !== oppId)
        : [...prev.bookmarkedOpportunityIds, oppId];
      return {
        ...prev,
        bookmarkedOpportunityIds: updatedBookmarks,
      };
    });
  };

  // Turn Experience into Growth
  const handleApplyGrowth = (growth: AttendedExperienceGrowth) => {
    setStudent(prev => {
      // Add experience
      const updatedExperiences = [growth, ...prev.attendedExperiences];

      // Add or update skills in Student DNA
      const currentSkills = [...prev.skills];
      growth.skillsGained.forEach(gainedSkillName => {
        const existingIdx = currentSkills.findIndex(
          s => s.name.toLowerCase() === gainedSkillName.toLowerCase()
        );
        if (existingIdx >= 0) {
          // Upgrade level if beginner
          if (currentSkills[existingIdx].level === 'Beginner') {
            currentSkills[existingIdx] = {
              ...currentSkills[existingIdx],
              level: 'Intermediate',
            };
          }
        } else {
          // Insert new skill
          const newSkill: StudentSkill = {
            name: gainedSkillName,
            category: 'Emerging Technology',
            level: 'Intermediate',
          };
          currentSkills.push(newSkill);
        }
      });

      // Update Campus Quests: Mark corresponding quest step as completed
      const updatedQuests = prev.campusQuests.map(q => {
        if (q.recommendedOpportunityId === growth.opportunityId || (q.category === 'Workshop' && q.status === 'in_progress')) {
          return { ...q, status: 'completed' as const };
        }
        return q;
      });

      // Unlock next quest step if previous completed
      const nextLockedIndex = updatedQuests.findIndex(q => q.status === 'locked');
      if (nextLockedIndex >= 0) {
        updatedQuests[nextLockedIndex] = { ...updatedQuests[nextLockedIndex], status: 'in_progress' };
      }

      // Add XP & check Level up
      const newXp = prev.xp + 250;
      const newLevel = Math.floor(newXp / 500) + 1;

      return {
        ...prev,
        attendedExperiences: updatedExperiences,
        skills: currentSkills,
        campusQuests: updatedQuests,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Quest step manual completion
  const handleCompleteQuestStep = (stepId: string) => {
    setStudent(prev => {
      const stepToComplete = prev.campusQuests.find(q => q.id === stepId);
      const earnedXp = stepToComplete ? stepToComplete.xp : 200;

      const updatedQuests = prev.campusQuests.map(q => {
        if (q.id === stepId) {
          return { ...q, status: 'completed' as const };
        }
        return q;
      });

      // Unlock next
      const nextLockedIndex = updatedQuests.findIndex(q => q.status === 'locked');
      if (nextLockedIndex >= 0) {
        updatedQuests[nextLockedIndex] = { ...updatedQuests[nextLockedIndex], status: 'in_progress' };
      }

      const newXp = prev.xp + earnedXp;
      const newLevel = Math.floor(newXp / 500) + 1;

      return {
        ...prev,
        campusQuests: updatedQuests,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Update Attendance for course
  const handleUpdateAttendance = (courseCode: string, attended: number, total: number) => {
    setStudent(prev => {
      const updatedCourses = prev.courses.map(c => {
        if (c.code === courseCode) {
          const newPercent = Math.round((attended / total) * 1000) / 10;
          return {
            ...c,
            classesAttended: attended,
            totalClassesHeld: total,
            currentAttendancePercent: newPercent,
          };
        }
        return c;
      });

      // Recompute overall attendance percentage
      const totalAttendedAll = updatedCourses.reduce((acc, c) => acc + c.classesAttended, 0);
      const totalHeldAll = updatedCourses.reduce((acc, c) => acc + c.totalClassesHeld, 0);
      const overallPercent = Math.round((totalAttendedAll / totalHeldAll) * 1000) / 10;

      return {
        ...prev,
        courses: updatedCourses,
        attendancePercentage: overallPercent,
      };
    });
  };

  // Toggle Reminder
  const handleToggleReminder = (reminderId: string) => {
    setStudent(prev => {
      const updated = prev.reminders.map(r => {
        if (r.id === reminderId) {
          return { ...r, isCompleted: !r.isCompleted };
        }
        return r;
      });
      return { ...prev, reminders: updated };
    });
  };

  // Peer Opt-in & Anonymity
  const handleTogglePeerOptIn = (optIn: boolean) => {
    setStudent(prev => ({ ...prev, peerMatchingOptIn: optIn }));
  };

  const handleToggleAnonymity = (anonymized: boolean) => {
    setStudent(prev => ({ ...prev, privacyAnonymized: anonymized }));
  };

  // Open "Why Attend" modal from anywhere
  const handleOpenWhyAttend = (opp: CampusOpportunity) => {
    const match = calculateOpportunityMatch(student, opp);
    setActiveWhyAttendOpp(opp);
    setActiveWhyAttendMatch(match);
    setIsWhyAttendOpen(true);
  };

  // Open "Match Breakdown" modal from anywhere
  const handleOpenMatchBreakdown = (opp: CampusOpportunity) => {
    const match = calculateOpportunityMatch(student, opp);
    setActiveMatchBreakdownOpp(opp);
    setActiveMatchBreakdownMatch(match);
    setIsMatchBreakdownOpen(true);
  };

  // Open "Mark Attended / Growth" modal from anywhere
  const handleOpenGrowthModal = (opp: CampusOpportunity) => {
    setActiveGrowthOpp(opp);
    setIsGrowthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-slate-100 flex font-sans bg-domain-grid transition-colors duration-200">
      {/* 1. DESKTOP FIXED/STICKY LEFT SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        student={student}
        onSwitchProfile={handleSwitchProfile}
        onResetProfile={handleResetProfile}
        onOpenDataPortability={() => setIsDataPortabilityOpen(true)}
      />

      {/* 2. MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85%] z-10 bg-[#080812] shadow-2xl h-full overflow-y-auto">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              student={student}
              onSwitchProfile={handleSwitchProfile}
              onResetProfile={handleResetProfile}
              onOpenDataPortability={() => {
                setMobileMenuOpen(false);
                setIsDataPortabilityOpen(true);
              }}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT COLUMN (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header / Navigation Bar */}
        <Navbar
          student={student}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenDomainExpansion={handleOpenDomainExpansion}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenDataPortability={() => setIsDataPortabilityOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Scrollable Main Body Content */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              student={student}
              opportunities={CAMPUS_OPPORTUNITIES}
              onNavigateToTab={setActiveTab}
              onOpenWhyAttend={handleOpenWhyAttend}
              onOpenGrowthModal={handleOpenGrowthModal}
              onOpenMatchBreakdown={handleOpenMatchBreakdown}
              onOpenDomainExpansion={handleOpenDomainExpansion}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />
          )}

          {activeTab === 'edutwin' && (
            <MyEduTwinView
              student={student}
              onEditProfile={() => setIsOnboardingOpen(true)}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'campus' && (
            <CampusDomainView
              student={student}
              opportunities={CAMPUS_OPPORTUNITIES}
              resources={CAMPUS_RESOURCES}
              onToggleBookmark={handleToggleBookmark}
              onApplyGrowth={handleApplyGrowth}
            />
          )}

          {activeTab === 'learn' && (
            <LearnView
              student={student}
              onUpdateAttendance={handleUpdateAttendance}
              onToggleReminder={handleToggleReminder}
            />
          )}

          {activeTab === 'quest' && (
            <CampusQuestView
              student={student}
              onCompleteQuestStep={handleCompleteQuestStep}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'peers' && (
            <PeerMatchView
              student={student}
              peerProfiles={PEER_PROFILES}
              onToggleOptIn={handleTogglePeerOptIn}
              onUpdateIntent={intent => setStudent(prev => ({ ...prev, peerMatchingIntent: intent }))}
              onToggleAnonymity={handleToggleAnonymity}
            />
          )}

          {activeTab === 'futureself' && (
            <FutureSelfView 
              student={student} 
              onOpenDomainExpansion={handleOpenDomainExpansion}
            />
          )}

          {activeTab === 'career' && (
            <CareerView
              student={student}
              onNavigateToTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Futuristic Command Palette Search Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        opportunities={CAMPUS_OPPORTUNITIES}
        resources={CAMPUS_RESOURCES}
        onNavigateToTab={setActiveTab}
        onOpenOpportunity={handleOpenWhyAttend}
      />

      {/* Data Portability (Export & Import) Modal */}
      <DataPortabilityModal
        isOpen={isDataPortabilityOpen}
        onClose={() => setIsDataPortabilityOpen(false)}
        student={student}
        opportunities={CAMPUS_OPPORTUNITIES}
        resources={CAMPUS_RESOURCES}
        onImportState={handleImportState}
      />

      {/* 6-Factor AI Match Breakdown Modal */}
      <MatchBreakdownModal
        isOpen={isMatchBreakdownOpen}
        onClose={() => setIsMatchBreakdownOpen(false)}
        opportunity={activeMatchBreakdownOpp}
        match={activeMatchBreakdownMatch}
        student={student}
        onOpenWhyAttend={handleOpenWhyAttend}
      />

      {/* Cinematic Jujutsu Domain Expansion Moment */}
      <DomainExpansionOverlay
        isOpen={isDomainExpansionOpen}
        onComplete={handleCompleteDomainExpansion}
        sorcererName={student.fullName}
        domainName={`${student.currentFocus.split('&')[0].trim().toUpperCase()}: INFINITE SCHOLAR`}
      />

      {/* Onboarding / Profile Edit Wizard Modal */}
      <OnboardingWizard
        initialProfile={student}
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      {/* Global Why Attend Modal */}
      <WhyAttendModal
        opportunity={activeWhyAttendOpp}
        match={activeWhyAttendMatch}
        student={student}
        isOpen={isWhyAttendOpen}
        onClose={() => setIsWhyAttendOpen(false)}
        onRegister={opp => window.open(opp.registrationLink, '_blank')}
        onMarkAttended={opp => {
          setIsWhyAttendOpen(false);
          handleOpenGrowthModal(opp);
        }}
        onOpenBreakdown={() => {
          if (activeWhyAttendOpp) {
            handleOpenMatchBreakdown(activeWhyAttendOpp);
          }
        }}
      />

      {/* Global Turn Experience Into Growth Modal */}
      <AfterEventGrowthModal
        opportunity={activeGrowthOpp}
        student={student}
        isOpen={isGrowthOpen}
        onClose={() => setIsGrowthOpen(false)}
        onApplyGrowth={handleApplyGrowth}
      />
    </div>
  );
}
