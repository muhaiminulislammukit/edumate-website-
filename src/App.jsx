import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Authentication Provider & Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import AuthModal from './components/AuthModal';

// Public Web Application Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TutorMarketplace from './components/TutorMarketplace';
import HomeTuitionSystem from './components/HomeTuitionSystem';
import VirtualClassroom from './components/VirtualClassroom';
import AILearningSuite from './components/AILearningSuite';
import QuizExamSystem from './components/QuizExamSystem';
import CourseCatalog from './components/CourseCatalog';
import StudentDashboard from './components/StudentDashboard';
import GuardianDashboard from './components/GuardianDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import TutorProfileModal from './components/TutorProfileModal';
import PaymentModal from './components/PaymentModal';
import Footer from './components/Footer';

// Dedicated Sub-Folder Panels
import StudentPanel from './panels/student/StudentPanel';
import TeacherPanel from './panels/teacher/TeacherPanel';
import GuardianPanel from './panels/guardian/GuardianPanel';
import PortalGateway from './panels/PortalGateway';

import { INITIAL_TUTORS, INITIAL_TUITION_REQUESTS } from './data/mockData';
import { useLearning } from './context/LearningContext';

// Main Public Website Component
function MainWebsite({
  tutors,
  tuitionRequests,
  onAddNewRequest,
  onApplyForTuition
}) {
  const { user } = useAuth();
  const { content } = useLearning();
  const [activeTab, setActiveTab] = useState('tutors');
  const [currentRole, setCurrentRole] = useState(user?.role || 'student');
  const [tutorFilters, setTutorFilters] = useState({});

  // Modals state
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    title: 'Demo Class Booking Fee',
    amount: 500,
    recipient: 'EduMate360 Escrow'
  });

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState('student');
  const [authModalTab, setAuthModalTab] = useState('login');

  const handleQuickSearch = (filters) => {
    setTutorFilters(filters);
    setActiveTab('tutors');
    window.scrollTo({ top: 480, behavior: 'smooth' });
  };

  const handleBookDemo = (tutor) => {
    setPaymentData({
      title: `Demo Class Booking with ${tutor.name} (${tutor.subjects[0]})`,
      amount: tutor.hourlyFee || 800,
      recipient: tutor.name
    });
    setPaymentModalOpen(true);
  };

  const handleEnrollCourse = (course) => {
    setPaymentData({
      title: `Batch Enrollment: ${course.title}`,
      amount: course.price,
      recipient: `Instructor: ${course.instructor}`
    });
    setPaymentModalOpen(true);
  };

  const handlePayTuitionFee = (amount, childName) => {
    setPaymentData({
      title: `Monthly Tuition Fee for ${childName}`,
      amount: amount,
      recipient: `Assigned Home Mentors`
    });
    setPaymentModalOpen(true);
  };

  const effectiveRole = user?.role || currentRole;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={effectiveRole}
        setCurrentRole={setCurrentRole}
        onOpenTuitionModal={() => setActiveTab('home-tuitions')}
        onOpenPaymentModal={() => setPaymentModalOpen(true)}
        onOpenAuthModal={(role, tab) => {
          setAuthModalRole(role || 'student');
          setAuthModalTab(tab || 'login');
          setAuthModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'tutors' && (
          <div>
            <HeroSection
              onQuickSearch={handleQuickSearch}
              onOpenTuitionModal={() => setActiveTab('home-tuitions')}
              onOpenAiSuite={() => setActiveTab('ai-suite')}
            />
            <TutorMarketplace
              tutors={tutors}
              initialFilters={tutorFilters}
              onSelectTutor={(tutor) => setSelectedTutor(tutor)}
              onBookDemo={handleBookDemo}
            />
          </div>
        )}

        {activeTab === 'home-tuitions' && (
          <HomeTuitionSystem
            tuitionRequests={tuitionRequests}
            onAddNewRequest={onAddNewRequest}
            onApplyForTuition={onApplyForTuition}
            currentRole={effectiveRole}
          />
        )}

        {activeTab === 'classroom' && (
          <VirtualClassroom />
        )}

        {activeTab === 'ai-suite' && (
          <AILearningSuite />
        )}

        {activeTab === 'quiz' && (
          <QuizExamSystem />
        )}

        {activeTab === 'courses' && (
          <CourseCatalog
            courses={content.filter((item) => item.type === 'course' && item.status === 'approved')}
            onEnrollCourse={handleEnrollCourse}
          />
        )}

        {activeTab === 'dashboard' && (
          <div>
            {effectiveRole === 'student' && (
              <StudentDashboard
                onJoinLiveClass={() => setActiveTab('classroom')}
                onOpenQuiz={() => setActiveTab('quiz')}
              />
            )}
            {effectiveRole === 'guardian' && (
              <GuardianDashboard
                onPayTuitionFee={handlePayTuitionFee}
                onFindTutor={() => setActiveTab('tutors')}
              />
            )}
            {effectiveRole === 'teacher' && (
              <TeacherDashboard
                onStartLiveClass={() => setActiveTab('classroom')}
              />
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedTutor && (
        <TutorProfileModal
          tutor={selectedTutor}
          onClose={() => setSelectedTutor(null)}
          onBookDemo={handleBookDemo}
        />
      )}

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        paymentData={paymentData}
      />

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
        initialTab={authModalTab}
      />

      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

// Root Application with Multi-Link Routing & AuthProvider
export default function App() {
  const [tutors, setTutors] = useState(INITIAL_TUTORS);
  const [tuitionRequests, setTuitionRequests] = useState(INITIAL_TUITION_REQUESTS);

  const handleAddNewRequest = (newReq) => {
    setTuitionRequests([newReq, ...tuitionRequests]);
  };

  const handleApplyForTuition = (requestId) => {
    setTuitionRequests(tuitionRequests.map(r =>
      r.id === requestId ? { ...r, applicantsCount: r.applicantsCount + 1 } : r
    ));
  };

  return (
    <AuthProvider>
      <LearningProvider>
      <Routes>
        {/* 1. Public Website Route (Marketplace, Classes, Tuitions, AI, Quiz) */}
        <Route
          path="/"
          element={
            <MainWebsite
              tutors={tutors}
              tuitionRequests={tuitionRequests}
              onAddNewRequest={handleAddNewRequest}
              onApplyForTuition={handleApplyForTuition}
            />
          }
        />

        {/* 2. Central Portal Gateway Route */}
        <Route path="/portal" element={<PortalGateway />} />
        <Route path="/classroom" element={<VirtualClassroom />} />

        {/* 3. Dedicated Student Panel (Folder: src/panels/student/) - Direct links /student and /portal/student */}
        <Route path="/student" element={<StudentPanel />} />
        <Route path="/portal/student" element={<StudentPanel />} />

        {/* 4. Dedicated Teacher Panel (Folder: src/panels/teacher/) - Direct links /teacher and /portal/teacher */}
        <Route path="/teacher" element={<TeacherPanel />} />
        <Route path="/portal/teacher" element={<TeacherPanel />} />

        {/* 5. Dedicated Guardian Panel (Folder: src/panels/guardian/) - Direct links /guardian and /portal/guardian */}
        <Route path="/guardian" element={<GuardianPanel />} />
        <Route path="/portal/guardian" element={<GuardianPanel />} />

        {/* Fallback to main */}
        <Route
          path="*"
          element={
            <MainWebsite
              tutors={tutors}
              tuitionRequests={tuitionRequests}
              onAddNewRequest={handleAddNewRequest}
              onApplyForTuition={handleApplyForTuition}
            />
          }
        />
      </Routes>
      </LearningProvider>
    </AuthProvider>
  );
}
