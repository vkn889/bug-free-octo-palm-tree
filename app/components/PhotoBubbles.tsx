'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const photos = [
  { src: '/photo1.png', label: 'FBLA Nationals' },
  { src: '/photo2.png', label: 'Las Vegas Sphere' },
  { src: '/photo3.png', label: 'Mini Grand Prix' },
];

interface PhotoBubblesProps {
  size?: number;
  gap?: number;
  inline?: boolean; // true = row of bubbles, false = floating stacked
}

export default function PhotoBubbles({ size = 52, gap = 10, inline = true }: PhotoBubblesProps) {
  const [active, setActive] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  // Auto-cycle highlight
  useEffect(() => {
    if (inline) return;
    const t = setInterval(() => setCurrent(i => (i + 1) % photos.length), 2400);
    return () => clearInterval(t);
  }, [inline]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      {photos.map((p, i) => {
        const isHovered = active === i;
        const isCurrent = current === i;
        return (
          <div
            key={p.src}
            data-hover
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: 'relative',
              width: size,
              height: size,
              borderRadius: '50%',
              overflow: 'visible',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              transform: isHovered ? 'scale(1.15) translateY(-3px)' : 'scale(1)',
              zIndex: isHovered ? 10 : 1,
            }}
          >
            {/* Glow ring */}
            <div style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              border: `2px solid ${isHovered || isCurrent ? '#2D6BFF' : 'rgba(255,255,255,0.08)'}`,
              transition: 'border-color 0.25s',
              zIndex: 2,
              pointerEvents: 'none',
            }} />
            {/* Image */}
            <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
              <Image
                src={p.src}
                alt={p.label}
                fill
                sizes={`${size}px`}
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: 'absolute',
                bottom: size + 8,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#111',
                border: '1px solid #222',
                borderRadius: 3,
                padding: '4px 10px',
                fontFamily: 'DM Mono, monospace',
                fontSize: 10,
                color: '#888',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 20,
              }}>
                {p.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
