import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Heart,
  Phone,
  Mail,
  MapPin,
  Lock,
  Sparkles
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      backgroundColor: '#0B1120',
      color: '#FFFFFF',
      borderTop: '1px solid #1E293B',
      marginTop: '5rem',
      padding: '4rem 1.5rem 2rem'
    }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <GraduationCap size={24} />
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                EduMate<span style={{ color: '#06B6D4' }}>360</span>
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              বাংলাদেশব্যাপী প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি (SSC, HSC) এবং বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য
              সবচেয়ে বিশ্বস্ত হোম ও অনলাইন টিউটরিং প্ল্যাটফর্ম।
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.8rem', fontWeight: '700' }}>
              <ShieldCheck size={16} />
              <span>100% NID & University Verified Tutors</span>
            </div>
          </div>

          {/* Col 2: Education Structure */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1rem' }}>
              শিক্ষাস্তর (Education Levels)
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: '#94A3B8' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>Play Group, Nursery & KG</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>Primary (Class 1–5)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>Junior Secondary (Class 6–8)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>Secondary & SSC (Class 9–10)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>Higher Secondary & HSC (Class 11–12)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>BUET, Medical & DU Admission Prep</li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1rem' }}>
              প্লাটফর্ম ফিচারসমূহ
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: '#94A3B8' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('tutors')}>টিচার সার্চ ও ফিল্টার</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('home-tuitions')}>হোম টিউশন রিকুয়েস্ট বোর্ড</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('classroom')}>লাইভ ভার্চুয়াল ক্লাস ও হোয়াইটবোর্ড</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('ai-suite')}>AI স্টাডি প্ল্যান ও টিউটর অ্যাসিস্ট্যান্ট</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('quiz')}>সাপ্তাহিক মডেল টেস্ট ও কুইজ</li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>অভিভাবক প্রগ্রেস ট্র্যাকার</li>
            </ul>
          </div>

          {/* Col 4: Contact & Payment */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1rem' }}>
              যোগাযোগ ও পেমেন্ট
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="#06B6D4" />
                <span>হেল্পলাইন: 09612-EDUMATE (০৯৬১২-৩৩৩৩৬০)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="#06B6D4" />
                <span>support@edumate360.com.bd</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="#06B6D4" />
                <span>গুলশান-২ ও মিরপুর ডিওএইচএস, ঢাকা, বাংলাদেশ</span>
              </div>
            </div>

            {/* Payment Method Badges */}
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem', fontWeight: '700' }}>
              SUPPORTED PAYMENT GATEWAYS:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['bKash', 'Nagad', 'Rocket', 'Upay', 'Visa', 'Mastercard'].map(p => (
                <span
                  key={p}
                  style={{
                    backgroundColor: '#1E293B',
                    color: '#E2E8F0',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: '1px solid #1E293B',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 EduMate360 Bangladesh. All rights reserved. Built with ❤️ for Bangladeshi Students & Guardians.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Tutor Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
