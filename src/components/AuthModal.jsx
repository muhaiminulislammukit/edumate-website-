import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  GraduationCap,
  Users,
  UserCheck,
  Lock,
  Phone,
  Mail,
  User,
  Building,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_CLASSES, ALL_SUBJECTS, MEDIUMS, DISTRICTS } from '../data/mockData';
import { getLoginIdentifierData } from '../utils/authValidation';

export default function AuthModal({ isOpen, onClose, initialRole = 'student', initialTab = 'login' }) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'student' | 'teacher' | 'guardian'

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    gender: 'Male',
    // Teacher specific
    university: 'BUET',
    subject: 'Physics',
    expectedSalary: '৳6,000 - ৳8,000 / month',
    teachingMode: 'Home Tutor',
    location: 'Mirpur, Dhaka',
    // Student specific
    classLevel: 'Class 10',
    medium: 'Bangla Medium',
    school: 'Dhaka Residential Model College',
    // Guardian specific
    childrenCount: '2'
  });

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const identifier = getLoginIdentifierData(loginIdentifier);
    if (!identifier) {
      setLoginError('Enter a valid Bangladesh mobile number or email address.');
      return;
    }
    setLoginError('');
    login(selectedRole, identifier);
    onClose();
    if (selectedRole === 'student') navigate('/portal/student');
    else if (selectedRole === 'teacher') navigate('/portal/teacher');
    else if (selectedRole === 'guardian') navigate('/portal/guardian');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in required fields (Name & Phone)');
      return;
    }
    signup({
      name: formData.name,
      role: selectedRole,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@edumate.bd`,
      gender: formData.gender,
      // role specific
      university: formData.university,
      subjects: [formData.subject],
      monthlyRate: formData.expectedSalary,
      location: formData.location,
      classLevel: formData.classLevel,
      medium: formData.medium,
      institution: formData.school,
      childrenCount: Number(formData.childrenCount) || 1
    });
    onClose();
    if (selectedRole === 'student') navigate('/portal/student');
    else if (selectedRole === 'teacher') navigate('/portal/teacher');
    else if (selectedRole === 'guardian') navigate('/portal/guardian');
  };

  const roles = [
    { id: 'student', label: 'Student (শিক্ষার্থী)', icon: GraduationCap, color: '#4F46E5' },
    { id: 'teacher', label: 'Teacher (শিক্ষক / টিউটর)', icon: UserCheck, color: '#10B981' },
    { id: 'guardian', label: 'Guardian (অভিভাবক)', icon: Users, color: '#7C3AED' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: 0, overflow: 'hidden' }}
      >
        {/* Top Header */}
        <div style={{
          backgroundColor: '#0B1120',
          color: '#FFFFFF',
          padding: '1.75rem 2rem 1.25rem',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{
              fontSize: '0.7rem',
              backgroundColor: 'rgba(6, 182, 212, 0.2)',
              color: '#22D3EE',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontWeight: '700'
            }}>
              🇧🇩 EDUMATE360 AUTH
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF' }}>
            {activeTab === 'login' ? 'অ্যাকাউন্টে লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h2>
          <p style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: '2px' }}>
            {activeTab === 'login'
              ? 'আপনার ভূমিকা (Student, Teacher, Guardian) বেছে নিয়ে লগইন করুন।'
              : 'শিক্ষার্থী বা শিক্ষক হিসেবে রেজিস্টার করে সরাসরি প্ল্যাটফর্মে যোগ দিন।'}
          </p>

          {/* Toggle Login / Signup Tabs */}
          <div style={{
            display: 'flex',
            marginTop: '1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            padding: '0.3rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeTab === 'login' ? 'var(--primary)' : 'transparent',
                color: '#FFFFFF',
                fontWeight: activeTab === 'login' ? '700' : '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              লগইন (Log In)
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeTab === 'signup' ? 'var(--primary)' : 'transparent',
                color: '#FFFFFF',
                fontWeight: activeTab === 'signup' ? '700' : '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              সাইন আপ (Sign Up)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem 2rem' }}>
          {/* Role Selection Strip */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              ভূমিকা নির্বাচন করুন (Select Your Role):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.65rem 0.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid',
                      borderColor: isSelected ? r.color : 'var(--card-border)',
                      backgroundColor: isSelected ? `${r.color}10` : '#FFFFFF',
                      color: isSelected ? r.color : 'var(--text-main)',
                      fontWeight: isSelected ? '700' : '600',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={18} />
                    <span>{r.id.charAt(0).toUpperCase() + r.id.slice(1)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Log In Form */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Mobile Number or Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="e.g. 017XXXXXXXX or user@email.com"
                    value={loginIdentifier}
                    onChange={(e) => { setLoginIdentifier(e.target.value); setLoginError(''); }}
                    className="form-input"
                    style={{ paddingLeft: '2.4rem', height: '42px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.4rem', height: '42px' }}
                  />
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Demo only: login details are not verified by a server yet.
              </p>
              {loginError && <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem' }}>{loginError}</p>}

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  height: '46px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>লগইন করুন ({selectedRole.toUpperCase()})</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* Tab 2: Sign Up Form */
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Full Name (পুরো নাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed or Mukit Rahman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  style={{ height: '40px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    style={{ height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="form-select"
                    style={{ height: '40px' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {selectedRole === 'teacher' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                    👨🏫 Teacher Profile Credentials:
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
                      University / College (বিশ্ববিদ্যালয়)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BUET, Dhaka University, DMC"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="form-input"
                      style={{ height: '38px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
                        Primary Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="form-select"
                        style={{ height: '38px', fontSize: '0.825rem' }}
                      >
                        {ALL_SUBJECTS.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
                        Tuition Mode
                      </label>
                      <select
                        value={formData.teachingMode}
                        onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
                        className="form-select"
                        style={{ height: '38px', fontSize: '0.825rem' }}
                      >
                        <option value="Home Tutor">Home Tutor 🏠</option>
                        <option value="Online">Online 💻</option>
                        <option value="Both">Both (Home & Online)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'student' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                    🎓 Student Academic Info:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
                        Class (শ্রেণি)
                      </label>
                      <select
                        value={formData.classLevel}
                        onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                        className="form-select"
                        style={{ height: '38px', fontSize: '0.825rem' }}
                      >
                        {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>
                        Medium (মাধ্যম)
                      </label>
                      <select
                        value={formData.medium}
                        onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                        className="form-select"
                        style={{ height: '38px', fontSize: '0.825rem' }}
                      >
                        {MEDIUMS.map(m => <option key={m.id} value={m.label}>{m.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'guardian' && (
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                    Number of Children (সন্তানের সংখ্যা)
                  </label>
                  <select
                    value={formData.childrenCount}
                    onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                    className="form-select"
                    style={{ height: '38px', fontSize: '0.85rem' }}
                  >
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3+ Children</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  height: '46px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>রেজিস্ট্রেশন সম্পন্ন করুন (Register)</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
