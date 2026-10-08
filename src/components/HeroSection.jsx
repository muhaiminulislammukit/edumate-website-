import React, { useState } from 'react';
import {
  Search,
  MapPin,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Video,
  Home,
  Users,
  ArrowRight
} from 'lucide-react';
import { ALL_CLASSES, ALL_SUBJECTS, DISTRICTS, MEDIUMS } from '../data/mockData';

export default function HeroSection({
  onQuickSearch,
  onOpenTuitionModal,
  onOpenAiSuite
}) {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('Physics (পদার্থবিজ্ঞান)');
  const [selectedLocation, setSelectedLocation] = useState('Mirpur');
  const [selectedMedium, setSelectedMedium] = useState('Bangla Medium (বাংলা মাধ্যম)');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onQuickSearch({
      classLevel: selectedClass,
      subject: selectedSubject,
      location: selectedLocation,
      medium: selectedMedium
    });
  };

  return (
    <section style={{
      position: 'relative',
      background: 'radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%), #FFFFFF',
      borderBottom: '1px solid var(--card-border)',
      padding: '3.5rem 1.5rem 4rem',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Blobs */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-100px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-80px',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(79, 70, 229, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '1.25rem'
        }}>
          <span className="badge badge-primary" style={{ padding: '0.35rem 0.85rem' }}>
            <Sparkles size={14} color="var(--primary)" />
            <span>Smart Tutoring Ecosystem for Bangladesh</span>
          </span>
          <span className="badge badge-verified" style={{ padding: '0.35rem 0.85rem' }}>
            <ShieldCheck size={14} color="#059669" />
            <span>BUET, DU & Medical Verified Mentors</span>
          </span>
        </div>

        {/* Hero Title */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
            lineHeight: 1.15,
            color: 'var(--dark)',
            marginBottom: '1rem',
            fontWeight: '800'
          }}>
            Play Group থেকে Class 12 ও Admission —{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              দেশসেরা টিউটর
            </span>{' '}
            খুঁজুন সহজে
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '740px',
            margin: '0 auto'
          }}>
            EduMate360-তে রয়েছে যাচাইকৃত <strong>হোম টিউটর ও অনলাইন ক্লাস</strong>, বাংলা ও ইংলিশ ভার্সন কারিকুলাম,
            অভিভাবক ড্যাশবোর্ড, এবং AI-চালিত স্টাডি অ্যাসিস্ট্যান্ট।
          </p>
        </div>

        {/* Quick Search Widget Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.9)',
          maxWidth: '1060px',
          margin: '0 auto 3rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--dark)' }}>
              <Search size={18} color="var(--primary)" />
              <span>Smart Tutor Search — Class, Subject & Location Filter</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={14} /> Instant Matching
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={14} /> Free Demo Class
              </span>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              alignItems: 'end'
            }}>
              {/* Class Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  <GraduationCap size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                  শ্রেণি (Class / Level)
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="form-select"
                  style={{ height: '46px', fontWeight: '500' }}
                >
                  {ALL_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              {/* Subject Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  <BookOpen size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                  বিষয় (Subject)
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="form-select"
                  style={{ height: '46px', fontWeight: '500' }}
                >
                  {ALL_SUBJECTS.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Location Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                  লোকেশন (District / Area)
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="form-select"
                  style={{ height: '46px', fontWeight: '500' }}
                >
                  <optgroup label="Dhaka City">
                    {DISTRICTS[0].areas.map(area => (
                      <option key={area} value={area}>{area}, Dhaka</option>
                    ))}
                  </optgroup>
                  <optgroup label="Chattogram City">
                    {DISTRICTS[1].areas.map(area => (
                      <option key={area} value={area}>{area}, Chattogram</option>
                    ))}
                  </optgroup>
                  <optgroup label="Sylhet City">
                    {DISTRICTS[2].areas.map(area => (
                      <option key={area} value={area}>{area}, Sylhet</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Medium Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  মাধ্যমিক ভার্সন (Medium)
                </label>
                <select
                  value={selectedMedium}
                  onChange={(e) => setSelectedMedium(e.target.value)}
                  className="form-select"
                  style={{ height: '46px', fontWeight: '500' }}
                >
                  {MEDIUMS.map((m) => (
                    <option key={m.id} value={m.label}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    height: '46px',
                    fontSize: '0.975rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Search size={18} />
                  <span>টিউটর খুঁজুন</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Action Tags */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #F1F5F9',
            flexWrap: 'wrap',
            fontSize: '0.8125rem'
          }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Popular Searches:</span>
            {[
              'Class 10 Physics Mirpur',
              'HSC Higher Math Dhanmondi',
              'Class 8 All Subjects Uttara',
              'Medical Biology Mentor',
              'BUET Admission EEE'
            ].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  onQuickSearch({
                    classLevel: 'Class 10',
                    subject: 'Physics (পদার্থবিজ্ঞান)',
                    location: 'Mirpur',
                    medium: 'Bangla Medium'
                  });
                }}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.2rem 0.65rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Three Core Value Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Card 1: Home Tuition */}
          <div
            onClick={onOpenTuitionModal}
            className="card-glass card-hover"
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              border: '1px solid rgba(79, 70, 229, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(79, 70, 229, 0.12)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Home size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--dark)' }}>
              🏠 হোম টিউটর সার্ভিস
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              আপনার এরিয়া অনুযায়ী বিশ্বস্ত ও ভেরিফাইড শিক্ষক সরাসরি বাসায় এসে পড়াবেন। নিজের বাজেট ও দিন নির্বাচন করুন।
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem' }}>
              <span>টিউশন রিকুয়েস্ট পোস্ট করুন</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Card 2: Interactive Online Classroom */}
          <div
            onClick={() => onQuickSearch({ mode: 'online' })}
            className="card-glass card-hover"
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(124, 58, 237, 0.12)',
              color: 'var(--secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Video size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--dark)' }}>
              💻 লাইভ অনলাইন ক্লাস ও হোয়াইটবোর্ড
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              ফুল এইচডি ভিডিও কল, ডিজিটাল ইন্টারঅ্যাক্টিভ হোয়াইটবোর্ড, লাইভ চ্যাট ও ক্লাস রেকর্ডিং সুবিধা।
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.85rem' }}>
              <span>অনলাইন ক্লাস ডেমো দেখুন</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Card 3: AI Learning Suite */}
          <div
            onClick={onOpenAiSuite}
            className="card-glass card-hover"
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              color: '#0891B2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--dark)' }}>
              🤖 AI স্টাডি প্ল্যান ও টিউটর
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              যেকোনো গণিত বা বিজ্ঞানের জটিল প্রশ্নের তাৎক্ষণিক সমাধান, বোর্ড পরীক্ষার স্টাডি প্ল্যান ও অটো প্রশ্ন জেনারেটর।
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0891B2', fontWeight: '700', fontSize: '0.85rem' }}>
              <span>AI অ্যাসিস্ট্যান্ট ব্যবহার করুন</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </div>

        {/* Platform Counter Banner */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #0B1120 0%, #131D31 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.5rem',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#06B6D4' }}>14,200+</div>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>যাচাইকৃত শিক্ষক (Verified Tutors)</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#6366F1' }}>48,500+</div>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>সফল শিক্ষার্থী ও অভিভাবক</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#10B981' }}>64 জেলা</div>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>সারাদেশ জুড়ে কাভারেজ</div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F59E0B' }}>99.2%</div>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>অভিভাবক সন্তুষ্টির রেটিং ⭐</div>
          </div>
        </div>
      </div>
    </section>
  );
}
