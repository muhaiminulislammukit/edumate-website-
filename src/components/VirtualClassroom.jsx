import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Edit3,
  MessageSquare,
  Users,
  Settings,
  PhoneOff,
  FileText,
  Sparkles,
  Download,
  Trash2,
  RotateCcw,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { saveClassRecording } from '../utils/recordingStore';

export default function VirtualClassroom() {
  const { user } = useAuth();
  const { publishContent } = useLearning();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingMessage, setRecordingMessage] = useState('');
  const recorderRef = useRef(null);
  const recordingStreamRef = useRef(null);
  const [activeTab, setActiveTab] = useState('whiteboard'); // 'whiteboard' | 'chat' | 'notes'
  const [handRaised, setHandRaised] = useState(false);

  // Whiteboard drawing states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#4F46E5');
  const [brushSize, setBrushSize] = useState(3);
  const [toolMode, setToolMode] = useState('pen'); // 'pen' | 'eraser'

  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Engr. Tanvir Ahmed', role: 'Teacher', time: '7:02 PM', text: 'স্বাগতম ক্লাসে! আজকে আমরা নিউটনের ২য় সূত্র ও ঘর্ষণ বলের ম্যাথ করব।' },
    { id: 2, sender: 'Mukit (You)', role: 'Student', time: '7:03 PM', text: 'জি স্যার, খাতা ও ক্যালকুলেটর নিয়ে তৈরি আছি।' },
    { id: 3, sender: 'Engr. Tanvir Ahmed', role: 'Teacher', time: '7:05 PM', text: 'স্ক্রিনে বা হোয়াইটবোর্ডে সমীকরণটা লক্ষ্য করো: F = ma এবং F - f = ma।' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const startClassRecording = async () => {
    setRecordingMessage('');
    if (!navigator.mediaDevices?.getDisplayMedia || !window.MediaRecorder) {
      setRecordingMessage('Screen recording is not supported in this browser. Try a current Chrome or Edge browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const supportedType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
        .find((type) => MediaRecorder.isTypeSupported(type));
      if (!supportedType) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error('This browser cannot encode a WebM recording.');
      }

      const recorder = new MediaRecorder(stream, { mimeType: supportedType });
      const chunks = [];
      recordingStreamRef.current = stream;
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onerror = () => {
        setRecordingMessage('The browser could not record this class. Check screen-capture permissions and try again.');
      };
      recorder.onstop = async () => {
        try {
          const recording = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
          if (recording.size === 0) throw new Error('No screen video was captured. Start screen sharing before recording.');
          const videoId = await saveClassRecording(recording);
          publishContent({
            type: 'recording',
            title: 'Physics: Chapter 3 Force & Friction — Class Recording',
            subject: 'Physics (পদার্থবিজ্ঞান)',
            classLevel: 'Class 10',
            instructor: user?.name || 'EduMate360 Teacher',
            price: 0,
            videoId
          });
          setRecordingMessage('Recording saved in this browser and submitted for admin approval. Students can watch it after approval on this device.');
        } catch (error) {
          console.error('Could not save the class recording.', error);
          setRecordingMessage(error instanceof Error ? error.message : 'Could not save the class recording.');
        } finally {
          recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
          recordingStreamRef.current = null;
          recorderRef.current = null;
          setIsRecording(false);
        }
      };
      stream.getVideoTracks()[0]?.addEventListener('ended', () => {
        if (recorder.state === 'recording') recorder.stop();
      }, { once: true });
      recorder.start(1000);
      setIsRecording(true);
      setRecordingMessage('Recording selected browser tab/screen. Audio is included only if screen sharing provides it.');
    } catch (error) {
      console.error('Could not start class screen recording.', error);
      setRecordingMessage(error instanceof Error ? error.message : 'Could not start screen recording.');
    }
  };

  const stopClassRecording = () => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
  };

  // Canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // High DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Initial canvas background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Default diagram / grid line demonstration
    drawInitialLesson(ctx, rect.width, rect.height);
  }, []);

  const drawInitialLesson = (ctx, w, h) => {
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    // draw subtle graph grid lines
    for (let x = 20; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 20; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw initial physics block diagram
    ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 2.5;
    ctx.fillRect(80, 120, 140, 80);
    ctx.strokeRect(80, 120, 140, 80);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Mass (m = 5 kg)', 95, 165);

    // Force arrow
    ctx.strokeStyle = '#DC2626';
    ctx.fillStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(220, 160);
    ctx.lineTo(320, 160);
    ctx.stroke();
    // arrowhead
    ctx.beginPath();
    ctx.moveTo(320, 160);
    ctx.lineTo(305, 150);
    ctx.lineTo(305, 170);
    ctx.fill();

    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Applied Force F = 20 N', 225, 145);

    // Equation
    ctx.fillStyle = '#4F46E5';
    ctx.font = 'bold 20px "Outfit", sans-serif';
    ctx.fillText('F = m · a  ⟹  a = F / m = 20 / 5 = 4 m/s²', 80, 250);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (toolMode === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.strokeStyle = penColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const insertFormula = (formulaText) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = penColor;
    ctx.font = 'bold 22px "Outfit", sans-serif';
    ctx.fillText(formulaText, 90, 80);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Mukit (You)',
      role: 'Student',
      time: 'Just now',
      text: inputMessage
    };
    setMessages([...messages, newMsg]);
    setInputMessage('');

    // Simulated quick teacher response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'Engr. Tanvir Ahmed',
          role: 'Teacher',
          time: 'Just now',
          text: 'চমৎকার প্রশ্ন! চল হোয়াইটবোর্ডে এই স্টেপটা ড্র করে বুঝিয়ে দিচ্ছি।'
        }
      ]);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Classroom Status Top Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '1rem 1.75rem',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: isRecording ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: isRecording ? '#DC2626' : '#047857',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '700'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isRecording ? '#DC2626' : '#10B981', animation: isRecording ? 'pulseBadge 1.5s infinite' : 'none' }}></span>
            <span>{isRecording ? 'SCREEN RECORDING' : 'LIVE CLASS DEMO'}</span>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--dark)', fontWeight: '800' }}>
              Physics: Chapter 3 Force & Friction (বল ও ঘর্ষণ)
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Instructor: <strong>Engr. Tanvir Ahmed (BUET)</strong> • Class 10 (SSC Batch)
            </p>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user?.role === 'teacher' && (
            <button
              onClick={isRecording ? stopClassRecording : startClassRecording}
              className={`btn btn-sm ${isRecording ? 'btn-secondary' : 'btn-primary'}`}
              style={isRecording ? { color: '#DC2626' } : undefined}
            >
              {isRecording ? 'Stop & save recording' : 'Record this screen'}
            </button>
          )}
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <ExternalLink size={14} />
            <span>Open Google Meet</span>
          </a>
          <button
            onClick={() => setHandRaised(!handRaised)}
            className="btn btn-sm"
            style={{
              backgroundColor: handRaised ? '#FEF3C7' : '#F1F5F9',
              color: handRaised ? '#D97706' : 'var(--text-main)',
              borderColor: handRaised ? '#F59E0B' : '#E2E8F0',
              fontWeight: '700'
            }}
          >
            ✋ {handRaised ? 'Hand Raised!' : 'Raise Hand'}
          </button>
        </div>
      </div>
      {recordingMessage && (
        <p role="status" style={{ background: '#FFFFFF', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          {recordingMessage}
        </p>
      )}
      <p style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#92400E', fontSize: '0.82rem' }}>
        Demo classroom: the participant tiles and call controls are samples, not a connected video call. Teacher recording captures the browser tab/screen they choose and is stored only in this browser; it must be approved by an admin before students can watch it here.
      </p>

      {/* Main Classroom Workspace Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '1.5rem',
        alignItems: 'start'
      }} className="classroom-grid">
        <style>{`
          @media (max-width: 1024px) {
            .classroom-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left Column: Whiteboard & Video Streams */}
        <div>
          {/* Video Streams Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            {/* Teacher Video Box */}
            <div style={{
              height: '190px',
              backgroundColor: '#0B1120',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid rgba(79, 70, 229, 0.4)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                alt="Teacher"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                backdropFilter: 'blur(4px)',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                <span>Engr. Tanvir Ahmed (Host)</span>
              </div>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(11, 17, 32, 0.7)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                color: '#22D3EE',
                fontSize: '0.7rem',
                fontWeight: '700'
              }}>
                HD 1080p
              </div>
            </div>

            {/* Student Video Box */}
            <div style={{
              height: '190px',
              backgroundColor: '#0F172A',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {videoOn ? (
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
                  alt="Student"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: '#94A3B8'
                }}>
                  <VideoOff size={32} />
                  <span style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Camera Off</span>
                </div>
              )}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                backdropFilter: 'blur(4px)',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                <span>Mukit (You)</span>
              </div>
            </div>
          </div>

          {/* Digital Interactive Whiteboard */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
          }}>
            {/* Whiteboard Toolbar */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid var(--card-border)',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>
                  🎨 Whiteboard Tools:
                </span>

                {/* Pen & Eraser buttons */}
                <button
                  onClick={() => setToolMode('pen')}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: toolMode === 'pen' ? 'var(--primary)' : '#FFFFFF',
                    color: toolMode === 'pen' ? '#FFFFFF' : 'var(--text-main)',
                    borderColor: 'var(--card-border)',
                    padding: '0.35rem 0.65rem'
                  }}
                >
                  <Edit3 size={14} />
                  <span>Pen</span>
                </button>
                <button
                  onClick={() => setToolMode('eraser')}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: toolMode === 'eraser' ? 'var(--primary)' : '#FFFFFF',
                    color: toolMode === 'eraser' ? '#FFFFFF' : 'var(--text-main)',
                    borderColor: 'var(--card-border)',
                    padding: '0.35rem 0.65rem'
                  }}
                >
                  <span>Eraser</span>
                </button>

                {/* Color swatches */}
                {['#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#DC2626', '#0B1120'].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setPenColor(color);
                      setToolMode('pen');
                    }}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: penColor === color && toolMode === 'pen' ? '2px solid #000' : '2px solid #FFF',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}
                  />
                ))}

                {/* Brush size */}
                <select
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  style={{
                    padding: '0.2rem 0.4rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    fontSize: '0.75rem',
                    backgroundColor: '#FFF'
                  }}
                >
                  <option value={2}>Thin (2px)</option>
                  <option value={4}>Medium (4px)</option>
                  <option value={8}>Thick (8px)</option>
                </select>
              </div>

              {/* Formula presets & Clear */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => insertFormula('F = ma')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  + F=ma
                </button>
                <button
                  onClick={() => insertFormula('E = ½mv²')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  + E=½mv²
                </button>
                <button
                  onClick={() => insertFormula('a² + b² = c²')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  + Pythagoras
                </button>
                <button
                  onClick={clearCanvas}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.25rem 0.5rem', color: '#DC2626' }}
                  title="Clear Board"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Canvas Surface */}
            <div style={{ position: 'relative', width: '100%', height: '420px', backgroundColor: '#FFFFFF', cursor: 'crosshair' }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>

            {/* Bottom Controls Bar */}
            <div style={{
              backgroundColor: '#0B1120',
              padding: '0.85rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              {/* Mic toggle */}
              <button
                onClick={() => setMicOn(!micOn)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: micOn ? 'rgba(255, 255, 255, 0.15)' : '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              {/* Video toggle */}
              <button
                onClick={() => setVideoOn(!videoOn)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: videoOn ? 'rgba(255, 255, 255, 0.15)' : '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title={videoOn ? 'Turn off video' : 'Turn on video'}
              >
                {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              {/* Screen share toggle */}
              <button
                onClick={() => setScreenSharing(!screenSharing)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: screenSharing ? '#06B6D4' : 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Share Screen"
              >
                <Share2 size={18} />
              </button>

              {/* Leave call */}
              <button
                onClick={() => alert('Leaving the classroom session')}
                style={{
                  height: '42px',
                  padding: '0 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}
              >
                <PhoneOff size={16} />
                <span>Leave Class</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: In-Class Real-Time Chat & Class Notes */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          height: '670px',
          overflow: 'hidden'
        }}>
          {/* Tabs header */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--card-border)',
            backgroundColor: '#F8FAFC'
          }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                flex: 1,
                padding: '0.85rem',
                border: 'none',
                borderBottom: activeTab === 'chat' ? '2px solid var(--primary)' : '2px solid transparent',
                backgroundColor: 'transparent',
                fontWeight: activeTab === 'chat' ? '700' : '600',
                color: activeTab === 'chat' ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <MessageSquare size={16} />
              <span>Live Chat ({messages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                flex: 1,
                padding: '0.85rem',
                border: 'none',
                borderBottom: activeTab === 'notes' ? '2px solid var(--primary)' : '2px solid transparent',
                backgroundColor: 'transparent',
                fontWeight: activeTab === 'notes' ? '700' : '600',
                color: activeTab === 'notes' ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <FileText size={16} />
              <span>Class Notes</span>
            </button>
          </div>

          {/* Chat Pane */}
          {activeTab === 'chat' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {messages.map((msg) => {
                  const isMe = msg.role === 'Student';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '85%'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        marginBottom: '2px',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        justifyContent: isMe ? 'flex-end' : 'flex-start'
                      }}>
                        <span style={{ fontWeight: '700', color: isMe ? 'var(--primary)' : 'var(--dark)' }}>
                          {msg.sender}
                        </span>
                        <span>• {msg.time}</span>
                      </div>
                      <div style={{
                        backgroundColor: isMe ? 'var(--primary)' : '#F1F5F9',
                        color: isMe ? '#FFFFFF' : 'var(--text-main)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="form-input"
                  style={{ height: '40px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ height: '40px' }}>
                  Send
                </button>
              </form>
            </div>
          )}

          {/* Notes Pane */}
          {activeTab === 'notes' && (
            <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Lecture Summary PDF</span>
                  <button className="btn btn-outline-primary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                    <Download size={12} /> Download
                  </button>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Newton's 2nd Law, Inertia, Friction Coefficients, Numerical Examples. Uploaded by Engr. Tanvir.
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(79, 70, 229, 0.05)',
                border: '1px dashed var(--primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  📝 Student Quick Notes
                </h4>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-main)', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                  <li>Remember to calculate normal force N = mg cos(θ) on an inclined plane.</li>
                  <li>Static friction f_s is always greater than kinetic friction f_k.</li>
                  <li>Homework: Solve Board 2024 CQ 1 & 2 for Sunday test.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
