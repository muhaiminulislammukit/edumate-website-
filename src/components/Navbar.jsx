import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Home,
  Video,
  Bot,
  FileCheck,
  BookOpen,
  Bell,
  UserCheck,
  User,
  Users,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  LogIn,
  LogOut,
  UserPlus,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  onOpenTuitionModal,
  onOpenPaymentModal,
  onOpenAuthModal
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Live Class Reminder', time: 'In 20 mins', text: 'Physics Chapter 3 with Engr. Tanvir', read: false },
    { id: 2, title: 'Tuition Request Update', time: '1 hr ago', text: 'Tutor Farhan Kabir applied to your Mirpur posting', read: false },
    { id: 3, title: 'Quiz Evaluated', time: '3 hrs ago', text: 'You scored 94% in Higher Math Chapter Test! 🏆', read: true }
  ];

  // Public roles only; administration runs as a separate app.
  const roles = [
    { id: 'student', label: 'Student View', icon: GraduationCap, badge: 'Class 10 Science', color: '#4F46E5', portalPath: '/portal/student' },
    { id: 'teacher', label: 'Teacher / Tutor', icon: UserCheck, badge: 'Verified Tutor ✓', color: '#10B981', portalPath: '/portal/teacher' },
    { id: 'guardian', label: 'Guardian / Parent', icon: Users, badge: '2 Children Added', color: '#7C3AED', portalPath: '/portal/guardian' }
  ];

  const currentRoleObj = roles.find(r => r.id === (user?.role || currentRole)) || roles[0];

  const navItems = [
    { id: 'tutors', label: 'Find Tutors', icon: Search },
    { id: 'home-tuitions', label: 'Home Tuitions', icon: Home, badge: 'Live' },
    { id: 'classroom', label: 'Online Classroom', icon: Video, badge: 'Live' },
    { id: 'ai-suite', label: 'AI Learning Suite', icon: Bot, isNew: true },
    { id: 'quiz', label: 'Mock Tests & Quiz', icon: FileCheck },
    { id: 'courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'dashboard', label: 'My Dashboard', icon: currentRoleObj.icon }
  ];

  const handlePortalNavigate = () => {
    if (user?.role === 'teacher') navigate('/portal/teacher');
    else if (user?.role === 'guardian') navigate('/portal/guardian');
    else navigate('/portal/student');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--card-border)',
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
    }}>
      {/* Top Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)',
        color: '#FFFFFF',
        padding: '0.4rem 1.5rem',
        fontSize: '0.8125rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.25)',
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '700'
          }}>
            🇧🇩 BANGLADESH
          </span>
          <span>Play Group to Class 12 & Admission: 14,000+ Verified Home & Online Tutors Ready!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
          <span>Hotline: 09612-EDUMATE</span>
          <span style={{ opacity: 0.8 }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
            Support Online (9 AM - 11 PM)
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => { setActiveTab('tutors'); navigate('/'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)'
          }}>
            <GraduationCap size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #0B1120 0%, #4F46E5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                EduMate<span style={{ color: '#06B6D4', WebkitTextFillColor: '#06B6D4' }}>360</span>
              </span>
              <span style={{
                fontSize: '0.625rem',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                color: '#0891B2',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                fontWeight: '700'
              }}>
                BD
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '-2px', fontWeight: '500' }}>
              Smart Tutoring & Learning Hub
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.35rem'
        }} className="desktop-nav">
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.18s ease'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.625rem',
                    backgroundColor: item.badge === 'Live' ? '#EF4444' : 'var(--accent)',
                    color: '#FFFFFF',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '10px',
                    fontWeight: '700'
                  }}>
                    {item.badge}
                  </span>
                )}
                {item.isNew && (
                  <span style={{
                    fontSize: '0.625rem',
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    color: '#FFFFFF',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '10px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Sparkles size={8} /> AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Auth State / User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F8FAFC',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-main)',
                position: 'relative'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#EF4444'
              }}></span>
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--card-border)',
                  padding: '0.75rem',
                  zIndex: 200
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--card-border)'
                }}>
                  <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Notifications (3)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                    Mark read
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: n.read ? '#F8FAFC' : 'rgba(79, 70, 229, 0.05)',
                      fontSize: '0.8125rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                        <span>{n.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                        {n.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Session Condition: Logged In vs Logged Out */}
          {user ? (
            /* Logged In User Pill with Dropdown */
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.3rem 0.75rem 0.3rem 0.35rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={user.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>
                    {user.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: user.role === 'teacher' ? '#059669' : 'var(--primary)', fontWeight: '700', textTransform: 'capitalize' }}>
                    {user.role}
                  </div>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--card-border)',
                  padding: '0.5rem',
                  zIndex: 200
                }}>
                  <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--dark)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user.email || user.phone}</div>
                  </div>

                  <div style={{ padding: '0.4rem 0' }}>
                    <button
                      onClick={() => { setUserDropdownOpen(false); handlePortalNavigate(); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 0.75rem',
                        border: 'none',
                        backgroundColor: 'rgba(79, 70, 229, 0.08)',
                        color: 'var(--primary)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '700',
                        fontSize: '0.825rem',
                        cursor: 'pointer',
                        marginBottom: '0.25rem'
                      }}
                    >
                      <currentRoleObj.icon size={16} />
                      <span>আমার প্যানেল (My Panel)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 0.75rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#DC2626',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        fontSize: '0.825rem',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={16} />
                      <span>লগআউট (Log Out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out: Show Log In & Sign Up Buttons */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => onOpenAuthModal('student', 'login')}
                className="btn btn-secondary btn-sm"
                style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <LogIn size={14} />
                <span>লগইন (Log In)</span>
              </button>
              <button
                onClick={() => onOpenAuthModal('student', 'signup')}
                className="btn btn-outline-primary btn-sm"
                style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <UserPlus size={14} />
                <span>সাইন আপ (Sign Up)</span>
              </button>
            </div>
          )}

          {/* Contextual Action Button: Teacher vs Student/Guardian */}
          {user?.role === 'teacher' ? (
            <button
              onClick={() => navigate('/portal/teacher')}
              className="btn btn-primary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                fontWeight: '700'
              }}
            >
              <PlusCircle size={15} />
              <span>+ টিউশন অফার পোস্ট করুন</span>
            </button>
          ) : (
            <button
              onClick={onOpenTuitionModal}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
            >
              <Home size={15} />
              <span>টিউশন রিকুয়েস্ট পোস্ট</span>
            </button>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--card-border)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--card-border)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
              </button>
            );
          })}

          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {user ? (
              <button
                onClick={() => { setMobileMenuOpen(false); handlePortalNavigate(); }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                আমার ড্যাশবোর্ড (My Panel)
              </button>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <button onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('student', 'login'); }} className="btn btn-secondary">
                  লগইন
                </button>
                <button onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('student', 'signup'); }} className="btn btn-primary">
                  সাইন আপ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
