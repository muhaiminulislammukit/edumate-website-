import React, { useState } from 'react';
import {
  Home,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Users,
  CheckCircle2,
  PlusCircle,
  Send,
  Sparkles,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { ALL_CLASSES, ALL_SUBJECTS, DISTRICTS, MEDIUMS } from '../data/mockData';

export default function HomeTuitionSystem({
  tuitionRequests,
  onAddNewRequest,
  onApplyForTuition,
  currentRole
}) {
  const [filterArea, setFilterArea] = useState('All');
  const [filterClass, setFilterClass] = useState('All');
  const [showApplyModal, setShowApplyModal] = useState(null);
  const [proposalMsg, setProposalMsg] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // New Request Form state for in-page modal/drawer
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    guardianName: '',
    studentClass: 'Class 9',
    medium: 'Bangla Medium',
    subject: 'General Mathematics (গণিত)',
    location: 'Mirpur, Dhaka',
    daysPerWeek: '4 days/week',
    preferredTime: '6:30 PM - 8:00 PM',
    monthlyBudget: '6500',
    preferredGender: 'Any',
    description: ''
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.guardianName) {
      alert('Please enter Guardian name');
      return;
    }
    const newReq = {
      id: `req-${Date.now()}`,
      guardianName: formData.guardianName,
      studentClass: formData.studentClass,
      medium: formData.medium,
      subject: formData.subject,
      location: formData.location,
      daysPerWeek: formData.daysPerWeek,
      preferredTime: formData.preferredTime,
      monthlyBudget: `৳${formData.monthlyBudget}`,
      preferredGender: formData.preferredGender,
      status: 'Open',
      postedTime: 'Just now',
      applicantsCount: 0,
      description: formData.description || `Looking for a caring tutor for ${formData.studentClass} ${formData.subject}.`
    };
    onAddNewRequest(newReq);
    setIsCreating(false);
    setFormData({
      guardianName: '',
      studentClass: 'Class 9',
      medium: 'Bangla Medium',
      subject: 'General Mathematics (গণিত)',
      location: 'Mirpur, Dhaka',
      daysPerWeek: '4 days/week',
      preferredTime: '6:30 PM - 8:00 PM',
      monthlyBudget: '6500',
      preferredGender: 'Any',
      description: ''
    });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    onApplyForTuition(showApplyModal.id, proposalMsg);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setShowApplyModal(null);
      setProposalMsg('');
    }, 1500);
  };

  const filtered = tuitionRequests.filter((req) => {
    if (filterArea !== 'All' && !req.location.toLowerCase().includes(filterArea.toLowerCase())) {
      return false;
    }
    if (filterClass !== 'All' && !req.studentClass.toLowerCase().includes(filterClass.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Top Banner */}
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
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)', color: '#22D3EE' }}>
              🇧🇩 Bangladesh Special
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Verified Direct Tutor Matching
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '0.75rem', fontWeight: '800' }}>
            হোম টিউশন রিকুয়েস্ট বোর্ড (Live Tuition Board)
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '0.975rem', lineHeight: 1.6 }}>
            অভিভাবকরা সরাসরি তাদের প্রয়োজন অনুযায়ী হোম টিউটর রিকুয়েস্ট পোস্ট করতে পারবেন।
            মিরপুর, ধানমন্ডি, উত্তরা, গুলশানসহ পুরো ঢাকা ও বাংলাদেশের যেকোনো প্রান্তের দক্ষ শিক্ষকরা দ্রুত আবেদন করবেন।
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="btn btn-primary btn-lg"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <PlusCircle size={20} />
          <span>নতুন টিউশন রিকুয়েস্ট পোস্ট করুন</span>
        </button>
      </div>

      {/* Filter and Stats Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>Filter Area:</span>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="form-select"
              style={{ width: '160px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Locations</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Uttara">Uttara</option>
              <option value="Mohammadpur">Mohammadpur</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>Class:</span>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="form-select"
              style={{ width: '160px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Classes</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 10">Class 10 / SSC</option>
              <option value="Class 12">Class 12 / HSC</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filtered.length}</strong> active tuition vacancies
        </div>
      </div>

      {/* Tuition Requests Feed */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '1.5rem'
      }}>
        {filtered.map((req) => (
          <div
            key={req.id}
            className="card-glass card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--card-border)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Header Badges */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  {req.studentClass}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#059669',
                  backgroundColor: '#ECFDF5',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700'
                }}>
                  ● {req.status} ({req.postedTime})
                </span>
              </div>

              {/* Subject Title */}
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)', marginBottom: '0.5rem', fontWeight: '800' }}>
                {req.subject}
              </h3>

              <div style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontWeight: '600' }}>Guardian: {req.guardianName}</span>
                <span>•</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{req.medium}</span>
              </div>

              <p style={{
                fontSize: '0.85rem',
                color: '#475569',
                backgroundColor: '#F8FAFC',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                lineHeight: 1.5,
                border: '1px solid #F1F5F9'
              }}>
                "{req.description}"
              </p>

              {/* Meta Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-main)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={15} color="var(--primary)" />
                  <span style={{ fontWeight: '600' }}>{req.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={15} color="var(--secondary)" />
                  <span>{req.daysPerWeek}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={15} color="var(--accent)" />
                  <span>{req.preferredTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={15} color="#D97706" />
                  <span>Pref: {req.preferredGender}</span>
                </div>
              </div>
            </div>

            {/* Footer: Budget & Apply Action */}
            <div style={{
              borderTop: '1px solid #F1F5F9',
              paddingTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Monthly Salary
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--dark)' }}>
                  {req.monthlyBudget} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {req.applicantsCount} applied
                </span>
                <button
                  onClick={() => setShowApplyModal(req)}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Send size={13} />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Tuition Request */}
      {isCreating && (
        <div className="modal-overlay" onClick={() => setIsCreating(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--dark)' }}>পোস্ট করুন নতুন হোম টিউশন</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  আপনার সন্তানের জন্য পারফেক্ট শিক্ষক পেতে নিচের তথ্যগুলো পূরণ করুন।
                </p>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Guardian Name (অভিভাবকের নাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Shamima Sultana"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Student Class (শ্রেণি)
                  </label>
                  <select
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="form-select"
                  >
                    {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Medium (মাধ্যম)
                  </label>
                  <select
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    className="form-select"
                  >
                    {MEDIUMS.map(m => <option key={m.id} value={m.label}>{m.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Subject (বিষয়)
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-select"
                  >
                    {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Location (এলাকা / ঠিকানা)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mirpur-10, Dhaka"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Days per week
                  </label>
                  <select
                    value={formData.daysPerWeek}
                    onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
                    className="form-select"
                  >
                    <option value="3 days/week">3 days/week</option>
                    <option value="4 days/week">4 days/week</option>
                    <option value="5 days/week">5 days/week</option>
                    <option value="6 days/week">6 days/week</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6:00 PM"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Monthly Budget (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 6000"
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Requirements Note (বিশেষ কোনো চাহিদা)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Needs experienced teacher who can focus on solving board questions and creative questions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Confirm & Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tutor Apply for Tuition */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '520px' }}>
            {appliedSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                  আবেদন সফলভাবে পাঠানো হয়েছে!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  অভিভাবকের কাছে আপনার প্রোফাইল ও প্রস্তাবনা চলে গেছে। অভিভাবক একসেপ্ট করলে আপনাকে SMS ও নোটিফিকেশন দেওয়া হবে।
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '0.3rem' }}>
                  টিউশনে আবেদন করুন
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Posting: <strong>{showApplyModal.subject}</strong> for {showApplyModal.studentClass} ({showApplyModal.location})
                </p>

                <div style={{
                  backgroundColor: '#F8FAFC',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.85rem'
                }}>
                  <div><strong>Offered Budget:</strong> {showApplyModal.monthlyBudget}</div>
                  <div><strong>Days:</strong> {showApplyModal.daysPerWeek} ({showApplyModal.preferredTime})</div>
                </div>

                <form onSubmit={handleApplySubmit}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                    Short Cover Note / Proposal for Guardian
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. Assalamu Alaikum, I am an EEE student at BUET with 4 years experience in teaching SSC physics and math. I can provide 4 days a week with regular chapter tests..."
                    value={proposalMsg}
                    onChange={(e) => setProposalMsg(e.target.value)}
                    className="form-textarea"
                    style={{ marginBottom: '1.25rem' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(null)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit Application
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
