import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Video,
  FileText,
  FileCheck,
  Bot,
  TrendingUp,
  Award,
  Bell,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Flame,
  Search,
  Upload,
  BookOpen,
  LogIn,
  UserPlus,
  Lock,
  Phone,
  Sparkles,
  LogOut
} from 'lucide-react';
import { GAMIFICATION_BADGES, ALL_CLASSES, MEDIUMS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import AILearningSuite from '../../components/AILearningSuite';
import { loadClassRecording } from '../../utils/recordingStore';
import { getLoginIdentifierData } from '../../utils/authValidation';

function RecordedClassPlayer({ videoId }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    let objectUrl = '';
    loadClassRecording(videoId)
      .then((blob) => {
        if (!isCurrent) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoUrl(objectUrl);
      })
      .catch((loadError) => {
        if (isCurrent) setError(loadError instanceof Error ? loadError.message : 'Could not load the recording.');
      });

    return () => {
      isCurrent = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [videoId]);

  if (error) return <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem' }}>{error}</p>;
  if (!videoUrl) return <p role="status" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Loading recording…</p>;
  return <video src={videoUrl} controls preload="metadata" style={{ width: '100%', marginTop: '0.75rem', borderRadius: 'var(--radius-md)' }} />;
}

export default function StudentPanel({ onJoinLiveClass, onOpenQuiz }) {
  const navigate = useNavigate();
  const { user, login, signup, logout } = useAuth();
  const { content } = useLearning();
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolledContent, setEnrolledContent] = useState([]);
  const [selectedRecordingId, setSelectedRecordingId] = useState(null);

  // Student Login / Signup state (if not logged in as student or switched to auth)
  const isStudentUser = user && user.role === 'student';
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [regData, setRegData] = useState({
    name: '',
    phone: '',
    classLevel: 'Class 10',
    medium: 'Bangla Medium',
    school: ''
  });

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const identifier = getLoginIdentifierData(loginPhone);
    if (!identifier) {
      setLoginError('Enter a valid Bangladesh mobile number or email address.');
      return;
    }
    setLoginError('');
    login('student', identifier);
  };

  const handleStudentSignup = (e) => {
    e.preventDefault();
    signup({
      name: regData.name || 'New Student',
      role: 'student',
      phone: regData.phone || '01700-123456',
      classLevel: regData.classLevel,
      medium: regData.medium,
      institution: regData.school || 'Dhaka College',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    });
  };

  const upcomingClasses = [
    {
      id: 1,
      title: 'Physics: Chapter 3 Force & Friction',
      tutor: 'Engr. Tanvir Ahmed (BUET)',
      time: 'Today at 7:00 PM',
      duration: '1 hr 30 mins',
      isLiveSoon: true
    },
    {
      id: 2,
      title: 'Higher Math: Coordinate Geometry',
      tutor: 'Engr. Tanvir Ahmed (BUET)',
      time: 'Tomorrow at 6:30 PM',
      duration: '1 hr 30 mins',
      isLiveSoon: false
    },
    {
      id: 3,
      title: 'Chemistry: Chemical Bonds & Periodic Properties',
      tutor: 'Dr. Nusrat Jahan (DMC)',
      time: 'Saturday at 5:00 PM',
      duration: '1 hr 15 mins',
      isLiveSoon: false
    }
  ];

  const myTutors = [
    {
      id: 'tut-1',
      name: 'Engr. Tanvir Ahmed',
      university: 'BUET (EEE)',
      subjects: ['Physics', 'Higher Math'],
      schedule: 'Sat, Mon, Wed 7:00 PM',
      nextClass: 'Today at 7:00 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'tut-2',
      name: 'Dr. Nusrat Jahan',
      university: 'Dhaka Medical College (DMC)',
      subjects: ['Biology', 'Chemistry'],
      schedule: 'Sun, Tue, Thu 6:00 PM',
      nextClass: 'Sunday at 6:00 PM',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const subjectsProgress = [
    { name: 'Physics (পদার্থবিজ্ঞান)', score: 91, color: '#4F46E5', grade: 'A+' },
    { name: 'Higher Mathematics (উচ্চতর গণিত)', score: 85, color: '#7C3AED', grade: 'A+' },
    { name: 'Chemistry (রসায়ন)', score: 78, color: '#06B6D4', grade: 'A' },
    { name: 'English (ইংরেজি)', score: 72, color: '#F59E0B', grade: 'A-' }
  ];

  // If not logged in as student, show the Student Login & Registration view!
  if (!isStudentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--card-border)',
          padding: '1.25rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <GraduationCap size={24} />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)' }}>
              EduMate<span style={{ color: '#06B6D4' }}>360</span> — Student Portal
            </span>
          </Link>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} /> <span>Back to Main Website</span>
          </Link>
        </header>

        <main style={{ maxWidth: '480px', margin: '3rem auto', width: '100%', padding: '0 1.5rem' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1.5px solid var(--card-border)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <GraduationCap size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--dark)' }}>
                {authMode === 'login' ? 'Student Login' : 'Student Registration'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                শিক্ষার্থী প্যানেলে প্রবেশ করে লাইভ ক্লাস, কুইজ ও হোমওয়ার্ক সাবমিট করুন।
              </p>
            </div>

            {/* Tab switch */}
            <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setAuthMode('login')}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: authMode === 'login' ? '#FFFFFF' : 'transparent',
                  color: authMode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: authMode === 'login' ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: authMode === 'signup' ? '#FFFFFF' : 'transparent',
                  color: authMode === 'signup' ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: authMode === 'signup' ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleStudentLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Mobile Number or Email</label>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Password</label>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="form-input"
                  />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  Demo only: login details are not verified by a server yet.
                </p>
                {loginError && <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem' }}>{loginError}</p>}
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Log In to Student Panel
                </button>
              </form>
            ) : (
              <form onSubmit={handleStudentSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mukit Rahman"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="form-input"
                    style={{ height: '38px' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Class</label>
                    <select
                      value={regData.classLevel}
                      onChange={(e) => setRegData({ ...regData, classLevel: e.target.value })}
                      className="form-select"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    >
                      {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Medium</label>
                    <select
                      value={regData.medium}
                      onChange={(e) => setRegData({ ...regData, medium: e.target.value })}
                      className="form-select"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    >
                      {MEDIUMS.map(m => <option key={m.id} value={m.label}>{m.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="form-input"
                    style={{ height: '38px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Register as Student
                </button>
              </form>
            )}
          </div>
        </main>

        <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 EduMate360 Bangladesh. Student Learning System.
        </footer>
      </div>
    );
  }

  // Logged-in Student Dashboard View
  const studentName = user?.name || 'Mukit Rahman';
  const studentClass = user?.classLevel || 'Class 10 (Science)';
  const studentSchool = user?.institution || 'Dhaka Residential Model College';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: '#0B1120',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        borderRight: '1px solid #1E293B',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <div>
          {/* Brand header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                EduMate<span style={{ color: '#06B6D4' }}>360</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '600' }}>
                Student Learning Panel
              </div>
            </div>
          </div>

          {/* Student Profile Quick View */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'}
              alt="Student"
              style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {studentName}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#22D3EE' }}>{studentClass}</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'tutors', label: 'My Tutors', icon: Users },
              { id: 'classes', label: 'Live Classes & Routine', icon: Video, badge: 'Live' },
              { id: 'ai', label: 'AI Study Tools', icon: Bot, badge: 'AI' },
              { id: 'learning', label: 'Courses & Recordings', icon: BookOpen },
              { id: 'assignments', label: 'Assignments & Notes', icon: FileText },
              { id: 'progress', label: 'Progress & Grade Sheet', icon: TrendingUp },
              { id: 'achievements', label: 'Streak & Badges', icon: Award }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={18} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      backgroundColor: '#EF4444',
                      color: '#FFF',
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '10px',
                      fontWeight: '700'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => { logout(); navigate('/'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#EF4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            <span>Log Out (লগআউট)</span>
          </button>

          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={16} />
            <span>Exit to Main Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--card-border)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div>
            <h1 style={{ fontSize: '1.35rem', color: 'var(--dark)', fontWeight: '800' }}>
              Student Control Panel
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {studentSchool} • {studentClass}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              color: '#B45309',
              fontWeight: '700',
              fontSize: '0.825rem'
            }}>
              <Flame size={16} color="#F59E0B" />
              <span>7 Days Streak 🔥</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--primary)',
              fontWeight: '700',
              fontSize: '0.825rem'
            }}>
              <span>1,850 XP</span>
            </div>

            <Link to="/" className="btn btn-secondary btn-sm">
              Explore Tutors
            </Link>
          </div>
        </header>

        {/* Dynamic Sub-View Content */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {/* 1. Overview */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Welcome card */}
              <div style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                color: '#FFFFFF',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.4rem' }}>
                    Hello, {studentName}! Ready to learn today?
                  </h2>
                  <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                    You have 1 live class scheduled for today at 7:00 PM with Engr. Tanvir Ahmed (Physics).
                  </p>
                </div>
                <button
                  onClick={() => navigate('/classroom')}
                  className="btn"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--primary)', fontWeight: '700' }}
                >
                  Join Live Room
                </button>
              </div>

              {/* Grid: Upcoming Classes & Quick Progress */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', fontWeight: '700', marginBottom: '1.25rem' }}>
                    Upcoming Classes
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {upcomingClasses.map((cls) => (
                      <div key={cls.id} style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '700', color: 'var(--dark)', fontSize: '0.95rem' }}>{cls.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>{cls.tutor}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{cls.time}</div>
                        </div>
                        <span className="badge badge-primary">{cls.isLiveSoon ? 'Today' : 'Upcoming'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', fontWeight: '700', marginBottom: '1.25rem' }}>
                    Subject Progress & Grades
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {subjectsProgress.map((sub) => (
                      <div key={sub.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: '600' }}>{sub.name}</span>
                          <span style={{ fontWeight: '700', color: sub.color }}>{sub.score}% ({sub.grade})</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${sub.score}%`, height: '100%', backgroundColor: sub.color, borderRadius: '4px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. My Tutors */}
          {activeTab === 'tutors' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>My Hired Tutors</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified teachers currently assigned to your study routine.</p>
                </div>
                <Link to="/" className="btn btn-primary btn-sm">+ Find Another Tutor</Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {myTutors.map((tut) => (
                  <div key={tut.id} style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={tut.avatar} alt={tut.name} style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--dark)' }}>{tut.name}</h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>{tut.university}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tut.subjects.join(', ')}</div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
                      <div><strong>Routine:</strong> {tut.schedule}</div>
                      <div><strong>Next Session:</strong> {tut.nextClass}</div>
                    </div>
                    <button onClick={() => alert(`Starting Chat with ${tut.name}`)} className="btn btn-secondary btn-sm">
                      Send Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Live Classes */}
          {activeTab === 'classes' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                Class Schedule & Virtual Classroom
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcomingClasses.map((c) => (
                  <div key={c.id} style={{
                    backgroundColor: '#F8FAFC',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{c.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{c.tutor} • {c.time}</p>
                    </div>
                    <button onClick={() => navigate('/classroom')} className={c.isLiveSoon ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}>
                      {c.isLiveSoon ? 'Enter Live Room' : 'View Details'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <AILearningSuite />
          )}

          {activeTab === 'learning' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>My Courses & Recorded Classes</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Teacher-published content approved by EduMate360. Enrollment and playback are demo workflows.
                </p>
              </div>
              {content.filter((item) => item.status === 'approved').length === 0 ? (
                <div className="card-glass" style={{ padding: '2rem' }}>There are no published lessons yet.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {content.filter((item) => item.status === 'approved').map((item) => {
                    const enrolled = enrolledContent.includes(item.id);
                    return (
                      <article key={item.id} className="card-glass" style={{ padding: '1.25rem' }}>
                        <span className={`badge ${item.type === 'recording' ? 'badge-accent' : 'badge-primary'}`}>
                          {item.type === 'recording' ? 'Recorded lesson' : 'Course'}
                        </span>
                        <h3 style={{ fontSize: '1.05rem', margin: '0.75rem 0 0.35rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                          {item.subject} · {item.classLevel}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
                          Teacher: {item.instructor || 'EduMate360 Mentor'}
                          {item.price > 0 ? ` · ৳${Number(item.price).toLocaleString()}` : ' · Free'}
                        </p>
                        {item.type === 'recording' && item.videoUrl ? (
                          <a href={item.videoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                            Watch recording
                          </a>
                        ) : item.type === 'recording' && item.videoId ? (
                          <div>
                            <button
                              onClick={() => setSelectedRecordingId(selectedRecordingId === item.id ? null : item.id)}
                              className="btn btn-primary btn-sm"
                            >
                              {selectedRecordingId === item.id ? 'Close recording' : 'Watch recording'}
                            </button>
                            {selectedRecordingId === item.id && <RecordedClassPlayer videoId={item.videoId} />}
                          </div>
                        ) : enrolled ? (
                          <button onClick={() => navigate('/classroom')} className="btn btn-primary btn-sm">
                            Open learning room
                          </button>
                        ) : (
                          <button
                            onClick={() => setEnrolledContent((current) => [...current, item.id])}
                            className="btn btn-primary btn-sm"
                          >
                            {item.price > 0 ? 'Enroll (demo)' : 'Add to my learning'}
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 4. Assignments */}
          {activeTab === 'assignments' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>
                Homework & Assignment Submissions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: '700', fontSize: '1rem' }}>Physics Chapter 3: Force & Friction 5 Creative Problems</h4>
                    <p style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '600' }}>Due Date: Tomorrow, 11:59 PM</p>
                  </div>
                  <button onClick={() => alert('PDF Upload simulation')} className="btn btn-primary btn-sm">
                    Upload Solution PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. Progress */}
          {activeTab === 'progress' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>
                Academic Progress & Grade Sheet
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Score</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>84.5%</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Overall GPA: 5.00 (Golden A+)</div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Achievements */}
          {activeTab === 'achievements' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>
                Gamification Badges & Leaderboard
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {GAMIFICATION_BADGES.map((b) => (
                  <div key={b.id} style={{ backgroundColor: b.unlocked ? '#F8FAFC' : '#F1F5F9', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid #E2E8F0', opacity: b.unlocked ? 1 : 0.6 }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                    <h4 style={{ fontWeight: '700', fontSize: '1rem' }}>{b.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
