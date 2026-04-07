import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../animations/MagneticButton';

const NAV_ITEMS = [
  { href: '#Home', label: 'Home' },
  { href: '#About', label: 'About' },
  { href: '#Portofolio', label: 'Work' },
  { href: '#Contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return null;
        return { id: item.href.slice(1), top: el.offsetTop - 200, height: el.offsetHeight };
      }).filter(Boolean);

      const y = window.scrollY;
      const active = sections.find((s) => y >= s.top && y < s.top + s.height);
      if (active) setActiveSection(active.id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <MagneticButton as="a" href="#Home" onClick={(e) => scrollTo(e, '#Home')} strength={0.15}>
            <span className="text-xl font-bold gradient-text tracking-tight">HH</span>
          </MagneticButton>

          {/* Desktop nav pill */}
          <div
            className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-[rgba(18,18,26,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] shadow-lg'
                : 'bg-transparent'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <MagneticButton
                  key={item.label}
                  as="a"
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  strength={0.12}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))',
                        border: '1px solid rgba(108,99,255,0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white' : 'text-[#8B8B9E] hover:text-white'}`}>
                    {item.label}
                  </span>
                </MagneticButton>
              );
            })}
          </div>

          {/* CTA */}
          <MagneticButton
            as="a"
            href="#Contact"
            onClick={(e) => scrollTo(e, '#Contact')}
            strength={0.15}
            className="hidden md:block"
          >
            <span
              className="px-5 py-2 rounded-full text-sm font-medium text-white border border-[rgba(108,99,255,0.4)] hover:border-[rgba(108,99,255,0.8)] transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.05))' }}
            >
              Let's Talk
            </span>
          </MagneticButton>

          {/* Mobile burger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-[110]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#0A0A0F]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                className={`text-3xl font-semibold transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'gradient-text'
                    : 'text-[#8B8B9E] hover:text-white'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
