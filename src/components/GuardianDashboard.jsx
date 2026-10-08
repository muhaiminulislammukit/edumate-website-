import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { GUARDIAN_CHILDREN } from '../data/mockData';

export default function GuardianDashboard({ onPayTuitionFee, onFindTutor }) {
  const [selectedChildId, setSelectedChildId] = useState(GUARDIAN_CHILDREN[0].id);

  const activeChild = GUARDIAN_CHILDREN.find(c => c.id === selectedChildId) || GUARDIAN_CHILDREN[0];

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Guardian Header Banner */}
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.3)', color: '#C4B5FD' }}>
              Guardian Portal (অভিভাবক ড্যাশবোর্ড)
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Verified Guardian Account</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF' }}>
            Welcome, Engr. Mizanur Rahman 👋
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>
            Monitor academic progress, tutor attendance, and manage monthly tuition fees for your children.
          </p>
        </div>

        {/* Multi-Child Switcher Tabs */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.4rem',
          display: 'flex',
          gap: '0.4rem',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          {GUARDIAN_CHILDREN.map((child) => {
            const isSelected = selectedChildId === child.id;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#CBD5E1',
                  fontWeight: isSelected ? '700' : '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                <GraduationCap size={16} />
                <div style={{ textAlign: 'left' }}>
                  <div>{child.name}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>{child.classLevel}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Child Metrics Overview Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>School & Class</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--dark)', marginTop: '0.25rem' }}>{activeChild.classLevel}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>{activeChild.school}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Attendance Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981', marginTop: '0.25rem' }}>{activeChild.attendance}</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>● High Regularity</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Mentors</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '0.25rem' }}>{activeChild.tutorsAssigned.length} Tutors</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Home & Online</div>
        </div>

        <div style={{
          backgroundColor: activeChild.pendingDues > 0 ? '#FFFBEB' : '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid',
          borderColor: activeChild.pendingDues > 0 ? '#FDE68A' : 'var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Tuition Fee Status</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: activeChild.pendingDues > 0 ? '#D97706' : '#10B981', marginTop: '0.25rem' }}>
            {activeChild.pendingDues > 0 ? `৳${activeChild.pendingDues}` : 'All Clear ✓'}
          </div>
          {activeChild.pendingDues > 0 ? (
            <button
              onClick={() => onPayTuitionFee(activeChild.pendingDues, activeChild.name)}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.78rem' }}
            >
              Pay via bKash / Nagad
            </button>
          ) : (
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Next due: 1st of next month</div>
          )}
        </div>
      </div>

      {/* Main Grid: Subject Performance & Assigned Tutors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem'
      }} className="guardian-grid">
        <style>{`
          @media (max-width: 960px) {
            .guardian-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left Column: Subject Progress Breakdown */}
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
                {activeChild.name}-এর একাডেমিক পারফরম্যান্স
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                শিক্ষকের দেওয়া সাপ্তাহিক টেস্ট ও কুইজের গড় স্কোর
              </p>
            </div>
            <span className="badge badge-primary">Term 2 Analytics</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeChild.subjectsProgress.map((sub) => {
              const barColor = sub.score >= 85 ? '#10B981' : sub.score >= 75 ? '#4F46E5' : '#F59E0B';
              return (
                <div key={sub.subject}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--dark)' }}>
                        {sub.subject}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        marginLeft: '0.5rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: '#F1F5F9',
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        {sub.status}
                      </span>
                    </div>
                    <span style={{ fontWeight: '800', fontSize: '1rem', color: barColor }}>
                      {sub.score}%
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '10px', backgroundColor: '#F1F5F9', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${sub.score}%`,
                      height: '100%',
                      backgroundColor: barColor,
                      borderRadius: '5px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Teacher Remarks Box */}
          <div style={{
            marginTop: '2rem',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            border: '1px solid #E2E8F0'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.4rem' }}>
              💬 শিক্ষকের মূল্যায়ন ও পরামর্শ (Teacher's Note):
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              "গণিতে অ্যালজেব্রায় অগ্রগতি অত্যন্ত প্রশংসনীয়। তবে বিজ্ঞানের চিত্রাঙ্কন ও ইংরেজিতে প্রতিদিন ৩০ মিনিট ব্যাকরণ অনুশীলনের অনুরোধ করছি।"
            </p>
          </div>
        </div>

        {/* Right Column: Assigned Tutors & Communication */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', fontWeight: '700' }}>
                গৃহশিক্ষক তালিকা (Assigned Tutors)
              </h3>
              <button onClick={onFindTutor} className="btn btn-ghost btn-sm" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>
                + Add Tutor
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeChild.tutorsAssigned.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--dark)', fontWeight: '700' }}>
                      {t.name}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', marginTop: '2px' }}>
                      {t.subject}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Schedule: {t.schedule}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => alert(`Calling / Messaging tutor: ${t.name} (01711-XXXXXX)`)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.4rem 0.6rem' }}
                      title="Direct Message"
                    >
                      <MessageSquare size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Guardian Complaint / Support Button */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9' }}>
              <button
                onClick={() => alert('Complaint Form: Submit any teacher attendance or conduct issues directly to EduMate360 Admin for immediate resolution.')}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <AlertTriangle size={14} />
                <span>টিউটর নিয়ে অভিযোগ বা কোনো সমস্যা? এডমিনকে জানান</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
