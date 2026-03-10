'use client';

import { useEffect, useState } from 'react';

interface StickFigureProps {
  onDone: () => void;
}

export default function StickFigure({ onDone }: StickFigureProps) {
  const [phase, setPhase] = useState<'enter' | 'wave' | 'exit'>('enter');
  const [waveAngle, setWaveAngle] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    // Enter → wave after 400ms
    const t1 = setTimeout(() => {
      setPhase('wave');
      setBubbleVisible(true);
    }, 400);

    // Wave arm
    let angle = 0;
    let dir = 1;
    const waveInterval = setInterval(() => {
      angle += dir * 12;
      if (angle > 50 || angle < -10) dir *= -1;
      setWaveAngle(angle);
    }, 40);

    // Exit after 3.2s
    const t2 = setTimeout(() => {
      setPhase('exit');
      setBubbleVisible(false);
      clearInterval(waveInterval);
    }, 3200);

    // Unmount after exit animation
    const t3 = setTimeout(() => {
      onDone();
    }, 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(waveInterval);
    };
  }, [onDone]);

  const translateY = phase === 'enter' ? 0 : phase === 'wave' ? 0 : 120;
  const opacity = phase === 'exit' ? 0 : 1;

  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      right: 48,
      zIndex: 9990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transform: `translateY(${translateY}px)`,
      opacity,
      transition: phase === 'enter'
        ? 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s'
        : 'transform 0.5s ease-in, opacity 0.4s ease-in',
      pointerEvents: 'none',
    }}>
      {/* Speech bubble */}
      <div style={{
        background: '#111',
        border: '1px solid #2D6BFF',
        borderRadius: 8,
        padding: '8px 14px',
        fontFamily: 'DM Mono, monospace',
        fontSize: 13,
        color: '#F5F5F5',
        marginBottom: 8,
        whiteSpace: 'nowrap',
        position: 'relative',
        opacity: bubbleVisible ? 1 : 0,
        transform: bubbleVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.3s, transform 0.3s',
        boxShadow: '0 0 12px rgba(45,107,255,0.3)',
      }}>
        Hi! I&apos;m Viraat 👋
        {/* Bubble tail */}
        <div style={{
          position: 'absolute',
          bottom: -7,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '7px solid #2D6BFF',
        }} />
      </div>

      {/* SVG Stick Figure */}
      <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
        {/* Head circle */}
        <circle cx="40" cy="18" r="14" stroke="#2D6BFF" strokeWidth="2.5" fill="#0A0A0A" />

        {/* V face */}
        <path
          d="M33 13 L40 21 L47 13"
          stroke="#2D6BFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Eyes - small dots */}
        <circle cx="35.5" cy="13" r="1.5" fill="#F5F5F5" />
        <circle cx="44.5" cy="13" r="1.5" fill="#F5F5F5" />

        {/* Body */}
        <line x1="40" y1="32" x2="40" y2="72" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right arm (static) */}
        <line x1="40" y1="45" x2="20" y2="58" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left arm (waving) — rotates from shoulder */}
        <g transform={`rotate(${-waveAngle}, 40, 45)`}>
          <line x1="40" y1="45" x2="62" y2="35" stroke="#2D6BFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Hand wave lines */}
          <line x1="62" y1="35" x2="66" y2="28" stroke="#2D6BFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="62" y1="35" x2="67" y2="33" stroke="#2D6BFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="62" y1="35" x2="65" y2="38" stroke="#2D6BFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Left leg */}
        <line x1="40" y1="72" x2="26" y2="96" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right leg */}
        <line x1="40" y1="72" x2="54" y2="96" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left foot */}
        <line x1="26" y1="96" x2="18" y2="96" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right foot */}
        <line x1="54" y1="96" x2="62" y2="96" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Shadow */}
      <div style={{
        width: 40, height: 6,
        background: 'rgba(45,107,255,0.15)',
        borderRadius: '50%',
        marginTop: -4,
        filter: 'blur(3px)',
      }} />
    </div>
  );
}
