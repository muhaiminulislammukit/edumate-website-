import React, { useState } from 'react';
import {
  UserCheck,
  DollarSign,
  Users,
  Video,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  CreditCard,
  PlusCircle,
  Award,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function TeacherDashboard({ onStartLiveClass }) {
  const [earnings, setEarnings] = useState(38500);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('20000');
  const [withdrawMethod, setWithdrawMethod] = useState('bKash');
  const [withdrawNumber, setWithdrawNumber] = useState('01712-345678');

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

  const handleAcceptInquiry = (id) => {
    setTuitionInquiries(tuitionInquiries.map(item =>
      item.id === id ? { ...item, status: 'accepted' } : item
    ));
  };

  const handleDeclineInquiry = (id) => {
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

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Teacher Profile Banner */}
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
            border: '2px solid rgba(16, 185, 129, 0.6)',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
              alt="Teacher"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF' }}>
                Engr. Tanvir Ahmed 👋
              </h2>
              <span className="badge badge-verified" style={{ fontSize: '0.75rem' }}>
                Verified Tutor ✓
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              B.Sc. in EEE, BUET • Senior Physics & Higher Math Mentor • 5+ Yrs Experience
            </p>
          </div>
        </div>

        {/* Quick Earnings & Withdraw Button */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>
              Monthly Earnings
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>
              ৳{earnings.toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="btn btn-primary btn-sm"
          >
            Withdraw (টাকা উত্তোলন)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Students</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginTop: '0.25rem' }}>24 Students</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>● 16 Home + 8 Online</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Today's Classes</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '0.25rem' }}>3 Batches</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next class at 7:00 PM</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Parent Rating</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#D97706', marginTop: '0.25rem' }}>4.9 / 5.0 ⭐</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From 38 reviews</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>NID & University Info</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#059669', marginTop: '0.4rem' }}>Verified 100% ✓</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trust Score: High</div>
        </div>
      </div>

      {/* Main Grid: Schedule & Tuition Requests */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem'
      }} className="teacher-grid">
        <style>{`
          @media (max-width: 960px) {
            .teacher-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left Column: Today's Classes */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', fontWeight: '700' }}>
                আজকের ক্লাসের সময়সূচী (Today's Classes)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                লাইভ ক্লাস শুরু করতে 'Start Class' বাটনে চাপ দিন
              </p>
            </div>
            <button
              onClick={() => alert('Schedule New Class modal')}
              className="btn btn-outline-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <PlusCircle size={14} />
              <span>Schedule Class</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-live" style={{ fontSize: '0.65rem' }}>Live Soon</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--dark)' }}>
                    Physics Chapter 3: Force & Friction
                  </h4>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Student: Mukit Rahman (Class 10 SSC) • 7:00 PM - 8:30 PM
                </div>
              </div>

              <button
                onClick={onStartLiveClass}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Video size={14} />
                <span>Start Class Room</span>
              </button>
            </div>

            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--dark)' }}>
                  Higher Math: SSC 2027 Coordinate Geometry
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Batch 2 (4 Students) • Tomorrow 6:00 PM
                </div>
              </div>
              <span className="badge badge-secondary">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tuition Inquiries / Guardian Requests */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', fontWeight: '700' }}>
                অভিভাবকের টিউশন প্রস্তাবনা
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Guardian Direct Tuition Requests ({tuitionInquiries.length})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tuitionInquiries.map((inq) => (
              <div
                key={inq.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--dark)' }}>
                    {inq.studentClass} • {inq.subject}
                  </h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#059669' }}>
                    {inq.offeredSalary}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Guardian: {inq.guardian} • {inq.location} • {inq.days}
                </div>

                {inq.status === 'accepted' ? (
                  <div style={{
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    padding: '0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    textAlign: 'center'
                  }}>
                    ✓ আপনি টিউশনটি একসেপ্ট করেছেন!
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleAcceptInquiry(inq.id)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, padding: '0.35rem' }}
                    >
                      Accept Tuition
                    </button>
                    <button
                      onClick={() => handleDeclineInquiry(inq.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.35rem 0.75rem', color: '#DC2626' }}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Withdraw Earnings */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '480px' }}>
            {withdrawSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                  উত্তোলন রিকুয়েস্ট সফল!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  ৳{withdrawAmount} আপনার {withdrawMethod} নম্বরে ({withdrawNumber}) ২৪ ঘণ্টার মধ্যে পাঠানো হবে।
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '0.4rem' }}>
                  উত্তোলন করুন (Withdraw Funds)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Current Balance: <strong>৳{earnings.toLocaleString()}</strong>
                </p>

                <form onSubmit={handleWithdrawSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                      Withdraw Method
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {['bKash', 'Nagad', 'Bank Transfer'].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setWithdrawMethod(m)}
                          style={{
                            padding: '0.5rem',
                            fontSize: '0.8rem',
                            fontWeight: withdrawMethod === m ? '700' : '500',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid',
                            borderColor: withdrawMethod === m ? 'var(--primary)' : 'var(--card-border)',
                            backgroundColor: withdrawMethod === m ? 'rgba(79, 70, 229, 0.08)' : '#FFF',
                            color: withdrawMethod === m ? 'var(--primary)' : 'var(--text-main)',
                            cursor: 'pointer'
                          }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                      Mobile / Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={withdrawNumber}
                      onChange={(e) => setWithdrawNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                      Withdraw Amount (৳)
                    </label>
                    <input
                      type="number"
                      required
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Confirm Withdrawal
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
