import { useRef, useCallback } from 'react';

export default function GlassCard({
  children,
  className = '',
  tilt = true,
  glow = false,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  }, [tilt]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden
        bg-[rgba(255,255,255,0.03)] backdrop-blur-xl
        border border-[rgba(255,255,255,0.06)]
        transition-[box-shadow] duration-300
        ${glow ? 'hover:shadow-[0_0_40px_rgba(108,99,255,0.12)]' : ''}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.3s' }}
      {...props}
    >
      {children}
    </div>
  );
}
