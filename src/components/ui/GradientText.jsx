export default function GradientText({
  children,
  className = '',
  from = 'var(--color-primary)',
  to = 'var(--color-cyan)',
  animate = false,
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${animate ? 'animate-gradient' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
        backgroundSize: animate ? '200% 200%' : '100% 100%',
      }}
    >
      {children}
    </span>
  );
}
