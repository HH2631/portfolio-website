import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yStart = direction === 'up' ? speed * 100 : -(speed * 100);
    const yEnd = direction === 'up' ? -(speed * 100) : speed * 100;

    gsap.fromTo(
      el,
      { y: yStart },
      {
        y: yEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === el) t.kill();
    });
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
