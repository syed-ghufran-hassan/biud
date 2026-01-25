'use client';

export default function CatPaw({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="text-2xl">🐾</span>
    </div>
  );
}
