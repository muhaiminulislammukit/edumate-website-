import React from 'react';
import {
  X,
  CheckCircle2,
  Star,
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  Calendar,
  ShieldCheck,
  BookOpen,
  Award,
  Video,
  Home,
  MessageSquare
} from 'lucide-react';

export default function TutorProfileModal({ tutor, onClose, onBookDemo }) {
  if (!tutor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1120 0%, #1E1B4B 100%)',
          padding: '2rem',
          color: '#FFFFFF',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.2)',
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

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={tutor.photo}
                alt={tutor.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  border: '3px solid #FFFFFF'
                }}
              />
              {tutor.verified && (
                <div style={{
                  position: 'absolute',
                  bottom: '-5px',
                  right: '-5px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  padding: '2px'
                }}>
                  <CheckCircle2 size={22} color="#10B981" fill="#ECFDF5" />
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF' }}>
                  {tutor.name}
                </h2>
                {tutor.verified && (
                  <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>
                    Verified Tutor ✓
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#67E8F9', fontWeight: '600', marginTop: '2px' }}>
                {tutor.degree}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                {tutor.university}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Trust Verification Strip */}
          <div style={{
            backgroundColor: '#ECFDF5',
            borderRadius: 'var(--radius-lg)',
            padding: '0.85rem 1.25rem',
            border: '1px solid #A7F3D0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: '#065F46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
              <ShieldCheck size={18} color="#059669" />
              <span>Admin Verified Profile</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
              <span>✓ NID Card Checked</span>
              <span>✓ University Certificate</span>
              <span>✓ Phone & Email</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rating</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#D97706' }}>⭐ {tutor.rating}</div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Experience</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--dark)' }}>{tutor.experience}</div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Taught</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>{tutor.studentsTaught}+</div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tuition Mode</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0891B2', marginTop: '4px' }}>
                {tutor.modes.join(', ')}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.4rem' }}>
              About the Tutor (শিক্ষকের পরিচিতি)
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              {tutor.bio}
            </p>
          </div>

          {/* Subjects & Classes */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.5rem' }}>
              Subjects & Classes Covered
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
              {tutor.subjects.map(s => (
                <span key={s} className="badge badge-primary">{s}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {tutor.classes.map(c => (
                <span key={c} style={{ fontSize: '0.75rem', backgroundColor: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Availability */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <MapPin size={16} color="var(--primary)" />
              <span><strong>Preferred Location:</strong> {tutor.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--accent)" />
              <span><strong>Available Time Slots:</strong> {tutor.availability}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid var(--card-border)',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
              Expected Tuition Fee
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--dark)' }}>
              {tutor.monthlyFee}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                onClose();
                onBookDemo(tutor);
              }}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Book Demo Class (ফ্রি ডেমো ক্লাস)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
