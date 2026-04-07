import { Linkedin, Github, Instagram, Youtube, ExternalLink } from 'lucide-react';
import MagneticButton from '../animations/MagneticButton';

const TikTokIcon = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.24 8.24 0 004.76 1.5V7.04a4.84 4.84 0 01-1-.35z" />
  </svg>
);

const socialLinks = [
  { name: 'LinkedIn', subText: 'Let\'s Connect', icon: Linkedin, url: 'https://www.linkedin.com/in/hbhijazi', primary: true },
  { name: 'Instagram', subText: '@Hamzeh_hijazi', icon: Instagram, url: 'https://www.instagram.com/Hamzeh_hijazi/' },
  { name: 'YouTube', subText: '@hamzeh.hijazi', icon: Youtube, url: 'https://www.youtube.com/@hamzeh.hijazi' },
  { name: 'GitHub', subText: '@HH2631', icon: Github, url: 'https://github.com/HH2631' },
  { name: 'TikTok', subText: '@hamzeh_hijazi', icon: TikTokIcon, url: 'https://www.tiktok.com/@hamzeh_hijazi' },
];

export default function SocialLinks() {
  return (
    <div className="w-full space-y-3">
      <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
        <span className="inline-block w-6 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)' }} />
        Connect With Me
      </h3>

      <div className="space-y-2">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <MagneticButton
              key={link.name}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.1}
              className="w-full"
            >
              <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(108,99,255,0.2)] hover:bg-[rgba(108,99,255,0.04)] transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[rgba(108,99,255,0.08)] group-hover:bg-[rgba(108,99,255,0.15)] transition-colors duration-300">
                    <Icon className="w-4 h-4 text-[#8B8B9E] group-hover:text-[#6C63FF] transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#FAFAFA] block leading-tight">{link.name}</span>
                    <span className="text-xs text-[#8B8B9E]">{link.subText}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B8B9E] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
              </div>
            </MagneticButton>
          );
        })}
      </div>
    </div>
  );
}
