'use client';

import { useState, useEffect, useRef } from 'react';

const files = [
  { name: 'home.tsx',         icon: '⬡', color: '#61DAFB', section: 'home' },
  { name: 'about.tsx',        icon: '◈', color: '#FB923C', section: 'about' },
  { name: 'projects.js',      icon: '◈', color: '#FCD34D', section: 'portfolio' },
  { name: 'achievements.tsx', icon: '◈', color: '#4ADE80', section: 'achievements' },
  { name: 'contact.css',      icon: '◈', color: '#A78BFA', section: 'contact' },
];

const activityIcons = [
  { icon: '⊞', label: 'Explorer' },
  { icon: '⌕', label: 'Search' },
  { icon: '⎇', label: 'Source Control' },
  { icon: '⬡', label: 'Extensions' },
];

export default function VSCodeShell({ children }: { children: React.ReactNode }) {
  const [activeFile, setActiveFile] = useState('home.tsx');
  const [openTabs, setOpenTabs] = useState(['home.tsx', 'about.tsx', 'projects.js']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Hide sidebar on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const sections = files.map(f => ({
        id: f.section, file: f.name,
        top: document.getElementById(f.section)?.offsetTop ?? 0,
      }));
      const scrollTop = el.scrollTop + 120;
      let current = sections[0];
      for (const s of sections) { if (scrollTop >= s.top) current = s; }
      setActiveFile(current.file);
      if (!openTabs.includes(current.file))
        setOpenTabs(prev => [...prev.slice(-3), current.file]);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [openTabs]);

  const scrollTo = (section: string, file: string) => {
    setActiveFile(file);
    if (!openTabs.includes(file)) setOpenTabs(prev => [...prev, file]);
    const el = document.getElementById(section);
    if (el && contentRef.current)
      contentRef.current.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    if (isMobile) setMobileMenuOpen(false);
  };

  const closeTab = (e: React.MouseEvent, file: string) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== file);
    setOpenTabs(next);
    if (activeFile === file && next.length > 0) setActiveFile(next[next.length - 1]);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0A0A0A', overflow: 'hidden', fontFamily: 'DM Mono, monospace' }}>

      {/* Title Bar */}
      <div style={{ height: 32, background: '#0D0D0D', display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0, borderBottom: '1px solid #1a1a1a', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        </div>
        {/* Mobile: hamburger nav */}
        {isMobile ? (
          <>
            <button
              onClick={() => setMobileMenuOpen(p => !p)}
              aria-label="Navigation menu"
              style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, padding: '0 8px', marginLeft: 4 }}
            >
              ☰
            </button>
            <span style={{ fontSize: 11, color: '#555', flex: 1, textAlign: 'center' }}>vkn-portfolio / {activeFile}</span>
          </>
        ) : (
          <div className="vsc-title-center" style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#555' }}>
            <span style={{ color: '#444' }}>vkn-portfolio</span>
            <span style={{ color: '#333' }}> › </span>
            <span style={{ color: '#444' }}>src</span>
            <span style={{ color: '#333' }}> › </span>
            <span style={{ color: '#666' }}>{activeFile}</span>
          </div>
        )}
        <div style={{ fontSize: 10, color: '#2D6BFF', border: '1px solid rgba(45,107,255,0.3)', padding: '2px 8px', borderRadius: 2, letterSpacing: '0.1em', flexShrink: 0 }}>
          ● ONLINE
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isMobile && mobileMenuOpen && (
        <div style={{ background: '#111', borderBottom: '1px solid #1a1a1a', zIndex: 50 }}>
          {files.map(f => (
            <button key={f.name} onClick={() => scrollTo(f.section, f.name)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 20px', background: activeFile === f.name ? 'rgba(45,107,255,0.08)' : 'none', border: 'none', borderLeft: activeFile === f.name ? '2px solid #2D6BFF' : '2px solid transparent', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ color: f.color, fontSize: 14 }}>{f.icon}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: activeFile === f.name ? '#F5F5F5' : '#888' }}>{f.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Menu Bar — desktop only */}
      {!isMobile && (
        <div className="vsc-menu-bar" style={{ height: 24, background: '#111', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 20, flexShrink: 0, borderBottom: '1px solid #1a1a1a' }}>
          {['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help', 'Copilot'].map(m => (
            <span key={m} style={{ fontSize: 12, color: '#555', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Activity Bar — desktop only */}
        {!isMobile && (
          <div className="vsc-activity" style={{ width: 48, background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 4, borderRight: '1px solid #1a1a1a', flexShrink: 0 }}>
            {activityIcons.map((ic, i) => (
              <button key={ic.label} onClick={() => { if (i === 0) setSidebarOpen(p => !p); }}
                title={ic.label} aria-label={ic.label}
                style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: (i === 0 && sidebarOpen) ? '#F5F5F5' : '#444', borderLeft: (i === 0 && sidebarOpen) ? '2px solid #2D6BFF' : '2px solid transparent', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#888')}
                onMouseLeave={e => (e.currentTarget.style.color = (i === 0 && sidebarOpen) ? '#F5F5F5' : '#444')}
              >{ic.icon}</button>
            ))}
            <div style={{ flex: 1 }} />
            <button title="Settings" aria-label="Settings"
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#444', marginBottom: 8 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}
            >⚙</button>
          </div>
        )}

        {/* Sidebar — desktop only */}
        {!isMobile && sidebarOpen && (
          <div className="vsc-sidebar" style={{ width: 200, background: '#111', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, color: '#555', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>Explorer</div>
            <button onClick={() => setExplorerOpen(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px 4px 12px', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              <span style={{ fontSize: 10, color: '#555', transform: explorerOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
              <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Portfolio</span>
            </button>
            {explorerOpen && (
              <div>
                {files.map(f => (
                  <button key={f.name} onClick={() => scrollTo(f.section, f.name)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px 5px 28px', background: activeFile === f.name ? 'rgba(45,107,255,0.08)' : 'none', border: 'none', borderLeft: activeFile === f.name ? '2px solid #2D6BFF' : '2px solid transparent', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (activeFile !== f.name) e.currentTarget.style.background = '#161616'; }}
                    onMouseLeave={e => { if (activeFile !== f.name) e.currentTarget.style.background = 'none'; }}
                  >
                    <span style={{ fontSize: 14, color: f.color }}>{f.icon}</span>
                    <span style={{ fontSize: 13, color: activeFile === f.name ? '#F5F5F5' : '#888' }}>{f.name}</span>
                  </button>
                ))}
              </div>
            )}
            <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 11, color: '#333', marginBottom: 4 }}>OUTLINE</div>
              {files.map(f => (
                <div key={f.name} onClick={() => scrollTo(f.section, f.name)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', lineHeight: 2 }}>
                  <span style={{ color: f.color, fontSize: 8 }}>◆</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: activeFile === f.name ? '#888' : '#333' }}>
                    {f.name.replace(/\.(tsx|js|css)$/, '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Tab Bar */}
          <div style={{ height: 36, background: '#0D0D0D', display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #1a1a1a', flexShrink: 0, overflowX: 'auto' }}>
            {openTabs.map(tab => {
              const f = files.find(x => x.name === tab);
              const isActive = activeFile === tab;
              return (
                <div key={tab} onClick={() => scrollTo(f?.section ?? '', tab)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', background: isActive ? '#1a1a1a' : 'transparent', borderRight: '1px solid #1a1a1a', borderTop: isActive ? '1px solid #2D6BFF' : '1px solid transparent', cursor: 'pointer', flexShrink: 0, minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: f?.color ?? '#888' }}>{f?.icon}</span>
                  <span style={{ fontSize: isMobile ? 11 : 13, color: isActive ? '#F5F5F5' : '#555', whiteSpace: 'nowrap' }}>{isMobile ? tab.split('.')[0] : tab}</span>
                  <span onClick={e => closeTab(e, tab)} style={{ fontSize: 14, color: '#444', marginLeft: 2, lineHeight: 1, transition: 'color 0.15s', flexShrink: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                  >×</span>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb — desktop only */}
          {!isMobile && (
            <div className="vsc-breadcrumb" style={{ height: 22, background: '#111', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 4, borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#444' }}>vkn-portfolio</span>
              <span style={{ fontSize: 12, color: '#333' }}> › </span>
              <span style={{ fontSize: 12, color: '#444' }}>src</span>
              <span style={{ fontSize: 12, color: '#333' }}> › </span>
              <span style={{ fontSize: 12, color: files.find(f => f.name === activeFile)?.color ?? '#888' }}>{activeFile}</span>
            </div>
          )}

          {/* Scrollable content */}
          <div ref={contentRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', background: '#0A0A0A', position: 'relative' }}>
            <div className="vsc-line-nums" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, background: '#0A0A0A', borderRight: '1px solid #111', pointerEvents: 'none', zIndex: 1 }} />
            <div className="vsc-content-pad" style={{ paddingLeft: 48 }}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: 22, background: '#2D6BFF', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>⎇ main</span>
          {!isMobile && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>0 ⚠ 0 ✕</span>}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {!isMobile && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>TypeScript React</span>}
          {!isMobile && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>UTF-8</span>}
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>VKN v1.0</span>
        </div>
      </div>
    </div>
  );
}
