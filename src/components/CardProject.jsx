import React, { useState, memo } from "react";
import { ExternalLink, Github, Eye, Star, GitFork } from "lucide-react";
import { Link } from "react-router-dom";

const CardProject = memo(({ Img, Title, Description, Link: projectLink, id, TechStack = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="group relative bg-gray-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
        
        <img
          src={Img}
          alt={Title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Hover Overlay with Actions */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link
            to={`/project/${id}`}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </Link>
          
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          
          <a
            href={`https://github.com/hamzehhijazi/${Title.toLowerCase().replace(/\s+/g, '-')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Project Stats (mockup for demo) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
            <Star className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 50) + 10}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
            <GitFork className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 20) + 5}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
          {Title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {Description}
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
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Link
            to={`/project/${id}`}
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-2"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </Link>
          
          <div className="flex gap-2">
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={`https://github.com/hamzehhijazi/${Title.toLowerCase().replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              title="Source Code"
            >
              <Github className="w-4 h-4" />
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