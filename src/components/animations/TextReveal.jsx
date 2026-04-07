import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 40,
  stagger = 0.03,
  trigger,
  once = true,
}) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = '';

    const wordSpans = words.map((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.display = 'inline-block';
      inner.style.transform = `translateY(${y}px)`;
      inner.style.opacity = '0';
      inner.className = 'text-reveal-char';

      wordSpan.appendChild(inner);
      el.appendChild(wordSpan);

      const space = document.createTextNode('\u00A0');
      el.appendChild(space);

      return inner;
    });

    const triggerEl = trigger ? document.querySelector(trigger) : el;

    gsap.to(wordSpans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        once,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === triggerEl) t.kill();
    });
  }, [children, delay, duration, y, stagger, trigger, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
