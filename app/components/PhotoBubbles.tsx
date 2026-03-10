'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ALL_PHOTOS = [
  { src: '/photo1.png', label: 'FBLA Nationals' },
  { src: '/photo4.png', label: 'FBLA National Champion' },
  { src: '/photo5.png', label: 'FBLA Nationals Win' },
  { src: '/photo6.png', label: 'ML Research Poster' },
  { src: '/photo2.png', label: 'Las Vegas Sphere' },
  { src: '/photo3.png', label: 'Mini Grand Prix' },
];

interface PhotoBubblesProps {
  size?: number;
  gap?: number;
  visible?: number;
  startIndex?: number;
}

export default function PhotoBubbles({ size = 48, gap = 8, visible = 4, startIndex = 0 }: PhotoBubblesProps) {
  const [offset, setOffset] = useState(startIndex % ALL_PHOTOS.length);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setOffset(o => (o + 1) % ALL_PHOTOS.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const visiblePhotos = Array.from({ length: visible }, (_, i) => {
    const idx = (offset + i) % ALL_PHOTOS.length;
    return { ...ALL_PHOTOS[idx], key: `${idx}-${i}` };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      {visiblePhotos.map((p, i) => {
        const isHovered = hovered === i;
        return (
          <div
            key={p.key}
            data-hover
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              width: size,
              height: size,
              borderRadius: '50%',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              transform: isHovered ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
              zIndex: isHovered ? 10 : visible - i,
              marginLeft: i > 0 ? -(size * 0.18) : 0,
            }}
          >
            <div style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              border: `2px solid ${isHovered ? '#2D6BFF' : 'rgba(255,255,255,0.07)'}`,
              boxShadow: isHovered ? '0 0 14px rgba(45,107,255,0.4)' : 'none',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', position: 'relative', background: '#111' }}>
              <Image
                src={p.src}
                alt={p.label}
                fill
                sizes={`${size}px`}
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {isHovered && (
              <div style={{
                position: 'absolute',
                bottom: size + 10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0D0D0D',
                border: '1px solid #222',
                borderRadius: 3,
                padding: '5px 10px',
                fontFamily: 'DM Mono, monospace',
                fontSize: 10,
                color: '#888',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 30,
              }}>
                {p.label}
              </div>
            )}
          </div>
        );
      })}

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
        {ALL_PHOTOS.map((_, i) => (
          <div
            key={i}
            onClick={() => setOffset(i)}
            data-hover
            style={{
              width: 4, height: 4, borderRadius: '50%',
              background: i === offset % ALL_PHOTOS.length ? '#2D6BFF' : '#222',
              transition: 'background 0.3s',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}
