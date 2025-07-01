import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/profile-new.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-300 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

// Enhanced skills data with categories and proficiency levels
const skillsData = [
  {
    category: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React.js", level: 95, color: "from-blue-500 to-cyan-500" },
      { name: "JavaScript/ES6+", level: 92, color: "from-yellow-500 to-orange-500" },
      { name: "Tailwind CSS", level: 90, color: "from-teal-500 to-blue-500" },
      { name: "HTML5/CSS3", level: 95, color: "from-orange-500 to-red-500" },
      { name: "Vue.js", level: 85, color: "from-green-500 to-teal-500" }
    ]
  },
  {
    category: "Backend & Database",
    icon: Globe,
    skills: [
      { name: "Node.js", level: 88, color: "from-green-600 to-lime-600" },
      { name: "Python", level: 90, color: "from-blue-600 to-indigo-600" },
      { name: "Firebase", level: 85, color: "from-yellow-600 to-orange-600" },
      { name: "MongoDB", level: 82, color: "from-green-700 to-emerald-700" },
      { name: "PostgreSQL", level: 80, color: "from-blue-700 to-indigo-700" }
    ]
  },
  {
    category: "Specialized Skills",
    icon: Award,
    skills: [
      { name: "Cybersecurity", level: 85, color: "from-red-500 to-pink-500" },
      { name: "AI/Machine Learning", level: 78, color: "from-purple-500 to-indigo-500" },
      { name: "Industrial Engineering", level: 82, color: "from-gray-500 to-slate-500" },
      { name: "Data Analysis", level: 80, color: "from-emerald-500 to-green-500" },
      { name: "Research & Development", level: 88, color: "from-violet-500 to-purple-500" }
    ]
  }
];

const SkillBar = memo(({ skill, index, categoryIndex }) => (
  <div 
    className="group"
    data-aos="fade-up" 
    data-aos-duration="800"
    data-aos-delay={index * 100}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
        {skill.name}
      </span>
      <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
        {skill.level}%
      </span>
    </div>
    <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
        style={{ 
          width: `${skill.level}%`,
          animationDelay: `${categoryIndex * 200 + index * 100}ms`
        }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
    </div>
  </div>
));

const SkillCategory = memo(({ category, index }) => (
  <div 
    className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:shadow-2xl"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-delay={index * 200}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <category.icon className="w-5 h-5 text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
        {category.category}
      </h3>
    </div>
    <div className="space-y-4">
      {category.skills.map((skill, skillIndex) => (
        <SkillBar 
          key={skill.name} 
          skill={skill} 
          index={skillIndex} 
          categoryIndex={index}
        />
      ))}
    </div>
  </div>
));

// Enhanced About description with more personality
const AboutDescription = memo(() => (
  <div className="space-y-6" data-aos="fade-up" data-aos-duration="1000">
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Passionate Full-Stack Developer & Innovation Enthusiast
      </h3>
      
      <div className="prose prose-lg text-gray-300 leading-relaxed space-y-4">
        <p>
          Hello! I'm <span className="text-purple-400 font-semibold">Hamzeh Hijazi</span>, a dedicated full-stack developer with a passion for creating 
          innovative digital solutions that make a real impact. My journey in technology spans multiple disciplines, 
          from cybersecurity and artificial intelligence to industrial engineering and mental health advocacy.
        </p>
        
        <p>
          With <span className="text-blue-400 font-semibold">3+ years of hands-on experience</span>, I specialize in building 
          modern, responsive web applications using cutting-edge technologies. My expertise includes React.js, Node.js, 
          Python, and various cloud platforms, always with a focus on user experience and performance optimization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-2">🎯 Current Focus</h4>
            <p className="text-sm text-gray-400">
              Developing AI-powered web applications and cybersecurity solutions
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2">🚀 Mission</h4>
            <p className="text-sm text-gray-400">
              Creating technology that enhances human experiences and solves real-world problems
            </p>
          </div>
        </div>
        
        <p>
          Beyond coding, I'm actively involved in research and education, having participated in international 
          science fairs and earning certifications in emerging technologies. I believe in continuous learning 
          and sharing knowledge with the developer community.
        </p>
      </div>
    </div>

    {/* Action buttons with enhanced styling */}
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
      <a
        href="/resume.pdf"
        className="w-full lg:w-auto"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          data-aos="fade-up"
          data-aos-duration="800"
          className="w-full lg:w-auto sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-2xl hover:shadow-purple-500/25 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <FileText className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" /> 
          <span className="relative z-10">Download Resume</span>
        </button>
      </a>
      <a href="#Portofolio" className="w-full lg:w-auto">
        <button
          data-aos="fade-up"
          data-aos-duration="1000"
          className="w-full lg:w-auto sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#a855f7]/50 text-[#a855f7] font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 hover:border-[#a855f7] group relative overflow-hidden"
        >
          <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
          <span>Explore Projects</span>
        </button>
      </a>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    // Use fixed certificate count instead of localStorage
    const certificateCount = 5; // Total number of certificates (updated count)

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: certificateCount,
      YearExperience: experience,
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div className="min-h-screen bg-[#030014] text-white" id="About">
      <div className="md:px-[10%] px-[5%] pt-[100px] pb-[80px]">
        <Header />
        
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <AboutDescription />
          <ProfileImage />
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Technical Expertise
            </h2>
            <p 
              className="text-gray-400 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, index) => (
              <SkillCategory key={category.category} category={category} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
