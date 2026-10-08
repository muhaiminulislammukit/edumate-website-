import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCheck,
  LayoutDashboard,
  Users,
  Video,
  DollarSign,
  FileText,
  ShieldCheck,
  Bell,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  CreditCard,
  Award,
  Search,
  MapPin,
  Send,
  Sparkles,
  BookOpen,
  LogIn,
  UserPlus,
  Lock,
  Phone,
  LogOut
} from 'lucide-react';
import { ALL_CLASSES, ALL_SUBJECTS, DISTRICTS, MEDIUMS, INITIAL_TUITION_REQUESTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { getLoginIdentifierData } from '../../utils/authValidation';

export default function TeacherPanel() {
  const navigate = useNavigate();
  const { user, login, signup, logout } = useAuth();
  const { content, publishContent } = useLearning();
  const [activeTab, setActiveTab] = useState('overview');
  const [newLearningItem, setNewLearningItem] = useState({
    type: 'course',
    title: '',
    classLevel: 'Class 10',
    subject: 'Physics (পদার্থবিজ্ঞান)',
    price: '0',
    videoUrl: ''
  });
  const [contentNotice, setContentNotice] = useState('');

  // Check if logged in as teacher
  const isTeacherUser = user && user.role === 'teacher';
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [regData, setRegData] = useState({
    name: '',
    phone: '',
    university: 'BUET',
    subject: 'Electrical & Electronic Engineering (EEE)',
    experience: '4 Years',
    location: 'Mirpur, Dhaka',
    hourlyFee: '7000',
    teachingMode: 'Home Tutor & Online Live'
  });

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    const identifier = getLoginIdentifierData(loginPhone);
    if (!identifier) {
      setLoginError('Enter a valid Bangladesh mobile number or email address.');
      return;
    }
    setLoginError('');
    login('teacher', identifier);
  };

  const handleTeacherSignup = (e) => {
    e.preventDefault();
    signup({
      name: regData.name || 'New Teacher Mentor',
      role: 'teacher',
      phone: regData.phone || '01712-998877',
      university: regData.university,
      department: regData.subject,
      experience: regData.experience,
      location: regData.location,
      hourlyFee: Number(regData.hourlyFee) || 7000,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    });
  };

  // Teacher earnings
  const [earnings, setEarnings] = useState(38500);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('20000');
  const [withdrawMethod, setWithdrawMethod] = useState('bKash');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Teacher's posted tuition offers
  const [myTuitionOffers, setMyTuitionOffers] = useState([
    {
      id: 'offer-1',
      title: 'HSC & SSC Physics Special Numerical Problem Solving Batch',
      classLevel: 'Class 10 & HSC Batch',
      subject: 'Physics (পদার্থবিজ্ঞান)',
      location: 'Mirpur-10 & Online Live',
      mode: 'Home Tutor & Online',
      fee: '৳7,000 / month',
      schedule: 'Sat, Mon, Wed (7:00 PM - 8:30 PM)',
      enrolled: 4,
      status: 'Active'
    },
    {
      id: 'offer-2',
      title: 'Class 9 Higher Mathematics Foundation Batch',
      classLevel: 'Class 9',
      subject: 'Higher Mathematics (উচ্চতর গণিত)',
      location: 'Dhanmondi Road 12 & Online',
      mode: 'Home Tutor',
      fee: '৳6,500 / month',
      schedule: 'Sun, Tue, Thu (6:00 PM - 7:30 PM)',
      enrolled: 2,
      status: 'Active'
    }
  ]);

  // Modal to Post New Tuition Offer
  const [showPostOfferModal, setShowPostOfferModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    classLevel: 'Class 10',
    subject: 'Physics (পদার্থবিজ্ঞান)',
    location: 'Mirpur, Dhaka',
    mode: 'Home Tutor',
    fee: '৳7,000 / month',
    schedule: '3 days/week (Evening)',
    description: ''
  });

  // Browse Guardian Requests (Student Vacancies)
  const [studentRequests, setStudentRequests] = useState(INITIAL_TUITION_REQUESTS);
  const [searchArea, setSearchArea] = useState('All');
  const [appliedRequestIds, setAppliedRequestIds] = useState([]);

  // Inquiries received
  const [tuitionInquiries, setTuitionInquiries] = useState([
    {
      id: 1,
      guardian: 'Mrs. Selina Akhter',
      studentClass: 'Class 10 (SSC 2027)',
      subject: 'Physics & Higher Mathematics',
      location: 'Mirpur DOHS, Dhaka',
      offeredSalary: '৳7,000 / month',
      days: '3 days/week',
      status: 'pending'
    },
    {
      id: 2,
      guardian: 'Advocate Mahbubur Rahman',
      studentClass: 'Class 8 (Junior)',
      subject: 'Mathematics & Science',
      location: 'Dhanmondi Road 12, Dhaka',
      offeredSalary: '৳8,000 / month',
      days: '4 days/week',
      status: 'pending'
    }
  ]);

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (!newOffer.title) {
      alert('Please enter a title for your tuition offer');
      return;
    }
    const created = {
      id: `offer-${Date.now()}`,
      ...newOffer,
      enrolled: 0,
      status: 'Active'
    };
    setMyTuitionOffers([created, ...myTuitionOffers]);
    setShowPostOfferModal(false);
    setNewOffer({
      title: '',
      classLevel: 'Class 10',
      subject: 'Physics (পদার্থবিজ্ঞান)',
      location: 'Mirpur, Dhaka',
      mode: 'Home Tutor',
      fee: '৳7,000 / month',
      schedule: '3 days/week (Evening)',
      description: ''
    });
  };

  const handleApplyToStudent = (requestId) => {
    setAppliedRequestIds([...appliedRequestIds, requestId]);
  };

  const handleAccept = (id) => {
    setTuitionInquiries(tuitionInquiries.map(item => item.id === id ? { ...item, status: 'accepted' } : item));
  };

  const handleDecline = (id) => {
    setTuitionInquiries(tuitionInquiries.filter(item => item.id !== id));
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (amt > earnings) {
      alert('Insufficient balance');
      return;
    }
    setEarnings(earnings - amt);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
    }, 1500);
  };

  const teacherName = user?.name || 'Engr. Tanvir Ahmed';
  const teacherUni = user?.university || 'BUET (Electrical & Electronic Eng.)';
  const myLearningContent = content.filter((item) => item.instructor === teacherName);

  const handlePublishLearningContent = (event) => {
    event.preventDefault();
    const price = Number(newLearningItem.price);
    if (!Number.isFinite(price) || price < 0) {
      setContentNotice('Enter a valid price of 0 or more.');
      return;
    }

    if (newLearningItem.type === 'recording') {
      try {
        const videoUrl = new URL(newLearningItem.videoUrl);
        if (!['https:', 'http:'].includes(videoUrl.protocol)) throw new Error('Invalid video URL protocol.');
      } catch {
        setContentNotice('Add a valid http or https recording link.');
        return;
      }
    }

    publishContent({
      ...newLearningItem,
      price,
      originalPrice: price,
      instructor: teacherName,
      classesCount: 0,
      studentsEnrolled: 0,
      rating: 0,
      tag: newLearningItem.type === 'recording' ? 'Recorded lesson' : 'Teacher submitted'
    });
    setNewLearningItem({ type: 'course', title: '', classLevel: 'Class 10', subject: 'Physics (পদার্থবিজ্ঞান)', price: '0', videoUrl: '' });
    setContentNotice('Submitted for admin review. Students can access it after approval.');
  };

  // If not logged in as Teacher, render the Teacher Login / Sign Up portal screen
  if (!isTeacherUser) {
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
              background: 'linear-gradient(135deg, #10B981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <UserCheck size={24} />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)' }}>
              EduMate<span style={{ color: '#06B6D4' }}>360</span> — Teacher / Tutor Portal
            </span>
          </Link>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} /> <span>Back to Main Website</span>
          </Link>
        </header>

        <main style={{ maxWidth: '520px', margin: '3rem auto', width: '100%', padding: '0 1.5rem' }}>
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
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <UserCheck size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--dark)' }}>
                {authMode === 'login' ? 'Teacher / Tutor Login' : 'Teacher Registration (শিক্ষক নিবন্ধন)'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                টিউটর প্যানেলে প্রবেশ করে টিউশন অফার পোস্ট করুন, স্টুডেন্ট শূন্যপদ খুঁজুন ও মাসিক আয় ট্র্যাক করুন।
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
                  color: authMode === 'login' ? '#059669' : 'var(--text-muted)',
                  fontWeight: authMode === 'login' ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                লগইন (Log In)
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: authMode === 'signup' ? '#FFFFFF' : 'transparent',
                  color: authMode === 'signup' ? '#059669' : 'var(--text-muted)',
                  fontWeight: authMode === 'signup' ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                শিক্ষক নিবন্ধন (Sign Up)
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleTeacherLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', backgroundColor: '#10B981', borderColor: '#10B981', fontWeight: '700' }}>
                  Log In to Teacher Panel
                </button>
              </form>
            ) : (
              <form onSubmit={handleTeacherSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>শিক্ষকের নাম (Full Name) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Tanvir Ahmed"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="form-input"
                    style={{ height: '38px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>মোবাইল নম্বর (Phone) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="017xxxxxxxx"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="form-input"
                    style={{ height: '38px' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>বিশ্ববিদ্যালয় (University)</label>
                    <input
                      type="text"
                      placeholder="e.g. BUET / DU / DMC"
                      value={regData.university}
                      onChange={(e) => setRegData({ ...regData, university: e.target.value })}
                      className="form-input"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>বিভাগ (Subject/Dept)</label>
                    <input
                      type="text"
                      placeholder="e.g. EEE, Physics"
                      value={regData.subject}
                      onChange={(e) => setRegData({ ...regData, subject: e.target.value })}
                      className="form-input"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>এলাকা (Tuition Area)</label>
                    <input
                      type="text"
                      placeholder="e.g. Mirpur, Dhaka"
                      value={regData.location}
                      onChange={(e) => setRegData({ ...regData, location: e.target.value })}
                      className="form-input"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>সম্মানী (Monthly Fee)</label>
                    <input
                      type="text"
                      placeholder="e.g. 7000"
                      value={regData.hourlyFee}
                      onChange={(e) => setRegData({ ...regData, hourlyFee: e.target.value })}
                      className="form-input"
                      style={{ height: '38px', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '2px' }}>পড়ানোর মাধ্যম (Preferred Mode)</label>
                  <select
                    value={regData.teachingMode}
                    onChange={(e) => setRegData({ ...regData, teachingMode: e.target.value })}
                    className="form-select"
                    style={{ height: '38px', fontSize: '0.8rem' }}
                  >
                    <option value="Home Tutor & Online Live">হোম টিউটর ও অনলাইন লাইভ উভয়ই</option>
                    <option value="Home Tutor Only">শুধুমাত্র হোম টিউটর (Home Tutor)</option>
                    <option value="Online Live Only">শুধুমাত্র অনলাইন লাইভ (Online)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', backgroundColor: '#10B981', borderColor: '#10B981', fontWeight: '700' }}>
                  রেজিস্ট্রেশন ও শিক্ষক একাউন্ট তৈরি করুন
                </button>
              </form>
            )}
          </div>
        </main>

        <footer style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          EduMate360 Teacher & Tutor Platform • Bangladesh
        </footer>
      </div>
    );
  }

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
              background: 'linear-gradient(135deg, #10B981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <UserCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                EduMate<span style={{ color: '#06B6D4' }}>360</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: '700' }}>
                TEACHER / TUTOR PORTAL
              </div>
            </div>
          </div>

          {/* Teacher Profile Quick View */}
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
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
              alt="Teacher"
              style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {teacherName}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600' }}>Verified Mentor ✓</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'my-offers', label: 'My Tuition Posts (অফার)', icon: PlusCircle, badge: `${myTuitionOffers.length} Active` },
              { id: 'find-students', label: 'Find Students (টিউশন খুঁজুন)', icon: Search, badge: 'Vacancies' },
              { id: 'students', label: 'My Enrolled Students (24)', icon: Users },
              { id: 'classes', label: 'Live Schedule & Classes', icon: Video, badge: 'Today: 3' },
              { id: 'content', label: 'Courses & Recordings', icon: BookOpen, badge: `${myLearningContent.length}` },
              { id: 'inquiries', label: 'Guardian Inquiries', icon: DollarSign, badge: '2 New' },
              { id: 'earnings', label: 'Earnings & Withdraw', icon: CreditCard },
              { id: 'verification', label: 'NID & Certificates', icon: ShieldCheck }
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
                    padding: '0.7rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: isActive ? '#10B981' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={17} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255, 255, 255, 0.15)',
                      color: '#FFF',
                      fontSize: '0.625rem',
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

        {/* Back to Website Link */}
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
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.825rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
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
              fontSize: '0.825rem',
              padding: '0.5rem 0.85rem'
            }}
          >
            <ArrowLeft size={14} />
            <span>Go to Main Website</span>
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
              Teacher Management Portal
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {teacherUni} • Physics & Higher Math Mentor
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Quick Action: Post Tuition Offer */}
            <button
              onClick={() => setShowPostOfferModal(true)}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #10B981, #059669)' }}
            >
              <PlusCircle size={15} />
              <span>টিউশন অফার পোস্ট করুন (Post Offer)</span>
            </button>

            <div style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              color: '#065F46',
              fontWeight: '800',
              fontSize: '0.825rem'
            }}>
              Earnings: ৳{earnings.toLocaleString()}
            </div>
          </div>
        </header>

        {/* Dynamic Sub-View Content */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {/* 1. Overview */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Teacher Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Students</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginTop: '0.25rem' }}>24 Students</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>● 16 Home + 8 Online</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Tuition Posts</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981', marginTop: '0.25rem' }}>{myTuitionOffers.length} Batches</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offers Open</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Monthly Payout</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0891B2', marginTop: '0.25rem' }}>৳{earnings.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Escrow Protected</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Rating Score</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#D97706', marginTop: '0.25rem' }}>4.9 ⭐</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From 38 reviews</div>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div style={{
                background: 'linear-gradient(135deg, #0B1120 0%, #1E1B4B 100%)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem 2rem',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                    শিক্ষার্থীদের জন্য আপনার নতুন টিউশন ব্যাচ পোস্ট করুন
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    আপনি কোন ক্লাস, বিষয় ও এলাকায় পড়াতে চান উল্লেখ করে পোস্ট তৈরি করুন। অভিভাবকরা সরাসরি যোগাযোগ করবেন।
                  </p>
                </div>
                <button
                  onClick={() => setShowPostOfferModal(true)}
                  className="btn btn-primary"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none' }}
                >
                  + Create Tuition Post
                </button>
              </div>

              {/* Grid: Live Class Today & Recent Inquiries */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', fontWeight: '700', marginBottom: '1rem' }}>
                    Today's Live Classes
                  </h3>
                  <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 70, 229, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--dark)' }}>Physics: Force & Friction</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Student: Mukit Rahman (Class 10) • 7:00 PM - 8:30 PM</div>
                    </div>
                    <Link to="/" className="btn btn-primary btn-sm">Start Classroom</Link>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', fontWeight: '700', marginBottom: '1rem' }}>
                    Guardian Tuition Requests
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tuitionInquiries.map((inq) => (
                      <div key={inq.id} style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700' }}>
                          <span>{inq.studentClass}</span>
                          <span style={{ color: '#059669' }}>{inq.offeredSalary}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{inq.guardian} • {inq.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. My Tuition Posts / Offers (Teacher creates & manages their tuition advertisements) */}
          {activeTab === 'my-offers' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>
                    আমার টিউশন ও ব্যাচ অফারসমূহ (My Tuition Posts)
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    অভিভাবক ও শিক্ষার্থীরা এই পোস্টগুলো দেখে আপনার কাছে সরাসরি আবেদন করবে।
                  </p>
                </div>
                <button
                  onClick={() => setShowPostOfferModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #10B981, #059669)' }}
                >
                  <PlusCircle size={15} />
                  <span>নতুন টিউশন অফার পোস্ট করুন</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {myTuitionOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="card-glass"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      border: '1.5px solid var(--card-border)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="badge badge-primary">{offer.classLevel}</span>
                        <span className="badge badge-verified">{offer.status}</span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {offer.title}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.75rem' }}>
                        {offer.subject}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={14} color="var(--primary)" />
                          <span>{offer.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={14} color="var(--accent)" />
                          <span>{offer.schedule}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Users size={14} color="#10B981" />
                          <span>Mode: {offer.mode}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--dark)' }}>
                        {offer.fee}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>
                        {offer.enrolled} Students Enrolled
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Find Students / Tuition Vacancies (Teacher searches for guardian postings) */}
          {activeTab === 'find-students' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>
                    টিউশন শূন্যপদ খুঁজুন (Find Students & Tuition Vacancies)
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    অভিভাবকদের পোস্ট করা টিউশন রিকুয়েস্ট দেখুন এবং ১-ক্লিকে পড়ানোর প্রস্তাব পাঠান।
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Filter Location:</span>
                  <select
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="form-select"
                    style={{ width: '160px', height: '38px', fontSize: '0.8rem' }}
                  >
                    <option value="All">All Locations</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Mohammadpur">Mohammadpur</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {studentRequests
                  .filter(r => searchArea === 'All' || r.location.toLowerCase().includes(searchArea.toLowerCase()))
                  .map((req) => {
                    const isApplied = appliedRequestIds.includes(req.id);
                    return (
                      <div
                        key={req.id}
                        style={{
                          backgroundColor: '#F8FAFC',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.5rem',
                          border: '1.5px solid #E2E8F0',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="badge badge-primary">{req.studentClass}</span>
                            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700' }}>● {req.status}</span>
                          </div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.35rem' }}>
                            {req.subject}
                          </h3>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                            Guardian: {req.guardianName} • {req.medium}
                          </div>
                          <p style={{ fontSize: '0.825rem', color: '#475569', backgroundColor: '#FFFFFF', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
                            "{req.description}"
                          </p>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
                            <div>📍 {req.location}</div>
                            <div>📅 {req.daysPerWeek}</div>
                            <div>⏰ {req.preferredTime}</div>
                            <div>👤 Pref: {req.preferredGender}</div>
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Salary Offered</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--dark)' }}>{req.monthlyBudget} /mo</div>
                          </div>

                          {isApplied ? (
                            <span className="badge badge-verified">Applied ✓</span>
                          ) : (
                            <button
                              onClick={() => handleApplyToStudent(req.id)}
                              className="btn btn-primary btn-sm"
                              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'linear-gradient(135deg, #10B981, #059669)' }}
                            >
                              <Send size={13} />
                              <span>Apply to Teach</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* 4. Enrolled Students */}
          {activeTab === 'students' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>Enrolled Students (24)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Mukit Rahman', class: 'Class 10 (Science)', medium: 'Bangla Medium', mode: 'Home Tutor (Mirpur)', attendance: '96%', fee: '৳7,000 / mo' },
                  { name: 'Farhan Tahmid', class: 'Class 9', medium: 'English Version', mode: 'Online Live', attendance: '92%', fee: '৳5,500 / mo' },
                  { name: 'Ananya Roy', class: 'Class 10 (SSC)', medium: 'Bangla Medium', mode: 'Home Tutor (Dhanmondi)', attendance: '100%', fee: '৳8,000 / mo' }
                ].map((st, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontWeight: '700', fontSize: '1rem' }}>{st.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{st.class} • {st.medium} • {st.mode}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '800', color: 'var(--primary)' }}>{st.fee}</div>
                      <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Attendance: {st.attendance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Live Classes */}
          {activeTab === 'classes' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>Class Schedule & Live Virtual Room</h2>
              <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 70, 229, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Physics Chapter 3: Force & Friction</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student: Mukit Rahman (Class 10) • 7:00 PM - 8:30 PM</p>
                </div>
                <Link to="/classroom" className="btn btn-primary btn-sm">Enter Virtual Classroom</Link>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(320px, 1.1fr)', gap: '1.25rem' }} className="teacher-content-layout">
              <style>{`@media (max-width: 900px) { .teacher-content-layout { grid-template-columns: 1fr !important; } }`}</style>
              <form onSubmit={handlePublishLearningContent} style={{ background: '#FFFFFF', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark)' }}>Create course or recording</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Content stays pending until an admin approves it. Course payment is demo-only.</p>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Content type</label>
                <select className="form-select" value={newLearningItem.type} onChange={(event) => setNewLearningItem({ ...newLearningItem, type: event.target.value })}>
                  <option value="course">Course / Batch</option>
                  <option value="recording">Recorded class</option>
                </select>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Title</label>
                <input className="form-input" required maxLength={100} value={newLearningItem.title} onChange={(event) => setNewLearningItem({ ...newLearningItem, title: event.target.value })} placeholder="e.g. SSC Physics: Force and Motion" />
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Class</label>
                <select className="form-select" value={newLearningItem.classLevel} onChange={(event) => setNewLearningItem({ ...newLearningItem, classLevel: event.target.value })}>
                  {ALL_CLASSES.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}
                </select>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Subject</label>
                <select className="form-select" value={newLearningItem.subject} onChange={(event) => setNewLearningItem({ ...newLearningItem, subject: event.target.value })}>
                  {ALL_SUBJECTS.slice(1).map((subject) => <option key={subject}>{subject}</option>)}
                </select>
                {newLearningItem.type === 'course' ? (
                  <>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Course price (৳)</label>
                    <input className="form-input" type="number" min="0" max="1000000" step="1" required value={newLearningItem.price} onChange={(event) => setNewLearningItem({ ...newLearningItem, price: event.target.value })} />
                  </>
                ) : (
                  <>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Recording link</label>
                    <input className="form-input" type="url" required value={newLearningItem.videoUrl} onChange={(event) => setNewLearningItem({ ...newLearningItem, videoUrl: event.target.value })} placeholder="https://..." />
                  </>
                )}
                {contentNotice && <p role="status" style={{ color: 'var(--primary)', fontSize: '0.82rem' }}>{contentNotice}</p>}
                <button className="btn btn-primary" type="submit">Submit for admin approval</button>
              </form>

              <section style={{ background: '#FFFFFF', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark)', marginBottom: '1rem' }}>My submitted learning content</h2>
                {myLearningContent.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>You have not submitted any courses or recordings yet.</p>
                ) : myLearningContent.map((item) => (
                  <article key={item.id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--card-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                      <strong>{item.title}</strong>
                      <span className={`badge ${item.status === 'approved' ? 'badge-verified' : 'badge-warning'}`}>{item.status}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.35rem' }}>
                      {item.type === 'recording' ? 'Recorded class' : 'Course'} · {item.subject} · {item.classLevel}
                    </p>
                  </article>
                ))}
              </section>
            </div>
          )}

          {/* 6. Inquiries */}
          {activeTab === 'inquiries' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '1.5rem' }}>Tuition Inquiries from Parents</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tuitionInquiries.map((inq) => (
                  <div key={inq.id} style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{inq.studentClass} — {inq.subject}</h4>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#059669' }}>{inq.offeredSalary}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Guardian: {inq.guardian} • Location: {inq.location} • Schedule: {inq.days}
                    </p>
                    {inq.status === 'accepted' ? (
                      <span className="badge badge-verified">Accepted ✓ Contacting Guardian</span>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => handleAccept(inq.id)} className="btn btn-primary btn-sm">Accept Tuition</button>
                        <button onClick={() => handleDecline(inq.id)} className="btn btn-secondary btn-sm" style={{ color: '#DC2626' }}>Decline</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Earnings */}
          {activeTab === 'earnings' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>Tuition Earnings & Payouts</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Escrow-secured automated disbursements via bKash, Nagad, and Bank Transfer.</p>
                </div>
                <button onClick={() => setShowWithdrawModal(true)} className="btn btn-primary btn-sm">
                  Withdraw to bKash / Bank
                </button>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Available Withdrawable Balance:</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>৳{earnings.toLocaleString()}</div>
              </div>
            </div>
          )}

          {/* 8. Verification */}
          {activeTab === 'verification' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={24} color="#10B981" />
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>Verified Tutor Credentials</h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                All required verification items have been approved by Admin. You possess the verified badge.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: '#ECFDF5', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontWeight: '700', color: '#065F46' }}>National ID (NID)</div>
                  <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '4px' }}>No: 1998269281729482 (Verified ✓)</div>
                </div>
                <div style={{ backgroundColor: '#ECFDF5', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontWeight: '700', color: '#065F46' }}>University Certificate</div>
                  <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '4px' }}>BUET EEE Graduation Degree (Verified ✓)</div>
                </div>
                <div style={{ backgroundColor: '#ECFDF5', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontWeight: '700', color: '#065F46' }}>Mobile & Email Check</div>
                  <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '4px' }}>01712-345678 • Verified ✓</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Post New Tuition Offer / Batch */}
      {showPostOfferModal && (
        <div className="modal-overlay" onClick={() => setShowPostOfferModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '560px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', fontWeight: '800' }}>পোস্ট করুন নতুন টিউশন অফার</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>অভিভাবকদের কাছে পৌঁছানোর জন্য আপনার ব্যাচ বা টিউশন বিবরণ দিন।</p>
              </div>
              <button onClick={() => setShowPostOfferModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleCreateOffer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                  Tuition Title (শিরোনাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSC 2027 Physics & Higher Math Comprehensive Batch"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Class</label>
                  <select value={newOffer.classLevel} onChange={(e) => setNewOffer({ ...newOffer, classLevel: e.target.value })} className="form-select">
                    {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Subject</label>
                  <select value={newOffer.subject} onChange={(e) => setNewOffer({ ...newOffer, subject: e.target.value })} className="form-select">
                    {ALL_SUBJECTS.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Teaching Mode</label>
                  <select value={newOffer.mode} onChange={(e) => setNewOffer({ ...newOffer, mode: e.target.value })} className="form-select">
                    <option value="Home Tutor">Home Tutor 🏠</option>
                    <option value="Online Live">Online Live 💻</option>
                    <option value="Coaching Batch">Coaching Batch 🏫</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Expected Fee</label>
                  <input
                    type="text"
                    placeholder="e.g. ৳7,000 / month"
                    value={newOffer.fee}
                    onChange={(e) => setNewOffer({ ...newOffer, fee: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Location / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Mirpur DOHS, Dhanmondi, or Online"
                  value={newOffer.location}
                  onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowPostOfferModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                  Publish Tuition Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '440px' }}>
            {withdrawSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h3>Withdrawal Initiated!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>৳{withdrawAmount} will be sent to your {withdrawMethod} account within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Withdraw Tuition Earnings</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Available: ৳{earnings.toLocaleString()}</p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Select Method</label>
                  <select value={withdrawMethod} onChange={(e) => setWithdrawMethod(e.target.value)} className="form-select">
                    <option value="bKash">bKash Mobile Banking</option>
                    <option value="Nagad">Nagad Digital</option>
                    <option value="Bank">Direct Bank Transfer</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Amount (৳)</label>
                  <input type="number" required value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="form-input" />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowWithdrawModal(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Confirm Payout</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
