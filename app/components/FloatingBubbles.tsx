'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PHOTOS = [
  { src: '/photo1.png', label: 'FBLA Nationals' },
  { src: '/photo4.png', label: 'FBLA National Champion' },
  { src: '/photo5.png', label: 'FBLA Nationals Win' },
  { src: '/photo6.png', label: 'ML Research Poster' },
  { src: '/photo2.png', label: 'Las Vegas Sphere' },
  { src: '/photo3.png', label: 'Mini Grand Prix' },
];

// 3 fixed orbital slots
const SLOTS = [
  { startAngle: 30,  radius: 72,  speed: 13, size: 52 },
  { startAngle: 150, radius: 55,  speed: 9,  size: 44 },
  { startAngle: 265, radius: 85,  speed: 16, size: 40 },
];

export default function FloatingBubbles() {
  // Which photo index each slot currently shows
  const [slots, setSlots] = useState([0, 1, 2]);
  // Opacity for each slot (for fade transition)
  const [opacities, setOpacities] = useState([1, 1, 1]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, forceUpdate] = useState(0);

  const posRef = useRef(SLOTS.map(() => ({ x: 0, y: 0 })));
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());
  const nextPhotoRef = useRef(3); // next photo index to cycle in
  const slotTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Orbit animation
  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      SLOTS.forEach((o, i) => {
        const angle = (o.startAngle * Math.PI / 180) + (elapsed / o.speed) * Math.PI * 2;
        posRef.current[i] = {
          x: o.radius * Math.cos(angle),
          y: o.radius * Math.sin(angle),
        };
      });
      forceUpdate(n => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Cycle photos with fade
  useEffect(() => {
    const cycleSlot = (slotIdx: number, delay: number) => {
      const t = setTimeout(() => {
        // Fade out
        setOpacities(prev => { const n = [...prev]; n[slotIdx] = 0; return n; });

        // After fade out, swap photo and fade back in
        const t2 = setTimeout(() => {
          setSlots(prev => {
            const n = [...prev];
            n[slotIdx] = nextPhotoRef.current % PHOTOS.length;
            nextPhotoRef.current++;
            return n;
          });
          setOpacities(prev => { const n = [...prev]; n[slotIdx] = 1; return n; });

          // Schedule next cycle for this slot
          cycleSlot(slotIdx, 3500 + slotIdx * 800);
        }, 400);
        slotTimers.current.push(t2);
      }, delay);
      slotTimers.current.push(t);
    };

    // Stagger slot cycles so they don't all swap at once
    cycleSlot(0, 3000);
    cycleSlot(1, 4800);
    cycleSlot(2, 6200);

    return () => slotTimers.current.forEach(clearTimeout);
  }, []);

  const W = 220;
  const H = 220;
  const cx = W / 2;
  const cy = H / 2;

  return (
    <div style={{ position: 'relative', width: W, height: H, flexShrink: 0 }}>
      {/* Faint orbit rings */}
      {[55, 72, 85].map(r => (
        <div key={r} style={{
          position: 'absolute',
          left: cx - r, top: cy - r,
          width: r * 2, height: r * 2,
          borderRadius: '50%',
          border: '1px solid rgba(45,107,255,0.05)',
          pointerEvents: 'none',
        }} />
      ))}

      {SLOTS.map((slot, i) => {
        const pos = posRef.current[i];
        const photo = PHOTOS[slots[i]];
        const isHovered = hovered === i;
        const left = cx + pos.x - slot.size / 2;
        const top  = cy + pos.y - slot.size / 2;

        return (
          <div
            key={i}
            data-hover
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'absolute',
              left, top,
              width: slot.size,
              height: slot.size,
              cursor: 'pointer',
              zIndex: isHovered ? 20 : 1,
              opacity: opacities[i],
              transition: 'opacity 0.4s ease, filter 0.2s',
              filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
            }}
          >
            <div style={{
              position: 'absolute', inset: -2, borderRadius: '50%',
              border: `2px solid ${isHovered ? '#2D6BFF' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: isHovered ? '0 0 16px rgba(45,107,255,0.45)' : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              pointerEvents: 'none', zIndex: 2,
            }} />
            <div style={{ width: slot.size, height: slot.size, borderRadius: '50%', overflow: 'hidden', position: 'relative', background: '#111' }}>
              <Image src={photo.src} alt={photo.label} fill sizes={`${slot.size}px`} style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            {isHovered && (
              <div style={{
                position: 'absolute', bottom: slot.size + 8, left: '50%',
                transform: 'translateX(-50%)',
                background: '#0D0D0D', border: '1px solid #222',
                borderRadius: 3, padding: '4px 10px',
                fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#888',
                whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 30,
              }}>
                {photo.label}
              </div>
            )}
          </div>
        );
      })}

      {/* Center dot */}
      <div style={{ position: 'absolute', left: cx - 3, top: cy - 3, width: 6, height: 6, borderRadius: '50%', background: '#2D6BFF', opacity: 0.35, pointerEvents: 'none' }} />
    </div>
  );
}
