'use client';

export default function CatPaw({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div 
      className={`relative animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-2xl opacity-30">🐾</span>
    </div>
  );
}
