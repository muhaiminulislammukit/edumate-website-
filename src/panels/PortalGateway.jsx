import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  UserCheck,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function PortalGateway() {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'student',
      title: 'Student Learning Panel',
      subtitle: 'শিক্ষার্থী ড্যাশবোর্ড',
      description: 'Access live classes, solve quizzes, submit homework, and chat with AI Tutor.',
      icon: GraduationCap,
      path: '/portal/student',
      color: '#4F46E5',
      badge: 'Class 1-12 & Admission',
      stats: '14,240 Enrolled'
    },
    {
      id: 'teacher',
      title: 'Teacher / Tutor Portal',
      subtitle: 'শিক্ষক প্যানেল',
      description: 'Accept tuition requests, conduct live classes, grade assignments, and withdraw earnings.',
      icon: UserCheck,
      path: '/portal/teacher',
      color: '#10B981',
      badge: 'Verified Mentors',
      stats: '2,340 Mentors'
    },
    {
      id: 'guardian',
      title: 'Guardian / Parent Portal',
      subtitle: 'অভিভাবক ড্যাশবোর্ড',
      description: 'Monitor child progress, track attendance, manage tuition routines, and pay fees via bKash.',
      icon: Users,
      path: '/portal/guardian',
      color: '#7C3AED',
      badge: 'Multi-Child Manager',
      stats: '48,000+ Parents'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Top Bar */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--card-border)',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <GraduationCap size={22} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)' }}>
            EduMate<span style={{ color: '#06B6D4' }}>360</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600' }}>
            <ArrowLeft size={16} />
            <span>Back to Main Website</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 1.5rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={13} />
            <span>Central Portal Gateway</span>
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--dark)', fontWeight: '800', marginBottom: '0.75rem' }}>
            আপনার নির্দিষ্ট প্যানেল নির্বাচন করুন
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            EduMate360-তে শিক্ষার্থী, শিক্ষক এবং অভিভাবকদের জন্য রয়েছে পৃথক ডেডিকেটেড ড্যাশবোর্ড।
          </p>
        </div>

        {/* 3 Core Role Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => navigate(p.path)}
                className="card-glass card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem',
                  border: '1.5px solid var(--card-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      backgroundColor: `${p.color}15`,
                      color: p.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={28} />
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: p.color,
                      backgroundColor: `${p.color}15`,
                      padding: '0.2rem 0.65rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.25rem' }}>
                    {p.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {p.subtitle}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {p.description}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {p.stats}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: p.color, fontWeight: '700', fontSize: '0.9rem' }}>
                    <span>প্যানেলে প্রবেশ করুন</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--card-border)' }}>
        © 2026 EduMate360 Bangladesh. All role panels isolated into dedicated sub-folders.
      </footer>
    </div>
  );
}
