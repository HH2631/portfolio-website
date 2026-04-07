import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Package, Globe, Layout, Cpu, Code,
} from 'lucide-react';
import Swal from 'sweetalert2';
import GlassCard from './ui/GlassCard';
import GradientText from './ui/GradientText';

const TECH_ICONS = { React: Globe, Tailwind: Layout, Express: Cpu, Python: Code, Javascript: Code, HTML: Code, CSS: Code, default: Package };

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(108,99,255,0.15)] text-[#8B8B9E] bg-[rgba(108,99,255,0.05)] hover:border-[rgba(108,99,255,0.4)] hover:text-white transition-all duration-300">
      <Icon className="w-3.5 h-3.5 text-[#6C63FF]" />
      {tech}
    </span>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({ icon: 'info', title: 'Private Repository', text: 'Source code for this project is private.', confirmButtonColor: '#6C63FF', background: '#12121A', color: '#FAFAFA' });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = JSON.parse(localStorage.getItem('projects') || '[]');
    const found = stored.find((p) => String(p.id) === id);
    if (found) {
      setProject({ ...found, Features: found.Features || [], TechStack: found.TechStack || [], Github: found.Github || 'https://github.com/HH2631' });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin" />
          <p className="text-[#8B8B9E]">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">

        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(108,99,255,0.3)] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-1.5 text-sm text-[#8B8B9E]">
            <span>Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate">{project.Title}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <GradientText animate>{project.Title}</GradientText>
              </h1>
              <div className="h-1 w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }} />
            </div>

            <p className="text-[#8B8B9E] leading-relaxed">{project.Description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <GlassCard className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.1)' }}>
                  <Code2 className="w-5 h-5 text-[#6C63FF]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{project.TechStack?.length || 0}</p>
                  <p className="text-[10px] text-[#8B8B9E] uppercase tracking-wider">Technologies</p>
                </div>
              </GlassCard>
              <GlassCard className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)' }}>
                  <Layers className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{project.Features?.length || 0}</p>
                  <p className="text-[10px] text-[#8B8B9E] uppercase tracking-wider">Key Features</p>
                </div>
              </GlassCard>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(108,99,255,0.2)]"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[rgba(108,99,255,0.25)] text-white hover:bg-[rgba(108,99,255,0.08)] transition-all duration-300"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            </div>

            {/* Tech stack */}
            {project.TechStack.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#6C63FF]" /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.TechStack.map((tech, i) => <TechBadge key={i} tech={tech} />)}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right column */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.Img && (
              <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] group">
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}

            {project.Features.length > 0 && (
              <GlassCard glow className="p-6 space-y-4">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#00F5D4]" /> Key Features
                </h3>
                <ul className="space-y-2">
                  {project.Features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300 group">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }} />
                      <span className="text-sm text-[#8B8B9E] group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
