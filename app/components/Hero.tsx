'use client';

import { useEffect, useState } from 'react';
import PhotoBubbles from './PhotoBubbles';

const roles = ['Developer', 'Researcher', 'Filmmaker', 'Builder'];

export default function Hero() {
  const [shown, setShown] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const role = roles[roleIdx];
    if (typing) {
      if (typed.length < role.length) {
        const t = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [typed, typing, roleIdx]);

  const codelines: [number, React.ReactNode][] = [
    [1, <span key={1} style={{color:'#444',fontStyle:'italic'}}>{'// vkn — portfolio.tsx'}</span>],
    [2, <span key={2}><span className="syn-keyword">import</span>{' {'}<span className="syn-func">Developer</span>{'} '}<span className="syn-keyword">from</span>{' '}<span className="syn-string">&apos;./universe&apos;</span></span>],
    [3, null],
    [4, <span key={4}><span className="syn-keyword">const</span> <span className="syn-var">Portfolio</span> = () =&gt; {'{'}</span>],
    [5, <span key={5}><span style={{paddingLeft:16}}/><span className="syn-keyword">return</span> {'('}</span>],
    [6, <span key={6}><span style={{paddingLeft:32}}/>&lt;<span className="syn-type">Developer</span></span>],
    [7, <span key={7}><span style={{paddingLeft:48}}/><span className="syn-prop">name</span>=<span className="syn-string">&quot;Viraat Krishna Nellutla&quot;</span></span>],
    [8, <span key={8}><span style={{paddingLeft:48}}/><span className="syn-prop">role</span>=<span className="syn-string">&quot;Dev · Researcher · Builder&quot;</span></span>],
    [9, <span key={9}><span style={{paddingLeft:48}}/><span className="syn-prop">mission</span>=<span className="syn-string">&quot;Make something that matters&quot;</span></span>],
    [10, <span key={10}><span style={{paddingLeft:48}}/><span className="syn-prop">school</span>=<span className="syn-string">&quot;North Creek High School&quot;</span></span>],
    [11, <span key={11}><span style={{paddingLeft:32}}/>/&gt;</span>],
    [12, <span key={12}><span style={{paddingLeft:16}}/>{')'}</span>],
    [13, <span key={13}>{'};'}</span>],
    [14, null],
    [15, <span key={15}><span className="syn-keyword">export default</span> <span className="syn-var">Portfolio</span>;</span>],
  ];

  return (
    <section id="home" className="section-pad" style={{ padding: '60px 0 80px', position: 'relative' }}>
      <div className="inner-pad" style={{ padding: '0 32px 28px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#444', fontStyle: 'italic', lineHeight: 2 }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>1</span>
            <span>{'// hello world!! Welcome to my portfolio'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>2</span>
            <span />
          </div>
        </div>
      </div>

      <div className="inner-pad" style={{ padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="hero-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, color: '#2D6BFF',
              border: '1px solid rgba(45,107,255,0.25)',
              padding: '4px 12px', borderRadius: 2, marginBottom: 28,
              opacity: shown ? 1 : 0, transition: 'opacity 0.5s',
              letterSpacing: '0.1em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2D6BFF', display: 'inline-block' }} />
              VKN.SYS :: v1.0 ONLINE
            </div>

            <div className={shown ? 'slide-up' : ''} style={{ opacity: shown ? 1 : 0, marginBottom: 4 }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 0.92, letterSpacing: '-2px', color: '#F5F5F5' }}>VIRAAT</div>
            </div>
            <div className={shown ? 'slide-up delay-1' : ''} style={{ opacity: shown ? 1 : 0, marginBottom: 4 }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 0.92, letterSpacing: '-2px', color: '#F5F5F5' }}>KRISHNA <span style={{ color: '#2D6BFF' }}>—</span></div>
            </div>
            <div className={shown ? 'slide-up delay-2' : ''} style={{ opacity: shown ? 1 : 0, marginBottom: 20 }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 0.92, letterSpacing: '-2px', color: '#F5F5F5' }}>NELLUTLA</div>
            </div>

            {/* Photo bubbles carousel — below name */}
            <div className={shown ? 'slide-up delay-2' : ''} style={{ opacity: shown ? 1 : 0, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <PhotoBubbles size={36} gap={4} visible={4} startIndex={0} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#2a2a2a' }}>— that&apos;s me</span>
            </div>

            <div className={shown ? 'slide-up delay-2' : ''} style={{ opacity: shown ? 1 : 0, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {[
                { label: 'Developer', color: '#2D6BFF' },
                { label: 'AI / ML', color: '#4ADE80' },
                { label: 'Filmmaker', color: '#FB923C' },
                { label: 'Builder', color: '#A78BFA' },
              ].map(r => (
                <span key={r.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, color: r.color,
                  border: `1px solid ${r.color}33`,
                  background: `${r.color}0d`,
                  padding: '3px 10px', borderRadius: 2,
                  fontFamily: 'DM Mono, monospace',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, display: 'inline-block' }} />
                  {r.label}
                </span>
              ))}
            </div>

            <div className={shown ? 'slide-up delay-3' : ''} style={{ opacity: shown ? 1 : 0, marginBottom: 32 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, color: '#555', lineHeight: 1.8 }}>
                <span style={{ color: '#2D6BFF' }}>&lt;</span>
                <span style={{ color: '#F5F5F5' }}>{typed}</span>
                <span className="blink" style={{ color: '#2D6BFF' }}>▋</span>
                <span style={{ color: '#2D6BFF' }}> /&gt;</span>
                {' '}Passionate about tech &amp; impact.
              </div>
            </div>

            <div className={shown ? 'slide-up delay-4' : ''} style={{ opacity: shown ? 1 : 0, display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              <a href="#portfolio" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#2D6BFF', color: '#fff',
                fontFamily: 'DM Mono, monospace', fontSize: 13,
                padding: '10px 22px', borderRadius: 2, textDecoration: 'none',
                border: '1px solid #2D6BFF', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a57f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#2D6BFF'}
              >▶ View Projects</a>
              <a href="#about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#888',
                fontFamily: 'DM Mono, monospace', fontSize: 13,
                padding: '10px 22px', borderRadius: 2, textDecoration: 'none',
                border: '1px solid #2a2a2a', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888'; }}
              >⊡ About Me</a>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#888',
                fontFamily: 'DM Mono, monospace', fontSize: 13,
                padding: '10px 22px', borderRadius: 2, textDecoration: 'none',
                border: '1px solid #2a2a2a', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888'; }}
              >✉ Contact</a>
            </div>

            <div className={shown ? 'slide-up delay-5' : ''} style={{ opacity: shown ? 1 : 0 }}>
              <div style={{ fontSize: 10, color: '#333', marginBottom: 8, letterSpacing: '0.15em' }}>LOADED_MODULES:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['REACT', 'NEXT.JS', 'NODE.JS', 'SWIFT', 'JAVA', 'PYTHON', 'ML/AI', 'TYPESCRIPT'].map(m => (
                  <span key={m} className="tag-chip" style={{ color: '#444', borderColor: '#1e1e1e', fontSize: 10 }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={`hero-ide${shown ? ' slide-up delay-2' : ''}`} style={{ opacity: shown ? 1 : 0 }}>
            <div className="ide-window glow-pulse" style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="ide-titlebar">
                <div className="ide-dot ide-dot-red" />
                <div className="ide-dot ide-dot-yellow" />
                <div className="ide-dot ide-dot-green" />
                <span style={{ fontSize: 12, color: '#444', marginLeft: 10 }}>
                  <span style={{ color: '#2D6BFF' }}>●</span> portfolio.tsx
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#2a2a2a' }}>TypeScript JSX</span>
              </div>
              <div style={{ padding: '12px 0' }}>
                {codelines.map(([ln, content]) => (
                  <div key={ln as number} className="code-line">
                    <span className="ln">{ln as number}</span>
                    <span>{content as React.ReactNode}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: 10 }}>
                <a href="#about" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: '#2D6BFF', color: '#fff',
                  fontFamily: 'DM Mono, monospace', fontSize: 12,
                  padding: '7px 14px', borderRadius: 2, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1a57f0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2D6BFF'}
                >▶ Run Profile</a>
                <a href="#portfolio" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'transparent', color: '#666',
                  fontFamily: 'DM Mono, monospace', fontSize: 12,
                  padding: '7px 14px', border: '1px solid #2a2a2a', borderRadius: 2, textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#F5F5F5'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666'; }}
                >⊡ View Projects</a>
              </div>
              <div className="scan-line" />
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
