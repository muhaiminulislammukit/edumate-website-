import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  DollarSign,
  LogIn,
  UserPlus,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { GUARDIAN_CHILDREN } from '../../data/mockData';
import PaymentModal from '../../components/PaymentModal';
import { useAuth } from '../../context/AuthContext';
import { getLoginIdentifierData } from '../../utils/authValidation';

export default function GuardianPanel() {
  const navigate = useNavigate();
  const { user, login, signup, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChildId, setSelectedChildId] = useState(GUARDIAN_CHILDREN[0].id);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({ title: 'Tuition Fee Payment', amount: 5000 });

  // Guardian Auth state if not logged in
  const isGuardianUser = user && user.role === 'guardian';
  const [authMode, setAuthMode] = useState('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [regData, setRegData] = useState({ name: '', phone: '', childrenCount: 2, location: 'Dhanmondi, Dhaka' });

  const activeChild = GUARDIAN_CHILDREN.find(c => c.id === selectedChildId) || GUARDIAN_CHILDREN[0];

  const handleGuardianLogin = (e) => {
    e.preventDefault();
    const identifier = getLoginIdentifierData(loginPhone);
    if (!identifier) {
      setLoginError('Enter a valid Bangladesh mobile number or email address.');
      return;
    }
    setLoginError('');
    login('guardian', identifier);
  };

  const handleGuardianSignup = (e) => {
    e.preventDefault();
    signup({
      name: regData.name || 'New Guardian',
      role: 'guardian',
      phone: regData.phone || '01800-112233',
      childrenCount: Number(regData.childrenCount) || 1,
      location: regData.location,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    });
  };

  const handlePay = (amount, childName) => {
    setPaymentData({
      title: `Monthly Tuition Fee for ${childName}`,
      amount: amount
    });
    setPaymentModalOpen(true);
  };

  // If not logged in as Guardian, show Guardian Login / Signup View
  if (!isGuardianUser) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Users size={24} />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)' }}>
              EduMate<span style={{ color: '#06B6D4' }}>360</span> — Guardian Portal
            </span>
          </Link>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} /> <span>Back to Main Website</span>
          </Link>
        </header>

        <main style={{ maxWidth: '480px', margin: '3rem auto', width: '100%', padding: '0 1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1.5px solid var(--card-border)', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Users size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--dark)' }}>
                {authMode === 'login' ? 'Guardian Login' : 'Guardian Registration'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                সন্তানের পড়াশোনার অগ্রগতি, ক্লাসে উপস্থিতি ও টিউশন ফি ট্র্যাক করুন।
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
                  color: authMode === 'login' ? 'var(--secondary)' : 'var(--text-muted)',
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
                  color: authMode === 'signup' ? 'var(--secondary)' : 'var(--text-muted)',
                  fontWeight: authMode === 'signup' ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleGuardianLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Mobile Number or Email</label>
                  <input type="text" required autoComplete="username" value={loginPhone} onChange={(e) => { setLoginPhone(e.target.value); setLoginError(''); }} className="form-input" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Password</label>
                  <input type="password" required autoComplete="current-password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="form-input" />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  Demo only: login details are not verified by a server yet.
                </p>
                {loginError && <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem' }}>{loginError}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}>
                  Log In to Guardian Panel
                </button>
              </form>
            ) : (
              <form onSubmit={handleGuardianSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Guardian Name *</label>
                  <input type="text" required placeholder="e.g. Engr. Mizanur Rahman" value={regData.name} onChange={(e) => setRegData({ ...regData, name: e.target.value })} className="form-input" style={{ height: '38px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Mobile Number *</label>
                  <input type="text" required placeholder="018XXXXXXXX" value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} className="form-input" style={{ height: '38px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Number of Children</label>
                    <select value={regData.childrenCount} onChange={(e) => setRegData({ ...regData, childrenCount: e.target.value })} className="form-select" style={{ height: '38px', fontSize: '0.8rem' }}>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3">3+ Children</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Location</label>
                    <input type="text" placeholder="e.g. Dhanmondi, Dhaka" value={regData.location} onChange={(e) => setRegData({ ...regData, location: e.target.value })} className="form-input" style={{ height: '38px' }} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}>
                  Register as Guardian
                </button>
              </form>
            )}
          </div>
        </main>

        <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 EduMate360 Bangladesh. Guardian System.
        </footer>
      </div>
    );
  }

  // Logged-in Guardian Dashboard View
  const guardianName = user?.name || 'Engr. Mizanur Rahman';

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                EduMate<span style={{ color: '#06B6D4' }}>360</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#C4B5FD', fontWeight: '700' }}>
                GUARDIAN / PARENT PORTAL
              </div>
            </div>
          </div>

          {/* Child Switcher in Sidebar */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.5rem' }}>
              Select Child Profile
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {GUARDIAN_CHILDREN.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: selectedChildId === child.id ? 'var(--secondary)' : 'transparent',
                    color: '#FFFFFF',
                    fontWeight: selectedChildId === child.id ? '700' : '500',
                    fontSize: '0.825rem',
                    cursor: 'pointer'
                  }}
                >
                  <span>{child.name}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{child.classLevel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { id: 'overview', label: 'Parent Overview', icon: LayoutDashboard },
              { id: 'progress', label: 'Academic Progress', icon: TrendingUp },
              { id: 'tutors', label: 'Assigned Mentors', icon: Users },
              { id: 'payments', label: 'Tuition Payments', icon: CreditCard },
              { id: 'complaints', label: 'Complaints & Support', icon: AlertTriangle }
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
                    backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
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
              Guardian Portal — {activeChild.name}
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Parent: {guardianName} • {activeChild.school}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeChild.pendingDues > 0 ? (
              <button
                onClick={() => handlePay(activeChild.pendingDues, activeChild.name)}
                className="btn btn-primary btn-sm"
              >
                Pay ৳{activeChild.pendingDues} Due Fee
              </button>
            ) : (
              <span className="badge badge-verified">All Dues Paid ✓</span>
            )}
            <Link to="/" className="btn btn-secondary btn-sm">Find New Tutor</Link>
          </div>
        </header>

        {/* Dynamic Sub-View Content */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {/* Overview */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Attendance Rate</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981', marginTop: '0.25rem' }}>{activeChild.attendance}</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Very Consistent</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Assigned Mentors</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginTop: '0.25rem' }}>{activeChild.tutorsAssigned.length} Tutors</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Home & Online</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Tuition Fee Dues</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: activeChild.pendingDues > 0 ? '#D97706' : '#10B981', marginTop: '0.25rem' }}>
                    {activeChild.pendingDues > 0 ? `৳${activeChild.pendingDues}` : '৳0 (Paid)'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>bKash / Nagad Supported</div>
                </div>
              </div>

              {/* Progress & Tutors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem' }}>Subject Performance</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {activeChild.subjectsProgress.map((sub) => (
                      <div key={sub.subject}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: '600' }}>{sub.subject}</span>
                          <span style={{ fontWeight: '700' }}>{sub.score}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${sub.score}%`, height: '100%', backgroundColor: sub.score >= 85 ? '#10B981' : '#4F46E5', borderRadius: '4px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem' }}>Current Tutors</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {activeChild.tutorsAssigned.map((t, idx) => (
                      <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{t.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>{t.subject}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.schedule}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments */}
          {activeTab === 'payments' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1rem' }}>Tuition Fee Billing & Invoices</h2>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Monthly Tuition Bill — {activeChild.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Due Date: 1st of the month</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>৳{activeChild.pendingDues > 0 ? activeChild.pendingDues : 5000}</div>
                  <button onClick={() => handlePay(5000, activeChild.name)} className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
                    Pay via bKash / Nagad
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Complaints */}
          {activeTab === 'complaints' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Submit Complaint to Admin</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                If you have any issues with tutor punctuality, teaching quality, or behavior, our admin team investigates within 24 hours.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Complaint submitted! Admin will investigate.'); }}>
                <textarea rows={4} required placeholder="Describe the issue with the tutor or class..." className="form-textarea" style={{ marginBottom: '1rem' }} />
                <button type="submit" className="btn btn-primary">Submit Complaint Ticket</button>
              </form>
            </div>
          )}
        </div>
      </main>

      <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} paymentData={paymentData} />
    </div>
  );
}
