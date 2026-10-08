import React, { useRef, useState } from 'react';
import {
  Bot,
  Sparkles,
  Calendar,
  TrendingDown,
  Send,
  FileQuestion,
} from 'lucide-react';
import { ALL_CLASSES, ALL_SUBJECTS } from '../data/mockData';

export default function AILearningSuite() {
  const [activeTab, setActiveTab] = useState('tutor'); // 'tutor' | 'planner' | 'generator' | 'weakness'

  // AI Tutor State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'আসসালামু আলাইকুম! আমি তোমার EduMate AI Tutor। বাংলাদেশ কারিকুলাম অনুযায়ী পদার্থবিজ্ঞান, উচ্চতর গণিত, ইংরেজি বা যেকোনো বিষয়ের প্রশ্ন করো—আমি সহজভাবে বুঝিয়ে দেবো।'
    }
  ]);
  const nextMessageId = useRef(2);
  const [questionInput, setQuestionInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Study Planner State
  const [examName, setExamName] = useState('SSC Exam 2027');
  const [daysRemaining, setDaysRemaining] = useState('90');
  const [dailyHours, setDailyHours] = useState('5');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [planError, setPlanError] = useState('');

  // Question Generator State
  const [genClass, setGenClass] = useState('Class 10');
  const [genSubject, setGenSubject] = useState('Physics (পদার্থবিজ্ঞান)');
  const [genChapter, setGenChapter] = useState('Chapter 3: Force & Motion');
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [generatedQuestionContext, setGeneratedQuestionContext] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Handle AI Tutor Ask
  const handleAskQuestion = (promptText) => {
    const q = promptText || questionInput;
    if (!q.trim()) return;

    const userMsg = { id: nextMessageId.current++, sender: 'user', text: q };
    setChatMessages((prev) => [...prev, userMsg]);
    setQuestionInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply;
      const lower = q.toLowerCase();

      if (lower.includes('quadratic') || lower.includes('দ্বিঘাত')) {
        aiReply = `দ্বিঘাত সমীকরণ (Quadratic Equation) সমাধানের নিয়ম:\n\nসাধারণ রূপ: ax² + bx + c = 0\nসূত্র: x = (-b ± √(b² - 4ac)) / (2a)\n\nউদাহরণ: x² - 5x + 6 = 0\nএখানে a = 1, b = -5, c = 6।\n1. Discriminant = b² - 4ac = 25 - 24 = 1\n2. x = (5 ± 1) / 2\n3. তাই x = 3 অথবা x = 2।`;
      } else if (lower.includes('newton') || lower.includes('বল') || lower.includes('নিউটন')) {
        aiReply = `নিউটনের দ্বিতীয় গতিসূত্র বলে, ভরবেগের পরিবর্তনের হার প্রযুক্ত বলের সমানুপাতিক।\n\nসরল ক্ষেত্রে: F = ma\n• F = লব্ধি বল (নিউটন)\n• m = ভর (কেজি)\n• a = ত্বরণ (মি/সে²)\n\nউদাহরণ: 2 kg ভরের বস্তুর ত্বরণ 3 m/s² হলে লব্ধি বল 2 × 3 = 6 N।`;
      } else if (lower.includes('binary') || lower.includes('বাইনারি') || lower.includes('ict')) {
        aiReply = `বাইনারি সংখ্যা থেকে দশমিকে রূপান্তর:\n\n(1101)₂ = (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)\n= 8 + 4 + 0 + 1\n= (13)₁₀\n\nডান দিক থেকে অঙ্কগুলোর ঘাত 0 দিয়ে শুরু হয়।`;
      } else if (lower.includes('photosynthesis') || lower.includes('সালোকসংশ্লেষ')) {
        aiReply = `সালোকসংশ্লেষে সবুজ উদ্ভিদ আলো ব্যবহার করে কার্বন ডাই-অক্সাইড ও পানি থেকে গ্লুকোজ তৈরি করে এবং অক্সিজেন ছাড়ে।\n\nসারাংশ: কার্বন ডাই-অক্সাইড + পানি + আলোকশক্তি → গ্লুকোজ + অক্সিজেন\n\nক্লোরোফিল আলো শোষণে সাহায্য করে। সমীকরণটি তোমার বইয়ের সঙ্গে মিলিয়ে নিও।`;
      } else if (lower.includes('fraction') || lower.includes('ভগ্নাংশ')) {
        aiReply = `ভগ্নাংশ যোগ বা বিয়োগের আগে হরগুলো সমান করো।\n\nউদাহরণ: 1/2 + 1/3\nল.সা.গু 6, তাই 1/2 = 3/6 এবং 1/3 = 2/6।\nসুতরাং 1/2 + 1/3 = 5/6।`;
      } else {
        aiReply = `তোমার প্রশ্ন: "${q}"\n\nএই ডেমোতে কয়েকটি পরিচিত বিষয়ের ব্যাখ্যা স্থানীয়ভাবে তৈরি হয়; বাকি প্রশ্নের জন্য এখনো কোনো live AI service যুক্ত নেই।\n\nপ্রশ্নটি আরও নির্দিষ্ট করে লিখে দাও—যেমন শ্রেণি, বিষয়, অধ্যায় এবং কোন ধাপে আটকে গেছ। আমি পরিচিত উদাহরণ দিয়ে সাহায্য করার চেষ্টা করব।`;
      }

      setChatMessages((prev) => [...prev, { id: nextMessageId.current++, sender: 'ai', text: aiReply }]);
      setIsAiTyping(false);
    }, 1000);
  };

  // Handle Study Planner Generation
  const handleGeneratePlan = (e) => {
    e.preventDefault();
    const days = Number(daysRemaining);
    const hours = Number(dailyHours);

    if (!Number.isInteger(days) || days < 1 || days > 365) {
      setPlanError('দিনের সংখ্যা ১ থেকে ৩৬৫-এর মধ্যে লিখুন।');
      return;
    }
    if (!Number.isFinite(hours) || hours < 1 || hours > 16) {
      setPlanError('প্রতিদিনের পড়ার সময় ১ থেকে ১৬ ঘণ্টার মধ্যে লিখুন।');
      return;
    }

    setPlanError('');
    const weeks = [];
    for (let startDay = 1, weekNumber = 1; startDay <= days; startDay += 7, weekNumber += 1) {
      const endDay = Math.min(startDay + 6, days);
      weeks.push({
        week: `Week ${weekNumber}: Days ${startDay}-${endDay}`,
        milestones: [
          `Review and summarize priority chapters for ${examName}.`,
          `Study ${hours} hours daily; use focused blocks for concepts and worked examples.`,
          `Complete a timed practice set and review mistakes before moving on.`
        ]
      });
    }

    setGeneratedPlan({
      exam: examName,
      days,
      hours,
      weeks
    });
  };

  // Handle Question Generator
  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    const subject = genSubject.toLowerCase();
    let questionSet;

    setGeneratedQuestionContext({
      className: genClass,
      subject: genSubject,
      chapter: genChapter.trim()
    });

    if (subject.includes('physics')) {
      questionSet = [{
        stem: 'একটি বস্তু 50 m উচ্চতা থেকে স্থির অবস্থা থেকে পড়লে (g = 9.8 m/s²), ভূমিতে পড়ার ঠিক আগে এর বেগ কতের কাছাকাছি হবে?',
        options: ['14.0 m/s', '31.3 m/s', '49.0 m/s', '98.0 m/s'],
        correctIndex: 1,
        explanation: 'v² = u² + 2gh; u = 0 হলে v = √(2 × 9.8 × 50) ≈ 31.3 m/s.'
      }, {
        stem: 'ভরবেগের SI একক কোনটি?',
        options: ['kg·m/s', 'N/m', 'J/s', 'kg/m³'],
        correctIndex: 0,
        explanation: 'ভরবেগ p = mv, তাই এর SI একক kg·m/s।'
      }];
    } else if (subject.includes('mathematics') || subject.includes('math')) {
      questionSet = [{
        stem: 'x² - 5x + 6 = 0 সমীকরণের মূল কোনটি?',
        options: ['1 ও 6', '2 ও 3', '-2 ও -3', '0 ও 5'],
        correctIndex: 1,
        explanation: 'x² - 5x + 6 = (x - 2)(x - 3), তাই x = 2 অথবা x = 3।'
      }, {
        stem: 'একটি ত্রিভুজের ভূমি 10 cm এবং উচ্চতা 6 cm হলে ক্ষেত্রফল কত?',
        options: ['16 cm²', '30 cm²', '60 cm²', '32 cm²'],
        correctIndex: 1,
        explanation: 'ত্রিভুজের ক্ষেত্রফল = ½ × ভূমি × উচ্চতা = ½ × 10 × 6 = 30 cm²।'
      }];
    } else if (subject.includes('chemistry')) {
      questionSet = [{
        stem: 'কার্বনের পারমাণবিক সংখ্যা কত?',
        options: ['4', '6', '8', '12'],
        correctIndex: 1,
        explanation: 'কার্বনের নিউক্লিয়াসে 6টি প্রোটন থাকে, তাই এর পারমাণবিক সংখ্যা 6।'
      }, {
        stem: 'নিরপেক্ষ পরমাণুতে কোন দুটি কণার সংখ্যা সমান?',
        options: ['প্রোটন ও ইলেকট্রন', 'নিউট্রন ও ইলেকট্রন', 'প্রোটন ও নিউট্রন', 'নিউট্রন ও নিউক্লিয়াস'],
        correctIndex: 0,
        explanation: 'নিরপেক্ষ পরমাণুতে ধনাত্মক প্রোটন ও ঋণাত্মক ইলেকট্রনের সংখ্যা সমান থাকে।'
      }];
    } else if (subject.includes('biology')) {
      questionSet = [{
        stem: 'কোষে অধিকাংশ শক্তি উৎপাদনের সঙ্গে কোন অঙ্গাণু জড়িত?',
        options: ['রাইবোজোম', 'মাইটোকন্ড্রিয়া', 'গলজি বডি', 'কোষপ্রাচীর'],
        correctIndex: 1,
        explanation: 'মাইটোকন্ড্রিয়ায় কোষীয় শ্বসনের মাধ্যমে ATP উৎপন্ন হয়।'
      }, {
        stem: 'উদ্ভিদ কোষে সালোকসংশ্লেষ প্রধানত কোথায় ঘটে?',
        options: ['লাইসোজোম', 'ক্লোরোপ্লাস্ট', 'নিউক্লিয়াস', 'রাইবোজোম'],
        correctIndex: 1,
        explanation: 'ক্লোরোপ্লাস্টের ক্লোরোফিল আলোকশক্তি শোষণ করে সালোকসংশ্লেষে সহায়তা করে।'
      }];
    } else if (subject.includes('ict')) {
      questionSet = [{
        stem: '(1101)₂-এর দশমিক মান কত?',
        options: ['11', '12', '13', '14'],
        correctIndex: 2,
        explanation: '(1101)₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13।'
      }, {
        stem: 'বাইনারি সংখ্যা পদ্ধতিতে কোন অঙ্কগুলো ব্যবহৃত হয়?',
        options: ['0 ও 1', '0 থেকে 7', '0 থেকে 9', '1 ও 2'],
        correctIndex: 0,
        explanation: 'বাইনারি হলো base-2 সংখ্যা পদ্ধতি, যেখানে শুধু 0 এবং 1 ব্যবহৃত হয়।'
      }];
    } else if (subject.includes('english')) {
      questionSet = [{
        stem: 'In “The student solved the problem,” which word names a person?',
        options: ['solved', 'student', 'problem', 'quickly'],
        correctIndex: 2,
        explanation: '“Student” names a person, so it is a noun.'
      }, {
        stem: 'Choose the correct past tense of “write.”',
        options: ['writed', 'wrote', 'written', 'writing'],
        correctIndex: 1,
        explanation: 'The simple past tense of “write” is “wrote.”'
      }];
    } else {
      questionSet = [{
        stem: `When studying “${genChapter.trim()}” in ${genSubject}, what is the best first step?`,
        options: [
          'Memorize every line without checking meaning',
          'Identify the key terms and explain the main idea in your own words',
          'Skip examples and start with the hardest question',
          'Study without taking breaks or reviewing'
        ],
        correctIndex: 1,
        explanation: 'Start by understanding key terms and the main idea, then apply them to examples and practice questions.'
      }, {
        stem: `How can you check your understanding of “${genChapter.trim()}”?`,
        options: [
          'Read the title only',
          'Copy notes without testing yourself',
          'Answer a practice question, then explain why your answer is correct',
          'Avoid reviewing mistakes'
        ],
        correctIndex: 2,
        explanation: 'Retrieval practice and explaining your reasoning reveal whether you understand the topic.'
      }];
    }

    setSelectedAnswers({});
    setGeneratedQuestions(questionSet.map((question, index) => ({
      ...question,
      id: index + 1,
      type: 'MCQ'
    })));
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 50%, rgba(6, 182, 212, 0.08) 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 2.5rem',
        border: '1px solid rgba(79, 70, 229, 0.2)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: '#FFF' }}>
              <Sparkles size={12} /> EduMate AI Suite
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Tailored for Bangladesh NCTB Curriculum
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--dark)', fontWeight: '800' }}>
            🤖 এআই লার্নিং অ্যান্ড স্টাডি অ্যাসিস্ট্যান্ট
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            স্টাডি প্ল্যান, অনুশীলনী প্রশ্ন ও পড়াশোনার সহায়তা। কিছু উত্তর ও প্রশ্ন এই ডেমোতে স্থানীয়ভাবে তৈরি হয়।
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
            Demo mode: a live AI service and your quiz history are not connected.
          </p>
        </div>

        {/* Tab Pills */}
        <div style={{
          display: 'flex',
          backgroundColor: '#FFFFFF',
          padding: '0.35rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--card-border)'
        }}>
          {[
            { id: 'tutor', label: 'AI Tutor Chat', icon: Bot },
            { id: 'planner', label: 'AI Study Planner', icon: Calendar },
            { id: 'generator', label: 'Question Gen', icon: FileQuestion },
            { id: 'weakness', label: 'Weakness Radar', icon: TrendingDown }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: AI Tutor Chat */}
      {activeTab === 'tutor' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-md)',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    alignSelf: isAi ? 'flex-start' : 'flex-end',
                    maxWidth: '85%'
                  }}
                >
                  {isAi && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      flexShrink: 0
                    }}>
                      <Bot size={20} />
                    </div>
                  )}

                  <div style={{
                    backgroundColor: isAi ? '#F8FAFC' : 'var(--primary)',
                    color: isAi ? 'var(--text-main)' : '#FFFFFF',
                    border: isAi ? '1px solid #E2E8F0' : 'none',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.25rem',
                    fontSize: '0.925rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Bot size={18} color="var(--primary)" />
                <span>EduMate AI ভাবছে ও উত্তর তৈরি করছে...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{
            padding: '0.75rem 1.75rem',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', alignSelf: 'center' }}>
              Suggested:
            </span>
            {[
              'দ্বিঘাত সমীকরণ (Quadratic Equation) কীভাবে সমাধান করব?',
              'নিউটনের ২য় গতিসূত্র ও F = ma বুঝিয়ে দাও',
              'ICT বাইনারি সংখ্যা ডেসিমাল করার নিয়ম'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleAskQuestion(chip)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid var(--card-border)', backgroundColor: '#FFFFFF' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleAskQuestion(); }} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="প্রশ্ন লিখুন (যেমন: ত্রিভুজের ক্ষেত্রফল নির্ণয়ের সূত্র বা আলোর প্রতিসরণ)..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="form-input"
                style={{ height: '48px', fontSize: '0.95rem' }}
              />
              <button
                type="submit"
                disabled={isAiTyping}
                className="btn btn-primary"
                style={{ height: '48px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Send size={18} />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: AI Study Planner */}
      {activeTab === 'planner' && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem' }} className="planner-layout">
          <style>{`
            @media (max-width: 960px) {
              .planner-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Input Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>
              📅 স্টাডি প্ল্যান জেনারেটর
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              পরীক্ষার নাম ও বাকি দিন দিন, AI আপনার জন্য প্রতিদিনের পড়ার রুটিন তৈরি করবে।
            </p>

            <form onSubmit={handleGeneratePlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Target Examination
                </label>
                <select
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="form-select"
                >
                  <option value="SSC Exam 2027">SSC Exam 2027</option>
                  <option value="HSC Exam 2026">HSC Exam 2026</option>
                  <option value="BUET / Engineering Admission">BUET / Engineering Admission</option>
                  <option value="Medical Admission (MBBS)">Medical Admission (MBBS)</option>
                  <option value="Class 8 Annual Finals">Class 8 Annual Finals</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Days Remaining (আর কত দিন বাকি?)
                </label>
                <input
                  type="number"
                  value={daysRemaining}
                  onChange={(e) => setDaysRemaining(e.target.value)}
                  min="1"
                  max="365"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                  Daily Study Hours (প্রতিদিন পড়ার সময়)
                </label>
                <input
                  type="number"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(e.target.value)}
                  min="1"
                  max="16"
                  step="0.5"
                  className="form-input"
                  required
                />
              </div>

              {planError && (
                <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem' }}>
                  {planError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Sparkles size={16} />
                <span>Generate Smart Study Plan</span>
              </button>
            </form>
          </div>

          {/* Generated Plan View */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {!generatedPlan ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <Calendar size={48} color="var(--primary)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>কোনো প্ল্যান তৈরি করা হয়নি</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  বামে তথ্য পূরণ করে "Generate Smart Study Plan" বাটনে ক্লিক করুন।
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="badge badge-primary">Personalized Roadmap</span>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--dark)', marginTop: '0.35rem' }}>
                      {generatedPlan.exam} — {generatedPlan.days} Days Schedule
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '700' }}>
                    Target: {generatedPlan.hours} hours/day · {generatedPlan.days * generatedPlan.hours} total study hours
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {generatedPlan.weeks.map((w, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      border: '1px solid #E2E8F0'
                    }}>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: '700' }}>
                        {w.week}
                      </h4>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
                        {w.milestones.map((m, mIdx) => (
                          <li key={mIdx} style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: AI Question Generator */}
      {activeTab === 'generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem' }} className="gen-layout">
          <style>{`
            @media (max-width: 960px) {
              .gen-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>
              📝 প্রশ্ন ও টেস্ট জেনারেটর
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              বিষয়ভিত্তিক নমুনা অনুশীলনী তৈরি করুন। এগুলো স্থানীয় demo question bank থেকে আসে, live AI বা পূর্ণ NCTB question bank থেকে নয়।
            </p>

            <form onSubmit={handleGenerateQuestions} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>Class</label>
                <select value={genClass} onChange={(e) => setGenClass(e.target.value)} className="form-select">
                  {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>Subject</label>
                <select value={genSubject} onChange={(e) => setGenSubject(e.target.value)} className="form-select">
                  {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>Chapter / Topic</label>
                <input
                  type="text"
                  value={genChapter}
                  onChange={(e) => setGenChapter(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Sparkles size={16} />
                <span>Generate Board Questions</span>
              </button>
            </form>
          </div>

          {/* Questions Output */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {!generatedQuestions ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <FileQuestion size={48} color="var(--primary)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>কোনো প্রশ্ন জেনারেট করা হয়নি</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  শ্রেণি ও অধ্যায় নির্বাচন করে "Generate Board Questions" চাপুন।
                </p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                  <span className="badge badge-primary">Local practice samples</span>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--dark)', marginTop: '0.35rem' }}>
                    {generatedQuestionContext.className} — {generatedQuestionContext.subject} ({generatedQuestionContext.chapter})
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {generatedQuestions.map((q) => (
                    <div key={q.id} style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      border: '1px solid #E2E8F0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span className="badge badge-primary">{q.type}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Question {q.id}</span>
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '0.75rem' }}>
                        {q.stem}
                      </div>

                      {q.options && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          {q.options.map((opt, oIdx) => {
                            const selectedIndex = selectedAnswers[q.id];
                            const isSelected = selectedIndex === oIdx;
                            const isCorrect = q.correctIndex === oIdx;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => setSelectedAnswers((answers) => ({ ...answers, [q.id]: oIdx }))}
                                aria-pressed={isSelected}
                                style={{
                                  backgroundColor: isSelected
                                    ? (isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)')
                                    : '#FFFFFF',
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: `1px solid ${isSelected ? (isCorrect ? 'var(--success)' : 'var(--danger)') : '#E2E8F0'}`,
                                  fontSize: '0.85rem',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  color: 'var(--text-main)'
                                }}
                              >
                                {String.fromCharCode(65 + oIdx)}) {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.options && selectedAnswers[q.id] !== undefined && (
                        <div
                          role="status"
                          style={{
                            backgroundColor: q.correctIndex === selectedAnswers[q.id] ? 'var(--success-bg)' : 'var(--danger-bg)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.85rem',
                            color: q.correctIndex === selectedAnswers[q.id] ? '#065F46' : '#991B1B'
                          }}
                        >
                          <strong>{q.correctIndex === selectedAnswers[q.id] ? 'সঠিক উত্তর!' : 'আবার চেষ্টা করো।'}</strong>
                          {' '}{q.explanation}
                        </div>
                      )}

                      {q.subQuestions && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
                          {q.subQuestions.map((sq, sqIdx) => (
                            <div key={sqIdx} style={{ fontSize: '0.875rem', color: 'var(--text-main)', paddingLeft: '0.5rem' }}>
                              {sq}
                            </div>
                          ))}
                        </div>
                      )}

                      {q.ans && (
                        <div style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderLeft: '3px solid #10B981',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          color: '#065F46',
                          fontWeight: '600'
                        }}>
                          ✅ সঠিক উত্তর ও সমাধান: {q.ans}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: AI Weakness Radar & Diagnostic */}
      {activeTab === 'weakness' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
            <span className="badge badge-warning">Sample Diagnostic · Demo Data</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--dark)', marginTop: '0.5rem' }}>
              মডেল টেস্টের ফলাফল বিশ্লেষণ ও দুর্বল বিষয় শনাক্তকরণ
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              নিচের উদাহরণগুলো demo data। এই সংস্করণে কুইজ বা অ্যাসাইনমেন্টের ফলাফল সংরক্ষণ বা বিশ্লেষণ করা হচ্ছে না।
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Weak Topic 1 */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '800', color: '#B45309', fontSize: '1rem' }}>
                  Higher Mathematics: Coordinate Geometry
                </span>
                <span style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '700' }}>
                  Score: 42% (Weak)
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#78350F', lineHeight: 1.5, marginBottom: '1rem' }}>
                সরলরেখার ঢাল ও ক্ষেত্রফল নির্ণয়ে ৩টি টেস্টে ধারাবাহিকভাবে ভুল পাওয়া গেছে।
              </p>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                <strong>AI প্রেসক্রিপশন:</strong> Engr. Tanvir স্যারের "Coordinate Geometry Blueprint" ক্লাসের রেকর্ডিং দেখুন এবং NCTB অনুশীলনীর উদাহরণ ৫-১২ প্র্যাকটিস করুন।
              </div>
            </div>

            {/* Weak Topic 2 */}
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '800', color: '#B91C1C', fontSize: '1rem' }}>
                  Physics: Friction & Momentum Conservation
                </span>
                <span style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '700' }}>
                  Score: 58% (Moderate)
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#991B1B', lineHeight: 1.5, marginBottom: '1rem' }}>
                সংঘর্ষের পূর্বে ও পরের গতিশক্তি সংক্রান্ত গাণিতিক সমস্যায় ভুল ক্যালকুলেশন হচ্ছে।
              </p>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                <strong>AI প্রেসক্রিপশন:</strong> মোমেন্টাম সংরক্ষণ সূত্রের ৫টি MCQ টেস্ট সমাধান করুন।
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
