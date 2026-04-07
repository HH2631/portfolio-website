import GlassCard from './GlassCard';

export default function TechStackIcon({ TechStackIcon: icon, Language }) {
  return (
    <GlassCard
      glow
      className="p-5 flex flex-col items-center justify-center gap-3 group cursor-default"
    >
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
        />
        <img
          src={icon}
          alt={`${Language} icon`}
          className="relative h-14 w-14 md:h-16 md:w-16 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
          loading="lazy"
        />
      </div>
      <span className="text-[#8B8B9E] font-medium text-sm group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </GlassCard>
  );
}
