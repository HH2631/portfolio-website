import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WELCOME_DURATION = 3500;

function TerminalTypewriter({ text, speed = 70, delay = 600 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className="font-mono text-lg sm:text-xl md:text-2xl text-[#8B8B9E]">
      <span className="text-[#00D4FF]">~</span>
      <span className="text-[#6C63FF] mx-2">&gt;</span>
      <span className="text-[#FAFAFA]">{displayed}</span>
      <span className={`text-[#6C63FF] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const particles = [];
    const PARTICLE_COUNT = 120;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default function WelcomeScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onLoadingComplete?.(), 800);
    }, WELCOME_DURATION);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onLoadingComplete?.(), 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0A0A0F] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
          onClick={handleSkip}
        >
          <ParticleCanvas />

          <div className="relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight">
                <span className="gradient-text">H</span>
                <span className="text-white mx-1">.</span>
                <span className="gradient-text">H</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <TerminalTypewriter text="hhijazi.vercel.app" speed={65} delay={900} />
            </motion.div>

            <motion.p
              className="text-xs text-[#8B8B9E] tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              Click anywhere to enter
            </motion.p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[rgba(108,99,255,0.2)]" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[rgba(108,99,255,0.2)]" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[rgba(108,99,255,0.2)]" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[rgba(108,99,255,0.2)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
