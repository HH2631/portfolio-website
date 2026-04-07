import GradientText from '../ui/GradientText';

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#8B8B9E]">
          &copy; {new Date().getFullYear()}{' '}
          <GradientText className="font-medium">Hamzeh Hijazi</GradientText>
          . All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-xs text-[#8B8B9E]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse-glow" />
          Available for work
        </div>
      </div>
    </footer>
  );
}
