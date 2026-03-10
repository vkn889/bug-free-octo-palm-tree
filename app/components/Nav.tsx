'use client';

import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['About', 'Portfolio', 'Contact'];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(10,10,10,0.88)',
          borderBottom: '1px solid #1a1a1a',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.25s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Logo */}
          <a href="#" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#F5F5F5', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            VK<span style={{ color: '#2D6BFF' }}>N</span>
            <span style={{ color: '#2D6BFF', marginLeft: 2 }}>—</span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 40 }} className="desktop-nav">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 13,
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#2D6BFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'DM Mono, monospace', fontSize: 11,
              color: '#4ADE80', border: '1px solid #1e3a1e',
              padding: '4px 10px', borderRadius: 2,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
              ONLINE
            </span>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4, display: 'none' }}
              className="hamburger"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1"/>
                <rect y="9" width="20" height="2" rx="1"/>
                <rect y="15" width="20" height="2" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#0A0A0A',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 48,
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 28 }}
            aria-label="Close menu"
          >×</button>
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 36, color: '#F5F5F5', textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
