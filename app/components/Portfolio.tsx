'use client';

import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    num: '01', name: 'F★ Cancer Foundation',
    tags: ['Nonprofit', 'Healthcare', 'AI'], tagColors: ['#2D6BFF','#4ADE80','#FB923C'],
    desc: 'Founded to raise cancer awareness and donate to St. Jude. Building a low-cost AI breast cancer detection model.',
    detail: 'This nonprofit represents technology and human impact at its most urgent. Working toward a low-cost AI model to detect breast cancer globally — making diagnostics accessible worldwide. Currently fundraising and establishing research partnerships.',
    stack: ['Python', 'TensorFlow', 'CNN', 'Next.js', 'Stripe'],
  },
  {
    num: '02', name: 'Solace',
    tags: ['iOS', 'Swift', 'Wellness'], tagColors: ['#A78BFA','#61DAFB','#4ADE80'],
    desc: 'A breathing & mindfulness iOS app with SwiftUI, AVAudioEngine, and CoreHaptics — science of calm, not just aesthetic.',
    detail: 'Engineered for the moments you need to decompress. Guided breathing with adaptive soundscapes and precision haptic feedback — designed around the science of calm.',
    stack: ['Swift', 'SwiftUI', 'AVAudioEngine', 'CoreHaptics', 'Xcode'],
  },
  {
    num: '03', name: 'Short Film & Motion',
    tags: ['Film', 'Motion Graphics', 'Commercial'], tagColors: ['#FB923C','#F472B6','#FCD34D'],
    desc: 'Writing, directing, and producing original short films alongside motion graphics and commercial productions.',
    detail: 'A body of creative work spanning original short films, motion graphics packages, and commercial productions for local businesses. Every frame is deliberate.',
    stack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
  },
  {
    num: '04', name: 'Chakra Healing',
    tags: ['Web', 'SEO', 'Marketing'], tagColors: ['#4ADE80','#2D6BFF','#A78BFA'],
    desc: 'VP of Marketing for a QHHT regression therapy practice — owning full digital presence, SEO, and social content.',
    detail: 'Full digital ownership for a Quantum Healing Hypnosis Technique (QHHT) practice. Website, SEO strategy, social content creation, and customer acquisition.',
    stack: ['Next.js', 'Tailwind', 'SEO', 'Figma', 'Analytics'],
  },
  {
    num: '05', name: 'Web & App Development',
    tags: ['Full-Stack', 'MERN', 'Mobile'], tagColors: ['#2D6BFF','#FB923C','#4ADE80'],
    desc: 'Building web and mobile applications targeting medical and community challenges — from architecture to deployment.',
    detail: 'Applications built to address real problems — healthcare accessibility and community impact. From MERN stack to Swift to cloud platforms.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Swift', 'Vercel'],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 60);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="section-pad" style={{ padding: '80px 0', borderTop: '1px solid #1a1a1a' }}>
      <div className="inner-pad" style={{ padding: '0 32px' }}>

        <div className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#444', fontStyle: 'italic', marginBottom: 32, lineHeight: 2 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>1</span>
            <span>{'// projects.js — things I built'}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>2</span>
            <span><span className="syn-keyword">const</span> <span className="syn-var">projects</span> = <span className="syn-func">await</span> <span style={{ color: '#4ADE80' }}>fetchWork</span>({'{ filter: '}<span className="syn-string">&apos;all&apos;</span>{' }'})</span>
          </div>
        </div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: '#2D6BFF', marginBottom: 16, textTransform: 'uppercase' }}>// 02 — PORTFOLIO</div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-2px', color: '#F5F5F5', marginBottom: 48, marginLeft: -2 }}>
          WORK<span style={{ color: '#2D6BFF' }}>.</span>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a' }}>
          {projects.map((p, i) => (
            <div key={p.num}>
              <div
                className="portfolio-row reveal"
                onClick={() => setExpanded(expanded === i ? null : i)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
              >
                <div className="portfolio-row-inner" style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: expanded === i ? '#2D6BFF' : '#2a2a2a', minWidth: 28, transition: 'color 0.2s', flexShrink: 0 }}>{p.num}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#2D6BFF', opacity: expanded === i ? 1 : 0, transform: expanded === i ? 'translateX(0)' : 'translateX(-8px)', transition: 'opacity 0.2s, transform 0.2s', flexShrink: 0 }}>→</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 24px)', color: '#F5F5F5', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#444' }}>{p.desc}</div>
                  </div>
                  <div className="portfolio-tags" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
                    {p.tags.map((t, ti) => (
                      <span key={t} style={{
                        fontFamily: 'DM Mono, monospace', fontSize: 10, padding: '2px 8px',
                        border: `1px solid ${p.tagColors[ti]}33`,
                        background: `${p.tagColors[ti]}0d`,
                        borderRadius: 2, color: p.tagColors[ti],
                      }}>{t}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 16, color: '#333', transition: 'transform 0.2s, color 0.2s', transform: expanded === i ? 'rotate(45deg)' : 'rotate(0)', flexShrink: 0 }}>+</span>
                </div>
              </div>

              <div style={{ overflow: 'hidden', maxHeight: expanded === i ? '300px' : '0', transition: 'max-height 0.4s ease' }}>
                <div className="expand-inner" style={{ padding: '0 0 32px 52px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#666', lineHeight: 1.85 }}>{p.detail}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.stack.map(s => (
                      <span key={s} style={{
                        fontFamily: 'DM Mono, monospace', fontSize: 11, padding: '3px 10px',
                        background: 'rgba(45,107,255,0.08)', border: '1px solid rgba(45,107,255,0.2)',
                        borderRadius: 2, color: '#2D6BFF',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
