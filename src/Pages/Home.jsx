import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Code,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from "react-type-animation";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl sm:blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1 sm:mt-2">
        <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl sm:blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, className }) => (
  <a href={href}>
    <button className={`group relative w-[160px] ${className || ''}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, className }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={`group relative p-3 ${className || ''}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
    </div>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Frontend Developer", "Web Developer", "React Specialist"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/hamzehhijazi" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/hamzehhijazi/" },
  { icon: Instagram, link: "https://www.instagram.com/hamzeh.hijazi/" },
];

// Enhanced hero description with dynamic typing effect
const HERO_DESCRIPTIONS = [
  "Building the future with code, one line at a time",
  "Transforming ideas into powerful digital experiences", 
  "Passionate about creating innovative web solutions",
  "Bridging technology and creativity for exceptional results"
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`,
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 xl:px-0 min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-8 sm:py-12 lg:py-0 gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
            {/* Left Column - Enhanced Text Content */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              {/* Enhanced Greeting with gradient animation */}
              <div className="space-y-3 sm:space-y-4">
                <h1
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <span className="block text-gray-300 mb-2">Hello, I'm</span>
                  <span className="block text-gradient animate-pulse">
                    Hamzeh Hijazi
                  </span>
                </h1>
                
                {/* Enhanced subtitle with animated border */}
                <div 
                  className="relative inline-block"
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="800"
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-400 mb-2">
                    Full-Stack Developer & Innovation Enthusiast
                  </h2>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>

              {/* Enhanced Dynamic Typing */}
              <div className="space-y-4">
                <div
                  className="flex items-center justify-center lg:justify-start gap-3"
                  data-aos="fade-right"
                  data-aos-delay="600"
                  data-aos-duration="800"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Currently Working On</span>
                </div>
                
                <TypeAnimation
                  sequence={[
                    "AI-Powered Web Applications",
                    2000,
                    "Cybersecurity Solutions",
                    2000,
                    "Machine Learning Projects", 
                    2000,
                    "Industrial Automation Systems",
                    2000,
                    "Mental Health Tech Platforms",
                    2000,
                  ]}
                  wrapper="h3"
                  speed={50}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] min-h-[3rem] lg:min-h-[4rem]"
                  repeat={Infinity}
                  data-aos="fade-right"
                  data-aos-delay="800"
                  data-aos-duration="800"
                />
              </div>

              {/* Enhanced Description with cards */}
              <div 
                className="space-y-4"
                data-aos="fade-right" 
                data-aos-delay="1000"
                data-aos-duration="800"
              >
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Passionate about creating innovative digital solutions that bridge technology and human needs. 
                  Specializing in modern web development, AI integration, and cybersecurity.
                </p>
                
                {/* Achievement highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="glass-dark rounded-lg p-3 text-center group hover:scale-105 transition-transform">
                    <div className="text-lg font-bold text-blue-400">4</div>
                    <div className="text-xs text-gray-500">Years Experience</div>
                  </div>
                  <div className="glass-dark rounded-lg p-3 text-center group hover:scale-105 transition-transform">
                    <div className="text-lg font-bold text-purple-400">6+</div>
                    <div className="text-xs text-gray-500">Projects Built</div>
                  </div>
                  <div className="glass-dark rounded-lg p-3 text-center group hover:scale-105 transition-transform">
                    <div className="text-lg font-bold text-green-400">5</div>
                    <div className="text-xs text-gray-500">Certifications</div>
                  </div>
                  <div className="glass-dark rounded-lg p-3 text-center group hover:scale-105 transition-transform">
                    <div className="text-lg font-bold text-red-400">∞</div>
                    <div className="text-xs text-gray-500">Learning</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Tech Stack Preview */}
              <div
                className="space-y-4"
                data-aos="fade-right"
                data-aos-delay="1200"
                data-aos-duration="800"
              >
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {["React", "Node.js", "Python", "AI/ML", "Cybersecurity"].map((tech, index) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:scale-110 transition-transform cursor-default"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                <CTAButton
                  href="#Portofolio"
                  text="View Projects"
                  icon={ExternalLink}
                  className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:from-[#7c3aed] hover:to-[#c084fc] shadow-lg hover:shadow-purple-500/25"
                />
                <CTAButton 
                  href="#Contact" 
                  text="Get In Touch" 
                  icon={Mail}
                  className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
                />
              </div>

              {/* Enhanced Social Links */}
              <div className="hidden sm:flex gap-4 justify-center lg:justify-start">
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink 
                    key={index} 
                    {...social}
                    className="hover:scale-125 hover:rotate-12 transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}
                ></div>

                <div
                  className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
