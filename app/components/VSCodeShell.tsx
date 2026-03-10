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
  { icon: '⊞', label: 'Explorer', active: true },
  { icon: '⌕', label: 'Search' },
  { icon: '⎇', label: 'Source Control' },
  { icon: '⬡', label: 'Extensions' },
];

export default function VSCodeShell({ children }: { children: React.ReactNode }) {
  const [activeFile, setActiveFile] = useState('home.tsx');
  const [openTabs, setOpenTabs] = useState(['home.tsx', 'about.tsx', 'projects.js']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Update active file based on scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const sections = files.map(f => ({
        id: f.section,
        file: f.name,
        top: (document.getElementById(f.section)?.offsetTop ?? 0),
      }));
      const scrollTop = el.scrollTop + 120;
      let current = sections[0];
      for (const s of sections) {
        if (scrollTop >= s.top) current = s;
      }
      setActiveFile(current.file);
      if (!openTabs.includes(current.file)) {
        setOpenTabs(prev => [...prev.slice(-3), current.file]);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [openTabs]);

  const scrollTo = (section: string, file: string) => {
    setActiveFile(file);
    if (!openTabs.includes(file)) setOpenTabs(prev => [...prev, file]);
    const el = document.getElementById(section);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
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
      <div style={{ height: 28, background: '#0D0D0D', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0, borderBottom: '1px solid #1a1a1a', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', cursor: 'pointer' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E', cursor: 'pointer' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', cursor: 'pointer' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#555', letterSpacing: '0.02em' }}>
          <span style={{ color: '#444' }}>vkn-portfolio</span>
          <span style={{ color: '#333' }}> › </span>
          <span style={{ color: '#444' }}>src</span>
          <span style={{ color: '#333' }}> › </span>
          <span style={{ color: '#666' }}>{activeFile}</span>
        </div>
        <div style={{ fontSize: 10, color: '#2D6BFF', border: '1px solid rgba(45,107,255,0.3)', padding: '2px 8px', borderRadius: 2, letterSpacing: '0.1em' }}>
          ● ONLINE
        </div>
      </div>

      {/* Menu Bar */}
      <div style={{ height: 24, background: '#111', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 20, flexShrink: 0, borderBottom: '1px solid #1a1a1a' }}>
        {['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help', 'Copilot'].map(m => (
          <span key={m} style={{ fontSize: 12, color: '#666', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
            {m}
          </span>
        ))}
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Activity Bar */}
        <div style={{ width: 48, background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 4, borderRight: '1px solid #1a1a1a', flexShrink: 0 }}>
          {activityIcons.map((ic, i) => (
            <button
              key={ic.label}
              onClick={() => { if (i === 0) setSidebarOpen(p => !p); }}
              title={ic.label}
              aria-label={ic.label}
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 18, color: (i === 0 && sidebarOpen) ? '#F5F5F5' : '#444',
                borderLeft: (i === 0 && sidebarOpen) ? '2px solid #2D6BFF' : '2px solid transparent',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = (i === 0 && sidebarOpen) ? '#F5F5F5' : '#444')}
            >
              {ic.icon}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button
            title="Settings"
            aria-label="Settings"
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#444', marginBottom: 8 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#888')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >
            ⚙
          </button>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ width: 220, background: '#111', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '10px 16px 6px', fontSize: 11, color: '#555', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
              Explorer
            </div>

            {/* Folder */}
            <button
              onClick={() => setExplorerOpen(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px 4px 12px', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <span style={{ fontSize: 10, color: '#555', transform: explorerOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
              <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Portfolio</span>
            </button>

            {explorerOpen && (
              <div>
                {files.map(f => (
                  <button
                    key={f.name}
                    onClick={() => scrollTo(f.section, f.name)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '5px 8px 5px 28px',
                      background: activeFile === f.name ? 'rgba(45,107,255,0.08)' : 'none',
                      border: 'none',
                      borderLeft: activeFile === f.name ? '2px solid #2D6BFF' : '2px solid transparent',
                      cursor: 'pointer', width: '100%', textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (activeFile !== f.name) e.currentTarget.style.background = '#161616'; }}
                    onMouseLeave={e => { if (activeFile !== f.name) e.currentTarget.style.background = 'none'; }}
                  >
                    <span style={{ fontSize: 14, color: f.color, lineHeight: 1 }}>{f.icon}</span>
                    <span style={{ fontSize: 13, color: activeFile === f.name ? '#F5F5F5' : '#888' }}>{f.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Extra sidebar info */}
            <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 11, color: '#333', marginBottom: 4 }}>OUTLINE</div>
              <div style={{ fontSize: 11, color: '#444', lineHeight: 2 }}>
                {files.map(f => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                    onClick={() => scrollTo(f.section, f.name)}>
                    <span style={{ color: f.color, fontSize: 8 }}>◆</span>
                    <span style={{ color: activeFile === f.name ? '#888' : '#333' }}>{f.name.replace('.tsx','').replace('.js','').replace('.css','')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Tab Bar */}
          <div style={{ height: 35, background: '#0D0D0D', display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #1a1a1a', flexShrink: 0, overflowX: 'auto' }}>
            {openTabs.map(tab => {
              const f = files.find(x => x.name === tab);
              const isActive = activeFile === tab;
              return (
                <div
                  key={tab}
                  onClick={() => scrollTo(f?.section ?? '', tab)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '0 14px',
                    background: isActive ? '#1a1a1a' : 'transparent',
                    borderRight: '1px solid #1a1a1a',
                    borderTop: isActive ? '1px solid #2D6BFF' : '1px solid transparent',
                    cursor: 'pointer', flexShrink: 0,
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontSize: 12, color: f?.color ?? '#888' }}>{f?.icon}</span>
                  <span style={{ fontSize: 13, color: isActive ? '#F5F5F5' : '#555', whiteSpace: 'nowrap' }}>{tab}</span>
                  <span
                    onClick={e => closeTab(e, tab)}
                    style={{ fontSize: 14, color: '#444', marginLeft: 4, lineHeight: 1, transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                  >×</span>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb */}
          <div style={{ height: 22, background: '#111', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 4, borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: '#444' }}>vkn-portfolio</span>
            <span style={{ fontSize: 12, color: '#333' }}> › </span>
            <span style={{ fontSize: 12, color: '#444' }}>src</span>
            <span style={{ fontSize: 12, color: '#333' }}> › </span>
            <span style={{ fontSize: 12, color: files.find(f => f.name === activeFile)?.color ?? '#888' }}>
              {activeFile}
            </span>
          </div>

          {/* Scrollable content */}
          <div
            ref={contentRef}
            style={{ flex: 1, overflowY: 'auto', background: '#0A0A0A', position: 'relative' }}
          >
            {/* Line numbers column */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, background: '#0A0A0A', borderRight: '1px solid #111', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ paddingLeft: 48 }}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: 22, background: '#2D6BFF', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⎇</span> main
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>0 ⚠ 0 ✕</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>TypeScript React</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>UTF-8</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Ln 1, Col 1</span>
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>VKN v1.0</span>
        </div>
      </div>
    </div>
  );
}
