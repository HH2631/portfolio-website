import { memo } from 'react';
import { ExternalLink, Github, Eye, Star, GitFork } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import GradientText from './GradientText';

const CardProject = memo(({ Title, Description, Link: projectLink, id, TechStack = [], stars = 0, forks = 0, language = '' }) => (
  <GlassCard glow className="p-5 sm:p-6 h-full flex flex-col justify-between group">
    {/* Header */}
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#6C63FF] transition-colors duration-300 line-clamp-2 flex-1">
          {Title}
        </h3>
        <div className="flex gap-1.5 shrink-0">
          {stars > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-[#8B8B9E] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <Star className="w-3 h-3" /> {stars}
            </span>
          )}
          {forks > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-[#8B8B9E] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <GitFork className="w-3 h-3" /> {forks}
            </span>
          )}
        </div>
      </div>

      {language && (
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }} />
          <span className="text-xs text-[#8B8B9E] font-medium">{language}</span>
        </div>
      )}

      <p className="text-[#8B8B9E] text-sm leading-relaxed line-clamp-3 group-hover:text-[#AAAABE] transition-colors duration-300">
        {Description || 'No description available'}
      </p>

      {TechStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {TechStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full border border-[rgba(108,99,255,0.2)] text-[#8B8B9E] bg-[rgba(108,99,255,0.05)]"
            >
              {tech}
            </span>
          ))}
          {TechStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] text-[#8B8B9E] rounded-full border border-[rgba(255,255,255,0.06)]">
              +{TechStack.length - 4}
            </span>
          )}
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[rgba(255,255,255,0.04)]">
      <Link
        to={`/project/${id}`}
        className="text-sm font-medium text-[#6C63FF] hover:text-[#00D4FF] transition-colors duration-300 flex items-center gap-1.5"
      >
        View Details <Eye className="w-3.5 h-3.5" />
      </Link>
      <div className="flex gap-1.5">
        {projectLink && (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(108,99,255,0.1)] text-[#8B8B9E] hover:text-white transition-all duration-300"
            title="View Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </GlassCard>
));

CardProject.displayName = 'CardProject';
export default CardProject;
