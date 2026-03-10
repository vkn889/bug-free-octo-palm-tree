'use client';

import { useEffect, useRef } from 'react';

const achievements = [
  {
    org: 'FBLA',
    fullName: 'Future Business Leaders of America',
    color: '#2D6BFF',
    icon: '◈',
    items: [
      { place: '🥇 1st', event: 'Network Design', level: 'Nationals', detail: 'National Champion' },
      { place: '4th', event: 'Management Information Systems', level: 'Nationals', detail: 'Top 5 National Qualifier' },
      { place: '2×', event: 'National Top 5 Qualifier', level: 'Nationals', detail: 'Multi-year national competitor' },
    ],
  },
  {
    org: 'DECA',
    fullName: 'Distributive Education Clubs of America',
    color: '#4ADE80',
    icon: '◆',
    items: [
      { place: '2×', event: 'Retail Merchandising', level: 'State', detail: 'State Qualifier — Retail Merchandising' },
    ],
  },
  {
    org: 'TSA',
    fullName: 'Technology Student Association',
    color: '#FB923C',
    icon: '◉',
    items: [
      { place: '2×', event: 'State Qualifier', level: 'State', detail: 'Multi-year TSA State Competitor' },
    ],
  },
];

const levelColor: Record<string, string> = {
  'Nationals': '#2D6BFF',
  'State': '#4ADE80',
};

export default function Achievements() {
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
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-pad"
      style={{ padding: '80px 0', borderTop: '1px solid #1a1a1a' }}
    >
      <div className="inner-pad" style={{ padding: '0 32px' }}>

        {/* Section label */}
        <div className="reveal" style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#444', fontStyle: 'italic', marginBottom: 32, lineHeight: 2 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>1</span>
            <span style={{ color: '#444', fontStyle: 'italic' }}>{'// achievements.tsx — competitive record'}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ width: 40, color: '#2a2a2a', textAlign: 'right', marginRight: 24, fontSize: 12, userSelect: 'none', flexShrink: 0 }}>2</span>
            <span>
              <span className="syn-keyword">import</span> <span style={{ color: '#61DAFB' }}>{'{ '}</span><span className="syn-func">Awards</span><span style={{ color: '#61DAFB' }}>{' }'}</span> <span className="syn-keyword">from</span> <span className="syn-string">&apos;./hard-work&apos;</span>
            </span>
          </div>
        </div>

        <div className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: '#2D6BFF', marginBottom: 16, textTransform: 'uppercase' }}>
          // 03 — ACHIEVEMENTS
        </div>

        <div className="reveal" style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(40px, 5vw, 72px)',
          lineHeight: 0.95, letterSpacing: '-2px',
          color: '#F5F5F5', marginBottom: 56, marginLeft: -2,
        }}>
          AWARDS<span style={{ color: '#2D6BFF' }}>.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="achievements-grid">
          {achievements.map((org) => (
            <div
              key={org.org}
              className="reveal ide-window"
              style={{ overflow: 'hidden' }}
            >
              {/* Org header */}
              <div style={{
                padding: '14px 20px',
                background: '#0D0D0D',
                borderBottom: `1px solid ${org.color}22`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18, color: org.color }}>{org.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#F5F5F5' }}>{org.org}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#444', marginTop: 1 }}>{org.fullName}</div>
                </div>
                <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: org.color }} />
              </div>

              {/* Achievement items */}
              <div style={{ padding: '12px 0' }}>
                {org.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 20px',
                      borderBottom: i < org.items.length - 1 ? '1px solid #1a1a1a' : 'none',
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                    }}
                  >
                    {/* Place badge */}
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 800,
                      fontSize: 13, color: org.color,
                      background: `${org.color}12`,
                      border: `1px solid ${org.color}30`,
                      padding: '3px 8px', borderRadius: 2,
                      flexShrink: 0, minWidth: 40, textAlign: 'center',
                    }}>
                      {item.place}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: '#F5F5F5', marginBottom: 3 }}>
                        {item.event}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          fontFamily: 'DM Mono, monospace', fontSize: 10,
                          color: levelColor[item.level] ?? '#888',
                          border: `1px solid ${levelColor[item.level] ?? '#888'}44`,
                          padding: '1px 6px', borderRadius: 2,
                        }}>
                          {item.level}
                        </span>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#444' }}>
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="reveal" style={{ marginTop: 40, padding: '20px 24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 4, display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#444' }}>
            <span style={{ color: '#2D6BFF' }}>const</span> <span style={{ color: '#F5F5F5' }}>summary</span> = {'{'}
          </div>
          {[
            { key: 'nationalTitles', val: '1', color: '#2D6BFF' },
            { key: 'nationalQuals', val: '2', color: '#2D6BFF' },
            { key: 'stateQuals', val: '4', color: '#4ADE80' },
            { key: 'orgs', val: '3', color: '#FB923C' },
          ].map(s => (
            <div key={s.key} style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
              <span style={{ color: '#4ADE80' }}>{s.key}</span>
              <span style={{ color: '#888' }}>: </span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.val}</span>
            </div>
          ))}
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#444' }}>{'}'}</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .achievements-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1200px) { .achievements-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
