'use client';

import { useEffect, useRef } from 'react';
import PhotoBubbles from './PhotoBubbles';

const stats = [
  { num: '3+', label: 'ML Models Built', color: '#2D6BFF' },
  { num: '2×', label: 'FBLA Nationals', color: '#4ADE80' },
  { num: '10+', label: 'Businesses Served', color: '#FB923C' },
  { num: '5+', label: 'Years Building', color: '#A78BFA' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: '80px 0', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ padding: '0 32px' }}>

        {/* Code comment */}
        <div className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#444', fontStyle: 'italic', marginBottom: 32, lineHeight: 2 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>1</span>
            <span>{'// about.tsx — who I am'}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>2</span>
            <span><span className="syn-keyword">const</span> <span className="syn-var">Viraat</span> = <span className="syn-keyword">new</span> <span className="syn-func">Developer</span>({'{ '}school: <span className="syn-string">&apos;North Creek HS&apos;</span>{' }'})</span>
          </div>
        </div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: '#2D6BFF', marginBottom: 16, textTransform: 'uppercase' }}>// 01 — ABOUT</div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-2px', color: '#F5F5F5', marginBottom: 56, marginLeft: -2 }}>
          ABOUT<span style={{ color: '#2D6BFF' }}>.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="about-grid">
          <div>
            <blockquote className="reveal" style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.8vw, 36px)', lineHeight: 1.15, color: '#F5F5F5', borderLeft: '3px solid #2D6BFF', paddingLeft: 20, marginBottom: 16 }}>
                &ldquo;The victor is not victorious if the vanquished does not consider himself so.&rdquo;
              </div>
              <div style={{ paddingLeft: 24 }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 12, color: '#2D6BFF', marginBottom: 6 }}>— Quintus Ennius</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#333', fontStyle: 'italic' }}>Qui vincit non est victor nisi victus fatetur</div>
              </div>
            </blockquote>

            {/* Terminal */}
            <div className="reveal terminal-window">
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div className="ide-dot ide-dot-red" /><div className="ide-dot ide-dot-yellow" /><div className="ide-dot ide-dot-green" />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#444', marginLeft: 8 }}>bash — 80×24</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                {[
                  { p: '~', cmd: 'whoami', out: 'viraat_krishna_nellutla', outColor: '#4ADE80' },
                  { p: '~', cmd: 'cat skills.txt', out: 'HTML · CSS · JS · Java · Swift · ML/AI', outColor: '#FCD34D' },
                  { p: '~', cmd: 'echo $MISSION', out: '"Make something that matters."', outColor: '#2D6BFF' },
                ].map((line, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.8 }}>
                      <span style={{ color: '#4ADE80' }}>{line.p}</span>
                      <span style={{ color: '#2D6BFF' }}> $ </span>
                      <span style={{ color: '#F5F5F5' }}>{line.cmd}</span>
                    </div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.6, color: line.outColor, paddingLeft: 16, marginBottom: 4 }}>{line.out}</div>
                  </div>
                ))}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#4ADE80' }}>
                  ~ $ <span className="blink" style={{ color: '#2D6BFF' }}>▋</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.9, color: '#666', marginBottom: 20 }}>
              I&apos;m <span style={{ color: '#F5F5F5' }}>Viraat Krishna Nellutla</span> — a junior at North Creek High School building at the intersection of technology, medicine, and human impact.
            </p>
            <p className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.9, color: '#666', marginBottom: 20 }}>
              My technical roots are in HTML, CSS, JavaScript, and Java — grown into full-stack development, machine learning, and AI research. My current research focuses on building an <span style={{ color: '#F5F5F5' }}>integrated ML pipeline for early classification of diabetes</span> through non-invasive biomarkers — training, benchmarking, and comparing models, then deploying them into real hardware using <span style={{ color: '#2D6BFF' }}>Raspberry Pi and Arduino</span> to make diagnostics accessible without clinical infrastructure.
            </p>
            <p className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.9, color: '#666', marginBottom: 20 }}>
              Beyond the code: I direct short films, produce motion graphics, and create commercials for local businesses.
            </p>
            <p className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.9, color: '#F5F5F5', marginBottom: 24, borderLeft: '2px solid #2D6BFF', paddingLeft: 16 }}>
              I lead. I compete. I build things that don&apos;t stay theoretical. The throughline: <span style={{ color: '#2D6BFF' }}>make something that matters.</span>
            </p>

            {/* Photo bubbles */}
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, padding: '12px 16px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 4 }}>
              <PhotoBubbles size={44} gap={8} />
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#555', marginBottom: 2 }}>// photos</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#333' }}>FBLA Nationals · Las Vegas Sphere · Mini Grand Prix</div>
              </div>
            </div>

            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {stats.map(s => (
                <div key={s.label} className="stat-tile" style={{ padding: '16px', borderTop: `2px solid ${s.color}` }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 32, color: s.color, marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#444', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
