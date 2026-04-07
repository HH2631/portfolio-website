import { useEffect, useRef, memo, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Code, Award, Globe, ArrowUpRight } from 'lucide-react';
import GradientText from '../components/ui/GradientText';
import GlassCard from '../components/ui/GlassCard';
import CountUp from '../components/animations/CountUp';
import MagneticButton from '../components/animations/MagneticButton';
import ParallaxSection from '../components/animations/ParallaxSection';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: 'Frontend Development',
    icon: Code,
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'JavaScript/ES6+', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Vue.js', level: 85 },
    ],
  },
  {
    category: 'Backend & Database',
    icon: Globe,
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 90 },
      { name: 'Firebase', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    category: 'Specialized Skills',
    icon: Award,
    skills: [
      { name: 'Cybersecurity', level: 85 },
      { name: 'AI/Machine Learning', level: 78 },
      { name: 'Industrial Engineering', level: 82 },
      { name: 'Data Analysis', level: 80 },
      { name: 'R&D', level: 88 },
    ],
  },
];

function SkillBar({ name, level, index }) {
  const barRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    );
  }, [index]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#8B8B9E] group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <span className="text-xs text-[#8B8B9E] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full origin-left"
          style={{
            width: `${level}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-cyan))',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}

function SkillCategory({ category, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          once: true,
        },
      }
    );
  }, [index]);

  const Icon = category.icon;

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <GlassCard glow className="p-6 h-full">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))' }}
          >
            <Icon className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <h3 className="text-base font-semibold text-white">{category.category}</h3>
        </div>
        <div className="space-y-3">
          {category.skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} index={i} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function StatItem({ icon: Icon, value, label, desc, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } }
    );
  }, [delay]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <GlassCard glow className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,255,0.08))' }}>
            <Icon className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <span className="text-3xl font-bold">
            <GradientText><CountUp end={value} /></GradientText>
          </span>
        </div>
        <p className="text-sm font-medium text-white">{label}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-[#8B8B9E]">{desc}</p>
          <ArrowUpRight className="w-3 h-3 text-[#8B8B9E]" />
        </div>
      </GlassCard>
    </div>
  );
}

const AboutPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bioRef = useRef(null);

  const stats = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem('projects') || '[]');
    return { projects: stored.length || 6, certificates: 5, experience: 4 };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        }
      );

      const bioElements = bioRef.current?.querySelectorAll('.bio-animate') || [];
      gsap.fromTo(
        bioElements,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="About" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-[#6C63FF] mb-3 font-medium">About Me</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <GradientText animate>Passionate Developer</GradientText>
          </h2>
          <p className="mt-4 text-[#8B8B9E] max-w-2xl mx-auto">
            Transforming ideas into digital experiences
          </p>
        </div>

        {/* Bio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div ref={bioRef} className="space-y-5">
            <p className="bio-animate text-[#8B8B9E] leading-relaxed" style={{ opacity: 0 }}>
              I'm <span className="text-white font-medium">Hamzeh Hijazi</span>, a dedicated full-stack developer
              with a passion for creating innovative digital solutions that make a real impact. My journey in
              technology spans multiple disciplines — from cybersecurity and artificial intelligence to industrial
              engineering and mental health advocacy.
            </p>
            <p className="bio-animate text-[#8B8B9E] leading-relaxed" style={{ opacity: 0 }}>
              With <GradientText className="font-semibold">4 years of hands-on experience</GradientText>, I
              specialize in building modern, responsive web applications using cutting-edge technologies like
              React.js, Node.js, Python, and various cloud platforms.
            </p>

            <div className="bio-animate grid grid-cols-2 gap-4 pt-4" style={{ opacity: 0 }}>
              <GlassCard className="p-4">
                <p className="text-[#6C63FF] text-sm font-semibold mb-1">Current Focus</p>
                <p className="text-xs text-[#8B8B9E]">AI-powered web apps & cybersecurity solutions</p>
              </GlassCard>
              <GlassCard className="p-4">
                <p className="text-[#00D4FF] text-sm font-semibold mb-1">Mission</p>
                <p className="text-xs text-[#8B8B9E]">Technology that solves real-world problems</p>
              </GlassCard>
            </div>

            <p className="bio-animate text-[#8B8B9E] leading-relaxed" style={{ opacity: 0 }}>
              Beyond coding, I'm actively involved in research and education, having participated in international
              science fairs and earning certifications in emerging technologies.
            </p>

            {/* CTA buttons */}
            <div className="bio-animate flex flex-col sm:flex-row gap-3 pt-4" style={{ opacity: 0 }}>
              <MagneticButton
                as="a"
                href="/CV-final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="CV-final.pdf"
                strength={0.2}
              >
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </span>
              </MagneticButton>
              <MagneticButton as="a" href="#Portofolio" strength={0.2}>
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[rgba(108,99,255,0.3)] text-white hover:bg-[rgba(108,99,255,0.08)] transition-all duration-300">
                  <Code className="w-4 h-4" />
                  Explore Projects
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Profile image with parallax */}
          <div className="flex items-center justify-center">
            <ParallaxSection speed={0.15}>
              <div className="relative group">
                <div
                  className="absolute -inset-4 rounded-full opacity-30 animate-spin-slow"
                  style={{
                    background: 'conic-gradient(from 0deg, #6C63FF, #00D4FF, #FF3CAC, #6C63FF)',
                    filter: 'blur(20px)',
                  }}
                />
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-[rgba(108,99,255,0.2)] group-hover:border-[rgba(108,99,255,0.5)] transition-all duration-700">
                  <img
                    src="/profile-new.jpg"
                    alt="Hamzeh Hijazi - Full Stack Developer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6C63FF] mb-2 font-medium">Expertise</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Technical Skills</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((cat, i) => (
              <SkillCategory key={cat.category} category={cat} index={i} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatItem icon={Code} value={stats.projects} label="Total Projects" desc="Innovative web solutions crafted" delay={0} />
          <StatItem icon={Award} value={stats.certificates} label="Certificates" desc="Professional skills validated" delay={0.1} />
          <StatItem icon={Globe} value={stats.experience} label="Years Experience" desc="Continuous learning journey" delay={0.2} />
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);
