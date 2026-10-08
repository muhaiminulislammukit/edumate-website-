import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  Sparkles,
  User,
  Clock,
  Eye,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { ALL_CLASSES, ALL_SUBJECTS, DISTRICTS, MEDIUMS } from '../data/mockData';

export default function TutorMarketplace({
  tutors,
  initialFilters = {},
  onSelectTutor,
  onBookDemo
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(initialFilters.classLevel || 'All');
  const [selectedSubject, setSelectedSubject] = useState(initialFilters.subject || 'All');
  const [selectedMedium, setSelectedMedium] = useState(initialFilters.medium || 'All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.location || 'All');
  const [selectedMode, setSelectedMode] = useState(initialFilters.mode || 'All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxBudget, setMaxBudget] = useState(15000);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'price-desc'

  // Filter Logic
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Search query (name, university, subject)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = tutor.name.toLowerCase().includes(q);
        const matchUni = tutor.university.toLowerCase().includes(q);
        const matchSub = tutor.subjects.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchUni && !matchSub) return false;
      }

      // Class Filter
      if (selectedClass !== 'All') {
        const hasClass = tutor.classes.some(c => c.toLowerCase().includes(selectedClass.toLowerCase()));
        if (!hasClass) return false;
      }

      // Subject Filter
      if (selectedSubject !== 'All') {
        const cleanSub = selectedSubject.split(' (')[0].toLowerCase();
        const hasSub = tutor.subjects.some(s => s.toLowerCase().includes(cleanSub));
        if (!hasSub) return false;
      }

      // Medium Filter
      if (selectedMedium !== 'All') {
        const cleanMed = selectedMedium.split(' (')[0].toLowerCase();
        const hasMed = tutor.preferredMediums.some(m => m.toLowerCase().includes(cleanMed));
        if (!hasMed) return false;
      }

      // Gender Filter
      if (selectedGender !== 'All' && tutor.gender !== selectedGender) {
        return false;
      }

      // Location Filter
      if (selectedLocation !== 'All') {
        if (!tutor.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Mode Filter (Home Tutor, Online, Coaching Batch)
      if (selectedMode !== 'All') {
        const targetMode = selectedMode === 'online' ? 'Online' : selectedMode === 'home' ? 'Home Tutor' : selectedMode;
        if (!tutor.modes.includes(targetMode)) {
          return false;
        }
      }

      // Verified Only
      if (verifiedOnly && !tutor.verified) {
        return false;
      }

      // Budget (hourly fee comparison)
      if (tutor.hourlyFee * 12 > maxBudget) {
        // approximate comparison
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.hourlyFee - b.hourlyFee;
      if (sortBy === 'price-desc') return b.hourlyFee - a.hourlyFee;
      return 0;
    });
  }, [
    tutors,
    searchQuery,
    selectedClass,
    selectedSubject,
    selectedMedium,
    selectedGender,
    selectedLocation,
    selectedMode,
    verifiedOnly,
    maxBudget,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedClass('All');
    setSelectedSubject('All');
    setSelectedMedium('All');
    setSelectedGender('All');
    setSelectedLocation('All');
    setSelectedMode('All');
    setVerifiedOnly(false);
    setMaxBudget(15000);
    setSortBy('rating');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-primary">Tutor Discovery Engine</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredTutors.length}</strong> verified tutors
            </span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--dark)' }}>
            বাংলাদেশব্যাপী দক্ষ ও ভেরিফাইড শিক্ষক খুঁজুন
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            BUET, DU, Medical, এবং স্বনামধন্য বিশ্ববিদ্যালয়ের সেরা শিক্ষকদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        {/* Global Search & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '420px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            <input
              type="text"
              placeholder="Search tutor name, BUET, Physics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', height: '44px' }}
            />
          </div>
          <button
            onClick={resetFilters}
            className="btn btn-secondary btn-sm"
            style={{ height: '44px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            title="Reset all filters"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Tutor Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 300px) 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="marketplace-layout">
        <style>{`
          @media (max-width: 960px) {
            .marketplace-layout { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Filter Sidebar */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)',
          position: 'sticky',
          top: '90px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--dark)' }}>
              <SlidersHorizontal size={18} color="var(--primary)" />
              <span>Smart Filters (ফিল্টার)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>
              {filteredTutors.length} Available
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Verified Badge Only Switch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              padding: '0.75rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#065F46' }}>
                  Verified Only (যাচাইকৃত)
                </span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            {/* Tuition Mode (Home / Online) */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Tuition Mode (পড়ার মাধ্যম)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                {[
                  { id: 'All', label: 'All' },
                  { id: 'Home Tutor', label: 'Home 🏠' },
                  { id: 'Online', label: 'Online 💻' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    style={{
                      padding: '0.45rem 0.2rem',
                      fontSize: '0.75rem',
                      fontWeight: selectedMode === mode.id ? '700' : '600',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: selectedMode === mode.id ? 'var(--primary)' : 'var(--card-border)',
                      backgroundColor: selectedMode === mode.id ? 'rgba(79, 70, 229, 0.08)' : '#FFFFFF',
                      color: selectedMode === mode.id ? 'var(--primary)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Class / Grade */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Class (শ্রেণি)
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.875rem' }}
              >
                <option value="All">All Classes (সব শ্রেণি)</option>
                {ALL_CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Subject (বিষয়)
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.875rem' }}
              >
                <option value="All">All Subjects (সব বিষয়)</option>
                {ALL_SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Medium */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Curriculum Medium (মাধ্যমিক)
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.875rem' }}
              >
                <option value="All">All Mediums (সব মাধ্যম)</option>
                {MEDIUMS.map((m) => (
                  <option key={m.id} value={m.label}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Location (Area) */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Location / Area (এলাকা)
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.875rem' }}
              >
                <option value="All">Any Location (যেকোনো এলাকা)</option>
                <optgroup label="Dhaka City">
                  {DISTRICTS[0].areas.map(a => <option key={a} value={a}>{a}, Dhaka</option>)}
                </optgroup>
                <optgroup label="Chattogram City">
                  {DISTRICTS[1].areas.map(a => <option key={a} value={a}>{a}, Ctg</option>)}
                </optgroup>
              </select>
            </div>

            {/* Tutor Gender */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Tutor Gender (শিক্ষকের লিঙ্গ)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                {['All', 'Male', 'Female'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(gender)}
                    style={{
                      padding: '0.45rem 0.2rem',
                      fontSize: '0.75rem',
                      fontWeight: selectedGender === gender ? '700' : '600',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: selectedGender === gender ? 'var(--primary)' : 'var(--card-border)',
                      backgroundColor: selectedGender === gender ? 'rgba(79, 70, 229, 0.08)' : '#FFFFFF',
                      color: selectedGender === gender ? 'var(--primary)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
                Sort By (সর্ট করুন)
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.875rem' }}
              >
                <option value="rating">Top Rated (সর্বোচ্চ রেটিং)</option>
                <option value="price-asc">Fee: Low to High (কম ফি)</option>
                <option value="price-desc">Fee: High to Low (বেশি ফি)</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Tutors Listing Grid */}
        <div>
          {filteredTutors.length === 0 ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--card-border)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Search size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                কোনো টিউটর পাওয়া যায়নি!
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                আপনার নির্বাচিত ফিল্টারের সাথে মিল রেখে কোনো শিক্ষক পাওয়া যায়নি। ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।
              </p>
              <button onClick={resetFilters} className="btn btn-primary btn-sm">
                ফিল্টার রিসেট করুন (Reset Filters)
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
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
                  {/* Card Header & Avatar */}
                  <div style={{ padding: '1.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={tutor.photo}
                          alt={tutor.name}
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '16px',
                            objectFit: 'cover',
                            border: '2px solid rgba(79, 70, 229, 0.2)'
                          }}
                        />
                        {tutor.verified && (
                          <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            right: '-4px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            padding: '2px',
                            display: 'flex'
                          }} title="NID & University Verified">
                            <CheckCircle2 size={18} color="#10B981" fill="#ECFDF5" />
                          </div>
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.25rem' }}>
                          <h3 style={{ fontSize: '1.1rem', color: 'var(--dark)', fontWeight: '700' }}>
                            {tutor.name}
                          </h3>
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: 'var(--primary)',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          marginTop: '2px'
                        }}>
                          <GraduationCap size={14} />
                          <span>{tutor.university}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginTop: '0.4rem',
                          fontSize: '0.78rem'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: '700', color: '#D97706' }}>
                            <Star size={13} fill="#F59E0B" color="#F59E0B" />
                            {tutor.rating}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>({tutor.reviewsCount} reviews)</span>
                          <span style={{ color: '#059669', fontWeight: '600' }}>• {tutor.studentsTaught}+ Students</span>
                        </div>
                      </div>
                    </div>

                    {/* Mode & Verified Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
                      {tutor.verified && (
                        <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                          Verified Tutor ✓
                        </span>
                      )}
                      {tutor.modes.map((mode) => (
                        <span
                          key={mode}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '6px',
                            backgroundColor: mode === 'Home Tutor' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(6, 182, 212, 0.08)',
                            color: mode === 'Home Tutor' ? 'var(--primary)' : '#0891B2',
                            fontWeight: '600'
                          }}
                        >
                          {mode === 'Home Tutor' ? '🏠 Home' : '💻 Online'}
                        </span>
                      ))}
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        backgroundColor: '#F1F5F9',
                        color: 'var(--text-muted)',
                        fontWeight: '500'
                      }}>
                        {tutor.experience}
                      </span>
                    </div>

                    {/* Subjects Taught */}
                    <div style={{ marginBottom: '0.85rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600' }}>
                        Subjects:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {tutor.subjects.map((sub) => (
                          <span
                            key={sub}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.55rem',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              color: 'var(--text-main)',
                              fontWeight: '500'
                            }}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location & Time */}
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={13} color="var(--primary)" />
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {tutor.location}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="var(--accent)" />
                        <span>{tutor.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Fees & Actions */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderTop: '1px solid var(--card-border)',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                        Tuition Fee
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--dark)' }}>
                        {tutor.monthlyFee}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => onSelectTutor(tutor)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.45rem 0.65rem' }}
                        title="View Full Credentials & Reviews"
                      >
                        <Eye size={14} />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => onBookDemo(tutor)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.45rem 0.75rem' }}
                      >
                        <span>Book Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
