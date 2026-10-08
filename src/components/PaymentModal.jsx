import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Download,
  Printer
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function PaymentModal({
  isOpen,
  onClose,
  paymentData = { title: 'Tuition Fee Payment', amount: 5000, recipient: 'EduMate360 Escrow' }
}) {
  const [method, setMethod] = useState('bkash'); // 'bkash' | 'nagad' | 'rocket' | 'card'
  const [step, setStep] = useState(1); // 1: method, 2: phone/info, 3: pin/otp, 4: success
  const [phoneNumber, setPhoneNumber] = useState('01712-345678');
  const [pin, setPin] = useState('');
  const [trxId, setTrxId] = useState('');

  if (!isOpen) return null;

  const handleNextToPin = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert('Enter mobile number');
      return;
    }
    setStep(3);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!pin) {
      alert('Enter PIN / OTP');
      return;
    }
    const generatedTrx = `${method.toUpperCase()}-TRX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTrxId(generatedTrx);
    setStep(4);
    triggerConfetti();
  };

  const handleReset = () => {
    setStep(1);
    setPin('');
    onClose();
  };

  const methodsList = [
    { id: 'bkash', name: 'bKash', color: '#D12053', logoText: 'বিকাশ', desc: 'Fast mobile payment' },
    { id: 'nagad', name: 'Nagad', color: '#F7941D', logoText: 'নগদ', desc: 'Post Office Digital' },
    { id: 'rocket', name: 'Rocket', color: '#8C2481', logoText: 'রকেট', desc: 'DBBL Mobile Banking' },
    { id: 'card', name: 'SSLCommerz', color: '#1E293B', logoText: 'Card / Net Banking', desc: 'Visa, Master, Amex' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '0', overflow: 'hidden' }}
      >
        {/* Top Header */}
        <div style={{
          backgroundColor: '#0B1120',
          padding: '1.5rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#06B6D4', fontWeight: '700' }}>
              <Lock size={14} />
              <span>256-BIT SECURE BANGLADESH GATEWAY</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0.2rem' }}>
              EduMate360 Pay
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
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
        </div>

        {/* Invoice Amount Summary */}
        <div style={{
          backgroundColor: '#F8FAFC',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment For</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--dark)' }}>
              {paymentData.title}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Payable</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
              ৳{paymentData.amount?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Modal Body: Steps */}
        <div style={{ padding: '1.75rem' }}>
          {step === 1 && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--dark)', display: 'block', marginBottom: '0.75rem' }}>
                Select Payment Method (পেমেন্ট মাধ্যম বেছে নিন):
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {methodsList.map((m) => {
                  const isSelected = method === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid',
                        borderColor: isSelected ? m.color : '#E2E8F0',
                        backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.04)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.1rem', color: m.color }}>
                          {m.logoText}
                        </span>
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => setMethod(m.id)}
                          style={{ accentColor: m.color }}
                        />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.desc}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ width: '100%', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <span>Proceed with {method.toUpperCase()}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleNextToPin}>
              <div style={{
                backgroundColor: 'rgba(79, 70, 229, 0.06)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                fontSize: '0.85rem'
              }}>
                Payment Method: <strong>{method.toUpperCase()}</strong> (৳{paymentData.amount})
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                  Enter your {method.toUpperCase()} Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-input"
                  style={{ height: '46px', fontSize: '1rem', letterSpacing: '0.05em' }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  A secure 6-digit verification code will be sent to this number.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  Send OTP Code
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleConfirmPayment}>
              <div style={{
                backgroundColor: '#FFFBEB',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                fontSize: '0.8rem',
                color: '#B45309',
                border: '1px solid #FDE68A'
              }}>
                Simulation: OTP <strong>9482</strong> has been sent to {phoneNumber}. Enter PIN to confirm.
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                  Enter {method.toUpperCase()} PIN / OTP
                </label>
                <input
                  type="password"
                  required
                  maxLength={5}
                  placeholder="• • • • •"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="form-input"
                  style={{ height: '46px', fontSize: '1.3rem', textAlign: 'center', letterSpacing: '0.3em' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  Confirm ৳{paymentData.amount}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--dark)', marginBottom: '0.35rem' }}>
                পেমেন্ট সফল হয়েছে! (Payment Success)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Thank you! Your tuition/course booking has been confirmed instantly.
              </p>

              {/* Receipt Box */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px dashed #CBD5E1',
                textAlign: 'left',
                fontSize: '0.825rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Transaction ID:</span>
                  <strong style={{ color: 'var(--primary)' }}>{trxId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Gateway:</span>
                  <span>{method.toUpperCase()} Mobile Banking</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                  <strong style={{ color: '#059669' }}>৳{paymentData.amount}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ color: '#059669', fontWeight: '700' }}>Verified & Escrow Secured ✓</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => alert(`Printing Official Invoice: ${trxId}`)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Download size={14} />
                  <span>Invoice PDF</span>
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
