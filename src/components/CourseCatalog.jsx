import React, { useState } from 'react';
import {
  BookOpen,
  Star,
  Users,
  Video,
  Clock,
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { MOCK_COURSES } from '../data/mockData';

export default function CourseCatalog({ onEnrollCourse, courses = MOCK_COURSES }) {
  const [filterClass, setFilterClass] = useState('All');

  const filtered = courses.filter((course) => {
    if (filterClass === 'All') return true;
    return course.classLevel.toLowerCase().includes(filterClass.toLowerCase());
  });

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-primary">Interactive Live Batches</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Top Mentors from BUET, DU & Medical
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--dark)', fontWeight: '800' }}>
            স্পেশাল লাইভ কোর্স ও একাডেমি ব্যাচ (Masterclasses)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            সরাসরি লাইভ ক্লাস, নিয়মিত মডেল টেস্ট, হ্যান্ডনোট এবং সার্বক্ষণিক সলভিং সাপোর্ট।
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'SSC', 'HSC', 'Class 8', 'Admission'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterClass(lvl)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: filterClass === lvl ? 'var(--primary)' : 'var(--card-border)',
                backgroundColor: filterClass === lvl ? 'var(--primary)' : '#FFFFFF',
                color: filterClass === lvl ? '#FFFFFF' : 'var(--text-main)',
                fontWeight: filterClass === lvl ? '700' : '600',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {lvl === 'All' ? 'সব কোর্স (All)' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '2rem', background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
            No approved courses are available yet.
          </div>
        ) : filtered.map((course) => (
          <div
            key={course.id}
            className="card-glass card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--card-border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative', height: '190px' }}>
              <img
                src={course.thumbnail || '/favicon.svg'}
                alt={course.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(11, 17, 32, 0.85)',
                color: '#22D3EE',
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)'
              }}>
                {course.tag}
              </div>
            </div>

            {/* Course Body */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>
                    {course.classLevel}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: '700', color: '#D97706' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', fontWeight: '700', lineHeight: 1.4, marginBottom: '0.6rem' }}>
                  {course.title}
                </h3>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Instructor: <strong>{course.instructor}</strong>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Video size={13} /> {course.classesCount} Live Classes
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={13} /> {course.studentsEnrolled}+ Students
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #F1F5F9',
                paddingTop: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--dark)' }}>
                      ৳{course.price.toLocaleString()}
                    </span>
                    {Number(course.originalPrice) > Number(course.price) && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                        ৳{Number(course.originalPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {Number(course.originalPrice) > Number(course.price) && (
                    <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '700' }}>
                      Discount available
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onEnrollCourse(course)}
                  className="btn btn-primary btn-sm"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
