import React, { useState } from 'react';
import {
  Shield,
  Users,
  UserCheck,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Eye,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export default function AdminDashboard({ tutors, onVerifyTutor }) {
  // Pending verification applications queue
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'app-1',
      name: 'Rifat Hossain',
      university: 'BUET (Dept. of Mechanical Eng.)',
      nidNumber: '1998269281729482',
      phone: '01711-889900',
      appliedDate: '2 hours ago',
      subjects: ['Physics', 'Higher Mathematics'],
      status: 'pending'
    },
    {
      id: 'app-2',
      name: 'Sadia Afreen',
      university: 'Dhaka Medical College (DMC)',
      nidNumber: '2001269384729110',
      phone: '01822-445566',
      appliedDate: '5 hours ago',
      subjects: ['Biology', 'Chemistry'],
      status: 'pending'
    },
    {
      id: 'app-3',
      name: 'Shahriar Alam',
      university: 'University of Dhaka (Economics)',
      nidNumber: '1999269123456789',
      phone: '01933-221100',
      appliedDate: '1 day ago',
      subjects: ['Economics', 'Accounting'],
      status: 'pending'
    }
  ]);

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      guardian: 'Mrs. Nazmun Nahar (Mirpur)',
      tutor: 'Tutor ID #104',
      issue: 'শিক্ষক গত সপ্তাহে নির্ধারিত সময়ে ১ দিন উপস্থিত হননি।',
      status: 'Investigating',
      date: 'Yesterday'
    },
    {
      id: 2,
      guardian: 'Kazi Farhan (Uttara)',
      tutor: 'Tutor ID #88',
      issue: 'বোর্ডের টেস্ট পেপারের চেয়ে অতিরিক্ত এডভান্সড সমস্যা দেওয়া হচ্ছে।',
      status: 'Resolved',
      date: '3 days ago'
    }
  ]);

  const handleApprove = (id) => {
    setPendingVerifications(pendingVerifications.map(app =>
      app.id === id ? { ...app, status: 'approved' } : app
    ));
    if (onVerifyTutor) onVerifyTutor(id);
  };

  const handleReject = (id) => {
    setPendingVerifications(pendingVerifications.map(app =>
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Admin Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0B1120 0%, #111827 100%)',
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
            <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#F87171' }}>
              🛡️ Super Admin Control
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>EduMate360 Bangladesh Operations</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF' }}>
            এডমিন ড্যাশবোর্ড ও প্ল্যাটফর্ম ম্যানেজমেন্ট
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            শিক্ষক এনআইডি ও সার্টিফিকেট ভেরিফিকেশন, অভিভাবক অভিযোগ নিষ্পত্তি এবং আর্থিক লেনদেন পর্যবেক্ষণ করুন।
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Total Students</div>
          <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary)', marginTop: '0.25rem' }}>14,240</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>↑ 12% This Month</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Verified Tutors</div>
          <div style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '0.25rem' }}>2,340</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BUET / DU / Medical</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Tuitions</div>
          <div style={{ fontSize: '1.9rem', fontWeight: '800', color: '#0891B2', marginTop: '0.25rem' }}>4,210</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>● Running Across BD</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Monthly Platform Revenue</div>
          <div style={{ fontSize: '1.9rem', fontWeight: '800', color: '#10B981', marginTop: '0.25rem' }}>৳12,50,000</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>bKash / Nagad / SSL</div>
        </div>
      </div>

      {/* Main Grid: Verifications Queue & Complaints */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: '2rem'
      }} className="admin-grid">
        <style>{`
          @media (max-width: 960px) {
            .admin-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left Column: Tutor Verification Queue */}
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
                শিক্ষক ভেরিফিকেশন তালিকা (Verification Queue)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                NID, ফোন এবং বিশ্ববিদ্যালয়ের সনদ যাচাই করে "Verified Tutor ✓" ব্যাজ অনুমোদন করুন।
              </p>
            </div>
            <span className="badge badge-warning">
              {pendingVerifications.filter(p => p.status === 'pending').length} Pending
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {pendingVerifications.map((app) => (
              <div
                key={app.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--dark)' }}>
                      {app.name}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>
                      {app.university}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.appliedDate}</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem',
                  border: '1px solid #E2E8F0'
                }}>
                  <div><strong>NID No:</strong> {app.nidNumber}</div>
                  <div><strong>Mobile:</strong> {app.phone}</div>
                  <div><strong>Subjects:</strong> {app.subjects.join(', ')}</div>
                  <div style={{ color: '#059669', fontWeight: '600' }}>📄 Certificate: Uploaded (Verified)</div>
                </div>

                {app.status === 'approved' ? (
                  <div style={{
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    ✓ অনুমোদিত (Verified Tutor Badge Granted)
                  </div>
                ) : app.status === 'rejected' ? (
                  <div style={{
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    ✕ আবেদন বাতিল করা হয়েছে
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, background: 'linear-gradient(135deg, #10B981, #059669)' }}
                    >
                      <CheckCircle2 size={15} />
                      <span>Approve & Grant Badge</span>
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#DC2626' }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Complaints & Platform Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Complaints */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700' }}>
                অভিযোগ নিষ্পত্তি (Complaints)
              </h3>
              <span className="badge badge-warning">1 Under Review</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {complaints.map((c) => (
                <div key={c.id} style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{c.guardian}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      color: c.status === 'Resolved' ? '#059669' : '#D97706',
                      backgroundColor: c.status === 'Resolved' ? '#ECFDF5' : '#FFFBEB',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {c.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    "{c.issue}"
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Against: {c.tutor} • {c.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Live Transactions */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', fontWeight: '700', marginBottom: '1rem' }}>
              সাম্প্রতিক লেনদেন (Transactions)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Monthly Tuition Fee (Karim)', gateway: 'bKash', amount: '৳5,000', time: '10 mins ago', status: 'Success' },
                { name: 'SSC Higher Math Course', gateway: 'Nagad', amount: '৳3,500', time: '35 mins ago', status: 'Success' },
                { name: 'Tutor Withdrawal (Tanvir)', gateway: 'Bank', amount: '৳20,000', time: '2 hrs ago', status: 'Disbursed' }
              ].map((tx, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0',
                  borderBottom: idx !== 2 ? '1px solid #F1F5F9' : 'none',
                  fontSize: '0.825rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--dark)' }}>{tx.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tx.gateway} • {tx.time}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '800', color: 'var(--primary)' }}>{tx.amount}</div>
                    <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '600' }}>● {tx.status}</div>
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
