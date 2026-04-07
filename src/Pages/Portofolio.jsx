import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Award, Boxes, Github, Loader2 } from 'lucide-react';
import CardProject from '../components/ui/CardProject';
import TechStackIcon from '../components/ui/TechStackIcon';
import Certificate from '../components/ui/Certificate';
import GradientText from '../components/ui/GradientText';
import { getGitHubRepositories, getGitHubProfile, GITHUB_USERNAME } from '../services/github';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'techstack', label: 'Tech Stack', icon: Boxes },
];

const techStacks = [
  { icon: 'html.svg', language: 'HTML' },
  { icon: 'css.svg', language: 'CSS' },
  { icon: 'javascript.svg', language: 'JavaScript' },
  { icon: 'tailwind.svg', language: 'Tailwind CSS' },
  { icon: 'reactjs.svg', language: 'ReactJS' },
  { icon: 'vite.svg', language: 'Vite' },
  { icon: 'nodejs.svg', language: 'Node JS' },
  { icon: 'bootstrap.svg', language: 'Bootstrap' },
  { icon: 'firebase.svg', language: 'Firebase' },
  { icon: 'MUI.svg', language: 'Material UI' },
  { icon: 'vercel.svg', language: 'Vercel' },
  { icon: 'SweetAlert.svg', language: 'SweetAlert2' },
];

const certificatesData = [
  { id: 1, Img: '/NCSC CTF.png', title: 'NCSC Cyber Security CTF', description: 'Cybersecurity Capture The Flag Competition' },
  { id: 2, Img: '/AI iec 1.jpeg', title: 'AI IEC Certificate 1', description: 'Artificial Intelligence Industrial Engineering Beginner Level' },
  { id: 3, Img: '/AI iec 2.jpeg', title: 'AI IEC Certificate 2', description: 'Advanced AI and Industrial Engineering' },
  { id: 4, Img: '/mind matters.jpeg', title: 'Mind Matters', description: 'Mental Health and Psychology Certificate' },
  { id: 5, Img: '/isef.jpeg', title: 'ISEF Certificate', description: 'International Science and Engineering Fair' },
];

function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex gap-1 p-1 rounded-2xl glass-strong">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-[#8B8B9E] hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))',
                    border: '1px solid rgba(108,99,255,0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-[#6C63FF]" />
      <p className="text-[#8B8B9E]">Loading projects from GitHub...</p>
      <p className="text-xs text-[#8B8B9E]">Fetching from {GITHUB_USERNAME}</p>
    </div>
  );
}

function NoProjects() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Github className="h-14 w-14 text-[#8B8B9E]" />
      <h3 className="text-lg font-semibold text-white">No Public Repositories Found</h3>
      <p className="text-[#8B8B9E] max-w-md text-center text-sm">
        Projects will appear here when you make repositories public on GitHub.
      </p>
      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white border border-[rgba(108,99,255,0.3)] hover:bg-[rgba(108,99,255,0.08)] transition-colors"
      >
        <Github className="w-4 h-4" /> View Profile
      </a>
    </div>
  );
}

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const initialCount = isMobile ? 4 : 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const repos = await getGitHubRepositories();
        setProjects(repos);
        if (repos.length > 0) {
          localStorage.setItem('projects', JSON.stringify(repos));
          localStorage.setItem('github_projects', JSON.stringify(repos));
        }
      } catch {
        const cached = localStorage.getItem('github_projects');
        if (cached) setProjects(JSON.parse(cached));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      }
    );
  }, []);

  const displayed = showAll ? projects : projects.slice(0, initialCount);

  return (
    <section ref={sectionRef} id="Portofolio" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12" style={{ opacity: 0 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-[#6C63FF] mb-3 font-medium">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <GradientText animate>Featured Work</GradientText>
          </h2>
          <p className="mt-4 text-[#8B8B9E] max-w-2xl mx-auto">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </div>

        {/* Tabs */}
        <TabBar activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setShowAll(false); }} />

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div key="projects" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              {isLoading ? (
                <ProjectsLoading />
              ) : projects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayed.map((project, i) => (
                      <motion.div
                        key={project.id || i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                      >
                        <CardProject
                          Title={project.Title}
                          Description={project.Description}
                          Link={project.Link}
                          id={project.id}
                          TechStack={project.TechStack}
                          stars={project.stars}
                          forks={project.forks}
                          language={project.language}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {projects.length > initialCount && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setShowAll((v) => !v)}
                        className="px-5 py-2 rounded-full text-sm font-medium border border-[rgba(108,99,255,0.25)] text-[#8B8B9E] hover:text-white hover:border-[rgba(108,99,255,0.5)] transition-all duration-300"
                        style={{ background: 'rgba(108,99,255,0.05)' }}
                      >
                        {showAll ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <NoProjects />
              )}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div key="certificates" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificatesData.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Certificate
                      ImgSertif={cert.Img}
                      title={cert.title}
                      description={cert.description}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'techstack' && (
            <motion.div key="techstack" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                {techStacks.map((stack, i) => (
                  <motion.div
                    key={stack.language}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
