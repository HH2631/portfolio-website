import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Globe,
  Smartphone,
  CalendarCheck2,
  Wand2,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import MagneticButton from '../animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhatICanBuildForYou() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const solutions = useMemo(
    () => [
      {
        icon: Bot,
        title: 'AI Automation Systems',
        description: 'Automate repetitive tasks like bookings, responses, and workflows using AI.',
      },
      {
        icon: Globe,
        title: 'Business Websites',
        description: 'Modern, fast, and responsive websites designed to convert visitors into customers.',
      },
      {
        icon: Smartphone,
        title: 'Mobile Applications',
        description: 'Custom iOS & Android apps built for performance and scalability.',
      },
      {
        icon: CalendarCheck2,
        title: 'Full Booking Systems',
        description: 'End-to-end booking platforms for clinics, salons, or services.',
      },
      {
        icon: Wand2,
        title: 'Custom AI Tools',
        description: 'Smart internal tools powered by AI to improve productivity and decision-making.',
      },
      {
        icon: Rocket,
        title: 'MVP Development',
        description: 'Turn your idea into a working product quickly with clean, scalable code.',
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 22, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-i-can-build-heading"
      className="relative py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-[32px]"
            style={{
              background:
                'radial-gradient(900px 400px at 20% 0%, rgba(108,99,255,0.10) 0%, transparent 70%), radial-gradient(700px 380px at 80% 20%, rgba(0,212,255,0.08) 0%, transparent 70%)',
            }}
          />

          <GlassCard className="p-6 sm:p-10 lg:p-12">
            <div ref={headingRef} className="text-center max-w-3xl mx-auto" style={{ opacity: 0 }}>
              <p className="text-sm uppercase tracking-[0.2em] text-[#6C63FF] mb-3 font-medium">
                Solutions
              </p>
              <h2 id="what-i-can-build-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <GradientText animate>What I Can Build For You</GradientText>
              </h2>
              <p className="mt-4 text-[#8B8B9E] text-base sm:text-lg">
                Real solutions that help businesses save time, increase revenue, and scale faster.
              </p>
            </div>

            <div
              ref={gridRef}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="group">
                    <GlassCard
                      tilt
                      glow
                      className="p-5 sm:p-6 h-full transition-transform duration-300 group-hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(108,99,255,0.14), rgba(0,212,255,0.10))',
                          }}
                        >
                          <Icon className="w-5 h-5 text-[#6C63FF]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-white">{s.title}</h3>
                          <p className="mt-1 text-sm text-[#8B8B9E] leading-relaxed">{s.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>

            <div ref={ctaRef} className="mt-10 text-center" style={{ opacity: 0 }}>
              <p className="text-[#8B8B9E] mb-4">Have something in mind? Let’s build it.</p>
              <MagneticButton as="a" href="#Contact" strength={0.22} aria-label="Contact Me">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.25)]"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
                >
                  Contact Me <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

