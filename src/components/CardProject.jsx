import React, { useState, memo } from "react";
import { ExternalLink, Github, Eye, Star, GitFork } from "lucide-react";
import { Link } from "react-router-dom";

const CardProject = memo(({ Title, Description, Link: projectLink, id, TechStack = [], stars = 0, forks = 0, language = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gray-900/30 backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Content */}
      <div className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
        {/* Header with Title and Stats */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2 flex-1">
            {Title}
          </h3>
          
          {/* Project Stats */}
          <div className="flex gap-2 shrink-0">
            {stars > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs text-gray-300">
                <Star className="w-3 h-3" />
                <span>{stars}</span>
              </div>
            )}
            {forks > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs text-gray-300">
                <GitFork className="w-3 h-3" />
                <span>{forks}</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Language */}
        {language && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <span className="text-xs text-gray-400 font-medium">{language}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-400 text-xs xs:text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {Description || "No description available"}
        </p>

        {/* Tech Stack */}
        {TechStack && TechStack.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {TechStack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:scale-105 transition-transform"
                >
                  {tech}
                </span>
              ))}
              {TechStack.length > 4 && (
                <span className="px-2 py-1 text-xs font-medium text-gray-400 rounded-full border border-gray-600">
                  +{TechStack.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 xs:pt-4 border-t border-white/10">
          <Link
            to={`/project/${id}`}
            className="text-xs xs:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-1 xs:gap-2 min-h-touch"
          >
            View Details
            <Eye className="w-3 h-3 xs:w-4 xs:h-4" />
          </Link>
          
          <div className="flex gap-1 xs:gap-2">
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 min-w-touch min-h-touch flex items-center justify-center"
                title="Live Demo"
              >
                <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4" />
              </a>
            )}
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 min-w-touch min-h-touch flex items-center justify-center"
              title="Source Code"
            >
              <Github className="w-3 h-3 xs:w-4 xs:h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
});

CardProject.displayName = "CardProject";

export default CardProject;