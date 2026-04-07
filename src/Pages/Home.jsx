import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram, ArrowUpRight, Mail } from 'lucide-react';
import FloatingGeometry from '../components/3d/FloatingGeometry';
import GradientText from '../components/ui/GradientText';
import MagneticButton from '../components/animations/MagneticButton';
import CountUp from '../components/animations/CountUp';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/HH2631', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hbhijazi', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/Hamzeh_hijazi/', label: 'Instagram' },
];

const TECH_CHIPS = ['React', 'Node.js', 'Python', 'AI/ML', 'Cybersecurity'];

const STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 6, suffix: '+', label: 'Projects Built' },
  { value: 5, suffix: '', label: 'Certifications' },
];

const Home = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const chipsRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const geoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.2,
      });

      tl.fromTo(
        headingRef.current?.querySelectorAll('.word') || [],
        { y: 80, opacity: 0, rotateX: 40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          chipsRef.current?.children || [],
          { y: 20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          socialRef.current?.children || [],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          geoRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.2 },
          0.3
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 xl:gap-16 min-h-screen justify-center">

          {/* Left: Text content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left order-2 lg:order-1">

            {/* Greeting + Name */}
            <div ref={headingRef} className="space-y-2" style={{ perspective: '600px' }}>
              <p className="word text-lg text-[#8B8B9E] font-light tracking-wide">Hello, I'm</p>
              <h1 className="word text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                <GradientText animate className="inline-block">Hamzeh Hijazi</GradientText>
              </h1>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef}>
              <h2 className="text-xl sm:text-2xl font-medium text-[#8B8B9E]">
                Full-Stack Developer &{' '}
                <GradientText from="var(--color-accent)" to="var(--color-primary)">
                  Innovation Enthusiast
                </GradientText>
              </h2>
            </div>

            {/* Description */}
            <p ref={descRef} className="text-base text-[#8B8B9E] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Crafting innovative digital experiences at the intersection of modern web development,
              artificial intelligence, and cybersecurity.
            </p>

            {/* Tech chips */}
            <div ref={chipsRef} className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {TECH_CHIPS.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-[rgba(108,99,255,0.25)] text-[#8B8B9E] hover:text-white hover:border-[rgba(108,99,255,0.6)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(108,99,255,0.15)]"
                  style={{ background: 'rgba(108,99,255,0.06)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <MagneticButton as="a" href="#Portofolio" strength={0.2}>
                <span className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
                >
                  View Projects
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </MagneticButton>
              <MagneticButton as="a" href="#Contact" strength={0.2}>
                <span className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border border-[rgba(108,99,255,0.3)] text-[#FAFAFA] hover:bg-[rgba(108,99,255,0.08)] transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </span>
              </MagneticButton>
            </div>

            {/* Social links */}
            <div ref={socialRef} className="hidden sm:flex gap-3 justify-center lg:justify-start pt-2">
              {SOCIAL_LINKS.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  aria-label={s.label}
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(108,99,255,0.4)] hover:bg-[rgba(108,99,255,0.06)] transition-all duration-300">
                    <s.icon className="w-4 h-4 text-[#8B8B9E] hover:text-white transition-colors" />
                  </span>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Right: 3D Geometry */}
          <div
            ref={geoRef}
            className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[600px] xl:h-[700px] relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <FloatingGeometry />
            </div>
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-16 pb-12 lg:pb-0 lg:-mt-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-3xl font-bold">
                <GradientText>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </GradientText>
              </div>
              <p className="text-xs text-[#8B8B9E] mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Home);
