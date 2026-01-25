'use client';

export default function FloatingCat() {
  return (
    <div className="animate-float relative w-32 h-32">
      {/* Cat Face */}
      <div className="absolute inset-0 bg-cat-orange rounded-full"></div>
    </div>
  );
}
