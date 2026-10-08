import React from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Video,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  FileText,
  User,
  Flame,
  ArrowRight
} from 'lucide-react';
import { GAMIFICATION_BADGES } from '../data/mockData';

export default function StudentDashboard({ onJoinLiveClass, onOpenQuiz }) {
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

  const subjectsProgress = [
    { name: 'Physics (পদার্থবিজ্ঞান)', score: 91, color: '#4F46E5' },
    { name: 'Higher Mathematics (উচ্চতর গণিত)', score: 85, color: '#7C3AED' },
    { name: 'Chemistry (রসায়ন)', score: 78, color: '#06B6D4' },
    { name: 'English (ইংরেজি)', score: 72, color: '#F59E0B' }
  ];

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Student Profile Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0B1120 0%, #1E1B4B 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(6, 182, 212, 0.5)',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
              alt="Student"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF' }}>
                Welcome back, Mukit Rahman 👋
              </h2>
              <span className="badge badge-accent" style={{ fontSize: '0.75rem' }}>
                Class 10 (Science)
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Dhaka Residential Model College • SSC 2027 Batch • Roll: 14
            </p>
          </div>
        </div>

        {/* Streak & XP Gamification Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#F59E0B' }}>7 Days</div>
              <div style={{ fontSize: '0.7rem', color: '#CBD5E1', textTransform: 'uppercase' }}>Learning Streak</div>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#22D3EE' }}>1,850 XP</div>
            <div style={{ fontSize: '0.7rem', color: '#CBD5E1', textTransform: 'uppercase' }}>Top 5% Rank</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Classes & Progress */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '2rem'
      }} className="student-grid">
        <style>{`
          @media (max-width: 960px) {
            .student-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left Column: Upcoming Classes & Submissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Upcoming Live Classes Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700' }}>
                  Upcoming Live Classes
                </h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3 classes this week</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  style={{
                    backgroundColor: cls.isLiveSoon ? 'rgba(79, 70, 229, 0.04)' : '#F8FAFC',
                    border: '1px solid',
                    borderColor: cls.isLiveSoon ? 'rgba(79, 70, 229, 0.3)' : '#E2E8F0',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1rem', color: 'var(--dark)', fontWeight: '700' }}>
                        {cls.title}
                      </h4>
                      {cls.isLiveSoon && (
                        <span className="badge badge-live" style={{ fontSize: '0.65rem' }}>
                          Starting Soon
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>
                      {cls.tutor}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={13} /> {cls.time}
                      </span>
                      <span>• {cls.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={onJoinLiveClass}
                    className={cls.isLiveSoon ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Video size={14} />
                    <span>{cls.isLiveSoon ? 'Join Live Room' : 'Class Details'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Assignments & Homework */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700' }}>
                  Assignments & Homework
                </h3>
              </div>
              <span className="badge badge-warning">1 Pending</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                    Physics CQ Chapter 3: 5 Mathematical Board Problems
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: '600', marginTop: '2px' }}>
                    Deadline: Tomorrow at 11:59 PM
                  </div>
                </div>
                <button
                  onClick={() => alert('Assignment Upload modal: PDF / JPG upload simulation')}
                  className="btn btn-outline-primary btn-sm"
                >
                  Upload Solution
                </button>
              </div>

              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                    Higher Math Trigonometry Identity Practice Set
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>
                    Graded: 24/25 (Marks: 96%) • Teacher Feedback: "Excellent steps!"
                  </div>
                </div>
                <span className="badge badge-verified">Checked ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Progress & Gamification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Progress Tracker Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700' }}>
                  Academic Progress
                </h3>
              </div>
              <button onClick={onOpenQuiz} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                Take Quiz →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {subjectsProgress.map((sub) => (
                <div key={sub.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</span>
                    <span style={{ fontWeight: '700', color: sub.color }}>{sub.score}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${sub.score}%`,
                      height: '100%',
                      backgroundColor: sub.color,
                      borderRadius: '4px',
                      transition: 'width 0.8s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Badges Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Award size={20} color="#F59E0B" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700' }}>
                Achievements & Badges
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {GAMIFICATION_BADGES.map((b) => (
                <div
                  key={b.id}
                  style={{
                    backgroundColor: b.unlocked ? '#F8FAFC' : '#F1F5F9',
                    border: '1px solid',
                    borderColor: b.unlocked ? '#CBD5E1' : '#E2E8F0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    opacity: b.unlocked ? 1 : 0.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--dark)' }}>
                    {b.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {b.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
