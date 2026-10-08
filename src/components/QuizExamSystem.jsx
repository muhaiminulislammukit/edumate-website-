import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { MOCK_QUIZ_QUESTIONS } from '../data/mockData';
import { triggerConfetti } from '../utils/confetti';

export default function QuizExamSystem() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [timerActive, setTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isSubmitted) return;
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timerActive, isSubmitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setTimerActive(false);

    // Calculate score
    let score = 0;
    MOCK_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    // If score >= 4, trigger confetti
    if (score >= 4) {
      triggerConfetti();
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(300);
    setTimerActive(true);
  };

  // Score calculations
  const totalQuestions = MOCK_QUIZ_QUESTIONS.length;
  let correctCount = 0;
  if (isSubmitted) {
    MOCK_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correctCount++;
    });
  }
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const grade = percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 60 ? 'A-' : percentage >= 50 ? 'B' : 'F';

  const currentQ = MOCK_QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Quiz Header Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 2rem',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-primary">Model Test Engine</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class 10 SSC Science Revision</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--dark)', fontWeight: '800' }}>
            পদার্থবিজ্ঞান ও উচ্চতর গণিত সাপ্তাহিক মডেল টেস্ট (Weekly Quiz)
          </h2>
        </div>

        {/* Live Timer Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: timeLeft < 60 ? '#FEF2F2' : '#F1F5F9',
          color: timeLeft < 60 ? '#DC2626' : 'var(--dark)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: '700',
          border: '1px solid',
          borderColor: timeLeft < 60 ? '#FCA5A5' : 'var(--card-border)'
        }}>
          <Clock size={18} color={timeLeft < 60 ? '#DC2626' : 'var(--primary)'} />
          <span>Time Remaining: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* If Not Submitted: Question Runner */}
      {!isSubmitted ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Question Stepper Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                {currentQ.subject}
              </span>
            </div>

            {/* Pagination dots */}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {MOCK_QUIZ_QUESTIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: currentQuestionIndex === idx ? 'var(--primary)' : 'var(--card-border)',
                    backgroundColor: selectedAnswers[idx] !== undefined
                      ? 'var(--primary)'
                      : currentQuestionIndex === idx
                        ? 'rgba(79, 70, 229, 0.1)'
                        : '#FFFFFF',
                    color: selectedAnswers[idx] !== undefined ? '#FFFFFF' : 'var(--text-main)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter badge */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: '600' }}>
            {currentQ.chapter}
          </div>

          {/* Question Text */}
          <h3 style={{
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: 'var(--dark)',
            marginBottom: '1.75rem',
            fontWeight: '700'
          }}>
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--card-border)',
                    backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.06)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--primary)' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '700'
                    }}>
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: isSelected ? '700' : '500', color: 'var(--text-main)' }}>
                      {opt}
                    </span>
                  </div>

                  <input
                    type="radio"
                    name={`q-${currentQuestionIndex}`}
                    checked={isSelected}
                    onChange={() => handleSelectOption(oIdx)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Action Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary"
              style={{ visibility: currentQuestionIndex === 0 ? 'hidden' : 'visible' }}
            >
              Previous
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Next Question</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="btn btn-primary btn-lg"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                }}
              >
                Submit & Evaluate Test
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Summary & Full Solution Review */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Result Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: percentage >= 70 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              color: percentage >= 70 ? '#10B981' : '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <Award size={44} />
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
              {percentage >= 80 ? '🎉 অভিনন্দন! চমৎকার পারফরম্যান্স!' : 'পরীক্ষা সম্পন্ন হয়েছে!'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              You scored <strong>{correctCount} out of {totalQuestions}</strong> ({percentage}%) — Grade: <strong>{grade}</strong>
            </p>

            {/* Score Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              maxWidth: '640px',
              margin: '0 auto 2rem'
            }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct Answers</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981' }}>{correctCount}</div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wrong Answers</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#EF4444' }}>{totalQuestions - correctCount}</div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Earned XP</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>+{correctCount * 25} XP</div>
              </div>
            </div>

            <button
              onClick={handleRetake}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={16} />
              <span>Retake Test (আবার পরীক্ষা দিন)</span>
            </button>
          </div>

          {/* Detailed Question Review */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '1.25rem' }}>
              📖 সমাধান ও ব্যাখ্যা (Detailed Solutions)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {MOCK_QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    border: '1px solid',
                    borderColor: isCorrect ? '#A7F3D0' : '#FECACA'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Question {idx + 1}: {q.chapter}</span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: isCorrect ? '#059669' : '#DC2626'
                      }}>
                        {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '0.75rem' }}>
                      {q.question}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      <strong>Your Answer:</strong> {userChoice !== undefined ? q.options[userChoice] : 'Not Attempted'}
                      <br />
                      <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                    </div>

                    <div style={{
                      backgroundColor: '#FFFFFF',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      color: '#475569',
                      borderLeft: '3px solid var(--primary)'
                    }}>
                      💡 <strong>ব্যাখ্যা:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
