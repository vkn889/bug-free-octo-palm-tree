'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const socials = [
    { label: 'GitHub', href: 'https://github.com/vkn889', color: '#888', border: '#2a2a2a',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/viraat-nellutla-55b550322/', color: '#888', border: '#2a2a2a',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: 'Instagram', href: 'https://www.instagram.com/viraatnellutla88/', color: '#888', border: '#2a2a2a',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    { label: 'YouTube', href: 'https://www.youtube.com/@cheesewx', color: '#2D6BFF', border: 'rgba(45,107,255,0.4)',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-pad" style={{ padding: '80px 0 40px', borderTop: '1px solid #1a1a1a' }}>
      <div className="inner-pad" style={{ padding: '0 32px' }}>

        <div className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#444', fontStyle: 'italic', marginBottom: 32, lineHeight: 2 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>1</span>
            <span>{'// contact.css — get in touch'}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>2</span>
            <span><span style={{ color: '#A78BFA' }}>sendMessage</span>({'{ to: '}<span className="syn-string">&apos;vkn889@gmail.com&apos;</span>{' }'})</span>
          </div>
        </div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: '#2D6BFF', marginBottom: 16, textTransform: 'uppercase' }}>// 04 — CONTACT</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="contact-grid">
          <div>
            <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-2px', color: '#F5F5F5', marginBottom: 32, marginLeft: -2 }}>
              LET&apos;S<br />BUILD<span style={{ color: '#2D6BFF' }}>.</span>
            </div>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <a href="mailto:vkn889@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'DM Mono, monospace', fontSize: 16, color: '#F5F5F5', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2D6BFF'}
                onMouseLeave={e => e.currentTarget.style.color = '#F5F5F5'}
              >
                <span style={{ color: '#2D6BFF' }}>→</span> vkn889@gmail.com
              </a>
            </div>
            <div className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'DM Mono, monospace', fontSize: 12, color: s.color, border: `1px solid ${s.border}`, padding: '8px 16px', borderRadius: 2, textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s, background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#F5F5F5'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.color = s.color; }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Code block */}
          <div className="reveal ide-window">
            <div className="ide-titlebar">
              <div className="ide-dot ide-dot-red" /><div className="ide-dot ide-dot-yellow" /><div className="ide-dot ide-dot-green" />
              <span style={{ fontSize: 12, color: '#444', marginLeft: 10 }}><span style={{ color: '#A78BFA' }}>●</span> contact.css</span>
            </div>
            <div style={{ padding: '16px 0' }}>
              {[
                [1, <span key={1}><span className="syn-comment">{'/* reach out */'}</span></span>],
                [2, null],
                [3, <span key={3}><span className="syn-var">.viraat</span> {'{'}</span>],
                [4, <span key={4}><span style={{paddingLeft:16}}/><span className="syn-prop">email</span>: <span className="syn-string">vkn889@gmail.com</span>;</span>],
                [5, <span key={5}><span style={{paddingLeft:16}}/><span className="syn-prop">location</span>: <span className="syn-string">Washington, USA</span>;</span>],
                [6, <span key={6}><span style={{paddingLeft:16}}/><span className="syn-prop">status</span>: <span className="syn-string">open to opportunities</span>;</span>],
                [7, <span key={7}><span style={{paddingLeft:16}}/><span className="syn-prop">response-time</span>: <span className="syn-string">24h</span>;</span>],
                [8, <span key={8}>{'}'}</span>],
              ].map(([ln, content]) => (
                <div key={ln as number} className="code-line">
                  <span className="ln">{ln as number}</span>
                  <span>{content as React.ReactNode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#333' }}>Member of <span style={{ color: '#444' }}>FBLA · DECA · TSA</span></div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#2a2a2a' }}>© 2025 Viraat Krishna Nellutla · Built by <span style={{ color: '#2D6BFF' }}>VKN</span> · v1.0</div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}
